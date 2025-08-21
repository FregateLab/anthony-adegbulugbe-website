"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Download, Eye, Calendar, BookOpen, Users, Quote } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Book data
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
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment:
          "This book transformed my understanding of God's love. Pastor Anthony's insights into the advent season are profound and life-changing.",
        date: "December 2023",
      },
      {
        name: "Michael Chen",
        rating: 5,
        comment:
          "A beautiful exploration of divine love. Each chapter builds upon the last, creating a comprehensive understanding of God's heart.",
        date: "November 2023",
      },
      {
        name: "Grace Okafor",
        rating: 4,
        comment:
          "Deeply spiritual and practical. The way Pastor Anthony explains the dimensions of God's love is both scholarly and accessible.",
        date: "October 2023",
      },
    ],
    quotes: [
      "God's love is not just an emotion; it is His very nature and the foundation of our existence.",
      "In the advent season, we discover that God's love is both extraordinary and intimate.",
      "The journey of love begins with understanding that we are beloved children of the Most High.",
    ],
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
    reviews: [
      {
        name: "David Adebayo",
        rating: 5,
        comment:
          "This book completely changed how I understand faith. Pastor Anthony's teaching is both deep and practical, helping me apply biblical principles to daily life.",
        date: "January 2024",
      },
      {
        name: "Ruth Emeka",
        rating: 5,
        comment:
          "A masterpiece on faith! The chapter on 'Dangers of Walking by Sight' was particularly eye-opening. Highly recommended for every believer.",
        date: "December 2023",
      },
      {
        name: "James Okonkwo",
        rating: 4,
        comment:
          "Solid biblical foundation with practical applications. The illustrations from Abraham and Lot really brought the concepts to life.",
        date: "November 2023",
      },
    ],
    quotes: [
      "Faith sees the invisible, believes the incredible, and receives the impossible.",
      "The righteous person who has the right relationship with God is the person who is truly living.",
      "Walking by sight may provide immediate advantage, but such gains are always transient and short-lived.",
    ],
  },
}

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const bookId = Number.parseInt(params.id)
  const book = books[bookId as keyof typeof books]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!book) {
    notFound()
  }

  const otherBooks = Object.values(books).filter((b) => b.id !== book.id)

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        {/* Book Header */}
        <div className="border-2 border-black bg-white p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <img
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                className="w-full max-w-[300px] mx-auto border-2 border-black shadow-lg"
              />
            </div>

            {/* Book Details */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold">FREE BOOK</span>
                <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold">FEATURED</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{book.subtitle}</p>
              <p className="text-lg text-gray-700 mb-6">by {book.author}</p>

              {/* Rating and Stats */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold">{book.rating}</span>
                  <span className="text-gray-600">({book.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{book.pages} pages</span>
                  <span>{book.year}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-8 leading-relaxed">{book.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {book.hasPdf && (
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    DOWNLOAD PDF
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="border-2 border-black hover:bg-gray-100 px-8 py-3 flex items-center gap-2 bg-transparent"
                >
                  <Eye className="w-4 h-4" />
                  READ ONLINE
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-2 border-black bg-white mb-8">
          <div className="border-b-2 border-black">
            <div className="flex flex-wrap">
              {[
                { id: "overview", label: "OVERVIEW" },
                { id: "contents", label: "TABLE OF CONTENTS" },
                { id: "reviews", label: "REVIEWS" },
                { id: "quotes", label: "INSPIRING QUOTES" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-bold text-sm border-r-2 border-black hover:bg-gray-100 ${
                    activeTab === tab.id ? "bg-red-600 text-white" : ""
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-red-600" />
                    ABOUT THIS BOOK
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{book.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">KEY THEMES COVERED</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {book.keyThemes.map((theme, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-gray-700">{theme}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t-2 border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold">{book.year}</div>
                    <div className="text-sm text-gray-600">Published</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold">{book.pages}</div>
                    <div className="text-sm text-gray-600">Pages</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold">{book.reviewCount}</div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                </div>
              </div>
            )}

            {/* Table of Contents Tab */}
            {activeTab === "contents" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">TABLE OF CONTENTS</h3>
                <div className="space-y-4">
                  {book.tableOfContents.map((chapter, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border-2 border-gray-200 hover:bg-gray-50">
                      <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{chapter}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">READER REVIEWS</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold">{book.rating} out of 5</span>
                    <span className="text-gray-600">({book.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {book.reviews.map((review, index) => (
                    <Card key={index} className="border-2 border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-bold">{review.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Quotes Tab */}
            {activeTab === "quotes" && (
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Quote className="w-6 h-6 text-red-600" />
                  INSPIRING QUOTES
                </h3>
                <div className="space-y-6">
                  {book.quotes.map((quote, index) => (
                    <Card key={index} className="border-2 border-gray-200 bg-gray-50">
                      <CardContent className="p-8">
                        <Quote className="w-8 h-8 text-red-600 mb-4" />
                        <blockquote className="text-xl italic text-gray-800 leading-relaxed mb-4">"{quote}"</blockquote>
                        <cite className="text-gray-600 font-medium">— {book.author}</cite>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other Books */}
        {otherBooks.length > 0 && (
          <div className="border-2 border-black bg-white p-8">
            <h3 className="text-2xl font-bold mb-6">OTHER BOOKS BY {book.author.toUpperCase()}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherBooks.map((otherBook) => (
                <Card key={otherBook.id} className="border-2 border-gray-300 hover:bg-gray-50 transition-colors">
                  <CardContent className="p-6">
                    <img
                      src={otherBook.cover || "/placeholder.svg"}
                      alt={otherBook.title}
                      className="w-full max-w-[150px] mx-auto mb-4 border-2 border-black"
                    />
                    <h4 className="font-bold text-lg mb-2">{otherBook.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{otherBook.subtitle}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(otherBook.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold">{otherBook.rating}</span>
                    </div>
                    <Link href={`/books/${otherBook.id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent"
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
