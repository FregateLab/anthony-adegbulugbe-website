"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate a loading delay or wait for actual content to load
    // In a real application, you might listen for data fetching completion
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Show preloader for at least 1 second

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f5f1e8] transition-opacity duration-500">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-red-600 mx-auto mb-4" />
        <p className="text-xl font-bold text-black">LOADING MINISTRY...</p>
      </div>
    </div>
  )
}
