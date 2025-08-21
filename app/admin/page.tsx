"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Save } from "lucide-react"
import {
  BookOpen,
  FileText,
  Settings,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Calendar,
  Clock,
  Menu,
  X,
} from "lucide-react"

// Mock data - in a real app, this would come from a database
const mockStats = {
  totalBooks: 2,
  totalSermons: 14,
  totalThemes: 2,
  totalViews: 15420,
  recentActivity: [
    { type: "sermon", action: "viewed", item: "Faith When We Face Trials", time: "2 hours ago" },
    { type: "book", action: "downloaded", item: "The Righteous Shall Live by Faith", time: "4 hours ago" },
    { type: "sermon", action: "viewed", item: "What is Faith?", time: "6 hours ago" },
    { type: "book", action: "viewed", item: "Journey of Love", time: "1 day ago" },
  ],
}

const mockBooks = [
  {
    id: 2,
    title: "THE RIGHTEOUS SHALL LIVE BY FAITH",
    subtitle: "Messages on Faith and Righteous Living",
    status: "published",
    featured: true,
    pages: 105,
    downloads: 234,
    publishDate: "2025-01-01",
  },
  {
    id: 1,
    title: "JOURNEY OF LOVE",
    subtitle: "Messages on the Love of God",
    status: "published",
    featured: false,
    pages: 91,
    downloads: 456,
    publishDate: "2024-12-01",
  },
]

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
  },
]

