import type { Metadata } from "next"
import { fetchPodcastFeed, PODCAST_RSS_URL } from "@/lib/podcast"

const PAGE_URL = "https://aoa.ng/podcast"

export const metadata: Metadata = {
  title: "Podcast",
  description:
    "Stream and subscribe to sermons by Pst. (Prof.) Anthony Adegbulugbe — life-transforming biblical messages of hope, grace, and salvation. Listen on Spotify, Apple Podcasts, or any app via RSS.",
  alternates: {
    canonical: "/podcast",
    types: {
      "application/rss+xml": PODCAST_RSS_URL,
    },
  },
  openGraph: {
    title: "Podcast — Pst. (Prof.) Anthony Adegbulugbe",
    description:
      "Stream and subscribe to life-transforming sermons. Listen on Spotify, Apple Podcasts, or any podcast app via RSS.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Podcast — Pst. (Prof.) Anthony Adegbulugbe",
    description:
      "Stream and subscribe to life-transforming sermons on Spotify, Apple Podcasts, or any app via RSS.",
  },
}

// Server-rendered structured data helps Google surface the show and episodes
// as rich results (PodcastSeries + recent PodcastEpisode nodes).
async function buildJsonLd() {
  const feed = await fetchPodcastFeed()
  if (!feed) return null

  const series = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: feed.title,
    description: feed.description,
    url: PAGE_URL,
    image: feed.image || undefined,
    webFeed: feed.rssUrl,
    author: feed.author
      ? { "@type": "Organization", name: feed.author }
      : undefined,
    sameAs: feed.link ? [feed.link] : undefined,
  }

  const episodes = feed.episodes.slice(0, 10).map((ep) => ({
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: ep.title,
    description: ep.description,
    url: ep.link || PAGE_URL,
    datePublished: ep.pubDate || undefined,
    associatedMedia: ep.audioUrl
      ? { "@type": "AudioObject", contentUrl: ep.audioUrl }
      : undefined,
    partOfSeries: { "@type": "PodcastSeries", name: feed.title, url: PAGE_URL },
  }))

  return [series, ...episodes]
}

export default async function PodcastLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = await buildJsonLd()
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
