import type { Metadata } from "next"

const RSS_URL = "https://anchor.fm/s/113939d74/podcast/rss"

export const metadata: Metadata = {
  title: "Podcast",
  description:
    "Stream and subscribe to sermons by Pst. (Prof.) Anthony Adegbulugbe — life-transforming biblical messages of hope, grace, and salvation. Listen on Spotify, Apple Podcasts, or any app via RSS.",
  alternates: {
    types: {
      "application/rss+xml": RSS_URL,
    },
  },
  openGraph: {
    title: "Podcast — Pst. (Prof.) Anthony Adegbulugbe",
    description:
      "Stream and subscribe to life-transforming sermons. Listen on Spotify, Apple Podcasts, or any podcast app via RSS.",
    type: "website",
  },
}

export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
