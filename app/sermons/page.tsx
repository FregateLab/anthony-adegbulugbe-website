"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Search, Filter, Bell, BookOpen, Star } from "lucide-react"
import Link from "next/link"

// Themes with associated books and sermons
const themes = [
  {
    id: "righteous-shall-live-by-faith",
    title: "The Righteous Shall Live by Faith",
    description:
      "A comprehensive study on the biblical foundation of faith, exploring what it means to live by faith rather than by sight. This series examines the power of faith, the dangers of walking by sight, and practical steps for developing a faith-centered life.",
    book: {
      id: 2,
      title: "The Righteous Shall Live by Faith",
      subtitle: "A Biblical Foundation for Faith-Centered Living",
      author: "Pastor Anthony Adegbulugbe",
      rating: 4.9,
      reviews: 89,
      price: 0,
      pages: 156,
      year: 2020,
      cover: "/images/righteous-shall-live-by-faith-cover.jpg",
    },
    sermons: [
      {
        id: 10,
        title: "FAITH WHEN WE FACE TRIALS",
        date: "July 5, 2020",
        duration: "48 min",
        summary:
          "Understanding God's purpose in trials and how to maintain faith during difficult times. Learn three practical steps to take when facing trials: seeking wisdom, prayer, and unwavering faith in God's promises.",
        keyPoints: [
          "God's purpose in trials is to test and strengthen our faith",
          "Three practical steps: wisdom, prayer, and faith",
          "The promise of the crown of life for those who persevere",
        ],
        scripture: "James 1:1-12",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: true,
      },
      {
        id: 11,
        title: "WHAT IS FAITH?",
        date: "November 6, 2016",
        duration: "42 min",
        summary:
          "A foundational message defining biblical faith and distinguishing it from illusion, deception, or positive thinking. Faith is defined as BTO - Believe, Trust, and Obey God's word and promises.",
        keyPoints: [
          "Biblical definition of faith from Hebrews 11:1",
          "Faith has both passive (belief) and active (action) components",
          "Faith is anchored on God's word and promises, not human desires",
        ],
        scripture: "Hebrews 11:1",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: true,
      },
      {
        id: 12,
        title: "THE RIGHTEOUS SHALL LIVE BY FAITH",
        date: "November 13, 2016",
        duration: "45 min",
        summary:
          "Exploring the meaning of this foundational biblical phrase and its two important linkages: Faith and Salvation, and Faith and Victory. Understanding why we must live by faith rather than fear and doubt.",
        keyPoints: [
          "The righteous person has right relationship with God through faith",
          "Faith is necessary for salvation - we are saved by grace through faith",
          "Faith brings victory over the world and spiritual enemies",
        ],
        scripture: "Habakkuk 2:4; Romans 1:17; Galatians 3:11",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: true,
      },
      {
        id: 13,
        title: "DANGERS OF WALKING BY SIGHT",
        date: "November 20, 2016",
        duration: "50 min",
        summary:
          "Warning about the perils of living by sight rather than faith, using the story of Abraham and Lot to illustrate how walking by sight leads to disaster and deception.",
        keyPoints: [
          "Walking by sight makes us carnal rather than spiritual beings",
          "Lot's choice based on sight led to disaster in Sodom",
          "Dependence on human senses makes us vulnerable to deception",
        ],
        scripture: "Genesis 13:1-18; Joshua 9",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: false,
      },
      {
        id: 14,
        title: "THE POWER OF FAITH",
        date: "November 27, 2016",
        duration: "46 min",
        summary:
          "Exploring the wonderful things faith can do in our lives through three dimensions: seeing the invisible, believing the incredible, and receiving the impossible from God.",
        keyPoints: [
          "Faith sees the invisible - removes fear and gives spiritual vision",
          "Faith believes the incredible - enables us to take the first step",
          "Faith receives the impossible - turns impossible to difficult to done",
        ],
        scripture: "Exodus 3:1-14; Hebrews 11:27",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: false,
      },
    ],
  },
  {
    id: "journey-of-love",
    title: "Journey of Love",
    description:
      "A comprehensive exploration of God's love through the advent season, examining salvation, redemption, and adoption into God's family.",
    book: {
      id: 1,
      title: "Journey of Love",
      subtitle: "Understanding God's Heart in the Advent Season",
      author: "Pastor Anthony Adegbulugbe",
      rating: 4.8,
      reviews: 127,
      price: 0,
      pages: 180,
      year: 2018,
      cover: "/placeholder.svg?height=300&width=200&text=Journey+of+Love",
    },
    sermons: [
      {
        id: 1,
        title: "HIS BANNER OVER US IS LOVE",
        date: "July 1, 2017",
        duration: "30 min",
        summary:
          "The divinely inspired theme introducing God's love as our banner of protection and blessing. God brings us to His banqueting house where His banner of love provides security and announces us as His beloved children.",
        keyPoints: ["God's banner of love over us", "Divine protection and security", "Promises of blessing and favor"],
        scripture: "Song of Solomon 2:4",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: true,
      },
      {
        id: 2,
        title: "DIMENSIONS OF THE LOVE OF GOD",
        date: "July 2, 2017",
        duration: "42 min",
        summary:
          "Exploring six dimensions of God's love through John 3:16 - extraordinary, extensive, expensive, embracing, exclusive, and eternal love that transforms lives like Nicodemus.",
        keyPoints: [
          "Six dimensions of divine love",
          "God's love is extraordinary and extensive",
          "Expensive, embracing, exclusive, and eternal",
        ],
        scripture: "John 3:1-16",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: true,
      },
      {
        id: 3,
        title: "UNBREAKABLE CHORD OF DIVINE LOVE",
        date: "July 16, 2017",
        duration: "45 min",
        summary:
          "Understanding how God's love creates an unbreakable bond with us, unlike human love that can be broken. Through the parable of the prodigal son, we see that nothing can separate us from God's love.",
        keyPoints: [
          "Divine vs human love",
          "Nothing can separate us from God's love",
          "Our imperfections cannot break the divine chord",
        ],
        scripture: "Luke 15:11-32; Romans 8:38-39",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: true,
      },
      {
        id: 4,
        title: "INTRODUCTION: JOURNEY OF LOVE",
        date: "December 1, 2018",
        duration: "35 min",
        summary:
          "An invitation to join God's epic journey of love that began over two thousand years ago, exploring the themes of hope, peace, joy, and love in the advent season.",
        keyPoints: [
          "Advent season themes",
          "God's invitation to love",
          "Promises of salvation, redemption, and adoption",
        ],
        scripture: "John 3:16; 1 John 4:9",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: false,
      },
      {
        id: 5,
        title: "THE LOVE OF GOD: PART 1",
        date: "December 2, 2018",
        duration: "45 min",
        summary:
          "Understanding the biblical foundation of God's love - exploring why God is qualified to invite us on this journey and the characteristics of His unchanging love.",
        keyPoints: ["God is love", "Characteristics of divine love", "God's love demonstrated through Christ"],
        scripture: "1 John 4:7-21",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: false,
      },
      {
        id: 6,
        title: "BENEFITS OF THE LOVE OF GOD",
        date: "December 9, 2018",
        duration: "48 min",
        summary:
          "Exploring the tangible benefits of God's love including salvation, redemption, forgiveness, and adoption into God's family. Understanding what it means to be co-heirs with Christ.",
        keyPoints: ["Salvation through God's love", "Redemption and forgiveness of sin", "Adoption into God's family"],
        scripture: "1 John 3:1-11",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: false,
      },
      {
        id: 7,
        title: "CHRISTMAS REFLECTIONS ON THE LOVE OF GOD",
        date: "December 24, 2018",
        duration: "38 min",
        summary:
          "Christmas Eve reflections on how God's love was manifested through the incarnation of Jesus Christ and its implications for believers today.",
        keyPoints: ["Christmas and incarnation", "God's love in action", "From darkness to light"],
        scripture: "John 3:16; 1 John 4:9",
        hasAudio: true,
        hasVideo: false,
        hasText: true,
        featured: false,
      },
      {
        id: 8,
        title: "HE BECAME POOR SO THAT WE MAY BE RICH",
        date: "December 25, 2018",
        duration: "35 min",
        summary:
          "Christmas Day message exploring the incarnation - what it cost Jesus to become human and the seven spiritual riches we receive through His poverty including salvation, eternal life, and adoption.",
        keyPoints: [
          "Cost of incarnation for Jesus",
          "Seven benefits of Christ's poverty",
          "True spiritual riches vs material wealth",
        ],
        scripture: "2 Corinthians 8:1-9",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: false,
      },
      {
        id: 9,
        title: "LOVING GOD MORE",
        date: "December 30, 2018",
        duration: "50 min",
        summary:
          "The final message in the Journey of Love series, exploring our responsibility to love God in return and practical ways to grow in our love for Him through the Holy Spirit, prayer, and fellowship.",
        keyPoints: [
          "Our responsibility to love God",
          "How to grow in love for God",
          "Role of Holy Spirit in loving God",
        ],
        scripture: "Matthew 22:34-40",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: false,
      },
    ],
  },
]

