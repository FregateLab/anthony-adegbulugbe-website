"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Download, Eye, Star, Calendar, User, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const book = {
  id: 2,
  title: "THE RIGHTEOUS SHALL LIVE BY FAITH",
  subtitle: "Messages on Faith and Righteous Living",
  author: "Pst. (Prof.) Anthony Olusegun Adegbulugbe",
  category: "Spiritual Growth",
  year: "2025",
  date: "2025-01-01",
  description:
    "A comprehensive exploration of faith through biblical messages on righteous living and spiritual growth. This book contains powerful sermons that define faith, explore its necessity for salvation and victory, warn against the dangers of walking by sight, and reveal the incredible power available through faith in God.",
  pages: 105,
  isbn: "978-0-123456-79-6",
  publisher: "CAC Publications",
  rating: 4.8,
  reviews: 89,
  featured: true,
  formats: ["Hardcover", "Paperback", "PDF", "Audiobook"],
  coverImage: "/images/righteous-shall-live-by-faith-cover.jpg",
  tableOfContents: [
    "Dedication",
    "Contents",
    "1. What is Faith?",
    "2. The Righteous Shall Live by Faith",
    "3. Dangers of Walking by Sight",
    "4. The Power of Faith",
    "5. Faith When We Face Trials",
    "6. Biblical Examples of Faith",
    "7. Living by Faith Daily",
    "8. Faith and Victory",
    "9. Conclusion: A Life of Faith",
  ],
  keyThemes: [
    "Biblical Definition of Faith",
    "Faith and Salvation",
    "Faith and Victory",
    "Dangers of Walking by Sight",
    "Power of Faith",
    "Faith in Trials",
    "Righteous Living",
    "Trust and Obedience",
  ],
  excerpt:
    "Faith can simply be defined as BTO (Believe, Trust and Obey). We have to believe that God exists and that he loves us. This is why He sent his only begotten Son, Jesus Christ, who is our LORD and Saviour. We have to personally and fully rely on the death of Christ as the only sacrifice we need to atone for our sins.",
}

