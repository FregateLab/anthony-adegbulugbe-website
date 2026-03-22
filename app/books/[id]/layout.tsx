import type { Metadata } from "next"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'
const SITE_URL = 'https://aoa.ng'

async function getBook(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/public/books/${id}`, {
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
  const book = await getBook(id)

  if (!book) {
    return {
      title: "Book Not Found",
    }
  }

  const title = book.title
  const description = book.description || `Book by Pst. (Prof.) Anthony Adegbulugbe`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Anthony Olusegun Adegbulugbe`,
      description,
      type: "book",
      url: `${SITE_URL}/books/${id}`,
      images: book.cover_image
        ? [{ url: book.cover_image, alt: title }]
        : [{ url: `${SITE_URL}/images/anthony-portrait.jpg`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
