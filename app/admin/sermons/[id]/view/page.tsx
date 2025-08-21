"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Edit, Trash2, Download, ExternalLink, Play, Calendar, Clock, Eye, BookOpen, X } from "lucide-react"

// Mock sermon data - in a real app, this would come from a database
const mockSermons = [
  {
    id: 20,
    title: "FAITH WHEN WE FACE TRIALS",
    theme: "The Righteous Shall Live by Faith",
    date: "July 5, 2020",
    duration: "48 min",
    featured: true,
    status: "published",
    views: 1250,
    scripture: "James 1:2-4, Romans 5:3-5",
    description:
      "In this powerful message, we explore how faith sustains us through life's most challenging moments. Drawing from the experiences of biblical figures and contemporary examples, we discover that trials are not obstacles to faith, but opportunities for faith to grow stronger.",
    keyPoints: [
      "Understanding the purpose of trials in spiritual growth",
      "How faith transforms our perspective on suffering",
      "Biblical examples of faith during difficult times",
      "Practical steps to maintain faith during trials",
    ],
    audioFile: "faith-when-we-face-trials.mp3",
    transcript: "Available",
    tags: ["Faith", "Trials", "Perseverance", "Growth"],
    publishedDate: "2020-07-05",
    lastModified: "2024-12-15",
  },
  {
    id: 21,
    title: "WHAT IS FAITH?",
    theme: "The Righteous Shall Live by Faith",
    date: "November 6, 2016",
    duration: "45 min",
    featured: true,
    status: "published",
    views: 980,
    scripture: "Hebrews 11:1, Romans 10:17",
    description:
      "A foundational message exploring the true nature of faith. We examine what faith really means, how it differs from mere belief, and why it's essential for the Christian life.",
    keyPoints: [
      "Defining faith according to Scripture",
      "The difference between faith and belief",
      "How faith comes and grows",
      "Living by faith in daily life",
    ],
    audioFile: "what-is-faith.mp3",
    transcript: "Available",
    tags: ["Faith", "Foundation", "Belief", "Scripture"],
    publishedDate: "2016-11-06",
    lastModified: "2024-12-10",
  },
  {
    id: 1,
    title: "HIS BANNER OVER US IS LOVE",
    theme: "Journey of Love",
    date: "July 1, 2017",
    duration: "30 min",
    featured: false,
    status: "published",
    views: 750,
    scripture: "Song of Songs 2:4, 1 John 4:16",
    description:
      "Exploring the depth of God's love for His people through the beautiful imagery of Song of Songs. This message reveals how God's love covers, protects, and sustains us.",
    keyPoints: [
      "Understanding God's banner of love",
      "How love provides protection and identity",
      "Living under God's covering",
      "Experiencing divine love daily",
    ],
    audioFile: "his-banner-over-us-is-love.mp3",
    transcript: "Available",
    tags: ["Love", "Protection", "Identity", "God's Character"],
    publishedDate: "2017-07-01",
    lastModified: "2024-12-08",
  },
]

export default function ViewSermonPage() {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const params = useParams()
  const router = useRouter()
  const [sermon, setSermon] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    requireAuth()
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    // Find the sermon by ID
    const sermonId = Number.parseInt(params.id as string)
    const foundSermon = mockSermons.find((s) => s.id === sermonId)
    setSermon(foundSermon)
  }, [params.id])

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

  // Show not found if sermon doesn't exist
  if (!sermon) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <Card className="border-2 border-black bg-white max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Sermon Not Found</h1>
              <p className="text-gray-600 mb-6">The sermon you're looking for doesn't exist.</p>
              <Link href="/admin">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Admin Panel
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const handleDeleteSermon = () => {
    // In a real app, this would make an API call
    console.log("Deleting sermon:", sermon.id)
    alert("Sermon deleted successfully!")
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/admin" className="hover:text-red-600">
              Admin Panel
            </Link>
            <span>/</span>
            <Link href="/admin" className="hover:text-red-600">
              Sermons
            </Link>
            <span>/</span>
            <span className="text-black font-medium">View Sermon</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">VIEW SERMON</h1>
              <p className="text-gray-600">Review sermon details and manage content</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <Button variant="outline" className="border-2 border-black hover:bg-gray-100 bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sermon Header */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h2 className="text-xl md:text-2xl font-bold flex-1">{sermon.title}</h2>
                  {sermon.featured && (
                    <span className="bg-yellow-400 text-black px-3 py-1 text-sm font-bold rounded">FEATURED</span>
                  )}
                  <span
                    className={`px-3 py-1 text-sm font-bold rounded ${
                      sermon.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {sermon.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {sermon.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {sermon.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye className="w-4 h-4" />
                    {sermon.views} views
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    {sermon.theme}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Scripture Reference</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded border">{sermon.scripture}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{sermon.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {sermon.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {sermon.tags.map((tag: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 text-sm rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Actions</h3>
                <div className="space-y-3">
                  <Link href={`/admin/sermons/${sermon.id}/edit`}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Sermon
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full border-2 border-black hover:bg-gray-100 bg-transparent">
                    <Play className="w-4 h-4 mr-2" />
                    Play Audio
                  </Button>

                  <Button variant="outline" className="w-full border-2 border-black hover:bg-gray-100 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Audio
                  </Button>

                  <Link href={`/sermons/${sermon.id}`}>
                    <Button variant="outline" className="w-full border-2 border-black hover:bg-gray-100 bg-transparent">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Public Page
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full border-2 border-black hover:bg-red-100 bg-transparent text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Sermon
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Views</span>
                    <span className="font-bold">{sermon.views}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-bold">{sermon.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Published</span>
                    <span className="font-bold">{new Date(sermon.publishedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Last Modified</span>
                    <span className="font-bold">{new Date(sermon.lastModified).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Audio File</span>
                    <span className="font-bold text-green-600">Available</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Transcript</span>
                    <span className="font-bold text-green-600">{sermon.transcript}</span>
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
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-red-600">DELETE SERMON</h2>
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="outline"
                    className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mb-6">
                  <p className="text-sm mb-3">
                    Are you sure you want to delete this sermon? This action cannot be undone.
                  </p>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="font-bold text-sm">{sermon.title}</p>
                    <p className="text-xs text-gray-600">
                      {sermon.date} • {sermon.duration}
                    </p>
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
                    onClick={handleDeleteSermon}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Sermon
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
