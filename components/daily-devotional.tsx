"use client"

import { useState, useEffect } from "react"
import { type DailyDevotional as DevotionalType } from "@/lib/api"
import { cachedApi } from "@/lib/cached-api"
import { ScriptureLink } from "@/components/scripture-link"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export function DailyDevotional() {
  const [devotional, setDevotional] = useState<DevotionalType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDevotional = async () => {
      try {
        const data = await cachedApi.devotional.getToday()
        setDevotional(data)
      } catch (error) {
        console.error("Failed to fetch devotional:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDevotional()
  }, [])

  if (loading) {
    return (
      <div className="border-2 border-black bg-white p-6 sm:p-8 lg:p-10">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 w-40"></div>
          <div className="h-20 bg-gray-200"></div>
          <div className="h-4 bg-gray-200 w-60"></div>
        </div>
      </div>
    )
  }

  if (!devotional) return null

  return (
    <div className="border-2 border-black bg-white p-6 sm:p-8 lg:p-10">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
        <h2 className="text-xl sm:text-2xl font-bold">TODAY&apos;S WORD</h2>
        <span className="text-xs sm:text-sm text-gray-500 ml-auto">{devotional.date}</span>
      </div>

      <blockquote className="text-lg sm:text-xl lg:text-2xl italic text-gray-800 leading-relaxed mb-4 sm:mb-6 border-l-4 border-red-600 pl-4 sm:pl-6">
        &ldquo;{devotional.text}&rdquo;
      </blockquote>

      {devotional.scripture && (
        <div className="mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-gray-600">
            <ScriptureLink text={devotional.scripture} />
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs sm:text-sm text-gray-500">
            From: <span className="font-semibold text-gray-700">{devotional.sermon_title}</span>
          </p>
          <p className="text-xs text-gray-400">{devotional.theme}</p>
        </div>
        <Link
          href={`/sermons/${devotional.sermon_id}`}
          className="text-sm font-bold text-red-600 hover:text-red-700 hover:underline"
        >
          READ FULL SERMON →
        </Link>
      </div>
    </div>
  )
}
