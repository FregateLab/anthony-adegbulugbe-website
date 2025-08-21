"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Download, Eye, Star, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const books = [
  {
    id: 1,
    title: "JOURNEY OF LOVE",
    subtitle: "Messages on the Love of God",
    year: "2025",
    description: "A profound exploration of God's love through powerful messages delivered during the Advent season.",
    pages: 91,
    rating: 4.9,
    reviews: 156,
    featured: true,
    coverImage: "/placeholder.svg?height=300&width=200&text=Journey+of+Love",
  },
  {
    id: 2,
    title: "THE RIGHTEOUS SHALL LIVE BY FAITH",
    subtitle: "Messages on Faith and Righteous Living",
    year: "2025",
    description:
      "A comprehensive exploration of faith through biblical messages on righteous living and spiritual growth.",
    pages: 105,
    rating: 4.8,
    reviews: 89,
    featured: false,
    coverImage: "/images/righteous-shall-live-by-faith-cover.jpg",
  },
]

export function BooksSection() {
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
                      src={book.coverImage || "/placeholder.svg"}
                      alt={book.title}
                      width={200}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    {book.comingSoon && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-yellow-500 text-black px-3 py-2 text-xs font-bold">COMING SOON</span>
                      </div>
                    )}
                    {book.featured && !book.comingSoon && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold">FEATURED</span>
                      </div>
                    )}
                    {!book.featured && !book.comingSoon && (
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
                  {book.rating && (
                    <div className="flex items-center gap-1">
                      {renderStars(book.rating)}
                      <span className="text-xs">({book.reviews})</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-700 text-center mb-4">{book.description}</p>

                {book.comingSoon ? (
                  <Button
                    variant="outline"
                    className="w-full border-2 border-black hover:bg-gray-100 bg-transparent text-sm"
                    disabled
                  >
                    COMING SOON
                  </Button>
                ) : (
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
                )}
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
                        src={book.coverImage || "/placeholder.svg"}
                        alt={book.title}
                        width={80}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                      {book.comingSoon && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="bg-yellow-500 text-black px-1 py-1 text-xs font-bold">SOON</span>
                        </div>
                      )}
                      {book.featured && !book.comingSoon && (
                        <div className="absolute top-1 left-1">
                          <span className="bg-red-600 text-white px-1 py-0.5 text-xs font-bold">FEATURED</span>
                        </div>
                      )}
                      {!book.featured && !book.comingSoon && (
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
                      {book.rating && (
                        <div className="flex items-center gap-1">
                          {renderStars(book.rating)}
                          <span className="text-xs">({book.reviews})</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-2">{book.description}</p>

                    {book.comingSoon ? (
                      <Button
                        variant="outline"
                        className="w-full border-2 border-black hover:bg-gray-100 bg-transparent text-sm"
                        disabled
                      >
                        COMING SOON
                      </Button>
                    ) : (
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
                    )}
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
