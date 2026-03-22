import type { Metadata } from "next"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'
const SITE_URL = 'https://aoa.ng'

async function getSermon(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/public/sermons/${id}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.data || data
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const sermon = await getSermon(id)

  if (!sermon) {
    return {
      title: "Sermon Not Found",
    }
  }

  const title = sermon.title
  const description = sermon.summary || `Sermon by Pst. (Prof.) Anthony Adegbulugbe`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Anthony Olusegun Adegbulugbe`,
      description,
      type: "article",
      url: `${SITE_URL}/sermons/${id}`,
      images: [
        {
          url: `${SITE_URL}/images/anthony-portrait.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default function SermonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
