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
import { ArrowLeft, Save, Eye, Upload, FileText, Plus, X, Star } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock book data - in a real app, this would come from a database
const books = {
  1: {
    id: 1,
    title: "Journey of Love",
    subtitle: "Understanding God's Heart in the Advent Season",
    author: "Pastor Anthony Adegbulugbe",
    pages: 180,
    year: 2018,
    cover: "/placeholder.svg?height=400&width=300&text=Journey+of+Love",
    hasPdf: true,
    pdfUrl: "/books/journey-of-love.pdf",
    featured: false,
    status: "published",
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
    isbn: "978-1-234567-89-0",
    publisher: "CAC Publications",
    category: "Spiritual Growth",
    excerpt:
      "In the advent season, we discover that God's love is both extraordinary and intimate, reaching into the depths of our hearts to transform us from the inside out.",
  },
  2: {
    id: 2,
    title: "The Righteous Shall Live by Faith",
    subtitle: "A Biblical Foundation for Faith-Centered Living",
    author: "Pastor Anthony Adegbulugbe",
    pages: 156,
    year: 2020,
    cover: "/images/righteous-shall-live-by-faith-cover.jpg",
    hasPdf: true,
    pdfUrl: "/books/righteous-shall-live-by-faith.pdf",
    featured: true,
    status: "published",
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
    isbn: "978-1-234567-90-6",
    publisher: "CAC Publications",
    category: "Faith & Prayer",
    excerpt:
      "Faith sees the invisible, believes the incredible, and receives the impossible. The righteous person who has the right relationship with God is the person who is truly living.",
  },
}

