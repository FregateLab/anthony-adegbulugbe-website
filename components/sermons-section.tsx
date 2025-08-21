"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock, Star } from "lucide-react"
import Link from "next/link"

const sermonThemes = [
  {
    id: "righteous-shall-live-by-faith",
    name: "The Righteous Shall Live by Faith",
    color: "bg-purple-100 text-purple-800",
    description:
      "A comprehensive exploration of living by faith, understanding what faith is, and experiencing the power of faith in our daily Christian walk.",
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
        id: 20,
        title: "FAITH WHEN WE FACE TRIALS",
        date: "July 5, 2020",
        duration: "48 min",
        summary:
          "Understanding God's purpose in trials and learning practical steps to take when facing challenges. Exploring how trials test and strengthen our faith.",
        keyPoints: ["God's purpose in trials", "Practical steps during trials", "The crown of life promise"],
        scripture: "James 1:1-12",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: true,
      },
      {
        id: 21,
        title: "WHAT IS FAITH?",
        date: "November 6, 2016",
        duration: "45 min",
        summary:
          "A foundational message defining biblical faith and distinguishing it from illusion, deception, or positive thinking. Faith as believing, trusting, and obeying God.",
        keyPoints: ["Biblical definition of faith", "Faith vs illusion", "Active and passive aspects of faith"],
        scripture: "Hebrews 11:1",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: true,
      },
      {
        id: 22,
        title: "THE RIGHTEOUS SHALL LIVE BY FAITH",
        date: "November 13, 2016",
        duration: "42 min",
        summary:
          "Exploring the famous biblical statement and its linkages to salvation and victory. Understanding why we should live by faith rather than sight.",
        keyPoints: ["Faith and salvation", "Faith and victory", "Right relationship with God"],
        scripture: "Habakkuk 2:4, Romans 1:17",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: true,
      },
      {
        id: 23,
        title: "DANGERS OF WALKING BY SIGHT",
        date: "November 20, 2016",
        duration: "50 min",
        summary:
          "Warning about the perils of depending solely on human senses. Using Abraham and Lot's story to illustrate the dangers of making decisions by sight alone.",
        keyPoints: ["Perils of walking by sight", "Abraham and Lot's story", "Human deception and Joshua"],
        scripture: "Genesis 13:1-18, Joshua 9",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: false,
      },
      {
        id: 24,
        title: "THE POWER OF FAITH",
        date: "November 27, 2016",
        duration: "46 min",
        summary:
          "Understanding the wonderful things faith can do - seeing the invisible, believing the incredible, and receiving the impossible from God.",
        keyPoints: ["Seeing the invisible", "Believing the incredible", "Receiving the impossible"],
        scripture: "Exodus 3:1-14, Hebrews 11:27",
        hasAudio: true,
        hasVideo: true,
        hasText: true,
        featured: false,
      },
    ],
    recentSermons: [
      {
        id: 20,
        title: "FAITH WHEN WE FACE TRIALS",
        date: "JULY 5, 2020",
        duration: "48 MIN",
        description:
          "Understanding God's purpose in trials and learning practical steps to take when facing life's challenges.",
        theme: "The Righteous Shall Live by Faith",
      },
      {
        id: 21,
        title: "WHAT IS FAITH?",
        date: "NOVEMBER 6, 2016",
        duration: "45 MIN",
        description:
          "A foundational message defining biblical faith and distinguishing it from mere positive thinking.",
        theme: "The Righteous Shall Live by Faith",
      },
      {
        id: 22,
        title: "THE RIGHTEOUS SHALL LIVE BY FAITH",
        date: "NOVEMBER 13, 2016",
        duration: "42 MIN",
        description:
          "Exploring the famous biblical statement and its vital linkages to salvation and victory in Christian life.",
        theme: "The Righteous Shall Live by Faith",
      },
    ],
  },
  {
    id: "journey-of-love",
    name: "Journey of Love",
    color: "bg-red-100 text-red-800",
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
    recentSermons: [
      {
        id: 9,
        title: "LOVING GOD MORE",
        date: "DECEMBER 30, 2018",
        duration: "50 MIN",
        description:
          "The final sermon in our Journey of Love series, exploring how we can deepen our love for God and express it in our daily lives.",
        theme: "Journey of Love",
      },
      {
        id: 8,
        title: "HE BECAME POOR SO THAT WE MAY BE RICH",
        date: "DECEMBER 25, 2018",
        duration: "35 MIN",
        description: "Understanding the sacrificial love of Christ and how His poverty became our spiritual wealth.",
        theme: "Journey of Love",
      },
      {
        id: 7,
        title: "CHRISTMAS REFLECTIONS ON THE LOVE OF GOD",
        date: "DECEMBER 24, 2018",
        duration: "38 MIN",
        description:
          "A special Christmas message reflecting on God's love demonstrated through the birth of Jesus Christ.",
        theme: "Journey of Love",
      },
    ],
  },
]

// Get the most recent sermons across all themes - prioritizing "The Righteous Shall Live by Faith" theme
const recentSermons = [
  // First, get sermons from "The Righteous Shall Live by Faith" theme
  ...(sermonThemes
    .find((theme) => theme.id === "righteous-shall-live-by-faith")
    ?.recentSermons.map((sermon) => ({
      ...sermon,
      themeColor: "bg-purple-100 text-purple-800",
    })) || []),
  // Then add other themes' sermons
  ...sermonThemes
    .filter((theme) => theme.id !== "righteous-shall-live-by-faith")
    .flatMap((theme) => theme.recentSermons.map((sermon) => ({ ...sermon, themeColor: theme.color }))),
].slice(0, 6)

