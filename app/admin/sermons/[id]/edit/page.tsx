"use client"

import type React from "react"

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
import { ArrowLeft, Save, Eye, X, Plus, Trash2, Upload, Star, ChevronUp, ChevronDown } from "lucide-react"

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

const availableThemes = [
  "The Righteous Shall Live by Faith",
  "Journey of Love",
  "Walking in Victory",
  "God's Faithfulness",
  "Living by Grace",
]

export default function EditSermonPage() {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const params = useParams()
  const router = useRouter()
  const [originalSermon, setOriginalSermon] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    theme: "",
    date: "",
    duration: "",
    scripture: "",
    description: "",
    keyPoints: [""],
    tags: [""],
    featured: false,
    status: "published",
    audioFile: "",
    transcript: "",
  })
  const [newTag, setNewTag] = useState("")
  const [newKeyPoint, setNewKeyPoint] = useState("")

  useEffect(() => {
    requireAuth()
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    // Find the sermon by ID and populate form
    const sermonId = Number.parseInt(params.id as string)
    const foundSermon = mockSermons.find((s) => s.id === sermonId)
    if (foundSermon) {
      setOriginalSermon(foundSermon)
      setFormData({
        title: foundSermon.title,
        theme: foundSermon.theme,
        date: foundSermon.date,
        duration: foundSermon.duration,
        scripture: foundSermon.scripture,
        description: foundSermon.description,
        keyPoints: [...foundSermon.keyPoints],
        tags: [...foundSermon.tags],
        featured: foundSermon.featured,
        status: foundSermon.status,
        audioFile: foundSermon.audioFile,
        transcript: foundSermon.transcript,
      })
    }
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
  if (!originalSermon) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags.filter((tag) => tag.trim() !== ""), newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }))
  }

  const handleAddKeyPoint = () => {
    if (newKeyPoint.trim()) {
      setFormData((prev) => ({
        ...prev,
        keyPoints: [...prev.keyPoints.filter((point) => point.trim() !== ""), newKeyPoint.trim()],
      }))
      setNewKeyPoint("")
    }
  }

  const handleRemoveKeyPoint = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyPoints: prev.keyPoints.filter((_, i) => i !== index),
    }))
  }

  const handleMoveKeyPoint = (index: number, direction: "up" | "down") => {
    const newKeyPoints = [...formData.keyPoints]
    if (direction === "up" && index > 0) {
      ;[newKeyPoints[index], newKeyPoints[index - 1]] = [newKeyPoints[index - 1], newKeyPoints[index]]
    } else if (direction === "down" && index < newKeyPoints.length - 1) {
      ;[newKeyPoints[index], newKeyPoints[index + 1]] = [newKeyPoints[index + 1], newKeyPoints[index]]
    }
    setFormData((prev) => ({ ...prev, keyPoints: newKeyPoints }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("Updated sermon data:", formData)
    alert("Sermon updated successfully!")
    router.push(`/admin/sermons/${originalSermon.id}/view`)
  }

  const handlePreview = () => {
    // In a real app, this would show a preview
    alert("Preview functionality would be implemented here")
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
            <Link href={`/admin/sermons/${originalSermon.id}/view`} className="hover:text-red-600">
              View Sermon
            </Link>
            <span>/</span>
            <span className="text-black font-medium">Edit</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">EDIT SERMON</h1>
              <p className="text-gray-600">Update sermon details and content</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/sermons/${originalSermon.id}/view`}>
                <Button variant="outline" className="border-2 border-black hover:bg-gray-100 bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to View
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Basic Information</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">SERMON TITLE *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter sermon title"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">THEME *</label>
                      <select
                        name="theme"
                        value={formData.theme}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="">Select a theme</option>
                        {availableThemes.map((theme) => (
                          <option key={theme} value={theme}>
                            {theme}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">STATUS</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">DATE *</label>
                      <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="e.g., July 5, 2020"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">DURATION *</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="e.g., 48 min"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">SCRIPTURE REFERENCE *</label>
                    <input
                      type="text"
                      name="scripture"
                      value={formData.scripture}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="e.g., James 1:2-4, Romans 5:3-5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">DESCRIPTION *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter sermon description"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 border-black flex items-center justify-center ${
                          formData.featured ? "bg-yellow-400" : "bg-white"
                        }`}
                      >
                        {formData.featured && <Star className="w-3 h-3 text-black" />}
                      </div>
                      <span className="text-sm font-bold">MARK AS FEATURED</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Points */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Key Points</h3>

                <div className="space-y-3 mb-4">
                  {formData.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1 flex items-center gap-2">
                        <span className="w-6 h-6 bg-red-600 text-white text-xs flex items-center justify-center rounded-full flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-sm">{point}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          onClick={() => handleMoveKeyPoint(index, "up")}
                          disabled={index === 0}
                          variant="outline"
                          size="sm"
                          className="border-2 border-black hover:bg-gray-100 bg-transparent p-1"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleMoveKeyPoint(index, "down")}
                          disabled={index === formData.keyPoints.length - 1}
                          variant="outline"
                          size="sm"
                          className="border-2 border-black hover:bg-gray-100 bg-transparent p-1"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleRemoveKeyPoint(index)}
                          variant="outline"
                          size="sm"
                          className="border-2 border-black hover:bg-red-100 bg-transparent p-1"
                        >
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newKeyPoint}
                    onChange={(e) => setNewKeyPoint(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddKeyPoint())}
                    className="flex-1 border-2 border-black p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Add new key point"
                  />
                  <Button
                    type="button"
                    onClick={handleAddKeyPoint}
                    className="bg-red-600 hover:bg-red-700 text-white px-4"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Tags</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                    className="flex-1 border-2 border-black p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Add new tag"
                  />
                  <Button type="button" onClick={handleAddTag} className="bg-red-600 hover:bg-red-700 text-white px-4">
                    <Plus className="w-4 h-4" />
                  </Button>
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
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>

                  <Button
                    type="button"
                    onClick={handlePreview}
                    variant="outline"
                    className="w-full border-2 border-black hover:bg-gray-100 bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Changes
                  </Button>

                  <Link href={`/admin/sermons/${originalSermon.id}/view`}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-2 border-black hover:bg-gray-100 bg-transparent"
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Audio File */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Audio File</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">CURRENT FILE</label>
                    <div className="bg-gray-50 p-3 rounded border text-sm">
                      {formData.audioFile || "No file uploaded"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">UPLOAD NEW FILE</label>
                    <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Drop audio file here or click to browse</p>
                      <p className="text-xs text-gray-500">Supported formats: MP3, WAV, M4A</p>
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setFormData((prev) => ({ ...prev, audioFile: file.name }))
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transcript */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Transcript</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">STATUS</label>
                    <select
                      name="transcript"
                      value={formData.transcript}
                      onChange={handleInputChange}
                      className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="Available">Available</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">UPLOAD TRANSCRIPT</label>
                    <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded">
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-600 mb-1">Drop transcript file here</p>
                      <p className="text-xs text-gray-500">Supported formats: PDF, DOC, TXT</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
