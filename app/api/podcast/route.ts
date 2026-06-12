import { NextResponse } from "next/server"
import { PODCAST_RSS_URL, parseFeed } from "@/lib/podcast"

// Revalidate the feed hourly — episodes publish infrequently.
export const revalidate = 3600

export async function GET() {
  try {
    const res = await fetch(PODCAST_RSS_URL, {
      headers: { "User-Agent": "anthony-adegbulugbe-website/1.0" },
      next: { revalidate },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `Feed responded with ${res.status}` },
        { status: 502 }
      )
    }

    const xml = await res.text()
    const feed = parseFeed(xml)

    return NextResponse.json(feed, {
      headers: {
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("Failed to load podcast feed:", error)
    return NextResponse.json(
      { error: "Failed to load podcast feed" },
      { status: 500 }
    )
  }
}