export default function SermonsPage() {
  const [selectedTheme, setSelectedTheme] = useState("All Themes")
  const [searchTerm, setSearchTerm] = useState("")
  const [showSubscribeModal, setShowSubscribeModal] = useState(false)
  const [showCollectionModal, setShowCollectionModal] = useState(false)
  const [selectedThemeForModal, setSelectedThemeForModal] = useState<any>(null)

  // Get the most recent sermon with video
  const allSermons = themes.flatMap((theme) => theme.sermons)
  const mostRecentVideoSermon = allSermons.find((sermon) => sermon.hasVideo) || allSermons[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredThemes = themes.filter((theme) => {
    if (selectedTheme !== "All Themes" && theme.title !== selectedTheme) return false

    if (searchTerm) {
      const matchesTheme =
        theme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        theme.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSermons = theme.sermons.some(
        (sermon) =>
          sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sermon.summary.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      const matchesBook =
        theme.book &&
        (theme.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          theme.book.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesTheme || matchesSermons || matchesBook
    }

    return true
  })

  const featuredSermons = allSermons.filter((sermon) => sermon.featured)
  const themeOptions = ["All Themes", ...themes.map((theme) => theme.title)]

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12">
        {/* Featured Sermon */}
        <section className="mb-12 sm:mb-16">
          <div className="border-2 border-black bg-white overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <span className="bg-red-600 text-white px-2 sm:px-3 py-1 text-xs font-bold">LATEST SERMON</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium">
                  {themes.find((theme) => theme.sermons.some((s) => s.id === mostRecentVideoSermon.id))?.title}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">{mostRecentVideoSermon.title}</h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {mostRecentVideoSermon.date}
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  {mostRecentVideoSermon.duration}
                </div>
                <div className="flex gap-1 sm:gap-2">
                  {mostRecentVideoSermon.hasAudio && (
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-600 rounded-full" title="Audio Available"></div>
                  )}
                  {mostRecentVideoSermon.hasText && (
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full" title="Text Available"></div>
                  )}
                </div>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">{mostRecentVideoSermon.summary}</p>

              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm font-bold mb-2">KEY POINTS:</p>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                  {mostRecentVideoSermon.keyPoints.map((point, index) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 sm:mb-8">
                <p className="text-xs sm:text-sm font-bold mb-2">SCRIPTURE REFERENCE:</p>
                <p className="text-xs sm:text-sm text-gray-600">{mostRecentVideoSermon.scripture}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href={`/sermons/${mostRecentVideoSermon.id}`} className="w-full sm:w-auto">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">VIEW FULL SERMON</Button>
                </Link>
                <Button
                  onClick={() => {
                    const theme = themes.find((theme) => theme.sermons.some((s) => s.id === mostRecentVideoSermon.id))
                    setSelectedThemeForModal(theme)
                    setShowCollectionModal(true)
                  }}
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-black hover:bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                >
                  VIEW COLLECTION
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <div className="border-2 border-black bg-white p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Search */}
            <div>
              <label className="block text-xs sm:text-sm font-bold mb-2">SEARCH THEMES & SERMONS</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by theme, sermon title, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Theme Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-bold mb-2">FILTER BY THEME</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none text-sm sm:text-base"
                >
                  {themeOptions.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Themes Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {selectedTheme === "All Themes" ? "SERMON THEMES" : selectedTheme.toUpperCase()}
            </h2>
            <span className="text-xs sm:text-sm text-gray-600">
              {filteredThemes.length} theme{filteredThemes.length !== 1 ? "s" : ""} found
            </span>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {filteredThemes.map((theme) => (
              <div key={theme.id} className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
                {/* Theme Header */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{theme.title}</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">{theme.description}</p>
                </div>

                {/* Associated Book (if exists) */}
                {theme.book && (
                  <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 border-2 border-gray-200">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                      <h4 className="text-base sm:text-lg font-bold">ASSOCIATED BOOK</h4>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 sm:gap-6">
                      <div className="md:col-span-1">
                        <img
                          src={theme.book.cover || "/placeholder.svg"}
                          alt={theme.book.title}
                          className="w-full max-w-[150px] sm:max-w-[200px] mx-auto border-2 border-black"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold">FEATURED</span>
                        </div>

                        <h5 className="text-lg sm:text-xl font-bold mb-1">{theme.book.title}</h5>
                        <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">{theme.book.subtitle}</p>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold">{theme.book.rating}</span>
                            <span>({theme.book.reviews} reviews)</span>
                          </div>
                          <span>{theme.book.pages} pages</span>
                          <span>{theme.book.year}</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <Link href={`/books/${theme.book.id}`}>
                            <Button className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base px-3 sm:px-4 py-2">VIEW BOOK</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Theme Sermons */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 border-b-2 border-black pb-2">
                    SERMONS IN THIS THEME ({theme.sermons.length})
                  </h4>

                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {theme.sermons.map((sermon) => (
                      <Card
                        key={sermon.id}
                        className="border-2 border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start justify-between mb-2 sm:mb-3">
                            {sermon.featured && (
                              <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold">FEATURED</span>
                            )}
                            <div className="flex gap-1 ml-auto">
                              {sermon.hasAudio && (
                                <div className="w-2 h-2 bg-green-600 rounded-full" title="Audio Available"></div>
                              )}
                              {sermon.hasVideo && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full" title="Video Available"></div>
                              )}
                              {sermon.hasText && (
                                <div className="w-2 h-2 bg-gray-600 rounded-full" title="Text Available"></div>
                              )}
                            </div>
                          </div>

                          <h5 className="font-bold text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 leading-tight">{sermon.title}</h5>

                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-600 mb-2 sm:mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {sermon.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {sermon.duration}
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 line-clamp-3">{sermon.summary}</p>

                          <div className="mb-3 sm:mb-4">
                            <p className="text-xs font-bold mb-1">SCRIPTURE:</p>
                            <p className="text-xs text-gray-600">{sermon.scripture}</p>
                          </div>

                          <Link href={`/sermons/${sermon.id}`}>
                            <Button
                              variant="outline"
                              className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent text-xs sm:text-sm"
                            >
                              VIEW SERMON
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredThemes.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">No themes found matching your search criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedTheme("All Themes")
                }}
                variant="outline"
                className="border-2 border-black hover:bg-red-600 hover:text-white text-sm sm:text-base px-4 py-2"
              >
                CLEAR FILTERS
              </Button>
            </div>
          )}
        </section>

        {/* Subscribe Section */}
        <div className="border-2 border-black bg-white p-4 sm:p-6 mt-12 sm:mt-16 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-3 sm:mb-4">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            <h2 className="text-lg sm:text-2xl font-bold">NEVER MISS A SERMON</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 max-w-2xl mx-auto">
            Subscribe to receive early notifications when new sermons are published. Stay connected with fresh biblical
            teaching and pastoral insights.
          </p>
          <Button
            onClick={() => setShowSubscribeModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-8 py-2 text-sm sm:text-base"
          >
            SUBSCRIBE FOR NOTIFICATIONS
          </Button>
        </div>
      </main>

      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black p-4 sm:p-6 lg:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">SUBSCRIBE TO SERMON NOTIFICATIONS</h3>
            <p className="text-xs sm:text-sm text-gray-700 mb-4 sm:mb-6">
              Get notified when new sermons are published. Join our community of believers staying connected to God's
              Word.
            </p>

            <form className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2">FULL NAME *</label>
                <input
                  type="text"
                  required
                  className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2">PREFERRED THEMES</label>
                <div className="space-y-2 text-xs sm:text-sm max-h-32 overflow-y-auto">
                  {themes.map((theme) => (
                    <label key={theme.id} className="flex items-center gap-2">
                      <input type="checkbox" className="w-3 h-3 sm:w-4 sm:h-4" />
                      {theme.title}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base py-2">
                  SUBSCRIBE
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSubscribeModal(false)}
                  className="flex-1 border-2 border-black hover:bg-gray-100 text-sm sm:text-base py-2"
                >
                  CANCEL
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Collection Modal */}
      {showCollectionModal && selectedThemeForModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-2xl font-bold">{selectedThemeForModal.title.toUpperCase()} COLLECTION</h3>
                <Button
                  onClick={() => setShowCollectionModal(false)}
                  variant="outline"
                  className="border-2 border-black hover:bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base"
                >
                  ✕
                </Button>
              </div>

              <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8">{selectedThemeForModal.description}</p>

              {/* Associated Book */}
              {selectedThemeForModal.book && (
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                    <h4 className="text-base sm:text-lg font-bold">ASSOCIATED BOOK</h4>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 sm:gap-6">
                    <div className="md:col-span-1">
                      <img
                        src={selectedThemeForModal.book.cover || "/placeholder.svg"}
                        alt={selectedThemeForModal.book.title}
                        className="w-full max-w-[120px] sm:max-w-[150px] mx-auto border-2 border-black"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <h5 className="text-lg sm:text-xl font-bold mb-1">{selectedThemeForModal.book.title}</h5>
                      <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">{selectedThemeForModal.book.subtitle}</p>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{selectedThemeForModal.book.rating}</span>
                          <span>({selectedThemeForModal.book.reviews} reviews)</span>
                        </div>
                        <span>{selectedThemeForModal.book.pages} pages</span>
                        <span>{selectedThemeForModal.book.year}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <Link href={`/books/${selectedThemeForModal.book.id}`}>
                          <Button
                            className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base px-3 sm:px-4 py-2"
                            onClick={() => setShowCollectionModal(false)}
                          >
                            VIEW BOOK
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sermons in Collection */}
              <div>
                <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 border-b-2 border-black pb-2">
                  SERMONS IN THIS COLLECTION ({selectedThemeForModal.sermons.length})
                </h4>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {selectedThemeForModal.sermons.map((sermon, index) => (
                    <div
                      key={sermon.id}
                      className="border-2 border-gray-300 bg-white hover:bg-gray-50 transition-colors p-3 sm:p-4 cursor-pointer"
                      onClick={() => {
                        setShowCollectionModal(false)
                        window.location.href = `/sermons/${sermon.id}`
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium">
                          Part {index + 1}
                        </span>
                        <div className="flex gap-1">
                          {sermon.hasAudio && (
                            <div className="w-2 h-2 bg-green-600 rounded-full" title="Audio Available"></div>
                          )}
                          {sermon.hasVideo && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" title="Video Available"></div>
                          )}
                          {sermon.hasText && (
                            <div className="w-2 h-2 bg-gray-600 rounded-full" title="Text Available"></div>
                          )}
                        </div>
                      </div>

                      <h5 className="font-bold text-xs sm:text-sm mb-2 leading-tight">{sermon.title}</h5>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {sermon.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {sermon.duration}
                        </div>
                      </div>

                      <p className="text-xs text-gray-700 mb-2 line-clamp-2">{sermon.summary}</p>

                      <div className="text-xs">
                        <span className="font-bold">Scripture:</span> {sermon.scripture}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
