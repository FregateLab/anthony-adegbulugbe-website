import { spawn } from "child_process"

// Generates a real amplitude waveform for an episode's audio by decoding it
// with ffmpeg. Silent stretches in the source therefore render as flat bars,
// letting listeners see and scrub past them. Results are immutable per audio
// file, so they are cached aggressively in-process.

export const WAVEFORM_BUCKETS = 240

// Decode to mono PCM at this low sample rate — plenty for a loudness
// envelope while keeping the streamed data small.
const SAMPLE_RATE = 1000
const FFMPEG_TIMEOUT_MS = 120_000
const MAX_CONCURRENT = 2

const cache = new Map<string, number[]>()
const inflight = new Map<string, Promise<number[] | null>>()

// Tiny concurrency gate so a page full of episodes can't spawn N ffmpegs at once.
let active = 0
const queue: Array<() => void> = []
function acquire(): Promise<void> {
  if (active < MAX_CONCURRENT) {
    active++
    return Promise.resolve()
  }
  return new Promise((resolve) => queue.push(resolve))
}
function release() {
  active--
  const next = queue.shift()
  if (next) {
    active++
    next()
  }
}

async function resolveFfmpegPath(): Promise<string> {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH
  // Optional: use the bundled binary if ffmpeg-static is installed.
  try {
    // @ts-ignore - optional dependency, may not be installed
    const mod = await import("ffmpeg-static")
    const p = (mod.default ?? mod) as unknown as string
    if (p) return p
  } catch {
    /* not installed — fall back to PATH */
  }
  return "ffmpeg"
}

// Follow the feed's tracking/redirect enclosure to the final CDN URL so
// ffmpeg streams from a stable origin with clean range support.
async function resolveAudioUrl(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-1" },
      redirect: "follow",
    })
    return res.url || url
  } catch {
    return url
  }
}

function decodePeaks(
  pcm: NodeJS.ReadableStream,
  estimatedSamples: number
): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const buckets = WAVEFORM_BUCKETS
    const peaks = new Array<number>(buckets).fill(0)
    const bucketSize = Math.max(1, Math.floor(estimatedSamples / buckets))

    let bucketIndex = 0
    let countInBucket = 0
    let currentMax = 0
    let globalMax = 0
    let carry: number | null = null

    const pushSample = (raw: number) => {
      // Convert unsigned 16-bit little-endian to signed magnitude.
      let v = raw
      if (v & 0x8000) v -= 0x10000
      const mag = v < 0 ? -v : v
      if (mag > currentMax) currentMax = mag
      countInBucket++
      if (countInBucket >= bucketSize && bucketIndex < buckets - 1) {
        peaks[bucketIndex] = currentMax
        if (currentMax > globalMax) globalMax = currentMax
        bucketIndex++
        currentMax = 0
        countInBucket = 0
      }
    }

    pcm.on("data", (chunk: Buffer) => {
      let offset = 0
      if (carry !== null) {
        pushSample(carry | (chunk[0] << 8))
        offset = 1
        carry = null
      }
      const end = chunk.length - 1
      for (let i = offset; i < end; i += 2) {
        pushSample(chunk[i] | (chunk[i + 1] << 8))
      }
      if ((chunk.length - offset) % 2 === 1) carry = chunk[chunk.length - 1]
    })

    pcm.on("error", reject)
    pcm.on("end", () => {
      // Flush the final partially-filled bucket; any buckets beyond the
      // actual audio remain 0 (silence).
      if (currentMax > peaks[bucketIndex]) peaks[bucketIndex] = currentMax
      if (currentMax > globalMax) globalMax = currentMax

      if (globalMax === 0) {
        resolve(peaks)
        return
      }
      // Normalize to the loudest peak, then apply a gentle perceptual curve
      // so speech reads tall while true silence stays near zero.
      const normalized = peaks.map((p) => {
        const x = p / globalMax
        return Math.round(Math.pow(x, 0.7) * 1000) / 1000
      })
      resolve(normalized)
    })
  })
}

async function generatePeaks(
  audioUrl: string,
  durationSeconds: number
): Promise<number[] | null> {
  const ffmpeg = await resolveFfmpegPath()
  const finalUrl = await resolveAudioUrl(audioUrl)
  const estimatedSamples = Math.max(
    WAVEFORM_BUCKETS,
    Math.floor((durationSeconds || 0) * SAMPLE_RATE)
  )

  await acquire()
  return new Promise<number[] | null>((resolve) => {
    const proc = spawn(
      ffmpeg,
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-nostdin",
        "-i",
        finalUrl,
        "-vn",
        "-ac",
        "1",
        "-ar",
        String(SAMPLE_RATE),
        "-f",
        "s16le",
        "pipe:1",
      ],
      { stdio: ["ignore", "pipe", "ignore"] }
    )

    let settled = false
    const finish = (value: number[] | null) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      release()
      resolve(value)
    }

    const timer = setTimeout(() => {
      proc.kill("SIGKILL")
      finish(null)
    }, FFMPEG_TIMEOUT_MS)

    decodePeaks(proc.stdout, estimatedSamples)
      .then((peaks) => finish(peaks))
      .catch(() => finish(null))

    proc.on("error", () => finish(null))
  })
}

export async function getWaveform(
  cacheKey: string,
  audioUrl: string,
  durationSeconds: number
): Promise<number[] | null> {
  const cached = cache.get(cacheKey)
  if (cached) return cached

  const pending = inflight.get(cacheKey)
  if (pending) return pending

  const promise = generatePeaks(audioUrl, durationSeconds)
    .then((peaks) => {
      if (peaks) cache.set(cacheKey, peaks)
      return peaks
    })
    .finally(() => inflight.delete(cacheKey))

  inflight.set(cacheKey, promise)
  return promise
}
