"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Calendar, BookOpen, Download, Eye, SortAsc, ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const categories = [
  "All Items",
  "Books & Publications",
  "Sermon Series",
  "Conference Messages",
  "Teaching Materials",
  "Pastoral Letters",
  "Ministry Reports",
]

const sortOptions = [
  { value: "date-desc", label: "Newest First" },
  { value: "date-asc", label: "Oldest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "category", label: "Category" },
]

const archiveItems = [
  {
    id: 1,
    title: "SHEPHERDING GOD'S FLOCK",
    subtitle: "Biblical Principles for Pastoral Ministry",
    category: "Books & Publications",
    type: "Book",
    year: "2024",
    date: "2024-03-15",
    description:
      "A comprehensive guide to faithful pastoral ministry rooted in Scripture and decades of experience in church leadership.",
    pages: 284,
    language: "English",
    format: ["PDF", "Print"],
    featured: true,
  },
  {
    id: 2,
    title: "OPERATION DECLARE & DECREE SERIES",
    subtitle: "Complete 12-Part Teaching Series",
    category: "Sermon Series",
    type: "Sermon Series",
    year: "2023",
    date: "2023-12-01",
    description:
      "Understanding the power of declaring God's Word and experiencing divine intervention through faith-filled declarations.",
    sessions: 12,
    totalDuration: "8 hours 45 minutes",
    format: ["Audio", "Video", "Text"],
    featured: true,
  },
  {
    id: 3,
    title: "THE PASTOR'S HEART",
    subtitle: "Leadership in Christ Apostolic Church",
    category: "Books & Publications",
    type: "Book",
    year: "2022",
    date: "2022-08-20",
    description:
      "Insights from decades of pastoral ministry and church leadership experience, focusing on servant leadership principles.",
    pages: 198,
    language: "English",
    format: ["PDF", "Print"],
    featured: false,
  },
  {
    id: 4,
    title: "HOURS OF DIVINE INTERVENTION",
    subtitle: "Prayer and Spiritual Warfare Conference",
    category: "Conference Messages",
    type: "Conference",
    year: "2023",
    date: "2023-06-10",
    description:
      "Powerful messages from the annual prayer conference focusing on breakthrough prayer and spiritual warfare.",
    sessions: 8,
    totalDuration: "6 hours 20 minutes",
    format: ["Audio", "Video"],
    featured: false,
  },
  {
    id: 5,
    title: "PASTORAL CARE & WELFARE MANUAL",
    subtitle: "Caring for God's Servants",
    category: "Teaching Materials",
    type: "Manual",
    year: "2021",
    date: "2021-11-15",
    description: "Comprehensive manual for implementing welfare schemes and empowerment programs in church ministry.",
    pages: 156,
    language: "English",
    format: ["PDF"],
    featured: false,
  },
  {
    id: 6,
    title: "FAITH IN ACTION SERIES",
    subtitle: "Living Out Biblical Faith",
    category: "Sermon Series",
    type: "Sermon Series",
    year: "2022",
    date: "2022-04-01",
    description: "A 10-part series exploring practical applications of faith in daily Christian living and ministry.",
    sessions: 10,
    totalDuration: "7 hours 15 minutes",
    format: ["Audio", "Text"],
    featured: false,
  },
  {
    id: 7,
    title: "QUARTERLY PASTORAL LETTER - Q4 2023",
    subtitle: "Preparing for the New Year",
    category: "Pastoral Letters",
    type: "Letter",
    year: "2023",
    date: "2023-12-20",
    description:
      "Pastoral guidance and encouragement for the congregation as we prepare to enter a new year with faith and purpose.",
    pages: 8,
    language: "English",
    format: ["PDF"],
    featured: false,
  },
  {
    id: 8,
    title: "MINISTRY IMPACT REPORT 2023",
    subtitle: "Annual Ministry Overview",
    category: "Ministry Reports",
    type: "Report",
    year: "2023",
    date: "2023-12-31",
    description: "Comprehensive report detailing ministry activities, achievements, and impact throughout 2023.",
    pages: 45,
    language: "English",
    format: ["PDF"],
    featured: false,
  },
  {
    id: 9,
    title: "DISCIPLESHIP FOUNDATIONS",
    subtitle: "Building Strong Christian Character",
    category: "Teaching Materials",
    type: "Study Guide",
    year: "2021",
    date: "2021-09-10",
    description:
      "Essential study guide for new believers and those seeking to deepen their understanding of Christian discipleship.",
    pages: 124,
    language: "English",
    format: ["PDF", "Print"],
    featured: false,
  },
  {
    id: 10,
    title: "LEADERSHIP DEVELOPMENT CONFERENCE 2022",
    subtitle: "Raising the Next Generation",
    category: "Conference Messages",
    type: "Conference",
    year: "2022",
    date: "2022-10-15",
    description:
      "Messages from the annual leadership conference focused on developing and mentoring emerging church leaders.",
    sessions: 6,
    totalDuration: "4 hours 30 minutes",
    format: ["Audio", "Video"],
    featured: false,
  },
]

// Mock sermon data by year
const sermonsByYear = {
  "2024": [
    {
      id: 101,
      title: "WALKING IN DIVINE PURPOSE",
      date: "2024-12-08",
      category: "Christian Living",
      duration: "42 min",
      scripture: "Jeremiah 29:11",
    },
    {
      id: 102,
      title: "THE POWER OF PERSISTENT PRAYER",
      date: "2024-11-24",
      category: "Faith & Prayer",
      duration: "38 min",
      scripture: "Luke 18:1-8",
    },
    {
      id: 103,
      title: "BUILDING ON THE ROCK",
      date: "2024-11-10",
      category: "Biblical Exposition",
      duration: "45 min",
      scripture: "Matthew 7:24-27",
    },
    {
      id: 104,
      title: "GRACE THAT TRANSFORMS",
      date: "2024-10-27",
      category: "Christian Living",
      duration: "40 min",
      scripture: "2 Corinthians 12:9",
    },
    {
      id: 105,
      title: "THE SHEPHERD'S VOICE",
      date: "2024-10-13",
      category: "Pastoral Leadership",
      duration: "47 min",
      scripture: "John 10:11-16",
    },
  ],
  "2023": [
    {
      id: 201,
      title: "OPERATION DECLARE AND DECREE - PART 12",
      date: "2023-12-17",
      category: "Operation Declare & Decree",
      duration: "44 min",
      scripture: "Isaiah 55:11",
    },
    {
      id: 202,
      title: "HOURS OF DIVINE INTERVENTION - BREAKTHROUGH",
      date: "2023-12-03",
      category: "Hours of Divine Intervention",
      duration: "52 min",
      scripture: "2 Chronicles 20:15",
    },
    {
      id: 203,
      title: "FAITH THAT MOVES MOUNTAINS",
      date: "2023-11-19",
      category: "Faith & Prayer",
      duration: "39 min",
      scripture: "Matthew 17:20",
    },
    {
      id: 204,
      title: "THE HEART OF WORSHIP",
      date: "2023-11-05",
      category: "Christian Living",
      duration: "43 min",
      scripture: "John 4:23-24",
    },
    {
      id: 205,
      title: "WALKING IN THE SPIRIT",
      date: "2023-10-22",
      category: "Biblical Exposition",
      duration: "46 min",
      scripture: "Galatians 5:16-25",
    },
    {
      id: 206,
      title: "THE GREAT COMMISSION",
      date: "2023-10-08",
      category: "Biblical Exposition",
      duration: "41 min",
      scripture: "Matthew 28:18-20",
    },
    {
      id: 207,
      title: "OVERCOMING FEAR WITH FAITH",
      date: "2023-09-24",
      category: "Faith & Prayer",
      duration: "37 min",
      scripture: "2 Timothy 1:7",
    },
    {
      id: 208,
      title: "THE ARMOR OF GOD",
      date: "2023-09-10",
      category: "Christian Living",
      duration: "48 min",
      scripture: "Ephesians 6:10-18",
    },
  ],
  "2022": [
    {
      id: 301,
      title: "LEADERSHIP DEVELOPMENT - PART 6",
      date: "2022-12-18",
      category: "Pastoral Leadership",
      duration: "45 min",
      scripture: "1 Timothy 3:1-7",
    },
    {
      id: 302,
      title: "FAITH IN ACTION - PART 10",
      date: "2022-12-04",
      category: "Faith & Prayer",
      duration: "43 min",
      scripture: "James 2:14-26",
    },
    {
      id: 303,
      title: "THE GOOD SHEPHERD",
      date: "2022-11-20",
      category: "Pastoral Leadership",
      duration: "41 min",
      scripture: "Psalm 23",
    },
    {
      id: 304,
      title: "LIVING BY FAITH",
      date: "2022-11-06",
      category: "Christian Living",
      duration: "39 min",
      scripture: "Habakkuk 2:4",
    },
    {
      id: 305,
      title: "THE POWER OF TESTIMONY",
      date: "2022-10-23",
      category: "Christian Living",
      duration: "44 min",
      scripture: "Revelation 12:11",
    },
    {
      id: 306,
      title: "STEWARDSHIP AND FAITHFULNESS",
      date: "2022-10-09",
      category: "Christian Living",
      duration: "42 min",
      scripture: "1 Corinthians 4:2",
    },
  ],
  "2021": [
    {
      id: 401,
      title: "DISCIPLESHIP FOUNDATIONS - PART 8",
      date: "2021-12-19",
      category: "Christian Living",
      duration: "40 min",
      scripture: "Matthew 28:19-20",
    },
    {
      id: 402,
      title: "THE CALL TO HOLINESS",
      date: "2021-12-05",
      category: "Christian Living",
      duration: "38 min",
      scripture: "1 Peter 1:15-16",
    },
    {
      id: 403,
      title: "PRAYER AND FASTING",
      date: "2021-11-21",
      category: "Faith & Prayer",
      duration: "46 min",
      scripture: "Matthew 17:21",
    },
    {
      id: 404,
      title: "THE FRUIT OF THE SPIRIT",
      date: "2021-11-07",
      category: "Biblical Exposition",
      duration: "44 min",
      scripture: "Galatians 5:22-23",
    },
  ],
}

export default function ArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Items")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Get years and sermon counts
  const yearStats = Object.entries(sermonsByYear)
    .map(([year, sermons]) => ({
      year,
      count: sermons.length,
    }))
    .sort((a, b) => Number.parseInt(b.year) - Number.parseInt(a.year))

  const filteredAndSortedItems = archiveItems
    .filter((item) => {
      const matchesCategory = selectedCategory === "All Items" || item.category === selectedCategory
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        case "category":
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

  const featuredItems = archiveItems.filter((item) => item.featured)

  const getItemIcon = (type: string) => {
    switch (type) {
      case "Book":
        return <BookOpen className="w-5 h-5" />
      case "Sermon Series":
        return <Calendar className="w-5 h-5" />
      case "Conference":
        return <Calendar className="w-5 h-5" />
      case "Manual":
        return <BookOpen className="w-5 h-5" />
      case "Letter":
        return <BookOpen className="w-5 h-5" />
      case "Report":
        return <BookOpen className="w-5 h-5" />
      case "Study Guide":
        return <BookOpen className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // If a year is selected, show sermons for that year
  if (selectedYear && sermonsByYear[selectedYear]) {
    const yearSermons = sermonsByYear[selectedYear]

    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />

        <main className="container mx-auto px-4 py-12">
          {/* Year Navigation */}
          <div className="mb-8">
            <Button
              onClick={() => setSelectedYear(null)}
              variant="outline"
              className="border-2 border-black hover:bg-black hover:text-white bg-transparent mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Archive
            </Button>

            <div className="border-2 border-black bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">SERMONS FROM {selectedYear}</h1>
                <span className="text-sm text-gray-600">{yearSermons.length} sermons</span>
              </div>

              {/* Year Selector */}
              <div className="flex flex-wrap gap-2">
                {yearStats.map(({ year, count }) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 border-2 border-black text-sm font-bold transition-colors ${
                      selectedYear === year ? "bg-red-600 text-white" : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {year} ({count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sermons List */}
          <div className="space-y-4">
            {yearSermons.map((sermon) => (
              <Card key={sermon.id} className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium">
                          {sermon.category}
                        </span>
                        <span className="text-xs text-gray-600">{sermon.duration}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-2">{sermon.title}</h3>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(sermon.date)}
                        </div>
                        <div>
                          <span className="font-bold">Scripture:</span> {sermon.scripture}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-2 border-black hover:bg-gray-100 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        VIEW
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-2 border-black hover:bg-red-600 hover:text-white bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        DOWNLOAD
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">MINISTRY ARCHIVE</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our comprehensive collection of books, sermon series, conference messages, and teaching materials
            from decades of faithful ministry.
          </p>
        </div>

        {/* Sermon Years Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b-2 border-black pb-4">SERMONS BY YEAR</h2>
          <div className="border-2 border-black bg-white p-8">
            <p className="text-gray-700 mb-6">
              Browse our extensive collection of sermons organized by year. Click on any year to explore all sermons
              preached during that period.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {yearStats.map(({ year, count }) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className="border-2 border-black bg-white hover:bg-red-600 hover:text-white transition-colors p-4 md:p-6 text-center group"
                >
                  <div className="text-2xl md:text-3xl font-bold mb-2">{year}</div>
                  <div className="text-xs md:text-sm font-medium">
                    {count} Sermon{count !== 1 ? "s" : ""}
                  </div>
                  <ChevronRight className="w-4 h-4 mx-auto mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Items */}
        {featuredItems.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 border-b-2 border-black pb-4">FEATURED ARCHIVE</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredItems.map((item) => (
                <Card key={item.id} className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold">FEATURED</span>
                      <div className="flex items-center gap-1 text-gray-600">
                        {getItemIcon(item.type)}
                        <span className="text-xs">{item.type}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.subtitle}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                      <span>{item.year}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                      {item.pages && (
                        <>
                          <span>•</span>
                          <span>{item.pages} pages</span>
                        </>
                      )}
                      {item.sessions && (
                        <>
                          <span>•</span>
                          <span>{item.sessions} sessions</span>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-4">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {item.format.map((format, index) => (
                          <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium rounded">
                            {format}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/archive/${item.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-2 border-black hover:bg-gray-100 bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            VIEW
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-2 border-black hover:bg-red-600 hover:text-white bg-transparent"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          DOWNLOAD
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Search, Filter, and Sort Controls */}
        <div className="border-2 border-black bg-white p-6 mb-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-bold mb-2">SEARCH ARCHIVE</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search titles, descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-bold mb-2">FILTER BY CATEGORY</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-bold mb-2">SORT BY</label>
              <div className="relative">
                <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-bold mb-2">VIEW MODE</label>
              <div className="flex border-2 border-black">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex-1 py-2 px-4 text-sm font-bold transition-colors ${
                    viewMode === "grid" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  GRID
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 py-2 px-4 text-sm font-bold border-l-2 border-black transition-colors ${
                    viewMode === "list" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  LIST
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Archive Items */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              {selectedCategory === "All Items" ? "ALL ARCHIVE ITEMS" : selectedCategory.toUpperCase()}
            </h2>
            <span className="text-sm text-gray-600">
              {filteredAndSortedItems.length} item{filteredAndSortedItems.length !== 1 ? "s" : ""} found
            </span>
          </div>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedItems.map((item) => (
                <Card key={item.id} className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium">{item.category}</span>
                      <div className="flex items-center gap-1 text-gray-600">
                        {getItemIcon(item.type)}
                        <span className="text-xs">{item.type}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg mb-2 leading-tight">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.subtitle}</p>

                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                      <span>{formatDate(item.date)}</span>
                      {item.pages && (
                        <>
                          <span>•</span>
                          <span>{item.pages} pages</span>
                        </>
                      )}
                      {item.sessions && (
                        <>
                          <span>•</span>
                          <span>{item.sessions} sessions</span>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">{item.description}</p>

                    <div className="mb-4">
                      <div className="flex gap-1 flex-wrap">
                        {item.format.map((format, index) => (
                          <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium rounded">
                            {format}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/archive/${item.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-2 border-black hover:bg-gray-100 bg-transparent text-xs"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          VIEW
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-2 border-black hover:bg-red-600 hover:text-white bg-transparent text-xs"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        DOWNLOAD
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="space-y-4">
              {filteredAndSortedItems.map((item) => (
                <Card key={item.id} className="border-2 border-black bg-white hover:bg-gray-50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-20 bg-black text-white flex items-center justify-center">
                          {getItemIcon(item.type)}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                            <p className="text-gray-600 mb-2">{item.subtitle}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium">
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-600">{item.type}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>{formatDate(item.date)}</span>
                          {item.pages && (
                            <>
                              <span>•</span>
                              <span>{item.pages} pages</span>
                            </>
                          )}
                          {item.sessions && (
                            <>
                              <span>•</span>
                              <span>{item.sessions} sessions</span>
                            </>
                          )}
                          {item.totalDuration && (
                            <>
                              <span>•</span>
                              <span>{item.totalDuration}</span>
                            </>
                          )}
                        </div>

                        <p className="text-gray-700 mb-4">{item.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {item.format.map((format, index) => (
                              <span
                                key={index}
                                className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium rounded"
                              >
                                {format}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/archive/${item.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-2 border-black hover:bg-gray-100 bg-transparent"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                VIEW
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-2 border-black hover:bg-red-600 hover:text-white bg-transparent"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              DOWNLOAD
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredAndSortedItems.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">No archive items found matching your search criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All Items")
                  setSortBy("date-desc")
                }}
                variant="outline"
                className="border-2 border-black hover:bg-red-600 hover:text-white"
              >
                CLEAR FILTERS
              </Button>
            </div>
          )}
        </section>

        {/* Archive Statistics */}
        <section className="border-2 border-black bg-white p-8 mt-16">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-4">ARCHIVE STATISTICS</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {archiveItems.filter((item) => item.type === "Book").length}
              </div>
              <p className="text-sm font-medium">Books & Publications</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {archiveItems.filter((item) => item.type === "Sermon Series").length}
              </div>
              <p className="text-sm font-medium">Sermon Series</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {Object.values(sermonsByYear).reduce((total, sermons) => total + sermons.length, 0)}
              </div>
              <p className="text-sm font-medium">Total Sermons</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">{archiveItems.length}</div>
              <p className="text-sm font-medium">Archive Items</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
