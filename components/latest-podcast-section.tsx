"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Mic, Loader2, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PodcastPlayer } from "@/components/podcast-player"
import { durationToSeconds, type PodcastEpisode } from "@/lib/podcast"

function formatDate(value: string): string {
  if (!value) return ""
  const date = new Date(value)
  if (isNaN(date.getTime())) return value
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function formatDuration(value: string): string {
  if (!value) return ""
  const parts = value.split(":")
  if (parts.length === 3 && parts[0] === "00") return `${parts[1]}:${parts[2]} min`
  if (parts.length === 3) return `${Number(parts[0])}h ${parts[1]}m`
  return value
}

export function LatestPodcastSection() {
  const [episode, setEpisode] = useState<PodcastEpisode | null>(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch("/api/podcast")
        if (!res.ok) throw new Error("Failed to load podcast")
        const data = await res.json()
        if (cancelled) return
        const episodes: PodcastEpisode[] = data.episodes || []
        const latest = [...episodes].sort(
          (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        )[0]
        setEpisode(latest || null)
      } catch (err) {
        if (!cancelled) setFailed(true)
        console.error("Failed to load latest podcast:", err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  // Stay quiet if the feed is unavailable or empty — no empty section.
  if (failed || (!loading && !episode)) return null

  return (
    <section id="podcast" className="mt-16">
      <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Mic className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
          LATEST PODCAST
        </h2>
        <Link
          href="/podcast"
          className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold hover:text-red-600 transition-colors"
        >
          ALL EPISODES
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading latest episode...</p>
        </div>
      ) : (
        episode && (
          <div className="border-2 border-black bg-white">
            <div className="flex flex-col sm:flex-row">
              {episode.image && (
                <div className="sm:w-56 sm:flex-shrink-0">
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="w-full h-48 sm:h-full object-cover border-b-2 sm:border-b-0 sm:border-r-2 border-black"
                  />
                </div>
              )}
              <div className="p-6 flex-1 min-w-0">
                <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 mb-3">
                  NEW EPISODE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">
                  {episode.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600 mb-3">
                  {episode.pubDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(episode.pubDate)}
                    </span>
                  )}
                  {episode.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(episode.duration)}
                    </span>
                  )}
                </div>
                {episode.description && (
                  <p className="text-sm text-gray-700 mb-2 whitespace-pre-line line-clamp-3">
                    {episode.description}
                  </p>
                )}

                {episode.audioUrl && (
                  <PodcastPlayer
                    id={episode.guid}
                    src={episode.audioUrl}
                    durationHint={durationToSeconds(episode.duration)}
                  />
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link href="/podcast">
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
                      Listen &amp; Subscribe
                    </Button>
                  </Link>
                  <a
                    href="https://anchor.fm/s/113939d74/podcast/rss"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="border-2 border-black hover:bg-black hover:text-white font-bold flex items-center gap-1 bg-transparent"
                    >
                      <Rss className="w-4 h-4" />
                      RSS
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  )
}
