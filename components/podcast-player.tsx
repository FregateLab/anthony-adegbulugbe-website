"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Play, Pause, Loader2 } from "lucide-react"

// Coordinates playback so only one episode buffers/plays at a time.
// Starting a player broadcasts its id; every other player pauses.
const ACTIVE_EVENT = "podcast:play"

interface PodcastPlayerProps {
  id: string
  src: string
  /** Total length in seconds from the feed, shown before metadata loads. */
  durationHint?: number
}

const BAR_COUNT = 56

// Deterministic pseudo-random bar heights derived from the episode id, so each
// episode has its own stable "waveform" silhouette (not a random reshuffle).
function buildBars(seed: string): number[] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const rand = () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    // Blend noise with a gentle envelope so it reads as speech, not static.
    const envelope = 0.55 + 0.45 * Math.sin((i / BAR_COUNT) * Math.PI)
    return Math.max(0.18, Math.min(1, (0.35 + rand() * 0.65) * envelope))
  })
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function PodcastPlayer({ id, src, durationHint = 0 }: PodcastPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const barsRef = useRef<number[]>(buildBars(id))
  const rafRef = useRef<number | null>(null)
  const phaseRef = useRef(0)
  const pendingSeekRef = useRef<number | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [duration, setDuration] = useState(durationHint)
  const [currentTime, setCurrentTime] = useState(0)
  const [buffered, setBuffered] = useState(0)

  const progress = duration > 0 ? currentTime / duration : 0
  const bufferedFrac = duration > 0 ? buffered / duration : 0

  // --- Canvas waveform rendering ---------------------------------------
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const cssWidth = canvas.clientWidth
    const cssHeight = canvas.clientHeight
    if (canvas.width !== cssWidth * dpr || canvas.height !== cssHeight * dpr) {
      canvas.width = cssWidth * dpr
      canvas.height = cssHeight * dpr
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, cssWidth, cssHeight)

    const bars = barsRef.current
    const gap = 3
    const barWidth = Math.max(2, (cssWidth - gap * (BAR_COUNT - 1)) / BAR_COUNT)
    const mid = cssHeight / 2
    const phase = phaseRef.current

    for (let i = 0; i < BAR_COUNT; i++) {
      const frac = (i + 0.5) / BAR_COUNT
      // While playing, modulate heights into a travelling wave for the
      // "live equalizer" feel; at rest the static silhouette shows.
      const wave = isPlaying
        ? 0.45 + 0.55 * Math.abs(Math.sin(phase + i * 0.45))
        : 1
      const amp = bars[i] * wave
      const barHeight = Math.max(3, amp * (cssHeight - 6))
      const x = i * (barWidth + gap)
      const y = mid - barHeight / 2

      if (frac <= progress) {
        ctx.fillStyle = "#dc2626" // played — church red
      } else if (frac <= bufferedFrac) {
        ctx.fillStyle = "#a8a29e" // buffered ahead
      } else {
        ctx.fillStyle = "#d6d0c4" // unplayed — muted cream-grey
      }

      const r = Math.min(barWidth / 2, 2)
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, r)
      ctx.fill()
    }
  }, [isPlaying, progress, bufferedFrac])

  // Animate only while playing; otherwise draw once on state change.
  useEffect(() => {
    if (isPlaying) {
      const loop = () => {
        phaseRef.current += 0.12
        draw()
        rafRef.current = requestAnimationFrame(loop)
      }
      rafRef.current = requestAnimationFrame(loop)
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }
    draw()
  }, [isPlaying, draw])

  // Redraw on container resize so the waveform stays crisp.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(() => draw())
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [draw])

  // --- Single active player coordination -------------------------------
  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      const playingId = (e as CustomEvent<string>).detail
      if (playingId !== id) {
        audioRef.current?.pause()
      }
    }
    window.addEventListener(ACTIVE_EVENT, onOtherPlay as EventListener)
    return () =>
      window.removeEventListener(ACTIVE_EVENT, onOtherPlay as EventListener)
  }, [id])

  // --- Audio element wiring --------------------------------------------
  const applyPendingSeek = useCallback(() => {
    const audio = audioRef.current
    if (audio && pendingSeekRef.current != null && audio.duration) {
      audio.currentTime = pendingSeekRef.current * audio.duration
      pendingSeekRef.current = null
    }
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      window.dispatchEvent(new CustomEvent(ACTIVE_EVENT, { detail: id }))
      void audio.play()
    } else {
      audio.pause()
    }
  }, [id])

  const seekToClientX = useCallback((clientX: number) => {
    const canvas = canvasRef.current
    const audio = audioRef.current
    if (!canvas || !audio) return
    const rect = canvas.getBoundingClientRect()
    const frac = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    if (audio.duration && isFinite(audio.duration)) {
      audio.currentTime = frac * audio.duration
      setCurrentTime(audio.currentTime)
    } else {
      // Metadata not loaded yet — remember the target and start loading.
      pendingSeekRef.current = frac
      window.dispatchEvent(new CustomEvent(ACTIVE_EVENT, { detail: id }))
      void audio.play()
    }
  }, [id])

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
      seekToClientX(e.clientX)
      const onMove = (ev: PointerEvent) => seekToClientX(ev.clientX)
      const onUp = () => {
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("pointerup", onUp)
      }
      window.addEventListener("pointermove", onMove)
      window.addEventListener("pointerup", onUp)
    },
    [seekToClientX]
  )

  return (
    <div className="mt-4 flex items-center gap-3">
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration || durationHint)
          applyPendingSeek()
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onProgress={(e) => {
          const a = e.currentTarget
          if (a.buffered.length > 0) {
            setBuffered(a.buffered.end(a.buffered.length - 1))
          }
        }}
        onEnded={() => {
          setIsPlaying(false)
          setCurrentTime(0)
        }}
      />

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-black text-white border-2 border-black hover:bg-red-600 transition-colors"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
          tabIndex={0}
          onKeyDown={(e) => {
            const audio = audioRef.current
            if (!audio || !audio.duration) return
            if (e.key === "ArrowRight") {
              audio.currentTime = Math.min(audio.duration, audio.currentTime + 10)
            } else if (e.key === "ArrowLeft") {
              audio.currentTime = Math.max(0, audio.currentTime - 10)
            } else if (e.key === " " || e.key === "Enter") {
              e.preventDefault()
              togglePlay()
            }
          }}
          className="w-full h-12 cursor-pointer touch-none outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        />
      </div>

      <div className="flex-shrink-0 w-[88px] text-right tabular-nums text-xs text-gray-600 font-mono">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  )
}