export default function BooksPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">BOOKS</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore profound spiritual insights through the written word. Each book is rooted in Scripture and decades
            of ministry experience.
          </p>
        </div>

        {/* Featured Book Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b-2 border-black pb-4">FEATURED BOOK</h2>

          <Card className="border-2 border-black bg-white">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Book Cover */}
                <div className="text-center">
                  <div className="w-full max-w-sm mx-auto h-96 bg-black border-2 border-black overflow-hidden mb-6">
                    <Image
                      src={book.coverImage || "/placeholder.svg"}
                      alt={book.title}
                      width={350}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex justify-center gap-2 mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold">FEATURED</span>
                    <span className="bg-green-600 text-white px-3 py-1 text-sm font-bold">NEW RELEASE</span>
                  </div>

                  <div className="flex justify-center gap-3">
                    <Link href={`/books/${book.id}`}>
                      <Button variant="outline" className="border-2 border-black hover:bg-gray-100 bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        VIEW DETAILS
                      </Button>
                    </Link>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      DOWNLOAD
                    </Button>
                  </div>
                </div>

                {/* Book Details */}
                <div>
                  <h3 className="text-3xl font-bold mb-2">{book.title}</h3>
                  <p className="text-lg text-gray-600 mb-4">{book.subtitle}</p>
                  <p className="text-lg font-medium mb-4">by {book.author}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {book.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {book.pages} pages
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(book.rating)}
                      <span className="ml-1">({book.reviews} reviews)</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{book.description}</p>

                  <div className="mb-6">
                    <h4 className="font-bold mb-3">KEY THEMES:</h4>
                    <div className="flex flex-wrap gap-2">
                      {book.keyThemes.map((theme, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-3 py-1 text-sm border border-gray-300"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold mb-3">AVAILABLE FORMATS:</h4>
                    <div className="flex flex-wrap gap-2">
                      {book.formats.map((format, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 text-sm border border-blue-300"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">ISBN:</span> {book.isbn}
                      </div>
                      <div>
                        <span className="font-medium">Publisher:</span> {book.publisher}
                      </div>
                      <div>
                        <span className="font-medium">Category:</span> {book.category}
                      </div>
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
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b-2 border-black pb-4">BOOK PREVIEW</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Table of Contents */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  TABLE OF CONTENTS
                </h3>
                <div className="space-y-2">
                  {book.tableOfContents.map((chapter, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                    >
                      <span className="text-sm">{chapter}</span>
                      <span className="text-xs text-gray-500">
                        {index === 0 ? "ii" : index === 1 ? "iii" : index + 4}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Book Excerpt */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  BOOK EXCERPT
                </h3>
                <div className="bg-gray-50 p-4 border-l-4 border-red-600 mb-4">
                  <p className="text-sm italic leading-relaxed">{book.excerpt}</p>
                </div>
                <p className="text-xs text-gray-600">
                  This excerpt is from the introduction of "Journey of Love" where Pastor Anthony sets the stage for a
                  month-long exploration of God's divine love during the Advent season.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Author Bio */}
        <section className="border-2 border-black bg-white p-8">
          <div className="flex items-center gap-4 mb-6">
            <User className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold">ABOUT THE AUTHOR</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Pastor Anthony Olusegun Adegbulugbe</strong> is the Zonal Superintendent of Christ Apostolic
                Church, Nigeria and Overseas. With over four decades of ministry experience, he combines academic
                excellence with deep spiritual insight.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                He holds a First-Class B.Sc. in Electrical Engineering from University of Ife (now OAU) and a D.Sc. from
                MIT in Nuclear Materials Engineering. Currently serving as Chancellor of Joseph Ayo Babalola University,
                he brings both scholarly rigor and pastoral heart to his writings.
              </p>
              <p className="text-gray-700 leading-relaxed">
                "Journey of Love" represents his deep understanding of God's love, drawn from decades of faithful
                ministry and personal relationship with Christ. His messages combine biblical truth with practical
                application for modern Christian living.
              </p>
            </div>
            <div className="text-center lg:text-left">
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold mb-4">MINISTRY HIGHLIGHTS</h3>
                <div className="space-y-2 text-sm">
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
                    <span className="font-bold">Multiple</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Books Section */}
        <section className="mb-16 mt-16">
          <h2 className="text-3xl font-bold mb-8 border-b-2 border-black pb-4">OTHER BOOKS</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* New Published Book */}
            <Card className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <div className="w-full h-48 bg-black border-2 border-black overflow-hidden mb-3 relative">
                    <Image
                      src="/placeholder.svg?height=240&width=200&text=Journey+of+Love"
                      alt="Journey of Love"
                      width={200}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="font-bold text-sm mb-2 text-center leading-tight">JOURNEY OF LOVE</h3>
                <p className="text-xs text-gray-600 text-center mb-3">Messages on the Love of God</p>

                <div className="flex items-center justify-center gap-3 text-xs text-gray-600 mb-3">
                  <span>2025</span>
                  <span>•</span>
                  <span>91 pages</span>
                </div>

                <div className="flex gap-2">
                  <Link href="/books/1">
                    <Button
                      variant="outline"
                      className="flex-1 border-2 border-black hover:bg-gray-100 bg-transparent text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      VIEW
                    </Button>
                  </Link>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs">
                    <Download className="w-3 h-3 mr-1" />
                    DOWNLOAD
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon Book 1 */}
            <Card className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <div className="w-full h-48 bg-black border-2 border-black overflow-hidden mb-3 relative">
                    <Image
                      src="/placeholder.svg?height=240&width=200&text=Shepherding+God's+Flock"
                      alt="Shepherding God's Flock"
                      width={200}
                      height={240}
                      className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-yellow-500 text-black px-3 py-2 text-sm font-bold">COMING SOON</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-sm mb-2 text-center leading-tight">SHEPHERDING GOD'S FLOCK</h3>
                <p className="text-xs text-gray-600 text-center mb-3">Biblical Principles for Pastoral Ministry</p>

                <div className="flex items-center justify-center gap-3 text-xs text-gray-600 mb-3">
                  <span>Expected: 2025</span>
                  <span>•</span>
                  <span>284 pages</span>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-2 border-black hover:bg-gray-100 bg-transparent text-xs"
                  disabled
                >
                  COMING SOON
                </Button>
              </CardContent>
            </Card>

            {/* Coming Soon Book 2 */}
            <Card className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <div className="w-full h-48 bg-black border-2 border-black overflow-hidden mb-3 relative">
                    <Image
                      src="/placeholder.svg?height=240&width=200&text=The+Pastor's+Heart"
                      alt="The Pastor's Heart"
                      width={200}
                      height={240}
                      className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-yellow-500 text-black px-3 py-2 text-sm font-bold">COMING SOON</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-sm mb-2 text-center leading-tight">THE PASTOR'S HEART</h3>
                <p className="text-xs text-gray-600 text-center mb-3">Leadership in Christ Apostolic Church</p>

                <div className="flex items-center justify-center gap-3 text-xs text-gray-600 mb-3">
                  <span>Expected: 2025</span>
                  <span>•</span>
                  <span>156 pages</span>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-2 border-black hover:bg-gray-100 bg-transparent text-xs"
                  disabled
                >
                  COMING SOON
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
