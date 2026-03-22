"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Download, Eye, Star, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { type PublicBook } from "@/lib/api"
import { cachedApi } from "@/lib/cached-api"

export function BooksSection() {
  const [books, setBooks] = useState<PublicBook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const booksData = await cachedApi.books.getFeatured()
        setBooks(booksData.slice(0, 3)) // Show maximum 3 books for homepage
        setError(null)
      } catch (err) {
        console.error('Failed to fetch books:', err)
        setError('Failed to load books')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) {
    return (
      <section id="books" className="mt-16">
        <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">FEATURED BOOKS</h2>
          <Link href="/books" className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold hover:text-red-600 transition-colors">
            ALL BOOKS
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </section>
    )
  }

  if (books.length === 0 && !error) {
    return null
  }

  if (error) {
    return (
      <section id="books" className="mt-16">
        <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">FEATURED BOOKS</h2>
          <Link href="/books" className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold hover:text-red-600 transition-colors">
            ALL BOOKS
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
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
      </section>
    )
  }
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <section id="books" className="mt-16">
      <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">FEATURED BOOKS</h2>
        <Link href="/books" className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold hover:text-red-600 transition-colors">
          ALL BOOKS
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Desktop: Show 3 books in grid */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 gap-6 mb-8">
          {books.map((book, index) => (
            <Card key={index} className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-full h-48 bg-black border-2 border-black overflow-hidden mb-3 relative">
                    <Image
                      src={book.cover_image || "/placeholder.svg"}
                      alt={book.title}
                      width={200}
                      height={300}
                      className="w-full h-full object-cover object-top"
                    />
                    {book.featured && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold">FEATURED</span>
                      </div>
                    )}
                    {!book.featured && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-green-600 text-white px-2 py-1 text-xs font-bold">NEW</span>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-base md:text-lg mb-2 text-center leading-tight">{book.title}</h3>
                <p className="text-sm text-gray-600 text-center mb-3">{book.subtitle}</p>

                <div className="flex items-center justify-center gap-3 text-xs text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {book.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {book.pages} pages
                  </div>
                  {book.rating && book.rating > 0 && (
                    <div className="flex items-center gap-1">
                      {renderStars(book.rating)}
                      <span className="text-xs">({book.reviews})</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-700 text-center mb-4">{book.description}</p>

                <div className="flex gap-2">
                  <Link href={`/books/${book.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-black hover:bg-gray-100 bg-transparent text-sm"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      VIEW
                    </Button>
                  </Link>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm">
                    <Download className="w-3 h-3 mr-1" />
                    DOWNLOAD
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mobile: Show vertical list instead of horizontal scrolling */}
      <div className="block md:hidden">
        <div className="space-y-4">
          {books.map((book, index) => (
            <Card key={index} className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Book cover - smaller on mobile */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-28 bg-black border-2 border-black overflow-hidden relative">
                      <Image
                        src={book.cover_image || "/placeholder.svg"}
                        alt={book.title}
                        width={80}
                        height={112}
                        className="w-full h-full object-cover object-top"
                      />
                      {book.featured && (
                        <div className="absolute top-1 left-1">
                          <span className="bg-red-600 text-white px-1 py-0.5 text-xs font-bold">FEATURED</span>
                        </div>
                      )}
                      {!book.featured && (
                        <div className="absolute top-1 left-1">
                          <span className="bg-green-600 text-white px-1 py-0.5 text-xs font-bold">NEW</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Book details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base mb-1 leading-tight">{book.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{book.subtitle}</p>

                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {book.year}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {book.pages}p
                      </div>
                      {book.rating && book.rating > 0 && (
                        <div className="flex items-center gap-1">
                          {renderStars(book.rating)}
                          <span className="text-xs">({book.reviews})</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-2">{book.description}</p>

                    <div className="flex gap-2">
                      <Link href={`/books/${book.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-2 border-black hover:bg-gray-100 bg-transparent text-sm"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          VIEW
                        </Button>
                      </Link>
                      <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm">
                        <Download className="w-3 h-3 mr-1" />
                        GET
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
