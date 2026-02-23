"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Search, Filter, Bell, BookOpen, Star, Download, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { publicApi, type PublicTheme, type RecentSermon } from "@/lib/api"

const SERMONS_PER_PAGE = 6

export default function SermonsPage() {
  const [themes, setThemes] = useState<PublicTheme[]>([])
  const [allSermons, setAllSermons] = useState<RecentSermon[]>([])
  const [filteredSermons, setFilteredSermons] = useState<RecentSermon[]>([])
  const [displayedSermons, setDisplayedSermons] = useState<RecentSermon[]>([])
  const [selectedTheme, setSelectedTheme] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [themesData, sermonsData] = await Promise.all([
          publicApi.themes.getAll(),
          publicApi.sermons.getRecent()
        ])

        // Sort sermons by sermon_date in ascending order (oldest first)
        const sortedSermons = [...sermonsData].sort((a, b) => {
          const dateA = new Date(a.date).getTime()
          const dateB = new Date(b.date).getTime()
          return dateA - dateB
        })

        setThemes(themesData)
        setAllSermons(sortedSermons)
        setFilteredSermons(sortedSermons)
        setDisplayedSermons(sortedSermons.slice(0, SERMONS_PER_PAGE))
        setHasMore(sortedSermons.length > SERMONS_PER_PAGE)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch sermons data:', err)
        setError('Failed to load sermons')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = allSermons

    // Filter by theme
    if (selectedTheme !== "all") {
      // Find the selected theme to get its name
      const selectedThemeData = themes.find(t => String(t.id) === String(selectedTheme))
      if (selectedThemeData) {
        filtered = filtered.filter(sermon =>
          sermon.theme.toLowerCase() === selectedThemeData.name.toLowerCase()
        )
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(sermon =>
        sermon.title.toLowerCase().includes(query) ||
        sermon.description.toLowerCase().includes(query) ||
        sermon.theme.toLowerCase().includes(query)
      )
    }

    setFilteredSermons(filtered)
    // Reset displayed sermons when filter changes
    setDisplayedSermons(filtered.slice(0, SERMONS_PER_PAGE))
    setHasMore(filtered.length > SERMONS_PER_PAGE)
  }, [selectedTheme, searchQuery, allSermons, themes])

  // Load more sermons function
  const loadMoreSermons = useCallback(() => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)

    // Simulate a small delay for smooth UX
    setTimeout(() => {
      const currentLength = displayedSermons.length
      const nextSermons = filteredSermons.slice(currentLength, currentLength + SERMONS_PER_PAGE)

      setDisplayedSermons(prev => [...prev, ...nextSermons])
      setHasMore(currentLength + nextSermons.length < filteredSermons.length)
      setLoadingMore(false)
    }, 500)
  }, [loadingMore, hasMore, displayedSermons.length, filteredSermons])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreSermons()
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loadingMore, loadMoreSermons])

  const handleNotifyMe = () => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">SERMONS</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover profound biblical truths through powerful messages that inspire, challenge, and transform lives.
            </p>
          </div>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading sermons...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">SERMONS</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover profound biblical truths through powerful messages that inspire, challenge, and transform lives.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="border-2 border-black hover:bg-gray-100"
            >
              Try Again
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">SERMONS</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover profound biblical truths through powerful messages that inspire, challenge, and transform lives.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search sermons, themes, or topics..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Theme Filter */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                className="px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 bg-white"
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
              >
                <option value="all">All Themes</option>
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Notification Button */}
            <Button
              onClick={handleNotifyMe}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              NOTIFY ME
            </Button>
          </div>

          {/* Search Results Info */}
          <div className="mt-4 text-sm text-gray-600">
            {searchQuery || selectedTheme !== "all" ? (
              <p>
                Showing {filteredSermons.length} sermon{filteredSermons.length !== 1 ? "s" : ""} 
                {searchQuery && ` for "${searchQuery}"`}
                {selectedTheme !== "all" && ` in ${themes.find(t => String(t.id) === String(selectedTheme))?.name}`}
              </p>
            ) : (
              <p>Showing all {allSermons.length} sermons</p>
            )}
          </div>
        </div>

        {/* Notification Banner */}
        {showNotification && (
          <div className="mb-6 bg-green-100 border-2 border-green-600 text-green-800 px-4 py-3 flex items-center justify-between">
            <span className="font-medium">✓ You'll be notified when new sermons are available!</span>
            <Button 
              onClick={() => setShowNotification(false)}
              variant="ghost"
              className="text-green-800 hover:text-green-900"
            >
              ✕
            </Button>
          </div>
        )}

        {/* Featured Themes Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 border-b-2 border-black pb-4">SERMON THEMES</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <Card key={theme.id} className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${theme.color}`}>
                      {theme.sermons.length} Sermon{theme.sermons.length !== 1 ? "s" : ""}
                      {theme.book && " • 1 Book"}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3">{theme.name}</h3>
                  <p className="text-sm text-gray-700 mb-4">{theme.description}</p>
                  
                  {/* Associated Book */}
                  {theme.book && (
                    <div className="bg-gray-50 p-3 rounded mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-16 bg-black border border-black overflow-hidden flex-shrink-0">
                          <Image
                            src={theme.book.cover || "/placeholder.svg"}
                            alt={theme.book.title}
                            width={48}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold mb-1 leading-tight">{theme.book.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{theme.book.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{theme.book.pages}p</span>
                            <span>•</span>
                            <span>{theme.book.year}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Link href={`/books/${theme.book.id}`} className="flex-1">
                          <Button size="sm" variant="outline" className="w-full text-xs border-2 border-black">
                            <Eye className="w-3 h-3 mr-1" />
                            VIEW
                          </Button>
                        </Link>
                        <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs">
                          <Download className="w-3 h-3 mr-1" />
                          GET
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    {theme.recentSermons.slice(0, 2).map((sermon) => (
                      <div key={sermon.id} className="text-xs text-gray-600">
                        • {sermon.title}
                      </div>
                    ))}
                    {theme.sermons.length > 2 && (
                      <div className="text-xs text-gray-500">+ {theme.sermons.length - 2} more sermons</div>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => setSelectedTheme(theme.id)}
                    variant="outline"
                    className="w-full border-2 border-black hover:bg-red-600 hover:text-white"
                  >
                    VIEW SERMONS
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sermons List */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-black pb-4">
              {selectedTheme === "all" ? "ALL SERMONS" : `${themes.find(t => String(t.id) === String(selectedTheme))?.name.toUpperCase()} SERMONS`}
            </h2>
            {selectedTheme !== "all" && (
              <Button
                onClick={() => setSelectedTheme("all")}
                variant="outline"
                className="border-2 border-black hover:bg-gray-100"
              >
                VIEW ALL
              </Button>
            )}
          </div>

          {filteredSermons.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                {searchQuery || selectedTheme !== "all"
                  ? "No sermons found matching your criteria."
                  : "No sermons available."}
              </p>
              {(searchQuery || selectedTheme !== "all") && (
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedTheme("all")
                  }}
                  variant="outline"
                  className="border-2 border-black hover:bg-gray-100"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-6 mb-8">
                {displayedSermons.map((sermon) => (
                  <Card key={sermon.id} className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-6">
                        <div className="md:col-span-3">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sermon.themeColor}`}>
                              {sermon.theme}
                            </span>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {sermon.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {sermon.duration}
                              </div>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-3">{sermon.title}</h3>
                          <p className="text-gray-700 mb-4 leading-relaxed">{sermon.description}</p>
                        </div>

                        <div className="flex flex-col justify-center">
                          <Link href={`/sermons/${sermon.id}`}>
                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white mb-3">
                              READ SERMON
                            </Button>
                          </Link>

                          {/* Media availability indicators */}
                          <div className="flex justify-center gap-2">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                              <span>TEXT</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Infinite scroll loader */}
              <div ref={loaderRef} className="py-8">
                {loadingMore && (
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                    <p className="text-sm text-gray-600">Loading more sermons...</p>
                  </div>
                )}
                {!hasMore && displayedSermons.length > 0 && (
                  <p className="text-center text-gray-500 text-sm">
                    You've reached the end • {filteredSermons.length} sermon{filteredSermons.length !== 1 ? 's' : ''} total
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}