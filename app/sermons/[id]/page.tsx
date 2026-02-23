"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  FileText,
  MessageCircle,
  Send,
} from "lucide-react"
import Link from "next/link"
import { publicApi, PublicSermon, RecentSermon, Comment } from "@/lib/api"

interface SermonNavigation {
  previous: RecentSermon | null
  next: RecentSermon | null
  themeSermons: RecentSermon[]
}

export default function SermonViewPage({ params }: { params: Promise<{ id: string }> }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loadingComments, setLoadingComments] = useState(true)
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sermon, setSermon] = useState<PublicSermon | null>(null)
  const [loading, setLoading] = useState(true)
  const [navigation, setNavigation] = useState<SermonNavigation>({
    previous: null,
    next: null,
    themeSermons: []
  })

  const resolvedParams = use(params)
  const sermonId = Number.parseInt(resolvedParams.id)

  // Fetch sermon and navigation data from API
  useEffect(() => {
    const fetchSermonData = async () => {
      try {
        // Fetch current sermon and all sermons in parallel
        const [sermonData, allSermons] = await Promise.all([
          publicApi.sermons.getById(sermonId),
          publicApi.sermons.getRecent(100)
        ])

        setSermon(sermonData)

        // Helper to parse date strings (handles formats like "DECEMBER 25, 2017")
        const parseSermonDate = (dateStr: string) => {
          const parsed = new Date(dateStr)
          return isNaN(parsed.getTime()) ? 0 : parsed.getTime()
        }

        // Sort sermons by date (ascending - oldest first)
        const sortedSermons = [...allSermons].sort((a, b) => {
          const dateA = parseSermonDate(a.date)
          const dateB = parseSermonDate(b.date)
          return dateA - dateB
        })

        console.log('All sermons:', allSermons.length, 'Current ID:', sermonId)
        console.log('Sorted sermons IDs:', sortedSermons.map(s => s.id))

        // Find current sermon index (compare as numbers to handle type mismatches)
        const currentIndex = sortedSermons.findIndex(s => Number(s.id) === Number(sermonId))
        console.log('Current index:', currentIndex, 'Total sermons:', sortedSermons.length)

        // Get previous and next sermons
        let previous = null
        let next = null

        if (currentIndex !== -1) {
          previous = currentIndex > 0 ? sortedSermons[currentIndex - 1] : null
          next = currentIndex < sortedSermons.length - 1 ? sortedSermons[currentIndex + 1] : null
          console.log('Previous:', previous?.id, previous?.title)
          console.log('Next:', next?.id, next?.title)
        } else {
          console.log('Sermon not found in list!')
        }

        // Get other sermons in the same theme (excluding current)
        const themeName = sermonData.theme?.name
        const themeSermons = themeName
          ? sortedSermons.filter(s => s.theme === themeName && Number(s.id) !== Number(sermonId)).slice(0, 4)
          : []

        setNavigation({ previous, next, themeSermons })
      } catch (error) {
        console.error("Failed to fetch sermon:", error)
        setSermon(null)
      } finally {
        setLoading(false)
      }
    }

    fetchSermonData()
  }, [sermonId])

  // Fetch comments from API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await publicApi.comments.getByEntity('sermon', sermonId)
        setComments([])
      } catch (error) {
        console.error("Failed to fetch comments:", error)
        setComments([])
      } finally {
        setLoadingComments(false)
      }
    }

    fetchComments()
  }, [sermonId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [resolvedParams.id])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-lg font-bold">Loading sermon...</p>
        </div>
      </div>
    )
  }

  if (!sermon) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Sermon Not Found</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">The sermon you're looking for doesn't exist.</p>
          <Link href="/sermons">
            <Button className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Back to Sermons
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sermon.title,
          text: sermon.summary,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleDownload = () => {
    if (sermon.pdf_url) {
      const pdfUrl = sermon.pdf_url.startsWith('http')
        ? sermon.pdf_url
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${sermon.pdf_url}`
      window.open(pdfUrl, '_blank')
    } else {
      alert("No PDF available for this sermon.")
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const createdComment = await publicApi.comments.create({
        entity_type: 'sermon',
        entity_id: sermonId,
        name: newComment.name,
        email: newComment.email,
        comment: newComment.comment,
      })

      // Only add to list if comment is approved (some backends may auto-approve)
      if (createdComment.status === 'approved') {
        setComments([...comments, createdComment])
      }

      setNewComment({ name: "", email: "", comment: "" })
      alert("Thank you for your comment! It will be visible after approval.")
    } catch (error: any) {
      console.error("Failed to submit comment:", error)
      alert(error.message || "Failed to submit comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewComment((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-6 sm:py-8">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Link href="/sermons">
            <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white bg-transparent text-sm sm:text-base px-3 sm:px-4 py-2">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Back to Sermons
            </Button>
          </Link>
        </div>

        {/* Sermon Header */}
        <div className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex-1">
              <span className="bg-red-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold mb-3 sm:mb-4 inline-block">
                {sermon.theme?.name || 'Sermon'}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">{sermon.title}</h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {sermon.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  {sermon.duration}
                </div>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-3 sm:mb-4">{sermon.summary}</p>

              {sermon.scripture && (
                <div className="mb-3 sm:mb-4">
                  <p className="font-bold text-xs sm:text-sm mb-2">SCRIPTURE REFERENCE:</p>
                  <p className="text-xs sm:text-sm italic">
                    {sermon.scripture}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 lg:flex-col lg:gap-3">
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-2 border-black hover:bg-gray-100 bg-transparent px-3 sm:px-4 py-2"
              >
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline ml-2">Share</span>
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className={`border-2 border-black hover:bg-gray-100 bg-transparent px-3 sm:px-4 py-2 ${
                  !sermon.pdf_url ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!sermon.pdf_url}
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline ml-2">Download</span>
              </Button>
            </div>
          </div>

          {/* Key Points */}
          {sermon.key_points && sermon.key_points.length > 0 && (
            <div className="border-t-2 border-black pt-4 sm:pt-6">
              <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">KEY POINTS:</h3>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs sm:text-sm">
                {sermon.key_points.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* PDF Viewer */}
        {sermon.pdf_url && (
          <div className="border-2 border-black bg-white mb-6 sm:mb-8">
            <div className="border-b-2 border-black p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  <h3 className="text-lg sm:text-xl font-bold">SERMON DOCUMENT</h3>
                </div>
                <Button
                  onClick={handleDownload}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
            <div className="p-2 sm:p-4">
              <iframe
                src={`${sermon.pdf_url.startsWith('http') ? sermon.pdf_url : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${sermon.pdf_url}`}#toolbar=1&navpanes=0&scrollbar=1`}
                className="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] border-0"
                title="Sermon PDF"
              />
            </div>
          </div>
        )}

        {/* No PDF Available */}
        {!sermon.pdf_url && (
          <div className="border-2 border-black bg-white mb-6 sm:mb-8 p-8 text-center">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg sm:text-xl font-bold mb-2">No Document Available</h3>
            <p className="text-sm sm:text-base text-gray-600">
              The sermon document has not been uploaded yet.
            </p>
          </div>
        )}

        {/* Sermon Position Indicator */}
        {sermon.theme && (
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8 text-sm text-gray-600">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sermon.theme.color || 'bg-red-100 text-red-800'}`}>
              {sermon.theme.name}
            </span>
            <span>•</span>
            <span>{sermon.date}</span>
          </div>
        )}

        {/* Previous / Next Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 sm:mb-8">
          {/* Previous Sermon */}
          <div className={`${!navigation.previous ? 'opacity-50' : ''}`}>
            {navigation.previous ? (
              <Link href={`/sermons/${navigation.previous.id}`} className="block">
                <div className="border-2 border-black bg-white p-4 sm:p-5 hover:bg-gray-50 transition-colors h-full">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-medium">PREVIOUS SERMON</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg line-clamp-2">{navigation.previous.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{navigation.previous.date}</p>
                </div>
              </Link>
            ) : (
              <div className="border-2 border-gray-300 bg-gray-100 p-4 sm:p-5 h-full">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">PREVIOUS SERMON</span>
                </div>
                <p className="text-sm text-gray-400">This is the first sermon</p>
              </div>
            )}
          </div>

          {/* Next Sermon */}
          <div className={`${!navigation.next ? 'opacity-50' : ''}`}>
            {navigation.next ? (
              <Link href={`/sermons/${navigation.next.id}`} className="block">
                <div className="border-2 border-black bg-white p-4 sm:p-5 hover:bg-gray-50 transition-colors h-full text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-500 mb-2">
                    <span className="text-xs sm:text-sm font-medium">NEXT SERMON</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg line-clamp-2">{navigation.next.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{navigation.next.date}</p>
                </div>
              </Link>
            ) : (
              <div className="border-2 border-gray-300 bg-gray-100 p-4 sm:p-5 h-full text-right">
                <div className="flex items-center justify-end gap-2 text-gray-400 mb-2">
                  <span className="text-xs sm:text-sm font-medium">NEXT SERMON</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <p className="text-sm text-gray-400">This is the latest sermon</p>
              </div>
            )}
          </div>
        </div>

        {/* Other Sermons in Theme */}
        {sermon.theme && navigation.themeSermons.length > 0 && (
          <section className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">MORE IN {sermon.theme.name.toUpperCase()}</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Other sermons in this theme</p>
              </div>
              <Link href={`/sermons?theme=${sermon.theme.id}`}>
                <Button variant="outline" className="border-2 border-black hover:bg-gray-100 bg-transparent text-xs sm:text-sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {navigation.themeSermons.map((relatedSermon) => (
                <Link key={relatedSermon.id} href={`/sermons/${relatedSermon.id}`}>
                  <Card className="border-2 border-black bg-white hover:bg-gray-50 transition-colors h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{relatedSermon.date}</span>
                      </div>
                      <h3 className="font-bold text-sm line-clamp-2 mb-2">{relatedSermon.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{relatedSermon.description}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
                        <Clock className="w-3 h-3" />
                        <span>{relatedSermon.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Explore More */}
        <section className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">EXPLORE MORE SERMONS</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Browse our complete collection of sermons to continue your spiritual journey.
          </p>
          <Link href="/sermons">
            <Button className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View All Sermons
            </Button>
          </Link>
        </section>

        {/* Comments Section */}
        <section className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">COMMENTS ({comments.length})</h2>
          </div>

          {/* Comment Form */}
          <div className="border-2 border-black p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">SHARE YOUR THOUGHTS</h3>
            <form onSubmit={handleCommentSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-bold mb-2">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newComment.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-bold mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newComment.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="comment" className="block text-xs sm:text-sm font-bold mb-2">
                  YOUR COMMENT *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newComment.comment}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none text-sm sm:text-base"
                  placeholder="Share how this sermon blessed you or ask questions..."
                ></textarea>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base"
              >
                {isSubmitting ? (
                  "SUBMITTING..."
                ) : (
                  <>
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    SUBMIT COMMENT
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Comments List */}
          {loadingComments ? (
            <div className="text-center py-6 sm:py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">Loading comments...</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 sm:space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-red-600 pl-3 sm:pl-6 py-3 sm:py-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-sm sm:text-base lg:text-lg">{comment.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {new Date(comment.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })} at {new Date(comment.created_at).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{comment.comment}</p>
                  </div>
                ))}
              </div>

              {comments.length === 0 && (
                <div className="text-center py-6 sm:py-8 text-gray-600">
                  <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-400" />
                  <p className="text-sm sm:text-base">No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </>
          )}
        </section>

      </main>

      <Footer />
    </div>
  )
}