export default function EditBookPage({ params }: { params: { id: string } }) {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const bookId = Number.parseInt(params.id)
  const book = books[bookId as keyof typeof books]

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    author: "",
    description: "",
    pages: "",
    isbn: "",
    publisher: "CAC Publications",
    category: "Spiritual Growth",
    year: "",
    featured: false,
    status: "published",
    excerpt: "",
    coverImage: null as File | null,
    pdfFile: null as File | null,
  })

  const [keyThemes, setKeyThemes] = useState<string[]>([])
  const [tableOfContents, setTableOfContents] = useState<string[]>([])
  const [newTheme, setNewTheme] = useState("")
  const [newChapter, setNewChapter] = useState("")

  useEffect(() => {
    requireAuth()
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        subtitle: book.subtitle,
        author: book.author,
        description: book.description,
        pages: book.pages.toString(),
        isbn: book.isbn,
        publisher: book.publisher,
        category: book.category,
        year: book.year.toString(),
        featured: book.featured,
        status: book.status,
        excerpt: book.excerpt,
        coverImage: null,
        pdfFile: null,
      })
      setKeyThemes(book.keyThemes)
      setTableOfContents(book.tableOfContents)
    }
  }, [book])

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

  if (!book) {
    notFound()
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

  const addTheme = () => {
    if (newTheme.trim() && !keyThemes.includes(newTheme.trim())) {
      setKeyThemes([...keyThemes, newTheme.trim()])
      setNewTheme("")
    }
  }

  const removeTheme = (index: number) => {
    setKeyThemes(keyThemes.filter((_, i) => i !== index))
  }

  const addChapter = () => {
    if (newChapter.trim()) {
      setTableOfContents([...tableOfContents, newChapter.trim()])
      setNewChapter("")
    }
  }

  const removeChapter = (index: number) => {
    setTableOfContents(tableOfContents.filter((_, i) => i !== index))
  }

  const moveChapterUp = (index: number) => {
    if (index > 0) {
      const newContents = [...tableOfContents]
      ;[newContents[index - 1], newContents[index]] = [newContents[index], newContents[index - 1]]
      setTableOfContents(newContents)
    }
  }

  const moveChapterDown = (index: number) => {
    if (index < tableOfContents.length - 1) {
      const newContents = [...tableOfContents]
      ;[newContents[index], newContents[index + 1]] = [newContents[index + 1], newContents[index]]
      setTableOfContents(newContents)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the database
    console.log("Updated book data:", { ...formData, keyThemes, tableOfContents })
    alert("Book updated successfully!")
    // Redirect to view page
    window.location.href = `/admin/books/${book.id}/view`
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />
      <AdminHeader />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6 md:mb-8">
          <Link
            href={`/admin/books/${book.id}/view`}
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm md:text-base">Back to View Book</span>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">EDIT BOOK</h1>
          <p className="text-sm md:text-lg text-gray-700">Update book information and content</p>
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

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">AUTHOR *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter author name"
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
                  <label className="block text-xs md:text-sm font-bold mb-2">PUBLISHER</label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Publisher name"
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

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">STATUS</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 md:mt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <Star
                    className={`w-4 h-4 ${formData.featured ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                  />
                  <span className="text-xs md:text-sm font-bold">FEATURED BOOK</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Description & Excerpt</h2>

              <div className="space-y-4 md:space-y-6">
                <div>
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
                  <label className="block text-xs md:text-sm font-bold mb-2">BOOK EXCERPT</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter a compelling excerpt from the book"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Themes */}
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Key Themes</h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTheme}
                    onChange={(e) => setNewTheme(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTheme())}
                    className="flex-1 border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Add a key theme"
                  />
                  <Button type="button" onClick={addTheme} className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {keyThemes.map((theme, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                      <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                      <span className="flex-1 text-sm md:text-base">{theme}</span>
                      <Button
                        type="button"
                        onClick={() => removeTheme(index)}
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white p-1"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Table of Contents</h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addChapter())}
                    className="flex-1 border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Add a chapter title"
                  />
                  <Button type="button" onClick={addChapter} className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {tableOfContents.map((chapter, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded border">
                      <div className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="flex-1 text-sm md:text-base font-medium">{chapter}</span>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          onClick={() => moveChapterUp(index)}
                          disabled={index === 0}
                          variant="outline"
                          size="sm"
                          className="border-gray-300 hover:bg-gray-100 p-1 disabled:opacity-50"
                        >
                          ↑
                        </Button>
                        <Button
                          type="button"
                          onClick={() => moveChapterDown(index)}
                          disabled={index === tableOfContents.length - 1}
                          variant="outline"
                          size="sm"
                          className="border-gray-300 hover:bg-gray-100 p-1 disabled:opacity-50"
                        >
                          ↓
                        </Button>
                        <Button
                          type="button"
                          onClick={() => removeChapter(index)}
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white p-1"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Files */}
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Files</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Cover Image */}
                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">COVER IMAGE</label>
                  <div className="border-2 border-dashed border-gray-300 p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label
                      htmlFor="cover-upload"
                      className="cursor-pointer text-red-600 hover:text-red-700 font-bold text-sm"
                    >
                      Upload new cover image
                    </label>
                    <p className="text-xs text-gray-600 mt-1">JPG or PNG, max 5MB</p>
                    {formData.coverImage && (
                      <p className="text-xs text-green-600 mt-2">New: {formData.coverImage.name}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Current: {book.cover}</p>
                  </div>
                </div>

                {/* PDF Document */}
                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">PDF DOCUMENT</label>
                  <div className="border-2 border-dashed border-gray-300 p-4 text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" id="pdf-upload" />
                    <label
                      htmlFor="pdf-upload"
                      className="cursor-pointer text-red-600 hover:text-red-700 font-bold text-sm"
                    >
                      Upload new PDF
                    </label>
                    <p className="text-xs text-gray-600 mt-1">PDF format, max 50MB</p>
                    {formData.pdfFile && <p className="text-xs text-green-600 mt-2">New: {formData.pdfFile.name}</p>}
                    <p className="text-xs text-gray-500 mt-1">Current: {book.pdfUrl}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 sm:justify-end">
            <Link href={`/admin/books/${book.id}/view`} className="w-full sm:w-auto">
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
              Save Changes
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
