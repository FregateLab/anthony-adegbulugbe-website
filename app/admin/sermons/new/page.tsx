"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Save, Eye, Plus, Trash2, FileText } from "lucide-react"
import Link from "next/link"

const existingThemes = ["The Righteous Shall Live by Faith", "Journey of Love"]

export default function NewSermonPage() {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("Sermon data:", formData)
    alert("Sermon created successfully!")
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
                    {existingThemes.map((theme) => (
                      <option key={theme} value={theme}>
                        {theme}
                      </option>
                    ))}
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
            <Button type="submit" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Create Sermon
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