export default function AdminPage() {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [books, setBooks] = useState(mockBooks)
  const [sermons, setSermons] = useState(mockSermons)
  const [showThemeModal, setShowThemeModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<{ id: number; title: string } | null>(null)
  const [newTheme, setNewTheme] = useState({
    name: "",
    description: "",
    color: "bg-blue-100 text-blue-800",
    status: "active",
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

  const handleToggleFeatured = (type: "book" | "sermon", id: number) => {
    if (type === "book") {
      setBooks(books.map((book) => (book.id === id ? { ...book, featured: !book.featured } : book)))
    } else {
      setSermons(sermons.map((sermon) => (sermon.id === id ? { ...sermon, featured: !sermon.featured } : sermon)))
    }
  }

  const handleDeleteBook = (book: { id: number; title: string }) => {
    setBookToDelete(book)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteBook = () => {
    if (bookToDelete) {
      setBooks(books.filter((book) => book.id !== bookToDelete.id))
      setShowDeleteConfirm(false)
      setBookToDelete(null)
      alert("Book deleted successfully!")
    }
  }

  const handleThemeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewTheme((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateTheme = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("Theme data:", newTheme)
    alert("Theme created successfully!")
    setShowThemeModal(false)
    setNewTheme({
      name: "",
      description: "",
      color: "bg-blue-100 text-blue-800",
      status: "active",
    })
  }

  const colorOptions = [
    { value: "bg-red-100 text-red-800", label: "Red", preview: "bg-red-100" },
    { value: "bg-blue-100 text-blue-800", label: "Blue", preview: "bg-blue-100" },
    { value: "bg-green-100 text-green-800", label: "Green", preview: "bg-green-100" },
    { value: "bg-purple-100 text-purple-800", label: "Purple", preview: "bg-purple-100" },
    { value: "bg-yellow-100 text-yellow-800", label: "Yellow", preview: "bg-yellow-100" },
    { value: "bg-indigo-100 text-indigo-800", label: "Indigo", preview: "bg-indigo-100" },
  ]

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "books", label: "Books", icon: BookOpen },
    { id: "sermons", label: "Sermons", icon: FileText },
    { id: "themes", label: "Themes", icon: Settings },
  ]

  const renderDashboard = () => (
    <div className="space-y-6 md:space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card className="border-2 border-black bg-white">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Total Books</p>
                <p className="text-xl md:text-3xl font-bold">{mockStats.totalBooks}</p>
              </div>
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black bg-white">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Total Sermons</p>
                <p className="text-xl md:text-3xl font-bold">{mockStats.totalSermons}</p>
              </div>
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black bg-white">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Themes</p>
                <p className="text-xl md:text-3xl font-bold">{mockStats.totalThemes}</p>
              </div>
              <Settings className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black bg-white">
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-xl md:text-3xl font-bold">{mockStats.totalViews.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-2 border-black bg-white">
        <CardContent className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3 md:space-y-4">
            {mockStats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-gray-50 rounded">
                {activity.type === "book" ? (
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-red-600 flex-shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm">
                    <span className="font-medium truncate block md:inline">{activity.item}</span>
                    <span className="block md:inline"> was {activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBooks = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Manage Books</h2>
        <Link href="/admin/books/new">
          <Button className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add New Book
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {books.map((book) => (
          <Card key={book.id} className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                    <h3 className="text-base md:text-lg font-bold truncate">{book.title}</h3>
                    {book.featured && (
                      <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded whitespace-nowrap">
                        FEATURED
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded whitespace-nowrap ${
                        book.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {book.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2 text-sm md:text-base">{book.subtitle}</p>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                    <span>{book.pages} pages</span>
                    <span>{book.downloads} downloads</span>
                    <span className="hidden sm:inline">
                      Published: {new Date(book.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end md:justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFeatured("book", book.id)}
                    className="border-2 border-black hover:bg-gray-100 p-2"
                    title={book.featured ? "Remove from featured" : "Mark as featured"}
                  >
                    <Star className={`w-4 h-4 ${book.featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </Button>
                  <Link href={`/admin/books/${book.id}/view`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/books/${book.id}/edit`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteBook({ id: book.id, title: book.title })}
                    className="border-2 border-black hover:bg-red-100 bg-transparent p-2"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderSermons = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Manage Sermons</h2>
        <Link href="/admin/sermons/new">
          <Button className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add New Sermon
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {sermons.map((sermon) => (
          <Card key={sermon.id} className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                    <h3 className="text-base md:text-lg font-bold truncate">{sermon.title}</h3>
                    {sermon.featured && (
                      <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded whitespace-nowrap">
                        FEATURED
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded whitespace-nowrap ${
                        sermon.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {sermon.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2 text-sm md:text-base">Theme: {sermon.theme}</p>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {sermon.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {sermon.duration}
                    </div>
                    <span className="hidden sm:inline">{sermon.views} views</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end md:justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFeatured("sermon", sermon.id)}
                    className="border-2 border-black hover:bg-gray-100 p-2"
                    title={sermon.featured ? "Remove from featured" : "Mark as featured"}
                  >
                    <Star className={`w-4 h-4 ${sermon.featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </Button>
                  <Link href={`/admin/sermons/${sermon.id}/view`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/sermons/${sermon.id}/edit`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-black hover:bg-red-100 bg-transparent p-2"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderThemes = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Manage Themes</h2>
        <Button
          onClick={() => setShowThemeModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Theme
        </Button>
      </div>

      <div className="grid gap-4">
        <Card className="border-2 border-black bg-white">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold mb-2">The Righteous Shall Live by Faith</h3>
                <p className="text-gray-600 mb-2 text-sm md:text-base">
                  A comprehensive exploration of living by faith
                </p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                  <span>5 sermons</span>
                  <span>1 book</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Active</span>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end md:justify-start">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-black hover:bg-red-100 bg-transparent p-2"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black bg-white">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold mb-2">Journey of Love</h3>
                <p className="text-gray-600 mb-2 text-sm md:text-base">
                  Exploring God's love through the advent season
                </p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                  <span>9 sermons</span>
                  <span>1 book</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end md:justify-start">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-black hover:bg-red-100 bg-transparent p-2"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />
      <AdminHeader />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4">ADMIN PANEL</h1>
              <p className="text-sm md:text-lg text-gray-700">
                Manage your website content, books, sermons, and themes
              </p>
            </div>
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden bg-red-600 hover:bg-red-700 text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mb-6">
            <Card className="border-2 border-black bg-white">
              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`flex flex-col items-center gap-2 p-4 font-bold border-r border-b border-black last:border-r-0 transition-colors ${
                        activeTab === tab.id ? "bg-red-600 text-white" : "bg-white text-black hover:bg-gray-100"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="text-xs">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Desktop Navigation Tabs */}
        <div className="hidden md:block border-2 border-black bg-white mb-6 md:mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 font-bold border-r-2 border-black last:border-r-0 transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? "bg-red-600 text-white" : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px] md:min-h-[600px]">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "books" && renderBooks()}
          {activeTab === "sermons" && renderSermons()}
          {activeTab === "themes" && renderThemes()}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && bookToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white border-2 border-black max-w-md w-full">
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-bold text-red-600">DELETE BOOK</h2>
                  <Button
                    onClick={() => {
                      setShowDeleteConfirm(false)
                      setBookToDelete(null)
                    }}
                    variant="outline"
                    className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mb-6">
                  <p className="text-sm md:text-base mb-3">
                    Are you sure you want to delete this book? This action cannot be undone.
                  </p>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="font-bold text-sm">{bookToDelete.title}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => {
                      setShowDeleteConfirm(false)
                      setBookToDelete(null)
                    }}
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-black hover:bg-gray-100 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmDeleteBook}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Theme Modal */}
        {showThemeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white border-2 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-lg md:text-2xl font-bold">ADD NEW THEME</h2>
                  <Button
                    onClick={() => setShowThemeModal(false)}
                    variant="outline"
                    className="border-2 border-black hover:bg-gray-100 bg-transparent p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <form onSubmit={handleCreateTheme} className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-xs md:text-sm font-bold mb-2">THEME NAME *</label>
                    <input
                      type="text"
                      name="name"
                      value={newTheme.name}
                      onChange={handleThemeInputChange}
                      required
                      className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter theme name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold mb-2">DESCRIPTION *</label>
                    <textarea
                      name="description"
                      value={newTheme.description}
                      onChange={handleThemeInputChange}
                      required
                      rows={4}
                      className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter theme description"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold mb-2">THEME COLOR</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                      {colorOptions.map((option) => (
                        <label key={option.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            value={option.value}
                            checked={newTheme.color === option.value}
                            onChange={handleThemeInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`p-2 md:p-3 border-2 rounded text-center text-xs md:text-sm font-bold transition-colors ${
                              newTheme.color === option.value ? "border-black" : "border-gray-300 hover:border-gray-400"
                            } ${option.preview}`}
                          >
                            {option.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold mb-2">STATUS</label>
                    <select
                      name="status"
                      value={newTheme.status}
                      onChange={handleThemeInputChange}
                      className="w-full border-2 border-black p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Preview */}
                  <div>
                    <h3 className="text-sm md:text-base font-bold mb-3">PREVIEW</h3>
                    <div className="border-2 border-gray-300 bg-white p-3 md:p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${newTheme.color}`}>
                          0 Sermons • 0 Books
                        </span>
                      </div>
                      <h4 className="font-bold text-sm md:text-base mb-2">{newTheme.name || "Theme Name"}</h4>
                      <div className="space-y-1 mb-3">
                        <div className="text-xs text-gray-600">• Sample sermon title</div>
                        <div className="text-xs text-gray-600">• Another sermon title</div>
                      </div>
                      <p className="text-xs text-gray-700 mb-3">
                        {newTheme.description || "Theme description will appear here..."}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent text-xs"
                        disabled
                      >
                        EXPLORE THEME
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-gray-200">
                    <Button
                      type="button"
                      onClick={() => setShowThemeModal(false)}
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-black hover:bg-gray-100 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Create Theme
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
