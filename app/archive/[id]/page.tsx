"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  Download,
  Share2,
  Eye,
  FileText,
  Clock,
  User,
  Tag,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

// Mock archive data - in real app, this would come from API/database
const getArchiveById = (id: string) => {
  const archives = {
    "1": {
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
      isbn: "978-0-123456-78-9",
      publisher: "CAC Publications",
      fullDescription: `# SHEPHERDING GOD'S FLOCK: Biblical Principles for Pastoral Ministry

## About This Book

"Shepherding God's Flock" is a comprehensive guide that draws from over four decades of pastoral ministry experience. This book provides biblical foundations and practical insights for faithful pastoral leadership in the modern church.

## Table of Contents

### Part I: The Call to Shepherd
- Chapter 1: Understanding the Pastoral Call
- Chapter 2: The Heart of a Shepherd
- Chapter 3: Biblical Models of Leadership
- Chapter 4: Preparing for Ministry

### Part II: Pastoral Foundations
- Chapter 5: The Authority of Scripture in Ministry
- Chapter 6: Prayer as the Foundation of Leadership
- Chapter 7: Developing Spiritual Disciplines
- Chapter 8: The Pastor's Personal Life

### Part III: Shepherding the Flock
- Chapter 9: Preaching with Power and Purpose
- Chapter 10: Pastoral Care and Counseling
- Chapter 11: Leading Through Crisis
- Chapter 12: Discipleship and Mentoring

### Part IV: Church Leadership
- Chapter 13: Building Strong Leadership Teams
- Chapter 14: Vision Casting and Strategic Planning
- Chapter 15: Conflict Resolution in the Church
- Chapter 16: Developing Future Leaders

### Part V: Ministry Challenges
- Chapter 17: Dealing with Difficult People
- Chapter 18: Maintaining Personal Integrity
- Chapter 19: Balancing Ministry and Family
- Chapter 20: Avoiding Burnout and Maintaining Joy

## Key Themes

This book addresses several critical themes essential for effective pastoral ministry:

**Biblical Foundation**: Every principle and practice is grounded in Scripture, ensuring that pastoral ministry remains faithful to God's Word.

**Practical Application**: While theologically sound, the book provides practical tools and strategies that can be immediately implemented in ministry contexts.

**Personal Experience**: Drawing from decades of ministry experience, including challenges faced and lessons learned in various pastoral roles.

**Holistic Approach**: Addresses not just the professional aspects of ministry but also the personal, spiritual, and family dimensions of pastoral life.

## Target Audience

This book is designed for:
- Aspiring pastors and ministry leaders
- Current pastors seeking to deepen their understanding of pastoral ministry
- Seminary students preparing for ministry
- Church leaders and elders
- Anyone called to shepherd God's people

## Author's Note

"The calling to shepherd God's people is both a privilege and a sacred responsibility. This book represents not just theoretical knowledge but the practical wisdom gained through years of faithful service in Christ Apostolic Church. My prayer is that these principles will help equip the next generation of pastoral leaders to serve with excellence and integrity."

## Reviews and Endorsements

*"A masterful work that combines biblical scholarship with practical wisdom. Pastor Adegbulugbe has given the church a valuable resource for pastoral training and development."* - Rev. Dr. Samuel Okafor, President, Nigerian Baptist Convention

*"This book should be required reading for every pastor and ministry leader. It addresses the real challenges of pastoral ministry with biblical solutions and practical guidance."* - Dr. Grace Adebayo, Professor of Pastoral Theology, Baptist Seminary

## Study Guide Available

A comprehensive study guide is available separately, making this book ideal for:
- Seminary courses on pastoral ministry
- Church leadership training programs
- Pastoral mentoring relationships
- Small group studies for ministry leaders`,
      relatedArchives: [
        { id: 3, title: "THE PASTOR'S HEART", type: "Book" },
        { id: 5, title: "PASTORAL CARE & WELFARE MANUAL", type: "Manual" },
      ],
    },
    "2": {
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
      fullDescription: `# OPERATION DECLARE & DECREE: Complete 12-Part Teaching Series

## Series Overview

This comprehensive 12-part teaching series explores the biblical foundation and practical application of declaring God's Word and decreeing His will in our lives. Based on Isaiah 55:11, this series teaches believers how to partner with Heaven through faith-filled declarations.

## Series Sessions

### Session 1: The Biblical Foundation (45 minutes)
**Scripture**: Isaiah 55:11
- Understanding God's Word as creative power
- The difference between human words and God's Word
- How believers can participate in God's creative process

### Session 2: Declaration vs. Decree (42 minutes)
**Scripture**: Job 22:28
- Defining biblical declaration
- Understanding the authority of decree
- When to declare vs. when to decree

### Session 3: The Power of Spoken Word (48 minutes)
**Scripture**: Genesis 1:3
- God's creative method through spoken word
- The authority given to believers
- Practical examples from Scripture

### Session 4: Faith and Declaration (44 minutes)
**Scripture**: Mark 11:23
- The role of faith in effective declaration
- Overcoming doubt and unbelief
- Building faith through God's Word

### Session 5: Areas for Declaration (46 minutes)
**Scripture**: Various
- Health and healing declarations
- Financial breakthrough decrees
- Family salvation declarations
- Protection and safety decrees

### Session 6: Persistent Declaration (43 minutes)
**Scripture**: Luke 18:1-8
- The importance of persistence
- Not giving up too soon
- Testimonies of breakthrough through persistence

### Session 7: Corporate Declaration (41 minutes)
**Scripture**: Matthew 18:19-20
- The power of agreement in declaration
- Corporate prayer and decree
- Building declaration communities

### Session 8: Overcoming Opposition (47 minutes)
**Scripture**: Ephesians 6:12
- Spiritual warfare through declaration
- Dealing with resistance
- Standing firm in faith

### Session 9: Timing and Seasons (39 minutes)
**Scripture**: Ecclesiastes 3:1
- Understanding God's timing
- Seasonal declarations
- Patience in the process

### Session 10: Testimonies and Breakthrough (50 minutes)
- Real-life testimonies from the congregation
- Documented breakthroughs
- Encouraging faith through testimonies

### Session 11: Advanced Principles (45 minutes)
**Scripture**: Daniel 10:12
- Deeper spiritual principles
- Advanced declaration strategies
- Prophetic declarations

### Session 12: Living a Lifestyle of Declaration (44 minutes)
**Scripture**: Psalm 118:17
- Making declaration a daily practice
- Building declaration into your routine
- Teaching others to declare and decree

## Key Learning Outcomes

By the end of this series, participants will:
- Understand the biblical basis for declaration and decree
- Know how to effectively declare God's Word over situations
- Have practical tools for daily declaration
- Experience breakthrough in specific areas of life
- Be equipped to teach others these principles

## Study Materials Included

- Complete audio recordings of all 12 sessions
- Video recordings with visual aids and demonstrations
- Full transcripts of each session
- Study guide with reflection questions
- Declaration cards for daily use
- Testimony forms for sharing breakthroughs

## Testimonies from the Series

*"This series transformed my prayer life. I learned to pray with authority and have seen incredible breakthroughs in my family."* - Mrs. Folake Adebayo

*"The teaching on persistent declaration helped me not give up on my healing. After 6 months of declaring God's Word, I received complete healing."* - Mr. James Okafor

*"Our church implemented corporate declaration sessions based on this series. We've seen unprecedented growth and breakthrough."* - Pastor Samuel Adeyemi`,
      relatedArchives: [
        { id: 4, title: "HOURS OF DIVINE INTERVENTION", type: "Conference" },
        { id: 6, title: "FAITH IN ACTION SERIES", type: "Sermon Series" },
      ],
    },
    "3": {
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
      isbn: "978-0-123456-79-6",
      publisher: "CAC Publications",
      fullDescription: `# THE PASTOR'S HEART: Leadership in Christ Apostolic Church

## About This Book

"The Pastor's Heart" offers intimate insights into the heart and mind of pastoral leadership within the Christ Apostolic Church tradition. This book combines personal experiences with biblical principles to provide a roadmap for effective church leadership.

## Key Chapters

### Chapter 1: The Making of a Pastor
- Personal testimony of calling to ministry
- Early experiences in pastoral ministry
- Lessons learned from mentors and spiritual fathers

### Chapter 2: The CAC Tradition
- History and heritage of Christ Apostolic Church
- Core values and principles
- Maintaining denominational identity while embracing growth

### Chapter 3: Servant Leadership
- Biblical model of servant leadership
- Practical applications in church context
- Leading by example and humility

### Chapter 4: Pastoral Care Excellence
- Developing a heart for God's people
- Counseling and spiritual guidance
- Crisis ministry and support

### Chapter 5: Building Strong Churches
- Vision casting and strategic planning
- Developing leadership teams
- Creating healthy church culture

## Unique Features

This book stands out because it:
- Provides specific insights into CAC church governance
- Includes real-life case studies from pastoral experience
- Offers practical tools for church leadership
- Addresses contemporary challenges facing pastors
- Maintains strong biblical foundation throughout`,
      relatedArchives: [
        { id: 1, title: "SHEPHERDING GOD'S FLOCK", type: "Book" },
        { id: 10, title: "LEADERSHIP DEVELOPMENT CONFERENCE 2022", type: "Conference" },
      ],
    },
  }

  return archives[id as keyof typeof archives] || null
}

