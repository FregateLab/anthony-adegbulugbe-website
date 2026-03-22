"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { sermonsApi, themesApi, Sermon, Theme, getFileUrl } from "@/lib/api"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Save, Eye, Plus, Trash2, Upload, Star, ChevronUp, ChevronDown } from "lucide-react"

export default function EditSermonPage() {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const params = useParams()
  const router = useRouter()
  const [originalSermon, setOriginalSermon] = useState<Sermon | null>(null)
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    theme_id: 0,
    sermon_date: "",
    duration: "",
    scripture_reference: "",
    summary: "",
    key_points: [] as string[],
    featured: false,
    status: "published" as "draft" | "published",
    has_audio: false,
    has_video: false,
    has_text: false,
  })
  const [newKeyPoint, setNewKeyPoint] = useState("")
  const [newPdfFile, setNewPdfFile] = useState<File | null>(null)

  useEffect(() => {
    requireAuth()
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sermonId = Number.parseInt(params.id as string)

        // Fetch sermon and themes in parallel
        const [sermonData, themesResponse] = await Promise.all([
          sermonsApi.getById(sermonId),
          themesApi.getActive()
        ])

        setOriginalSermon(sermonData)
        setThemes(themesResponse)

        // Populate form with sermon data
        setFormData({
          title: sermonData.title,
          theme_id: sermonData.theme_id,
          sermon_date: sermonData.sermon_date.split('T')[0], // Format for date input
          duration: sermonData.duration || "",
          scripture_reference: sermonData.scripture_reference || "",
          summary: sermonData.summary,
          key_points: sermonData.key_points || [],
          featured: sermonData.featured,
          status: sermonData.status,
          has_audio: sermonData.has_audio,
          has_video: sermonData.has_video,
          has_text: sermonData.has_text,
        })
      } catch (error) {
        console.error("Failed to fetch data:", error)
        setOriginalSermon(null)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchData()
    }
  }, [params.id])

  // Show loading while checking authentication or fetching data
  if (isLoading || loading) {
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
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : name === "theme_id"
          ? parseInt(value)
          : value,
    }))
  }

  const handleAddKeyPoint = () => {
    if (newKeyPoint.trim()) {
      setFormData((prev) => ({
        ...prev,
        key_points: [...prev.key_points.filter((point) => point.trim() !== ""), newKeyPoint.trim()],
      }))
      setNewKeyPoint("")
    }
  }

  const handleRemoveKeyPoint = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      key_points: prev.key_points.filter((_, i) => i !== index),
    }))
  }

  const handleMoveKeyPoint = (index: number, direction: "up" | "down") => {
    const newKeyPoints = [...formData.key_points]
    if (direction === "up" && index > 0) {
      ;[newKeyPoints[index], newKeyPoints[index - 1]] = [newKeyPoints[index - 1], newKeyPoints[index]]
    } else if (direction === "down" && index < newKeyPoints.length - 1) {
      ;[newKeyPoints[index], newKeyPoints[index + 1]] = [newKeyPoints[index + 1], newKeyPoints[index]]
    }
    setFormData((prev) => ({ ...prev, key_points: newKeyPoints }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!originalSermon) return

    setSubmitting(true)
    try {
      await sermonsApi.update(originalSermon.id, {
        title: formData.title,
        theme_id: formData.theme_id,
        sermon_date: formData.sermon_date,
        duration: formData.duration || null,
        scripture_reference: formData.scripture_reference || null,
        summary: formData.summary,
        key_points: formData.key_points,
        featured: formData.featured,
        status: formData.status,
        has_audio: formData.has_audio,
        has_video: formData.has_video,
        has_text: formData.has_text,
      })

      // Upload new PDF file if selected
      if (newPdfFile) {
        const uploadResult = await sermonsApi.uploadPdf(originalSermon.id, newPdfFile)
        if (uploadResult?.text_extracted) {
          alert(`Sermon updated successfully!\n\nPDF text extracted: ${uploadResult.word_count?.toLocaleString()} words (~${uploadResult.estimated_reading_minutes} min read)`)
        } else {
          alert("Sermon updated successfully!\n\nNote: PDF text could not be extracted automatically.")
        }
      } else {
        alert("Sermon updated successfully!")
      }
      router.push(`/admin/sermons/${originalSermon.id}/view`)
    } catch (error: any) {
      console.error("Failed to update sermon:", error)
      alert(error.message || "Failed to update sermon. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setNewPdfFile(file)
  }

  const handlePreview = () => {
    if (originalSermon) {
      window.open(`/sermons/${originalSermon.id}`, '_blank')
    }
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
                        name="theme_id"
                        value={formData.theme_id}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value={0}>Select a theme</option>
                        {themes.map((theme) => (
                          <option key={theme.id} value={theme.id}>
                            {theme.name}
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
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">DATE *</label>
                      <input
                        type="date"
                        name="sermon_date"
                        value={formData.sermon_date}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">DURATION</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="e.g., 48 min"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">SCRIPTURE REFERENCE</label>
                    <input
                      type="text"
                      name="scripture_reference"
                      value={formData.scripture_reference}
                      onChange={handleInputChange}
                      className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="e.g., James 1:2-4, Romans 5:3-5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">SUMMARY *</label>
                    <textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter sermon summary"
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
                  {formData.key_points.map((point, index) => (
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
                          disabled={index === formData.key_points.length - 1}
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

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Actions</h3>
                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {submitting ? 'Saving...' : 'Save Changes'}
                  </Button>

                  <Button
                    type="button"
                    onClick={handlePreview}
                    variant="outline"
                    className="w-full border-2 border-black hover:bg-gray-100 bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Public Page
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

            {/* Media Availability */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Media Availability</h3>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="has_audio"
                      checked={formData.has_audio}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-red-600"
                    />
                    <span className="text-sm font-medium">Has Audio</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="has_video"
                      checked={formData.has_video}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-red-600"
                    />
                    <span className="text-sm font-medium">Has Video</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="has_text"
                      checked={formData.has_text}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-red-600"
                    />
                    <span className="text-sm font-medium">Has Transcript</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Current Files */}
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Files</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">AUDIO FILE</label>
                    {originalSermon?.audio_file ? (
                      <div className="bg-green-50 border border-green-200 p-3 rounded">
                        <p className="text-sm text-green-800 font-medium truncate">
                          {originalSermon.audio_file.split('/').pop()}
                        </p>
                        <a
                          href={getFileUrl(originalSermon.audio_file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-green-600 hover:underline"
                        >
                          View file
                        </a>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 p-3 rounded">
                        <p className="text-sm text-gray-500">No audio file uploaded</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">PDF FILE</label>
                    {originalSermon?.pdf_file && !newPdfFile ? (
                      <div className="bg-green-50 border border-green-200 p-3 rounded mb-2">
                        <p className="text-sm text-green-800 font-medium truncate">
                          {originalSermon.pdf_file.split('/').pop()}
                        </p>
                        <a
                          href={getFileUrl(originalSermon.pdf_file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-green-600 hover:underline"
                        >
                          View file
                        </a>
                      </div>
                    ) : !newPdfFile ? (
                      <div className="bg-gray-50 border border-gray-200 p-3 rounded mb-2">
                        <p className="text-sm text-gray-500">No PDF file uploaded</p>
                      </div>
                    ) : null}

                    {newPdfFile && (
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-2">
                        <p className="text-sm text-blue-800 font-medium truncate">
                          New: {newPdfFile.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => setNewPdfFile(null)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    <div className="border-2 border-dashed border-gray-300 p-3 text-center rounded">
                      <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfChange}
                        className="hidden"
                        id="pdf-upload"
                      />
                      <label
                        htmlFor="pdf-upload"
                        className="cursor-pointer text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        {originalSermon?.pdf_file || newPdfFile ? 'Replace PDF' : 'Upload PDF'}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">VIDEO FILE</label>
                    {originalSermon?.video_file ? (
                      <div className="bg-green-50 border border-green-200 p-3 rounded">
                        <p className="text-sm text-green-800 font-medium truncate">
                          {originalSermon.video_file.split('/').pop()}
                        </p>
                        <a
                          href={getFileUrl(originalSermon.video_file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-green-600 hover:underline"
                        >
                          View file
                        </a>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 p-3 rounded">
                        <p className="text-sm text-gray-500">No video file uploaded</p>
                      </div>
                    )}
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
