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
import { ArrowLeft, Upload, Save, Eye, FileText } from "lucide-react"
import Link from "next/link"

export default function NewBookPage() {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    pages: "",
    isbn: "",
    publisher: "CAC Publications",
    category: "Spiritual Growth",
    year: new Date().getFullYear().toString(),
    featured: false,
    keyThemes: "",
    tableOfContents: "",
    excerpt: "",
    coverImage: null as File | null,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, coverImage: file }))
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, pdfFile: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("Book data:", formData)
    alert("Book created successfully!")
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
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">ADD NEW BOOK</h1>
          <p className="text-sm md:text-lg text-gray-700">Create a new book entry for your website</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* Basic Information */}
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs md:text-sm font-bold mb-2">BOOK TITLE *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter book title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs md:text-sm font-bold mb-2">SUBTITLE</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter book subtitle"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs md:text-sm font-bold mb-2">DESCRIPTION *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter book description"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">PAGES</label>
                  <input
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleInputChange}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Number of pages"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">PUBLICATION YEAR</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Publication year"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">ISBN</label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="ISBN number"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">CATEGORY</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="Spiritual Growth">Spiritual Growth</option>
                    <option value="Faith & Prayer">Faith & Prayer</option>
                    <option value="Christian Living">Christian Living</option>
                    <option value="Pastoral Ministry">Pastoral Ministry</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 md:mt-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-xs md:text-sm font-bold">FEATURED BOOK</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Content Details */}
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Content Details</h2>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">KEY THEMES</label>
                  <textarea
                    name="keyThemes"
                    value={formData.keyThemes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter key themes separated by commas"
                  />
                  <p className="text-xs text-gray-600 mt-1">Separate themes with commas</p>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">TABLE OF CONTENTS</label>
                  <textarea
                    name="tableOfContents"
                    value={formData.tableOfContents}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter table of contents, one chapter per line"
                  />
                  <p className="text-xs md:text-sm text-gray-600 mt-1">Enter one chapter per line</p>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">BOOK EXCERPT</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter a compelling excerpt from the book"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Cover Image</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">UPLOAD COVER IMAGE</label>
                  <div className="border-2 border-dashed border-gray-300 p-4 md:p-6 text-center">
                    <Upload className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-2 md:mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label
                      htmlFor="cover-upload"
                      className="cursor-pointer text-red-600 hover:text-red-700 font-bold text-sm md:text-base"
                    >
                      Click to upload cover image
                    </label>
                    <p className="text-xs md:text-sm text-gray-600 mt-2">Recommended size: 350x500px, JPG or PNG</p>
                    {formData.coverImage && (
                      <p className="text-xs md:text-sm text-green-600 mt-2">Selected: {formData.coverImage.name}</p>
                    )}
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
                  <label className="block text-xs md:text-sm font-bold mb-2">UPLOAD PDF DOCUMENT</label>
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
              Create Book
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