export default function ArchiveViewPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"overview" | "content" | "details">("overview")

  const archive = getArchiveById(params.id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!archive) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Archive Item Not Found</h1>
          <p className="text-gray-600 mb-8">The archive item you're looking for doesn't exist.</p>
          <Link href="/archive">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Archive
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: archive.title,
          text: archive.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

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
        return <FileText className="w-5 h-5" />
      case "Report":
        return <FileText className="w-5 h-5" />
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

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/archive" className="hover:text-red-600 transition-colors">
            Archive
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href={`/archive?year=${archive.year}`} className="hover:text-red-600 transition-colors">
            {archive.year}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{archive.title}</span>
        </div>

        {/* Back Navigation */}
        <div className="mb-6 flex gap-4">
          <Link href="/archive">
            <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Archives
            </Button>
          </Link>
          <Link href={`/archive?year=${archive.year}`}>
            <Button variant="outline" className="border-2 border-black hover:bg-gray-100 bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              {archive.year} Archives
            </Button>
          </Link>
        </div>

        {/* Archive Header */}
        <div className="border-2 border-black bg-white p-8 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-gray-200 text-gray-800 px-3 py-1 text-sm font-medium">{archive.category}</span>
                <div className="flex items-center gap-1 text-gray-600">
                  {getItemIcon(archive.type)}
                  <span className="text-sm">{archive.type}</span>
                </div>
                {archive.featured && (
                  <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold">FEATURED</span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3">{archive.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{archive.subtitle}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(archive.date)}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Pastor Anthony O. Adegbulugbe
                </div>
                {archive.pages && (
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {archive.pages} pages
                  </div>
                )}
                {archive.sessions && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {archive.sessions} sessions
                  </div>
                )}
                {archive.totalDuration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {archive.totalDuration}
                  </div>
                )}
              </div>

              <p className="text-lg text-gray-700 mb-6">{archive.description}</p>

              {/* Format Tags */}
              <div className="flex gap-2 mb-6">
                {archive.format.map((format, index) => (
                  <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 text-sm font-medium rounded">
                    {format}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-2 border-black hover:bg-gray-100 bg-transparent"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6">
                <Download className="w-4 h-4 mr-2" />
                DOWNLOAD
              </Button>
            </div>
          </div>

          {/* Additional Details */}
          <div className="border-t-2 border-black pt-6">
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-bold mb-2">PUBLICATION DETAILS</h3>
                <div className="space-y-1 text-gray-600">
                  <div>Year: {archive.year}</div>
                  {archive.language && <div>Language: {archive.language}</div>}
                  {archive.isbn && <div>ISBN: {archive.isbn}</div>}
                  {archive.publisher && <div>Publisher: {archive.publisher}</div>}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">CONTENT DETAILS</h3>
                <div className="space-y-1 text-gray-600">
                  {archive.pages && <div>Pages: {archive.pages}</div>}
                  {archive.sessions && <div>Sessions: {archive.sessions}</div>}
                  {archive.totalDuration && <div>Duration: {archive.totalDuration}</div>}
                  <div>Category: {archive.category}</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">AVAILABILITY</h3>
                <div className="space-y-1 text-gray-600">
                  {archive.format.map((format, index) => (
                    <div key={index}>✓ {format} Format</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="border-2 border-black bg-white mb-8">
          <div className="border-b-2 border-black">
            <div className="flex">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-4 font-bold text-sm border-r-2 border-black transition-colors ${
                  activeTab === "overview" ? "bg-red-600 text-white" : "hover:bg-gray-100"
                }`}
              >
                <Eye className="w-4 h-4 mr-2 inline" />
                OVERVIEW
              </button>
              <button
                onClick={() => setActiveTab("content")}
                className={`px-6 py-4 font-bold text-sm border-r-2 border-black transition-colors ${
                  activeTab === "content" ? "bg-red-600 text-white" : "hover:bg-gray-100"
                }`}
              >
                <FileText className="w-4 h-4 mr-2 inline" />
                FULL CONTENT
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`px-6 py-4 font-bold text-sm transition-colors ${
                  activeTab === "details" ? "bg-red-600 text-white" : "hover:bg-gray-100"
                }`}
              >
                <Tag className="w-4 h-4 mr-2 inline" />
                DETAILS
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This {archive.type}</h2>
                  <p className="text-gray-700 leading-relaxed">{archive.description}</p>
                </div>

                {archive.type === "Book" && (
                  <div>
                    <h3 className="text-xl font-bold mb-3">What You'll Learn</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Biblical foundations for pastoral ministry</li>
                      <li>• Practical tools for church leadership</li>
                      <li>• Personal development as a spiritual leader</li>
                      <li>• Strategies for effective pastoral care</li>
                      <li>• Building strong church communities</li>
                    </ul>
                  </div>
                )}

                {archive.type === "Sermon Series" && (
                  <div>
                    <h3 className="text-xl font-bold mb-3">Series Highlights</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• {archive.sessions} comprehensive teaching sessions</li>
                      <li>• Biblical foundation with practical application</li>
                      <li>• Real-life testimonies and breakthrough stories</li>
                      <li>• Study materials and reflection questions</li>
                      <li>• Available in multiple formats</li>
                    </ul>
                  </div>
                )}

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-3">Perfect For:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <h4 className="font-bold mb-2">Pastors & Leaders</h4>
                      <p>Essential reading for current and aspiring pastoral leaders seeking biblical guidance.</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Seminary Students</h4>
                      <p>Valuable resource for theological education and practical ministry preparation.</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Church Members</h4>
                      <p>Helpful for understanding pastoral ministry and supporting church leadership.</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Ministry Teams</h4>
                      <p>Excellent for leadership development and team building in church contexts.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Content Tab */}
            {activeTab === "content" && (
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-sm leading-relaxed">{archive.fullDescription}</div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Publication Information</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Title:</span>
                        <span>{archive.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Subtitle:</span>
                        <span>{archive.subtitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Author:</span>
                        <span>Pastor Anthony O. Adegbulugbe</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Publication Date:</span>
                        <span>{formatDate(archive.date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Category:</span>
                        <span>{archive.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Type:</span>
                        <span>{archive.type}</span>
                      </div>
                      {archive.isbn && (
                        <div className="flex justify-between">
                          <span className="font-medium">ISBN:</span>
                          <span>{archive.isbn}</span>
                        </div>
                      )}
                      {archive.publisher && (
                        <div className="flex justify-between">
                          <span className="font-medium">Publisher:</span>
                          <span>{archive.publisher}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Content Specifications</h3>
                    <div className="space-y-3 text-sm">
                      {archive.pages && (
                        <div className="flex justify-between">
                          <span className="font-medium">Pages:</span>
                          <span>{archive.pages}</span>
                        </div>
                      )}
                      {archive.sessions && (
                        <div className="flex justify-between">
                          <span className="font-medium">Sessions:</span>
                          <span>{archive.sessions}</span>
                        </div>
                      )}
                      {archive.totalDuration && (
                        <div className="flex justify-between">
                          <span className="font-medium">Total Duration:</span>
                          <span>{archive.totalDuration}</span>
                        </div>
                      )}
                      {archive.language && (
                        <div className="flex justify-between">
                          <span className="font-medium">Language:</span>
                          <span>{archive.language}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="font-medium">Available Formats:</span>
                        <span>{archive.format.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-black pt-6">
                  <h3 className="text-xl font-bold mb-4">Download Options</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {archive.format.map((format, index) => (
                      <Card key={index} className="border-2 border-black">
                        <CardContent className="p-4 text-center">
                          <div className="mb-3">
                            {format === "PDF" && <FileText className="w-8 h-8 mx-auto text-red-600" />}
                            {format === "Audio" && <Clock className="w-8 h-8 mx-auto text-red-600" />}
                            {format === "Video" && <Eye className="w-8 h-8 mx-auto text-red-600" />}
                            {format === "Print" && <BookOpen className="w-8 h-8 mx-auto text-red-600" />}
                          </div>
                          <h4 className="font-bold mb-2">{format} Format</h4>
                          <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Archives */}
        {archive.relatedArchives && archive.relatedArchives.length > 0 && (
          <section className="border-2 border-black bg-white p-8">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-4">RELATED ARCHIVES</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {archive.relatedArchives.map((related) => (
                <Card key={related.id} className="border-2 border-black hover:bg-gray-50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {getItemIcon(related.type)}
                      <span className="text-sm text-gray-600">{related.type}</span>
                    </div>
                    <h3 className="font-bold mb-3">{related.title}</h3>
                    <Link href={`/archive/${related.id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent text-sm"
                      >
                        VIEW ARCHIVE
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
