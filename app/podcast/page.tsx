"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Calendar,
  Clock,
  Rss,
  Copy,
  Check,
  Headphones,
  Mic,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import type { PodcastFeed, PodcastEpisode } from "@/lib/podcast"

const RSS_URL = "https://anchor.fm/s/113939d74/podcast/rss"

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
  // Feed supplies HH:MM:SS — trim a leading zero hour for readability.
  const parts = value.split(":")
  if (parts.length === 3 && parts[0] === "00") {
    return `${parts[1]}:${parts[2]} min`
  }
  if (parts.length === 3) {
    return `${Number(parts[0])}h ${parts[1]}m`
  }
  return value
}

function EpisodeCard({ episode }: { episode: PodcastEpisode }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = episode.description.length > 220

  return (
    <Card className="border-2 border-black bg-white">
      <CardContent className="p-5">
        <div className="flex gap-4">
          {episode.image && (
            <img
              src={episode.image}
              alt={episode.title}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover border-2 border-black flex-shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-1">
              {episode.episode != null && (
                <span className="bg-black text-white px-2 py-0.5 font-medium">
                  {episode.season ? `S${episode.season} ` : ""}E
                  {episode.episode}
                </span>
              )}
              {episode.pubDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(episode.pubDate)}
                </span>
              )}
              {episode.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDuration(episode.duration)}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold leading-tight">{episode.title}</h3>
          </div>
        </div>

        {episode.description && (
          <div className="mt-4">
            <p
              className={`text-sm text-gray-700 whitespace-pre-line ${
                !expanded && isLong ? "line-clamp-3" : ""
              }`}
            >
              {episode.description}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-1 text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                {expanded ? (
                  <>
                    Show less <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {episode.audioUrl && (
          <audio
            controls
            preload="none"
            className="w-full mt-4"
            src={episode.audioUrl}
          >
            Your browser does not support the audio element.
          </audio>
        )}
      </CardContent>
    </Card>
  )
}

export default function PodcastPage() {
  const [feed, setFeed] = useState<PodcastFeed | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/podcast")
        if (!res.ok) throw new Error("Failed to load podcast")
        const data: PodcastFeed = await res.json()
        if (cancelled) return
        setFeed(data)
        setError(null)
      } catch (err) {
        if (cancelled) return
        console.error(err)
        setError("Failed to load the podcast feed. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleCopyRss = async () => {
    try {
      await navigator.clipboard.writeText(RSS_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Clipboard unavailable — no-op; the RSS link is still clickable.
    }
  }

  const spotifyUrl = feed?.link || "https://podcasters.spotify.com/pod/show/ayoola6"
  const appleUrl = `https://podcasts.apple.com/search?term=${encodeURIComponent(
    feed?.title || "Anthony Adegbulugbe Sermon"
  )}`

  const filteredEpisodes = useMemo(() => {
    if (!feed) return []
    const query = searchQuery.trim().toLowerCase()
    if (!query) return feed.episodes
    return feed.episodes.filter(
      (ep) =>
        ep.title.toLowerCase().includes(query) ||
        ep.description.toLowerCase().includes(query)
    )
  }, [feed, searchQuery])

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3 text-red-600">
            <Mic className="w-6 h-6" />
            <span className="text-sm font-semibold tracking-widest uppercase">
              The Podcast
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            LISTEN & SUBSCRIBE
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {feed?.description ||
              "Stream life-transforming sermons anywhere. Follow on your favourite app and never miss a message."}
          </p>
        </div>

        {/* Subscribe Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="border-2 border-black bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3 flex items-center gap-2">
              <Headphones className="w-4 h-4" />
              Subscribe to listen everywhere
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a href={spotifyUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[#1DB954] hover:bg-[#1aa34a] text-white font-bold">
                  Spotify
                </Button>
              </a>
              <a href={appleUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[#9933CC] hover:bg-[#7a29a3] text-white font-bold">
                  Apple
                </Button>
              </a>
              <a href={RSS_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="w-full border-2 border-black hover:bg-black hover:text-white font-bold flex items-center gap-1"
                >
                  <Rss className="w-4 h-4" />
                  RSS
                </Button>
              </a>
              <Button
                onClick={handleCopyRss}
                variant="outline"
                className="w-full border-2 border-black hover:bg-black hover:text-white font-bold flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy feed
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 break-all">
              RSS feed: <span className="font-mono">{RSS_URL}</span>
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search episodes..."
              className="w-full pl-10 pr-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Episodes */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 border-b-2 border-black pb-4">
            EPISODES
          </h2>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading episodes...</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-2 border-black hover:bg-gray-100"
              >
                Try Again
              </Button>
            </div>
          )}

          {!loading && !error && (
            <>
              {filteredEpisodes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">
                    {searchQuery.trim()
                      ? "No episodes match your search."
                      : "No episodes available yet. Check back soon."}
                  </p>
                  {searchQuery.trim() && (
                    <Button
                      onClick={() => setSearchQuery("")}
                      variant="outline"
                      className="border-2 border-black hover:bg-gray-100"
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredEpisodes.map((episode) => (
                    <EpisodeCard key={episode.guid} episode={episode} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
