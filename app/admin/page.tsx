"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { dashboardApi, booksApi, sermonsApi, themesApi, commentsApi, getFileUrl, type DashboardStats, type Activity, type Book, type Sermon, type Theme, type Comment } from "@/lib/api"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Save, Cog } from "lucide-react"
import { BatchExtractPanel } from "@/components/batch-extract-panel"
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
  MessageCircle,
  Check,
  XCircle,
  Upload,
} from "lucide-react"

// Data fetched from API
interface DashboardData {
  stats: DashboardStats
  recentActivity: Activity[]
  books: Book[]
  sermons: Sermon[]
  themes: Theme[]
}

export default function AdminPage() {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBatchExtract, setShowBatchExtract] = useState(false)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [showThemeModal, setShowThemeModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<{ id: number; title: string } | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [commentFilter, setCommentFilter] = useState<string>("pending")
  const [newTheme, setNewTheme] = useState({
    name: "",
    description: "",
    color_class: "bg-blue-100 text-blue-800",
    status: "active" as const,
  })
  const [themeImageFile, setThemeImageFile] = useState<File | null>(null)
  const [themeImagePreview, setThemeImagePreview] = useState<string | null>(null)

  useEffect(() => {
    requireAuth()
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData()
    }
  }, [isAuthenticated])

  const fetchDashboardData = async () => {
    try {
      setDataLoading(true)
      
      const [stats, activity, booksResponse, sermonsResponse, themesResponse] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getActivity(),
        booksApi.getAll({ limit: 20 }),
        sermonsApi.getAll({ limit: 20 }),
        themesApi.getAll({ limit: 20 })
      ])

      setDashboardData({
        stats,
        recentActivity: activity,
        books: booksResponse?.books,
        sermons: sermonsResponse?.sermons,
        themes: themesResponse?.themes,
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setDataLoading(false)
    }
  }

  const fetchComments = async (status?: string) => {
    try {
      setCommentsLoading(true)
      const response = await commentsApi.getAll({ limit: 50, status: status || commentFilter })
      setComments(response.comments)
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    } finally {
      setCommentsLoading(false)
    }
  }

  const handleApproveComment = async (id: number) => {
    try {
      await commentsApi.approve(id)
      setComments(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' as const } : c))
    } catch (error) {
      console.error('Failed to approve comment:', error)
      alert('Failed to approve comment')
    }
  }

  const handleRejectComment = async (id: number) => {
    try {
      await commentsApi.reject(id)
      setComments(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' as const } : c))
    } catch (error) {
      console.error('Failed to reject comment:', error)
      alert('Failed to reject comment')
    }
  }

  const handleDeleteComment = async (id: number) => {
    if (!confirm('Are you sure you want to delete this comment?')) return
    try {
      await commentsApi.delete(id)
      setComments(prev => prev.filter(c => c.id !== id))
    } catch (error) {
      console.error('Failed to delete comment:', error)
      alert('Failed to delete comment')
    }
  }

  // Show loading while checking authentication or fetching data
  if (isLoading || (isAuthenticated && dataLoading)) {
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

  // Don't render if data hasn't loaded yet
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold">Failed to load dashboard data</p>
          <button 
            onClick={fetchDashboardData} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const handleToggleFeatured = async (type: "book" | "sermon", id: number) => {
    try {
      if (type === "book") {
        const updatedBook = await booksApi.toggleFeatured(id)
        setDashboardData(prev => prev ? {
          ...prev,
          books: prev.books.map((book) => (book.id === id ? updatedBook : book))
        } : null)
      } else {
        const updatedSermon = await sermonsApi.toggleFeatured(id)
        setDashboardData(prev => prev ? {
          ...prev,
          sermons: prev.sermons.map((sermon) => (sermon.id === id ? updatedSermon : sermon))
        } : null)
      }
    } catch (error) {
      console.error('Failed to toggle featured status:', error)
      alert('Failed to update featured status. Please try again.')
    }
  }

  const handleDeleteBook = (book: { id: number; title: string }) => {
    setBookToDelete(book)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteBook = async () => {
    if (bookToDelete) {
      try {
        await booksApi.delete(bookToDelete.id)
        setDashboardData(prev => prev ? {
          ...prev,
          books: prev.books.filter((book) => book.id !== bookToDelete.id)
        } : null)
        setShowDeleteConfirm(false)
        setBookToDelete(null)
        alert("Book deleted successfully!")
      } catch (error) {
        console.error('Failed to delete book:', error)
        alert('Failed to delete book. Please try again.')
      }
    }
  }

  const handleThemeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewTheme((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateTheme = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let createdTheme = await themesApi.create(newTheme)
      if (themeImageFile) {
        createdTheme = await themesApi.uploadImage(createdTheme.id, themeImageFile)
      }
      setDashboardData(prev => prev ? {
        ...prev,
        themes: [...prev.themes, createdTheme]
      } : null)
      setShowThemeModal(false)
      setNewTheme({
        name: "",
        description: "",
        color_class: "bg-blue-100 text-blue-800",
        status: "active",
      })
      setThemeImageFile(null)
      setThemeImagePreview(null)
      alert("Theme created successfully!")
    } catch (error) {
      console.error('Failed to create theme:', error)
      alert('Failed to create theme. Please try again.')
    }
  }

  const handleDeleteTheme = async (theme: Theme) => {
    if (confirm(`Are you sure you want to delete the theme "${theme.name}"? This will also remove it from any associated sermons.`)) {
      try {
        await themesApi.delete(theme.id)
        setDashboardData(prev => prev ? {
          ...prev,
          themes: prev.themes.filter(t => t.id !== theme.id)
        } : null)
        alert('Theme deleted successfully!')
      } catch (error) {
        console.error('Failed to delete theme:', error)
        alert('Failed to delete theme. It may have associated sermons.')
      }
    }
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
    { id: "comments", label: "Comments", icon: MessageCircle },
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
                <p className="text-xl md:text-3xl font-bold">{dashboardData.stats.totalBooks}</p>
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
                <p className="text-xl md:text-3xl font-bold">{dashboardData.stats.totalSermons}</p>
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
                <p className="text-xl md:text-3xl font-bold">{dashboardData.stats.totalThemes}</p>
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
                <p className="text-xl md:text-3xl font-bold">{dashboardData.stats.totalViews.toLocaleString()}</p>
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
            {dashboardData.recentActivity.map((activity, index) => (
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
        {dashboardData.books.map((book) => (
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
                      Published: {book.publication_year || 'N/A'}
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
        <div className="flex gap-2">
          <Button
            onClick={() => setShowBatchExtract(true)}
            variant="outline"
            className="border-2 border-black hover:bg-gray-100 w-full sm:w-auto"
          >
            <Cog className="w-4 h-4 mr-2" />
            Run PDF Extraction
          </Button>
          <Link href="/admin/sermons/new">
            <Button className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add New Sermon
            </Button>
          </Link>
        </div>
      </div>
      <BatchExtractPanel open={showBatchExtract} onOpenChange={setShowBatchExtract} />

      <div className="grid gap-4">
        {dashboardData.sermons.map((sermon) => (
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
                  <p className="text-gray-600 mb-2 text-sm md:text-base">Theme: {sermon.theme?.name || 'No theme'}</p>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(sermon.sermon_date).toLocaleDateString()}
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
        {dashboardData.themes.map((theme) => (
          <Card key={theme.id} className="border-2 border-black bg-white">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {theme.image && (
                    <img
                      src={getFileUrl(theme.image)}
                      alt={theme.name}
                      className="w-16 h-16 object-cover border border-gray-300 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold mb-2">{theme.name}</h3>
                  <p className="text-gray-600 mb-2 text-sm md:text-base">
                    {theme.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                    <span>{theme.sermon_count || 0} sermons</span>
                    <span>{theme.book_count || 0} books</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      theme.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {theme.status.charAt(0).toUpperCase() + theme.status.slice(1)}
                    </span>
                  </div>
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
                  <Link href={`/admin/themes/${theme.id}/edit`}>
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
                    onClick={() => handleDeleteTheme(theme)}
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

  const renderComments = () => {
    // Fetch comments when tab is first shown
    if (comments.length === 0 && !commentsLoading) {
      fetchComments()
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-bold">COMMENT MANAGEMENT</h2>
          <div className="flex items-center gap-2">
            {["pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setCommentFilter(status)
                  fetchComments(status)
                }}
                className={`px-3 py-1 text-sm font-bold border-2 border-black transition-colors ${
                  commentFilter === status
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {status.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {commentsLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-3"></div>
            <p className="text-gray-600">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <Card className="border-2 border-black bg-white">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No {commentFilter} comments found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="border-2 border-black bg-white">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-bold text-sm">{comment.name}</span>
                        <span className="text-xs text-gray-500">{comment.email}</span>
                        <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                          comment.status === 'approved' ? 'bg-green-100 text-green-800' :
                          comment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {comment.status.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-400">
                          {comment.entity_type === 'sermon' ? 'Sermon' : 'Book'} #{comment.entity_id}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{comment.comment}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.created_at).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {comment.status !== 'approved' && (
                        <Button
                          onClick={() => handleApproveComment(comment.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 h-8 text-xs"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                      )}
                      {comment.status !== 'rejected' && (
                        <Button
                          onClick={() => handleRejectComment(comment.id)}
                          variant="outline"
                          className="border-2 border-black hover:bg-yellow-50 bg-transparent px-3 py-1 h-8 text-xs"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDeleteComment(comment.id)}
                        variant="outline"
                        className="border-2 border-black hover:bg-red-50 bg-transparent text-red-600 px-3 py-1 h-8 text-xs"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

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
          {activeTab === "comments" && renderComments()}
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
                    <label className="block text-xs md:text-sm font-bold mb-2">THEME IMAGE</label>
                    <div className="border-2 border-dashed border-gray-400 p-4 text-center">
                      {themeImagePreview ? (
                        <div className="space-y-3">
                          <img src={themeImagePreview} alt="Preview" className="w-full h-40 object-cover mx-auto" />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => { setThemeImageFile(null); setThemeImagePreview(null) }}
                            className="border-2 border-black hover:bg-gray-100 bg-transparent"
                          >
                            <X className="w-3 h-3 mr-1" /> Remove
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block py-4">
                          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Click to upload an image</p>
                          <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (max 5MB)</p>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                setThemeImageFile(file)
                                setThemeImagePreview(URL.createObjectURL(file))
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold mb-2">THEME COLOR</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                      {colorOptions.map((option) => (
                        <label key={option.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="color_class"
                            value={option.value}
                            checked={newTheme.color_class === option.value}
                            onChange={handleThemeInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`p-2 md:p-3 border-2 rounded text-center text-xs md:text-sm font-bold transition-colors ${
                              newTheme.color_class === option.value ? "border-black" : "border-gray-300 hover:border-gray-400"
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
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${newTheme.color_class}`}>
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
