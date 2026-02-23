"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { sermonsApi, themesApi, type Theme } from "@/lib/api"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Save, Eye, Plus, Trash2, FileText, Sparkles, Upload, Loader2 } from "lucide-react"
import Link from "next/link"

export default function NewSermonPage() {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const router = useRouter()
  const [themes, setThemes] = useState<Theme[]>([])
  const [loadingThemes, setLoadingThemes] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [aiExtracting, setAiExtracting] = useState(false)
  const [aiPdfFile, setAiPdfFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    theme: "",
    newTheme: "",
    date: "",
    duration: "",
    summary: "",
    scripture: "",
    keyPoints: [""],
    featured: false,
    hasAudio: true,
    hasVideo: true,
    hasText: true,
    pdfFile: null as File | null,
  })

  useEffect(() => {
    requireAuth()
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    if (isAuthenticated) {
      fetchThemes()
    }
  }, [isAuthenticated])

  const fetchThemes = async () => {
    try {
      setLoadingThemes(true)
      const activeThemes = await themesApi.getActive()
      setThemes(activeThemes)
    } catch (error) {
      console.error('Failed to fetch themes:', error)
    } finally {
      setLoadingThemes(false)
    }
  }

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleKeyPointChange = (index: number, value: string) => {
    const newKeyPoints = [...formData.keyPoints]
    newKeyPoints[index] = value
    setFormData((prev) => ({ ...prev, keyPoints: newKeyPoints }))
  }

  const addKeyPoint = () => {
    setFormData((prev) => ({ ...prev, keyPoints: [...prev.keyPoints, ""] }))
  }

  const removeKeyPoint = (index: number) => {
    if (formData.keyPoints.length > 1) {
      const newKeyPoints = formData.keyPoints.filter((_, i) => i !== index)
      setFormData((prev) => ({ ...prev, keyPoints: newKeyPoints }))
    }
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, pdfFile: file }))
  }

  const handleAiPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setAiPdfFile(file)
  }

  const handleAiExtract = async () => {
    if (!aiPdfFile) {
      alert('Please select a PDF file first')
      return
    }

    setAiExtracting(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('pdf', aiPdfFile)

      const response = await fetch('/api/ai/extract-sermon', {
        method: 'POST',
        body: formDataObj,
      })

      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text)
        throw new Error('Server returned an invalid response. Please check your API configuration.')
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Failed to extract sermon data')
      }

      const extracted = result.data

      // Auto-fill the form with extracted data
      setFormData((prev) => ({
        ...prev,
        title: extracted.title || prev.title,
        date: extracted.sermon_date || prev.date,
        duration: extracted.duration || prev.duration,
        scripture: extracted.scripture_reference || prev.scripture,
        summary: extracted.summary || prev.summary,
        keyPoints: extracted.key_points?.length > 0 ? extracted.key_points : prev.keyPoints,
        pdfFile: aiPdfFile, // Also set as the sermon PDF
      }))

      alert('Form auto-filled successfully! Please review and make any necessary adjustments.')
    } catch (error: any) {
      console.error('AI extraction error:', error)
      alert(error.message || 'Failed to extract sermon data from PDF')
    } finally {
      setAiExtracting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      let themeId = parseInt(formData.theme)
      
      // If creating new theme, create it first
      if (formData.theme === "new" && formData.newTheme.trim()) {
        const newTheme = await themesApi.create({
          name: formData.newTheme,
          description: `Theme for ${formData.newTheme}`,
          status: "active"
        })
        themeId = newTheme.id
      }

      const sermonData = {
        title: formData.title,
        theme_id: themeId,
        sermon_date: formData.date,
        duration: formData.duration || null,
        summary: formData.summary,
        scripture_reference: formData.scripture || null,
        key_points: formData.keyPoints.filter(point => point.trim()),
        featured: formData.featured,
        has_audio: formData.hasAudio,
        has_video: formData.hasVideo,
        has_text: formData.hasText,
        status: 'published' as const
      }

      const createdSermon = await sermonsApi.create(sermonData)

      // Handle PDF upload if file is selected
      if (formData.pdfFile) {
        await sermonsApi.uploadPdf(createdSermon.id, formData.pdfFile)
      }

      alert("Sermon created successfully!")
      // router.push("/admin")
      window.location.reload()
    } catch (error: any) {
      console.error("Failed to create sermon:", error)
      alert(error.message || "Failed to create sermon. Please try again.")
    } finally {
      setSubmitting(false)
    }
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
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">ADD NEW SERMON</h1>
          <p className="text-sm md:text-lg text-gray-700">Create a new sermon entry for your website</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* AI Auto-fill Section */}
          <Card className="border-2 border-black bg-gradient-to-r from-red-50 to-orange-50">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                <h2 className="text-lg md:text-2xl font-bold">AI Auto-fill</h2>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">Beta</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Upload a sermon PDF and let AI extract the title, summary, key points, and scripture references automatically.
              </p>

              <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                <div className="flex-1 w-full">
                  <label className="block text-xs md:text-sm font-bold mb-2">SELECT PDF FOR AI EXTRACTION</label>
                  <div className="border-2 border-dashed border-red-300 bg-white p-4 text-center rounded-lg">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleAiPdfChange}
                      className="hidden"
                      id="ai-pdf-upload"
                      disabled={aiExtracting}
                    />
                    <label
                      htmlFor="ai-pdf-upload"
                      className={`cursor-pointer flex flex-col items-center ${aiExtracting ? 'opacity-50' : ''}`}
                    >
                      <Upload className="w-8 h-8 text-red-400 mb-2" />
                      <span className="text-red-600 hover:text-red-700 font-medium text-sm">
                        {aiPdfFile ? aiPdfFile.name : 'Click to select PDF'}
                      </span>
                    </label>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleAiExtract}
                  disabled={!aiPdfFile || aiExtracting}
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 px-6"
                >
                  {aiExtracting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Auto-fill with AI
                    </>
                  )}
                </Button>
              </div>

              {aiExtracting && (
                <div className="mt-4 p-3 bg-red-100 rounded-lg">
                  <p className="text-sm text-red-800 flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    AI is analyzing your sermon PDF. This may take a moment...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs md:text-sm font-bold mb-2">SERMON TITLE *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter sermon title"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">THEME *</label>
                  <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="">Select a theme</option>
                    {loadingThemes ? (
                      <option disabled>Loading themes...</option>
                    ) : (
                      themes.map((theme) => (
                        <option key={theme.id} value={theme.id.toString()}>
                          {theme.name}
                        </option>
                      ))
                    )}
                    <option value="new">Create New Theme</option>
                  </select>
                </div>

                {formData.theme === "new" && (
                  <div className="md:col-span-2">
                    <label className="block text-xs md:text-sm font-bold mb-2">NEW THEME NAME *</label>
                    <input
                      type="text"
                      name="newTheme"
                      value={formData.newTheme}
                      onChange={handleInputChange}
                      required={formData.theme === "new"}
                      className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter new theme name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">DATE *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">DURATION</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="e.g., 45 min"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs md:text-sm font-bold mb-2">SCRIPTURE REFERENCE</label>
                  <input
                    type="text"
                    name="scripture"
                    value={formData.scripture}
                    onChange={handleInputChange}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="e.g., John 3:16; Romans 8:28"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs md:text-sm font-bold mb-2">SUMMARY *</label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter sermon summary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Points */}
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
                <h2 className="text-lg md:text-2xl font-bold">Key Points</h2>
                <Button
                  type="button"
                  onClick={addKeyPoint}
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-black hover:bg-gray-100 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Point
                </Button>
              </div>

              <div className="space-y-3 md:space-y-4">
                {formData.keyPoints.map((point, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handleKeyPointChange(index, e.target.value)}
                      className="flex-1 border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder={`Key point ${index + 1}`}
                    />
                    {formData.keyPoints.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeKeyPoint(index)}
                        variant="outline"
                        className="w-full sm:w-auto border-2 border-black hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4 sm:mr-2" />
                        <span className="sm:hidden">Remove</span>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Settings</h2>

              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-xs md:text-sm font-bold">FEATURED SERMON</span>
                </label>

                <div>
                  <p className="text-xs md:text-sm font-bold mb-3">AVAILABLE FORMATS:</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="hasAudio"
                        checked={formData.hasAudio}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-xs md:text-sm">Audio Available</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="hasVideo"
                        checked={formData.hasVideo}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-xs md:text-sm">Video Available</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="hasText"
                        checked={formData.hasText}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-xs md:text-sm">Text Available</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PDF Document */}
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">PDF Document</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">UPLOAD SERMON PDF</label>
                  <div className="border-2 border-dashed border-gray-300 p-4 md:p-6 text-center">
                    <FileText className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-2 md:mb-4" />
                    <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" id="pdf-upload" />
                    <label
                      htmlFor="pdf-upload"
                      className="cursor-pointer text-red-600 hover:text-red-700 font-bold text-sm md:text-base"
                    >
                      Click to upload PDF document
                    </label>
                    <p className="text-xs md:text-sm text-gray-600 mt-2">PDF format only, max 50MB</p>
                    {formData.pdfFile && (
                      <p className="text-xs md:text-sm text-green-600 mt-2">Selected: {formData.pdfFile.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 sm:justify-end">
            <Link href="/admin" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-2 border-black hover:bg-gray-100 bg-transparent">
                Cancel
              </Button>
            </Link>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto border-2 border-black hover:bg-gray-100 bg-transparent"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              type="submit" 
              disabled={submitting}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {submitting ? 'Creating Sermon...' : 'Create Sermon'}
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
