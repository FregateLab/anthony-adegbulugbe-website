"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Save, Upload, FileText, Plus, X, Star } from "lucide-react"
import Link from "next/link"
import { booksApi, getFileUrl, type Book } from "@/lib/api"

export default function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const router = useRouter()
  const resolvedParams = use(params)
  const bookId = Number.parseInt(resolvedParams.id)

  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    pages: "",
    isbn: "",
    publisher: "CAC Publications",
    category: "Spiritual Growth",
    year: "",
    featured: false,
    status: "published" as string,
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
    const fetchBook = async () => {
      try {
        const data = await booksApi.getById(bookId)
        setBook(data)
        setFormData({
          title: data.title || "",
          subtitle: data.subtitle || "",
          description: data.description || "",
          pages: data.pages ? data.pages.toString() : "",
          isbn: data.isbn || "",
          publisher: data.publisher || "CAC Publications",
          category: data.category || "Spiritual Growth",
          year: data.publication_year || "",
          featured: data.featured || false,
          status: data.status || "published",
          excerpt: data.excerpt || "",
          coverImage: null,
          pdfFile: null,
        })
        if (data.key_themes) {
          try {
            const themes = typeof data.key_themes === 'string' ? JSON.parse(data.key_themes) : data.key_themes
            setKeyThemes(Array.isArray(themes) ? themes : [])
          } catch { setKeyThemes([]) }
        }
        if (data.table_of_contents) {
          try {
            const toc = typeof data.table_of_contents === 'string' ? JSON.parse(data.table_of_contents) : data.table_of_contents
            setTableOfContents(Array.isArray(toc) ? toc : [])
          } catch { setTableOfContents([]) }
        }
      } catch (error) {
        console.error("Failed to fetch book:", error)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) fetchBook()
  }, [bookId, isAuthenticated])

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

  if (!isAuthenticated) return null

  if (!book) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
          <Link href="/admin">
            <Button className="bg-red-600 hover:bg-red-700 text-white">Back to Admin</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const bookData: Partial<Book> = {
        title: formData.title,
        subtitle: formData.subtitle || null,
        description: formData.description,
        pages: formData.pages ? parseInt(formData.pages) : null,
        isbn: formData.isbn || null,
        publisher: formData.publisher,
        category: formData.category,
        publication_year: formData.year,
        featured: formData.featured,
        status: formData.status as 'draft' | 'published',
        excerpt: formData.excerpt || null,
        key_themes: JSON.stringify(keyThemes),
        table_of_contents: JSON.stringify(tableOfContents),
      }

      await booksApi.update(bookId, bookData)

      if (formData.coverImage) {
        await booksApi.uploadCover(bookId, formData.coverImage)
      }

      if (formData.pdfFile) {
        await booksApi.uploadPdf(bookId, formData.pdfFile)
      }

      alert("Book updated successfully!")
      router.push("/admin")
    } catch (error: any) {
      console.error("Failed to update book:", error)
      alert(error.message || "Failed to update book. Please try again.")
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
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm md:text-base">Back to Admin</span>
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
                  {book.cover_image && (
                    <div className="mb-3">
                      <img
                        src={getFileUrl(book.cover_image)}
                        alt="Current cover"
                        className="w-24 h-32 object-cover border-2 border-black"
                      />
                      <p className="text-xs text-gray-500 mt-1">Current cover</p>
                    </div>
                  )}
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
                      {book.cover_image ? "Replace cover image" : "Upload cover image"}
                    </label>
                    <p className="text-xs text-gray-600 mt-1">JPG or PNG, max 5MB</p>
                    {formData.coverImage && (
                      <p className="text-xs text-green-600 mt-2">New: {formData.coverImage.name}</p>
                    )}
                  </div>
                </div>

                {/* PDF Document */}
                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">PDF DOCUMENT</label>
                  {book.pdf_file && (
                    <p className="text-xs text-gray-500 mb-3">Current: {book.pdf_file.split('/').pop()}</p>
                  )}
                  <div className="border-2 border-dashed border-gray-300 p-4 text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" id="pdf-upload" />
                    <label
                      htmlFor="pdf-upload"
                      className="cursor-pointer text-red-600 hover:text-red-700 font-bold text-sm"
                    >
                      {book.pdf_file ? "Replace PDF" : "Upload PDF"}
                    </label>
                    <p className="text-xs text-gray-600 mt-1">PDF format, max 50MB</p>
                    {formData.pdfFile && <p className="text-xs text-green-600 mt-2">New: {formData.pdfFile.name}</p>}
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
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
