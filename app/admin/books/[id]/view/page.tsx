"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Edit, Trash2, Download, Star, Calendar, BookOpen, Users, Eye } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock book data - in a real app, this would come from a database
const books = {
  1: {
    id: 1,
    title: "Journey of Love",
    subtitle: "Understanding God's Heart in the Advent Season",
    author: "Pastor Anthony Adegbulugbe",
    rating: 4.8,
    reviewCount: 127,
    price: 0,
    pages: 180,
    year: 2018,
    cover: "/placeholder.svg?height=400&width=300&text=Journey+of+Love",
    hasPdf: true,
    pdfUrl: "/books/journey-of-love.pdf",
    featured: false,
    status: "published",
    downloads: 456,
    publishDate: "2024-12-01",
    description:
      "A comprehensive exploration of God's love through the advent season, examining salvation, redemption, and adoption into God's family. This book takes readers on a transformative journey through the themes of hope, peace, joy, and love, revealing the depth of God's heart for humanity.",
    tableOfContents: [
      "Introduction: Journey of Love",
      "His Banner Over Us Is Love",
      "Dimensions of the Love of God",
      "Unbreakable Chord of Divine Love",
      "The Love of God: Part 1",
      "Benefits of the Love of God",
      "Christmas Reflections on the Love of God",
      "He Became Poor So That We May Be Rich",
      "Loving God More",
    ],
    keyThemes: [
      "God's unconditional love",
      "Advent season significance",
      "Salvation through love",
      "Redemption and forgiveness",
      "Adoption into God's family",
      "Christmas and incarnation",
      "Responding to God's love",
    ],
    isbn: "978-1-234567-89-0",
    publisher: "CAC Publications",
    category: "Spiritual Growth",
  },
  2: {
    id: 2,
    title: "The Righteous Shall Live by Faith",
    subtitle: "A Biblical Foundation for Faith-Centered Living",
    author: "Pastor Anthony Adegbulugbe",
    rating: 4.9,
    reviewCount: 89,
    price: 0,
    pages: 156,
    year: 2020,
    cover: "/images/righteous-shall-live-by-faith-cover.jpg",
    hasPdf: true,
    pdfUrl: "/books/righteous-shall-live-by-faith.pdf",
    featured: true,
    status: "published",
    downloads: 234,
    publishDate: "2025-01-01",
    description:
      "A comprehensive study on the biblical foundation of faith, exploring what it means to live by faith rather than by sight. This book examines the power of faith, the dangers of walking by sight, and practical steps for developing a faith-centered life that pleases God.",
    tableOfContents: [
      "What is Faith?",
      "The Righteous Shall Live by Faith",
      "Dangers of Walking by Sight",
      "The Power of Faith",
      "Faith When We Face Trials",
      "Faith and Salvation",
      "Faith and Victory",
      "Living by Faith in Daily Life",
    ],
    keyThemes: [
      "Biblical definition of faith",
      "Faith vs. sight-based living",
      "Spiritual warfare and victory",
      "Trials and testing of faith",
      "Faith as foundation for salvation",
      "Practical faith application",
      "Overcoming through faith",
    ],
    isbn: "978-1-234567-90-6",
    publisher: "CAC Publications",
    category: "Faith & Prayer",
  },
}

export default function ViewBookPage({ params }: { params: { id: string } }) {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const bookId = Number.parseInt(params.id)
  const book = books[bookId as keyof typeof books]

  useEffect(() => {
    requireAuth()
  }, [isAuthenticated, isLoading])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-lg font-bold">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render admin content if not authenticated
  if (!isAuthenticated) {
    return null
  }

  if (!book) {
    notFound()
  }

  const handleDeleteBook = () => {
    // In a real app, this would delete from the database
    alert("Book deleted successfully!")
    // Redirect to admin panel
    window.location.href = "/admin"
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />
      <AdminHeader />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6 md:mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm md:text-base">Back to Admin</span>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2">VIEW BOOK</h1>
              <p className="text-sm md:text-lg text-gray-700">Book details and management</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/books/${book.id}/edit`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Book
                </Button>
              </Link>
              <Button
                onClick={() => setShowDeleteConfirm(true)}
                variant="outline"
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Cover Image */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-4 md:p-6">
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full max-w-[300px] mx-auto border-2 border-black shadow-lg mb-4"
                />

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.featured && (
                    <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      FEATURED
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded ${
                      book.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {book.status.toUpperCase()}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {book.hasPdf && (
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  )}
                  <Link href={`/books/${book.id}`}>
                    <Button variant="outline" className="w-full border-2 border-black hover:bg-gray-100 bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      View Public Page
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Book Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Basic Information</h2>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-600 mb-1">TITLE</label>
                    <p className="text-sm md:text-base font-medium">{book.title}</p>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-600 mb-1">AUTHOR</label>
                    <p className="text-sm md:text-base font-medium">{book.author}</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs md:text-sm font-bold text-gray-600 mb-1">SUBTITLE</label>
                    <p className="text-sm md:text-base font-medium">{book.subtitle}</p>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-600 mb-1">PAGES</label>
                    <p className="text-sm md:text-base font-medium">{book.pages}</p>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-600 mb-1">PUBLICATION YEAR</label>
                    <p className="text-sm md:text-base font-medium">{book.year}</p>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-600 mb-1">ISBN</label>
                    <p className="text-sm md:text-base font-medium">{book.isbn}</p>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-600 mb-1">CATEGORY</label>
                    <p className="text-sm md:text-base font-medium">{book.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Description</h2>
                <p className="text-sm md:text-base leading-relaxed text-gray-700">{book.description}</p>
              </CardContent>
            </Card>

            {/* Key Themes */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Key Themes</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {book.keyThemes.map((theme, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                      <span className="text-sm md:text-base text-gray-700">{theme}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Table of Contents */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Table of Contents</h2>
                <div className="space-y-3">
                  {book.tableOfContents.map((chapter, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded">
                      <div className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-sm md:text-base font-medium">{chapter}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-lg md:text-xl font-bold">{book.year}</div>
                    <div className="text-xs md:text-sm text-gray-600">Published</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-lg md:text-xl font-bold">{book.pages}</div>
                    <div className="text-xs md:text-sm text-gray-600">Pages</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Download className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-lg md:text-xl font-bold">{book.downloads}</div>
                    <div className="text-xs md:text-sm text-gray-600">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-lg md:text-xl font-bold">{book.reviewCount}</div>
                    <div className="text-xs md:text-sm text-gray-600">Reviews</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white border-2 border-black max-w-md w-full">
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-bold text-red-600">DELETE BOOK</h2>
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="outline"
                    className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                  >
                    ×
                  </Button>
                </div>

                <div className="mb-6">
                  <p className="text-sm md:text-base mb-3">
                    Are you sure you want to delete this book? This action cannot be undone.
                  </p>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="font-bold text-sm">{book.title}</p>
                    <p className="text-xs text-gray-600">{book.subtitle}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-black hover:bg-gray-100 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteBook}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
