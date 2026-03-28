"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Download, Eye, Calendar, User, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { type PublicBook, getFileUrl } from "@/lib/api"
import { cachedApi } from "@/lib/cached-api"

export default function BooksPage() {
  const [books, setBooks] = useState<PublicBook[]>([])
  const [featuredBook, setFeaturedBook] = useState<PublicBook | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const booksData = await cachedApi.books.getAll()
        setBooks(booksData)
        
        // Set first featured book or first book as featured
        const featured = booksData.find(book => book.featured) || booksData[0]
        setFeaturedBook(featured || null)
        
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

  const otherBooks = books.filter(book => book.id !== featuredBook?.id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">BOOKS</h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
              Explore profound spiritual insights through the written word. Each book is rooted in Scripture and decades
              of ministry experience.
            </p>
          </div>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading books...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">BOOKS</h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
              Explore profound spiritual insights through the written word. Each book is rooted in Scripture and decades
              of ministry experience.
            </p>
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
        </main>
        <Footer />
      </div>
    )
  }

  if (!featuredBook) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">BOOKS</h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
              Explore profound spiritual insights through the written word. Each book is rooted in Scripture and decades
              of ministry experience.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">No books available at the moment.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">BOOKS</h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
            Explore profound spiritual insights through the written word. Each book is rooted in Scripture and decades
            of ministry experience.
          </p>
        </div>

        {/* Featured Book Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">FEATURED BOOK</h2>

          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Book Cover */}
                <div className="text-center">
                  <div className="w-full max-w-xs sm:max-w-sm mx-auto h-64 sm:h-80 lg:h-96 bg-black border-2 border-black overflow-hidden mb-4 sm:mb-6">
                    <Image
                      src={getFileUrl(featuredBook.cover_image) || "/placeholder.svg"}
                      alt={featuredBook.title}
                      width={350}
                      height={500}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <span className="bg-red-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">FEATURED</span>
                    <span className="bg-green-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold">NEW RELEASE</span>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
                    <Link href={`/books/${featuredBook.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" className="w-full border-2 border-black hover:bg-gray-100 bg-transparent text-sm">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        VIEW DETAILS
                      </Button>
                    </Link>
                    {featuredBook.pdf_url && (
                      <a href={getFileUrl(featuredBook.pdf_url)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          DOWNLOAD
                        </Button>
                      </a>
                    )}
                  </div>
                </div>

                {/* Book Details */}
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 leading-tight">{featuredBook.title}</h3>
                  <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">{featuredBook.subtitle}</p>
                  <p className="text-sm sm:text-base lg:text-lg font-medium mb-4">by {featuredBook.author}</p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {featuredBook.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      {featuredBook.pages} pages
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">{featuredBook.description}</p>

                  {featuredBook.key_themes && featuredBook.key_themes.length > 0 && (
                    <div className="mb-4 sm:mb-6">
                      <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">KEY THEMES:</h4>
                      <div className="flex flex-wrap gap-2">
                        {featuredBook.key_themes.map((theme, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {featuredBook.formats && featuredBook.formats.length > 0 && (
                    <div className="mb-4 sm:mb-6">
                      <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">AVAILABLE FORMATS:</h4>
                      <div className="flex flex-wrap gap-2">
                        {featuredBook.formats.map((format, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 text-xs sm:text-sm border border-blue-300"
                          >
                            {format}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-3 sm:pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                      {featuredBook.isbn && (
                        <div>
                          <span className="font-medium">ISBN:</span> {featuredBook.isbn}
                        </div>
                      )}
                      {featuredBook.publisher && (
                        <div>
                          <span className="font-medium">Publisher:</span> {featuredBook.publisher}
                        </div>
                      )}
                      {featuredBook.category && (
                        <div>
                          <span className="font-medium">Category:</span> {featuredBook.category}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Language:</span> English
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Book Preview Section */}
        {(featuredBook.table_of_contents || featuredBook.excerpt) && (
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">BOOK PREVIEW</h2>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Table of Contents */}
              {featuredBook.table_of_contents && featuredBook.table_of_contents.length > 0 && (
                <Card className="border-2 border-black bg-white">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      TABLE OF CONTENTS
                    </h3>
                    <div className="space-y-2">
                      {featuredBook.table_of_contents.map((chapter, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                        >
                          <span className="text-xs sm:text-sm pr-2">{chapter}</span>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {index === 0 ? "ii" : index === 1 ? "iii" : index + 4}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Book Excerpt */}
              {featuredBook.excerpt && (
                <Card className="border-2 border-black bg-white">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      BOOK EXCERPT
                    </h3>
                    <div className="bg-gray-50 p-3 sm:p-4 border-l-4 border-red-600 mb-3 sm:mb-4">
                      <p className="text-xs sm:text-sm italic leading-relaxed">{featuredBook.excerpt}</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      This excerpt provides a glimpse into the profound insights contained within "{featuredBook.title}".
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Author Bio */}
        <section className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8 mb-12 sm:mb-16">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <User className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            <h2 className="text-xl sm:text-2xl font-bold">ABOUT THE AUTHOR</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                <strong>Pastor Anthony Olusegun Adegbulugbe</strong> is the Zonal Superintendent of Christ Apostolic
                Church, Nigeria and Overseas. With over four decades of ministry experience, he combines academic
                excellence with deep spiritual insight.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                He holds a First-Class B.Sc. in Electrical Engineering from University of Ife (now OAU) and a D.Sc. from
                MIT in Nuclear Materials Engineering. Currently serving as Chancellor of Joseph Ayo Babalola University,
                he brings both scholarly rigor and pastoral heart to his writings.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                His books represent his deep understanding of God's Word, drawn from decades of faithful
                ministry and personal relationship with Christ. His messages combine biblical truth with practical
                application for modern Christian living.
              </p>
            </div>
            <div className="text-center lg:text-left mt-6 lg:mt-0">
              <div className="bg-gray-100 p-4 sm:p-6 rounded-lg">
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">MINISTRY HIGHLIGHTS</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span>Years in Ministry:</span>
                    <span className="font-bold">40+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Position:</span>
                    <span className="font-bold">Zonal Superintendent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Academic Role:</span>
                    <span className="font-bold">University Chancellor</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Published Books:</span>
                    <span className="font-bold">{books.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Books Section */}
        {otherBooks.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b-2 border-black pb-3 sm:pb-4">OTHER BOOKS</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {otherBooks.map((book) => (
                <Card key={book.id} className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
                  <CardContent className="p-3 sm:p-4">
                    <div className="text-center mb-3 sm:mb-4">
                      <div className="w-full h-40 sm:h-48 bg-black border-2 border-black overflow-hidden mb-2 sm:mb-3 relative">
                        <Image
                          src={getFileUrl(book.cover_image) || "/placeholder.svg"}
                          alt={book.title}
                          width={200}
                          height={240}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>

                    <h3 className="font-bold text-xs sm:text-sm mb-1 sm:mb-2 text-center leading-tight">{book.title}</h3>
                    <p className="text-xs text-gray-600 text-center mb-2 sm:mb-3">{book.subtitle}</p>

                    <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs text-gray-600 mb-2 sm:mb-3">
                      <span>{book.year}</span>
                      <span>•</span>
                      <span>{book.pages} pages</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link href={`/books/${book.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-2 border-black hover:bg-gray-100 bg-transparent text-xs"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          VIEW
                        </Button>
                      </Link>
                      {book.pdf_url && (
                        <a href={getFileUrl(book.pdf_url)} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs">
                            <Download className="w-3 h-3 mr-1" />
                            DOWNLOAD
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}