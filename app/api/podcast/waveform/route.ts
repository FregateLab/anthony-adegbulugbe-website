import { NextResponse } from "next/server"
import { fetchPodcastFeed, durationToSeconds } from "@/lib/podcast"
import { getWaveform } from "@/lib/waveform"

// ffmpeg + child_process require the Node.js runtime (not edge).
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }

  const feed = await fetchPodcastFeed()
  const episode = feed?.episodes.find((ep) => ep.guid === id)
  if (!episode || !episode.audioUrl) {
    return NextResponse.json({ error: "Episode not found" }, { status: 404 })
  }

  let peaks: number[] | null = null
  try {
    peaks = await getWaveform(
      episode.guid,
      episode.audioUrl,
      durationToSeconds(episode.duration)
    )
  } catch (error) {
    console.error("Waveform generation failed:", error)
  }

  // Peaks for a given audio file never change. When generation succeeds,
  // cache hard; when it fails (e.g. ffmpeg unavailable) return null so the
  // client keeps its synthetic waveform, and don't cache the miss for long.
  const headers = peaks
    ? { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" }
    : { "Cache-Control": "public, max-age=60" }

  return NextResponse.json({ peaks }, { headers })
}
