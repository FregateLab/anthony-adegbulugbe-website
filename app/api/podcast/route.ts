import { NextResponse } from "next/server"
import { fetchPodcastFeed } from "@/lib/podcast"

// Revalidate the feed hourly — episodes publish infrequently.
export const revalidate = 3600

export async function GET() {
  const feed = await fetchPodcastFeed()

  if (!feed) {
    return NextResponse.json(
      { error: "Failed to load podcast feed" },
      { status: 502 }
    )
  }

  return NextResponse.json(feed, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