export function SermonsSection() {
  const [showCollectionModal, setShowCollectionModal] = useState(false)
  const [selectedThemeForModal, setSelectedThemeForModal] = useState<any>(null)

  const handleExploreTheme = (theme: any) => {
    setSelectedThemeForModal(theme)
    setShowCollectionModal(true)
  }

  return (
      <section id="sermons" className="mt-16">
        <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">RECENT SERMONS</h2>
          <Link
            href="/sermons"
            className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold hover:text-red-600 transition-colors"
          >
            ALL SERMONS
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
  
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {recentSermons.slice(0, 3).map((sermon) => (
              <div key={sermon.id} className="border-2 border-black bg-white p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sermon.themeColor}`}>{sermon.theme}</span>
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2">{sermon.title}</h3>
                <div className="text-xs md:text-sm text-gray-600 mb-4">
                  <div>{sermon.date}</div>
                  <div>{sermon.duration}</div>
                </div>
                <p className="text-xs md:text-sm mb-4 text-gray-700">{sermon.description}</p>
                <Link href={`/sermons/${sermon.id}`}>
                  <Button variant="outline" className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent">
                    READ
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
  
        {/* Mobile */}
        <div className="block md:hidden">
          <div className="space-y-4">
            {recentSermons.slice(0, 3).map((sermon) => (
              <div key={sermon.id} className="border-2 border-black bg-white p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sermon.themeColor}`}>{sermon.theme}</span>
                </div>
                <h3 className="font-bold text-base mb-2">{sermon.title}</h3>
                <div className="text-xs text-gray-600 mb-3">
                  <div>{sermon.date}</div>
                  <div>{sermon.duration}</div>
                </div>
                <p className="text-xs text-gray-700 mb-4">{sermon.description}</p>
                <Link href={`/sermons/${sermon.id}`}>
                  <Button variant="outline" className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent">
                    READ
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
  
        {/* Themes Overview */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <h3 className="text-xl sm:text-2xl font-bold mb-6">EXPLORE BY THEME</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sermonThemes.map((theme) => (
              <div key={theme.name} className="border-2 border-black bg-white p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${theme.color}`}>
                    {theme.sermons.length} Sermon{theme.sermons.length !== 1 ? "s" : ""}{theme.book && " • 1 Book"}
                  </span>
                </div>
                <h4 className="font-bold text-lg sm:text-xl mb-3">{theme.name}</h4>
                <div className="space-y-2 mb-4">
                  {theme.recentSermons.slice(0, 2).map((sermon) => (
                    <div key={sermon.id} className="text-xs sm:text-sm text-gray-600">
                      • {sermon.title}
                    </div>
                  ))}
                  {theme.sermons.length > 2 && (
                    <div className="text-xs sm:text-sm text-gray-500">+ {theme.sermons.length - 2} more sermons</div>
                  )}
                </div>
                <Button onClick={() => handleExploreTheme(theme)} variant="outline" className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent">
                  EXPLORE THEME
                </Button>
              </div>
            ))}
          </div>
        </div>

      {/* Collection Modal */}
      {showCollectionModal && selectedThemeForModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">{selectedThemeForModal.name.toUpperCase()} COLLECTION</h3>
                <Button
                  onClick={() => setShowCollectionModal(false)}
                  variant="outline"
                  className="border-2 border-black hover:bg-gray-100"
                >
                  ✕
                </Button>
              </div>

              <p className="text-gray-700 mb-8">{selectedThemeForModal.description}</p>

              {/* Associated Book */}
              {selectedThemeForModal.book && (
                <div className="mb-8 p-6 bg-gray-50 border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-red-600" />
                    <h4 className="text-lg font-bold">ASSOCIATED BOOK</h4>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                      <img
                        src={selectedThemeForModal.book.cover || "/placeholder.svg"}
                        alt={selectedThemeForModal.book.title}
                        className="w-full max-w-[150px] mx-auto border-2 border-black"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <h5 className="text-xl font-bold mb-1">{selectedThemeForModal.book.title}</h5>
                      <p className="text-gray-600 mb-3">{selectedThemeForModal.book.subtitle}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{selectedThemeForModal.book.rating}</span>
                          <span>({selectedThemeForModal.book.reviews} reviews)</span>
                        </div>
                        <span>{selectedThemeForModal.book.pages} pages</span>
                        <span>{selectedThemeForModal.book.year}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <Link href={`/books/${selectedThemeForModal.book.id}`}>
                          <Button
                            className="bg-red-600 hover:bg-red-700 text-white"
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
                <h4 className="text-lg font-bold mb-4 border-b-2 border-black pb-2">
                  SERMONS IN THIS COLLECTION ({selectedThemeForModal.sermons.length})
                </h4>

                <div className="grid md:grid-cols-2 gap-4">
                  {selectedThemeForModal.sermons.map((sermon: any, index: number) => (
                    <div
                      key={sermon.id}
                      className="border-2 border-gray-300 bg-white hover:bg-gray-50 transition-colors p-4 cursor-pointer"
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

                      <h5 className="font-bold text-sm mb-2 leading-tight">{sermon.title}</h5>

                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
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
    </section>
  )
}
