"use client"

import { useState, useEffect, use } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Eye, Calendar, BookOpen, Quote, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { type PublicBook, getFileUrl } from "@/lib/api"
import { cachedApi } from "@/lib/cached-api"

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [book, setBook] = useState<PublicBook | null>(null)
  const [allBooks, setAllBooks] = useState<PublicBook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const resolvedParams = use(params)
  const bookId = Number.parseInt(resolvedParams.id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [bookData, booksData] = await Promise.all([
          cachedApi.books.getById(bookId),
          cachedApi.books.getAll(),
        ])
        setBook(bookData)
        setAllBooks(booksData)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch book:", err)
        setError("Failed to load book")
        setBook(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [bookId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-lg font-bold">Loading book...</p>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Book Not Found</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">The book you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/books">
            <Button className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Back to Books
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const author = "Pastor Anthony Adegbulugbe"
  const otherBooks = allBooks.filter((b) => b.id !== book.id)
  const coverUrl = book.cover_image ? getFileUrl(book.cover_image) : "/placeholder.svg"
  const pdfUrl = book.pdf_url ? getFileUrl(book.pdf_url) : null
  const keyThemes = book.key_themes || []
  const tableOfContents = book.table_of_contents || []

  // JSON-LD structured data for book
  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: "Pst. (Prof.) Anthony Olusegun Adegbulugbe",
    },
    description: book.description,
    numberOfPages: book.pages,
    isbn: book.isbn || undefined,
    publisher: {
      "@type": "Organization",
      name: book.publisher || "CAC Publications",
    },
    url: typeof window !== "undefined" ? window.location.href : `https://aoa.ng/books/${book.id}`,
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />

      <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Link href="/books">
            <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white bg-transparent text-sm sm:text-base px-3 sm:px-4 py-2">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Back to Books
            </Button>
          </Link>
        </div>

        {/* Book Header */}
        <div className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <img
                src={coverUrl}
                alt={book.title}
                className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] mx-auto border-2 border-black shadow-lg"
              />
            </div>

            {/* Book Details */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <span className="bg-red-600 text-white px-2 sm:px-3 py-1 text-xs font-bold">FREE BOOK</span>
                {book.featured && (
                  <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold">FEATURED</span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight">{book.title}</h1>
              {book.subtitle && (
                <p className="text-lg sm:text-xl text-gray-600 mb-3 sm:mb-4">{book.subtitle}</p>
              )}
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">by {author}</p>

              {/* Stats */}
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                {book.pages > 0 && <span>{book.pages} pages</span>}
                <span>{book.year}</span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 leading-relaxed">{book.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {pdfUrl && (
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-2 sm:py-3 flex items-center justify-center gap-2 text-sm sm:text-base">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      DOWNLOAD PDF
                    </Button>
                  </a>
                )}
                {pdfUrl && (
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="border-2 border-black hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 flex items-center justify-center gap-2 bg-transparent text-sm sm:text-base"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      READ ONLINE
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-2 border-black bg-white mb-6 sm:mb-8">
          <div className="border-b-2 border-black">
            <div className="flex flex-wrap">
              {[
                { id: "overview", label: "OVERVIEW" },
                { id: "contents", label: "CONTENTS" },
                { id: "quotes", label: "QUOTES" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-6 py-3 sm:py-4 font-bold text-xs sm:text-sm border-r-2 border-black hover:bg-gray-100 flex-1 sm:flex-none ${
                    activeTab === tab.id ? "bg-red-600 text-white" : ""
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    ABOUT THIS BOOK
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">{book.description}</p>
                </div>

                {keyThemes.length > 0 && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">KEY THEMES COVERED</h3>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      {keyThemes.map((theme, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-gray-700">{theme}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t-2 border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">{book.year}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Published</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">{book.pages || "—"}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Pages</div>
                  </div>
                </div>
              </div>
            )}

            {/* Table of Contents Tab */}
            {activeTab === "contents" && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">TABLE OF CONTENTS</h3>
                {tableOfContents.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {tableOfContents.map((chapter, index) => (
                      <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 hover:bg-gray-50">
                        <div className="bg-red-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm sm:text-base lg:text-lg">{chapter}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm sm:text-base text-gray-500">Table of contents not available.</p>
                )}
              </div>
            )}

            {/* Quotes Tab */}
            {activeTab === "quotes" && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  INSPIRING QUOTES
                </h3>
                {book.excerpt ? (
                  <Card className="border-2 border-gray-200 bg-gray-50">
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mb-3 sm:mb-4" />
                      <blockquote className="text-lg sm:text-xl italic text-gray-800 leading-relaxed mb-3 sm:mb-4">
                        &ldquo;{book.excerpt}&rdquo;
                      </blockquote>
                      <cite className="text-sm sm:text-base text-gray-600 font-medium">— {author}</cite>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-600">
                    <Quote className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-400" />
                    <p className="text-sm sm:text-base">No quotes available yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Other Books */}
        {otherBooks.length > 0 && (
          <div className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">OTHER BOOKS BY {author.toUpperCase()}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {otherBooks.map((otherBook) => (
                <Card key={otherBook.id} className="border-2 border-gray-300 hover:bg-gray-50 transition-colors">
                  <CardContent className="p-4 sm:p-6">
                    <img
                      src={otherBook.cover_image ? getFileUrl(otherBook.cover_image) : "/placeholder.svg"}
                      alt={otherBook.title}
                      className="w-full max-w-[120px] sm:max-w-[150px] mx-auto mb-3 sm:mb-4 border-2 border-black"
                    />
                    <h4 className="font-bold text-sm sm:text-base lg:text-lg mb-2 leading-tight">{otherBook.title}</h4>
                    {otherBook.subtitle && (
                      <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{otherBook.subtitle}</p>
                    )}
                    <Link href={`/books/${otherBook.id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent text-xs sm:text-sm"
                      >
                        VIEW BOOK
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
