"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock, Loader2 } from "lucide-react"
import Link from "next/link"
import { getFileUrl, type PublicTheme, type ThemeSermon } from "@/lib/api"
import { cachedApi } from "@/lib/cached-api"

export function SermonsSection() {
  const [sermonThemes, setSermonThemes] = useState<PublicTheme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCollectionModal, setShowCollectionModal] = useState(false)
  const [selectedThemeForModal, setSelectedThemeForModal] = useState<PublicTheme | null>(null)
  const [modalSermons, setModalSermons] = useState<ThemeSermon[]>([])
  const [modalLoading, setModalLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        setLoading(true)
        const themesData = await cachedApi.themes.getAll()
        if (cancelled) return
        setSermonThemes(themesData)
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

  const handleExploreTheme = async (theme: PublicTheme) => {
    setSelectedThemeForModal(theme)
    setShowCollectionModal(true)
    setModalSermons([])
    setModalLoading(true)
    try {
      const sermons = await cachedApi.themes.getSermons(theme.id)
      setModalSermons(sermons)
    } catch (err) {
      console.error('Failed to fetch theme sermons:', err)
    } finally {
      setModalLoading(false)
    }
  }

  const sermonCount = (theme: PublicTheme) => theme.sermon_count ?? theme.recentSermons.length

  if (loading) {
    return (
      <section id="sermons" className="mt-16">
        <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">SERMON THEMES</h2>
          <Link href="/sermons" className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold hover:text-red-600 transition-colors">
            ALL SERMONS
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sermons...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="sermons" className="mt-16">
        <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">SERMON THEMES</h2>
          <Link href="/sermons" className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold hover:text-red-600 transition-colors">
            ALL SERMONS
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
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
      </section>
    )
  }

  return (
    <section id="sermons" className="mt-16">
      <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">SERMON THEMES</h2>
        <Link
          href="/sermons"
          className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold hover:text-red-600 transition-colors"
        >
          ALL SERMONS
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Themes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sermonThemes.map((theme) => (
          <div key={theme.name} className={`border-2 border-black bg-white hover:bg-gray-50 transition-colors overflow-hidden ${theme.image ? '' : 'p-6'}`}>
            {theme.image ? (
              <>
                <div className="relative h-40">
                  <img
                    src={getFileUrl(theme.image)}
                    alt={theme.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${theme.color}`}>
                      {sermonCount(theme)} Sermon{sermonCount(theme) !== 1 ? "s" : ""}{theme.book && " • 1 Book"}
                    </span>
                    <h4 className="font-bold text-lg sm:text-xl text-white mt-2">{theme.name}</h4>
                  </div>
                </div>
                <div className="p-6 pt-3">
                  <div className="space-y-2 mb-4">
                    {theme.recentSermons.slice(0, 2).map((sermon) => (
                      <div key={sermon.id} className="text-xs sm:text-sm text-gray-600">
                        • {sermon.title}
                      </div>
                    ))}
                    {sermonCount(theme) > 2 && (
                      <div className="text-xs sm:text-sm text-gray-500">+ {sermonCount(theme) - 2} more sermons</div>
                    )}
                  </div>
                  <Button onClick={() => handleExploreTheme(theme)} variant="outline" className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent">
                    EXPLORE THEME
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${theme.color}`}>
                    {sermonCount(theme)} Sermon{sermonCount(theme) !== 1 ? "s" : ""}{theme.book && " • 1 Book"}
                  </span>
                </div>
                <h4 className="font-bold text-lg sm:text-xl mb-3">{theme.name}</h4>
                <div className="space-y-2 mb-4">
                  {theme.recentSermons.slice(0, 2).map((sermon) => (
                    <div key={sermon.id} className="text-xs sm:text-sm text-gray-600">
                      • {sermon.title}
                    </div>
                  ))}
                  {sermonCount(theme) > 2 && (
                    <div className="text-xs sm:text-sm text-gray-500">+ {sermonCount(theme) - 2} more sermons</div>
                  )}
                </div>
                <Button onClick={() => handleExploreTheme(theme)} variant="outline" className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent">
                  EXPLORE THEME
                </Button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Collection Modal */}
      {showCollectionModal && selectedThemeForModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">{selectedThemeForModal.name.toUpperCase()} COLLECTION</h3>
                <Button
                  onClick={() => setShowCollectionModal(false)}
                  variant="outline"
                  className="border-2 border-black hover:bg-gray-100"
                >
                  ✕
                </Button>
              </div>

              <p className="text-gray-700 mb-8">{selectedThemeForModal.description}</p>

              {/* Associated Book */}
              {selectedThemeForModal.book && (
                <div className="mb-8 p-6 bg-gray-50 border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-red-600" />
                    <h4 className="text-lg font-bold">ASSOCIATED BOOK</h4>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                      <img
                        src={selectedThemeForModal.book.cover || "/placeholder.svg"}
                        alt={selectedThemeForModal.book.title}
                        className="w-full max-w-[150px] mx-auto border-2 border-black"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <h5 className="text-xl font-bold mb-1">{selectedThemeForModal.book.title}</h5>
                      <p className="text-gray-600 mb-3">{selectedThemeForModal.book.subtitle}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>{selectedThemeForModal.book.pages} pages</span>
                        <span>{selectedThemeForModal.book.year}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <Link href={`/books/${selectedThemeForModal.book.id}`}>
                          <Button
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => setShowCollectionModal(false)}
                          >
                            VIEW BOOK
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sermons in Collection */}
              <div>
                <h4 className="text-lg font-bold mb-4 border-b-2 border-black pb-2">
                  SERMONS IN THIS COLLECTION ({modalLoading ? '...' : modalSermons.length})
                </h4>

                {modalLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-red-600 mb-3" />
                    <p className="text-sm text-gray-600">Loading sermons...</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {[...modalSermons]
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((sermon, index) => (
                      <div
                        key={sermon.id}
                        className="border-2 border-gray-300 bg-white hover:bg-gray-50 transition-colors p-4 cursor-pointer"
                        onClick={() => {
                          setShowCollectionModal(false)
                          window.location.href = `/sermons/${sermon.id}`
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium">
                            Part {index + 1}
                          </span>
                          <div className="flex gap-1">
                            {sermon.has_audio && (
                              <div className="w-2 h-2 bg-green-600 rounded-full" title="Audio Available"></div>
                            )}
                            {sermon.has_video && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full" title="Video Available"></div>
                            )}
                            {sermon.has_text && (
                              <div className="w-2 h-2 bg-gray-600 rounded-full" title="Text Available"></div>
                            )}
                          </div>
                        </div>

                        <h5 className="font-bold text-sm mb-2 leading-tight">{sermon.title}</h5>

                        <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {sermon.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {sermon.duration}
                          </div>
                        </div>

                        <p className="text-xs text-gray-700 mb-2 line-clamp-2">{sermon.summary}</p>

                        {sermon.scripture && (
                          <div className="text-xs">
                            <span className="font-bold">Scripture:</span> {sermon.scripture}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
