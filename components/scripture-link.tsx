"use client"

import { useState, useCallback } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ScriptureLinkProps {
  text: string
}

interface VerseData {
  text: string
  reference: string
}

const SCRIPTURE_REGEX = /\b(\d?\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(\d+)(?::(\d+)(?:\s*[-–]\s*(\d+))?)?\b/g

function parseScriptureReferences(text: string): { before: string; reference: string; after: string }[] {
  const parts: { before: string; reference: string; after: string }[] = []
  let lastIndex = 0
  let match

  const regex = new RegExp(SCRIPTURE_REGEX.source, 'g')

  while ((match = regex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index)
    const reference = match[0]
    lastIndex = match.index + match[0].length
    parts.push({ before, reference, after: '' })
  }

  // Add remaining text
  if (parts.length > 0) {
    parts[parts.length - 1].after = text.slice(lastIndex)
  }

  return parts
}

function ScriptureReference({ reference }: { reference: string }) {
  const [verseData, setVerseData] = useState<VerseData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchVerse = useCallback(async () => {
    if (verseData || loading) return

    // Check sessionStorage cache
    const cacheKey = `scripture-${reference}`
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) {
      setVerseData(JSON.parse(cached))
      return
    }

    setLoading(true)
    setError(false)

    try {
      const encodedRef = encodeURIComponent(reference.trim())
      const response = await fetch(`https://bible-api.com/${encodedRef}?translation=kjv`)

      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      const verse: VerseData = {
        text: data.text?.trim() || 'Verse text not available',
        reference: data.reference || reference,
      }

      sessionStorage.setItem(cacheKey, JSON.stringify(verse))
      setVerseData(verse)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [reference, verseData, loading])

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen) fetchVerse()
  }

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <button
          className="text-red-600 underline-offset-2 hover:underline font-medium cursor-pointer inline"
          type="button"
        >
          {reference}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-2">
          <h4 className="font-bold text-sm text-red-600">{reference}</h4>
          {loading && (
            <p className="text-sm text-gray-500 italic">Loading verse...</p>
          )}
          {error && (
            <p className="text-sm text-gray-500 italic">Could not load verse</p>
          )}
          {verseData && (
            <p className="text-sm text-gray-700 leading-relaxed italic">
              &ldquo;{verseData.text}&rdquo;
            </p>
          )}
          <p className="text-xs text-gray-400">KJV Translation</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function ScriptureLink({ text }: ScriptureLinkProps) {
  if (!text) return null

  const parts = parseScriptureReferences(text)

  if (parts.length === 0) {
    return <span>{text}</span>
  }

  return (
    <span>
      {parts.map((part, index) => (
        <span key={index}>
          {part.before}
          <ScriptureReference reference={part.reference} />
          {part.after}
        </span>
      ))}
    </span>
  )
}
