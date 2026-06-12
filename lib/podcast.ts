// Public Anchor/Spotify RSS feed for the sermon podcast.
// Exposed via env so it can be swapped without a code change.
export const PODCAST_RSS_URL =
  process.env.NEXT_PUBLIC_PODCAST_RSS_URL ||
  "https://anchor.fm/s/113939d74/podcast/rss"

export interface PodcastEpisode {
  guid: string
  title: string
  description: string
  link: string
  audioUrl: string
  audioType: string
  duration: string
  pubDate: string
  image: string
  season: number | null
  episode: number | null
}

export interface PodcastFeed {
  title: string
  description: string
  author: string
  link: string
  image: string
  rssUrl: string
  episodes: PodcastEpisode[]
}

function decodeEntities(input: string): string {
  return input
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
}

function clean(value: string | null | undefined): string {
  if (!value) return ""
  const withoutCdata = value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  return decodeEntities(withoutCdata).trim()
}

// Convert the HTML episode description into readable plain text,
// preserving line and paragraph breaks.
function htmlToText(html: string): string {
  const text = clean(html)
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<\/\s*p\s*>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
  return decodeEntities(text).trim()
}

function getTag(xml: string, tag: string): string | null {
  const match = xml.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i")
  )
  return match ? match[1] : null
}

function getAttr(xml: string, tag: string, attr: string): string | null {
  const match = xml.match(
    new RegExp(`<${tag}\\b[^>]*?\\b${attr}="([^"]*)"`, "i")
  )
  return match ? match[1] : null
}

export function parseFeed(xml: string): PodcastFeed {
  const channelMatch = xml.match(/<channel>([\s\S]*?)<item>/i)
  const channel = channelMatch ? channelMatch[1] : xml

  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/gi) || []

  const episodes: PodcastEpisode[] = itemBlocks.map((item) => {
    const season = clean(getTag(item, "itunes:season"))
    const episode = clean(getTag(item, "itunes:episode"))
    return {
      guid: clean(getTag(item, "guid")) || clean(getTag(item, "link")),
      title: clean(getTag(item, "title")),
      description: htmlToText(getTag(item, "description") || ""),
      link: clean(getTag(item, "link")),
      audioUrl: getAttr(item, "enclosure", "url") || "",
      audioType: getAttr(item, "enclosure", "type") || "audio/mpeg",
      duration: clean(getTag(item, "itunes:duration")),
      pubDate: clean(getTag(item, "pubDate")),
      image:
        getAttr(item, "itunes:image", "href") ||
        getAttr(channel, "itunes:image", "href") ||
        "",
      season: season ? Number(season) : null,
      episode: episode ? Number(episode) : null,
    }
  })

  return {
    title: clean(getTag(channel, "title")),
    description: clean(getTag(channel, "description")),
    author:
      clean(getTag(channel, "itunes:author")) || clean(getTag(channel, "author")),
    link: clean(getTag(channel, "link")),
    image: getAttr(channel, "itunes:image", "href") || "",
    rssUrl: PODCAST_RSS_URL,
    episodes,
  }
}
