"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const publications = [
  {
    id: 1,
    title: "SHEPHERDING GOD'S FLOCK",
    subtitle: "Biblical Principles for Pastoral Ministry",
    year: "2024",
    description: "A comprehensive guide to faithful pastoral ministry rooted in Scripture and experience.",
  },
  {
    id: 2,
    title: "OPERATION DECLARE & DECREE",
    subtitle: "Spiritual Warfare and Divine Intervention",
    year: "2023",
    description: "Understanding the power of declaring God's Word and experiencing divine intervention.",
  },
  {
    id: 3,
    title: "THE PASTOR'S HEART",
    subtitle: "Leadership in Christ Apostolic Church",
    year: "2022",
    description: "Insights from decades of pastoral ministry and church leadership experience.",
  },
  {
    id: 4,
    title: "PASTORAL CARE & WELFARE",
    subtitle: "Caring for God's Servants",
    year: "2021",
    description: "Implementing welfare schemes and empowerment programs in church ministry.",
  },
]

export function ArchiveSection() {
  return (
    <section id="archive" className="mt-16">
      <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
        <h2 className="text-4xl font-bold">MINISTRY ARCHIVE</h2>
        <Link
          href="/archive"
          className="flex items-center gap-2 text-lg font-bold hover:text-red-600 transition-colors"
        >
          VIEW ARCHIVE
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Desktop: Show 3 publications in grid */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 gap-6 mb-8">
          {publications.slice(0, 3).map((book, index) => (
            <div key={index} className="border-2 border-black bg-white p-8 hover:bg-gray-50 transition-colors">
              <div className="text-center mb-6">
                <div className="w-32 h-40 bg-black mx-auto mb-4 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-xs mb-2">BOOK</div>
                    <div className="text-lg font-bold">{book.year}</div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{book.title}</h3>
              <p className="text-sm text-center mb-2">{book.subtitle}</p>
              <p className="text-xs text-gray-600 text-center mb-4">{book.description}</p>
              <Link href={`/archive/${book.id}`}>
                <Button
                  variant="outline"
                  className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent text-xs"
                >
                  READ
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Keep horizontal scrolling */}
      <div className="block md:hidden">
        <div className="relative">
          <div
            className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {publications.map((book, index) => (
              <div key={index} className="border-2 border-black bg-white p-8 min-w-[280px] flex-shrink-0">
                <div className="text-center mb-6">
                  <div className="w-32 h-40 bg-black mx-auto mb-4 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-xs mb-2">BOOK</div>
                      <div className="text-lg font-bold">{book.year}</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{book.title}</h3>
                <p className="text-sm text-center mb-2">{book.subtitle}</p>
                <p className="text-xs text-gray-600 text-center mb-4">{book.description}</p>
                <Link href={`/archive/${book.id}`}>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent text-xs"
                  >
                    READ
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">← Scroll horizontally to view more archive →</p>
        </div>
      </div>
    </section>
  )
}
