"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock, Loader2, Search, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getFileUrl, type PublicTheme, type ThemeSermon } from "@/lib/api"
import { cachedApi } from "@/lib/cached-api"

// Themes shown inline on the landing page; the rest live behind "browse all".
const PREVIEW_COUNT = 4

export function SermonsSection() {
  const [sermonThemes, setSermonThemes] = useState<PublicTheme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCollectionModal, setShowCollectionModal] = useState(false)
  const [selectedThemeForModal, setSelectedThemeForModal] = useState<PublicTheme | null>(null)
  const [modalSermons, setModalSermons] = useState<ThemeSermon[]>([])
  const [modalLoading, setModalLoading] = useState(false)
  const [showAllThemes, setShowAllThemes] = useState(false)
  const [themeQuery, setThemeQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement | null>(null)

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

  // Focus the search box when the "browse all" overlay opens.
  useEffect(() => {
    if (showAllThemes) {
      setThemeQuery("")
      const t = setTimeout(() => searchInputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [showAllThemes])

  const handleExploreTheme = async (theme: PublicTheme) => {
    setShowAllThemes(false)
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

  const previewThemes = sermonThemes.slice(0, PREVIEW_COUNT)

  const filteredThemes = useMemo(() => {
    const q = themeQuery.trim().toLowerCase()
    if (!q) return sermonThemes
    return sermonThemes.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.recentSermons.some((s) => s.title.toLowerCase().includes(q))
    )
  }, [sermonThemes, themeQuery])

  const SectionHeader = () => (
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
  )

  // Editorial index row: serial number + big theme name, sermons revealed on hover.
  const ThemeRow = ({ theme, index }: { theme: PublicTheme; index: number }) => (
    <button
      onClick={() => handleExploreTheme(theme)}
      className="group w-full text-left border-t-2 border-black px-2 py-5 hover:bg-white transition-colors"
    >
      <div className="flex items-baseline gap-4 sm:gap-6">
        <span className="flex-shrink-0 w-9 sm:w-14 text-2xl sm:text-4xl font-black text-red-600 tabular-nums leading-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3">
            <h4 className="text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-tight leading-tight group-hover:text-red-600 transition-colors">
              {theme.name}
            </h4>
            <span className="flex-shrink-0 text-[10px] sm:text-xs font-bold whitespace-nowrap text-gray-500 tracking-wide">
              {sermonCount(theme)} SERMON{sermonCount(theme) !== 1 ? "S" : ""}
              {theme.book && " · 1 BOOK"}
            </span>
          </div>
          {theme.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{theme.description}</p>
          )}
          {/* Hover reveal — smooth auto-height via grid trick */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
            <div className="overflow-hidden">
              <ul className="border-l-2 border-red-600 pl-4 mt-3 space-y-1">
                {theme.recentSermons.slice(0, 3).map((sermon) => (
                  <li key={sermon.id} className="text-sm text-gray-700 truncate">
                    ↳ {sermon.title}
                  </li>
                ))}
                {sermonCount(theme) > 3 && (
                  <li className="text-xs text-gray-500">+ {sermonCount(theme) - 3} more sermons</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <ChevronRight className="flex-shrink-0 w-5 h-5 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all self-center" />
      </div>
    </button>
  )

  if (loading) {
    return (
      <section id="sermons" className="mt-16">
        <SectionHeader />
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
        <SectionHeader />
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
      <SectionHeader />

      {/* Editorial index — preview a few themes */}
      <div className="border-b-2 border-black">
        {previewThemes.map((theme, index) => (
          <ThemeRow key={theme.id ?? theme.name} theme={theme} index={index} />
        ))}
      </div>

      {sermonThemes.length > PREVIEW_COUNT && (
        <div className="mt-6">
          <button
            onClick={() => setShowAllThemes(true)}
            className="inline-flex items-center gap-2 border-2 border-black px-5 py-3 text-sm sm:text-base font-bold hover:bg-black hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
            BROWSE ALL {sermonThemes.length} THEMES
          </button>
        </div>
      )}

      {/* Browse-all overlay with search */}
      {showAllThemes && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-4"
          onClick={() => setShowAllThemes(false)}
        >
          <div
            className="bg-[#f5f1e8] border-4 border-black max-w-3xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b-2 border-black">
              <h3 className="text-xl sm:text-2xl font-bold">ALL SERMON THEMES</h3>
              <Button
                onClick={() => setShowAllThemes(false)}
                variant="outline"
                className="border-2 border-black hover:bg-gray-100"
              >
                ✕
              </Button>
            </div>

            <div className="p-5 border-b-2 border-black">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={themeQuery}
                  onChange={(e) => setThemeQuery(e.target.value)}
                  placeholder="Search themes or sermon titles..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                />
              </div>
              {themeQuery.trim() && (
                <p className="mt-3 text-sm text-gray-600">
                  {filteredThemes.length} theme{filteredThemes.length !== 1 ? "s" : ""} found
                </p>
              )}
            </div>

            <div className="overflow-y-auto px-5 pb-5">
              {filteredThemes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No themes match your search.</p>
                  <Button
                    onClick={() => setThemeQuery("")}
                    variant="outline"
                    className="border-2 border-black hover:bg-gray-100"
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="border-b-2 border-black">
                  {filteredThemes.map((theme, index) => (
                    <ThemeRow key={theme.id ?? theme.name} theme={theme} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
