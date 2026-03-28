"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Search, Bell, BookOpen, Eye, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Link from "next/link"
import Image from "next/image"
import { publicApi, getFileUrl, type PublicTheme } from "@/lib/api"
import { cachedApi } from "@/lib/cached-api"

export default function SermonsPage() {
  const [themes, setThemes] = useState<PublicTheme[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(false)
  const [modalTheme, setModalTheme] = useState<PublicTheme | null>(null)
  const [showSubscribeModal, setShowSubscribeModal] = useState(false)
  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        setLoading(true)
        const themesData = await cachedApi.themes.getAll()
        if (cancelled) return
        setThemes(themesData)
        setError(null)
      } catch (err: any) {
        if (cancelled) return
        if (err?.name === 'AbortError' || err?.message?.includes('aborted')) return
        console.error('Failed to fetch themes:', err)
        setError('Failed to load sermons')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [])

  const filteredThemes = searchQuery.trim()
    ? themes.filter(theme => {
        const query = searchQuery.toLowerCase()
        return (
          theme.name.toLowerCase().includes(query) ||
          theme.description.toLowerCase().includes(query) ||
          theme.sermons.some(s => s.title.toLowerCase().includes(query))
        )
      })
    : themes

  const handleNotifyMe = () => {
    setShowSubscribeModal(true)
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subscribeEmail.trim()) return

    setSubscribing(true)
    try {
      await publicApi.subscribe.submit(subscribeEmail)
      setShowSubscribeModal(false)
      setSubscribeEmail("")
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    } catch (error: any) {
      alert(error.message || "Failed to subscribe. Please try again.")
    } finally {
      setSubscribing(false)
    }
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

        {/* Search and Actions */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search themes or sermon titles..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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

          {searchQuery.trim() && (
            <div className="mt-4 text-sm text-gray-600">
              <p>
                Showing {filteredThemes.length} theme{filteredThemes.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>

        {/* Notification Banner */}
        {showNotification && (
          <div className="mb-6 bg-green-100 border-2 border-green-600 text-green-800 px-4 py-3 flex items-center justify-between">
            <span className="font-medium">✓ You&apos;ve been subscribed! You&apos;ll be notified when new sermons are available.</span>
            <Button
              onClick={() => setShowNotification(false)}
              variant="ghost"
              className="text-green-800 hover:text-green-900"
            >
              ✕
            </Button>
          </div>
        )}

        {/* Sermon Themes */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 border-b-2 border-black pb-4">SERMON THEMES</h2>

          {filteredThemes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No themes found matching your search.</p>
              <Button
                onClick={() => setSearchQuery("")}
                variant="outline"
                className="border-2 border-black hover:bg-gray-100"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredThemes.map((theme) => (
                <Card key={theme.id} className="border-2 border-black bg-white hover:bg-gray-50 transition-colors overflow-hidden">
                  {theme.image && (
                    <div className="relative h-40">
                      <img
                        src={getFileUrl(theme.image)}
                        alt={theme.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${theme.color}`}>
                          {theme.sermons.length} Sermon{theme.sermons.length !== 1 ? "s" : ""}
                          {theme.book && " • 1 Book"}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2">{theme.name}</h3>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    {!theme.image && (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${theme.color}`}>
                            {theme.sermons.length} Sermon{theme.sermons.length !== 1 ? "s" : ""}
                            {theme.book && " • 1 Book"}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-3">{theme.name}</h3>
                      </>
                    )}
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
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold mb-1 leading-tight">{theme.book.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
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
                      onClick={() => setModalTheme(theme)}
                      variant="outline"
                      className="w-full border-2 border-black hover:bg-red-600 hover:text-white"
                    >
                      VIEW SERMONS
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Subscribe Modal */}
      <Dialog open={showSubscribeModal} onOpenChange={setShowSubscribeModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-600" />
              SUBSCRIBE FOR UPDATES
            </DialogTitle>
            <DialogDescription>
              Enter your email to receive notifications when new sermons are published.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubscribe} className="space-y-4 mt-4">
            <input
              type="email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Button
              type="submit"
              disabled={subscribing}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-bold"
            >
              {subscribing ? "SUBSCRIBING..." : "SUBSCRIBE"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Theme Sermons Modal */}
      <Dialog open={!!modalTheme} onOpenChange={(open) => !open && setModalTheme(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-[#f5f1e8]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {modalTheme?.name}
            </DialogTitle>
            <DialogDescription>{modalTheme?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {modalTheme && [...modalTheme.sermons]
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((sermon, index) => (
                <Card key={sermon.id} className="border-2 border-black bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-gray-200 text-gray-800 px-2 py-0.5 text-xs font-medium">
                        Part {index + 1}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {sermon.date}
                        </div>
                        {sermon.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {sermon.duration}
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{sermon.title}</h3>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{sermon.summary}</p>
                    <Link href={`/sermons/${sermon.id}`}>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white" size="sm">
                        READ SERMON
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}

            {modalTheme && modalTheme.sermons.length === 0 && (
              <p className="text-center text-gray-600 py-4">No sermons available for this theme yet.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
