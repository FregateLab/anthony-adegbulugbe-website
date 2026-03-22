"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronDown, ChevronUp, Save } from "lucide-react"

interface SermonNotesProps {
  sermonId: number
}

export function SermonNotes({ sermonId }: SermonNotesProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [notes, setNotes] = useState("")
  const [saved, setSaved] = useState(false)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const storageKey = `sermon-notes-${sermonId}`

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey)
    if (savedNotes) {
      setNotes(savedNotes)
    }
  }, [storageKey])

  // Debounced save
  const saveNotes = useCallback(
    (value: string) => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current)
      }

      saveTimerRef.current = setTimeout(() => {
        localStorage.setItem(storageKey, value)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }, 500)
    },
    [storageKey]
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setNotes(value)
    setSaved(false)
    saveNotes(value)
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current)
      }
    }
  }, [])

  return (
    <div className="border-2 border-black bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors"
        type="button"
      >
        <div className="flex items-center gap-2">
          <Save className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          <h3 className="text-lg sm:text-xl font-bold">MY NOTES</h3>
          {saved && (
            <span className="text-xs text-green-600 font-medium ml-2">Saved</span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="border-t-2 border-black p-4 sm:p-6">
          <textarea
            value={notes}
            onChange={handleChange}
            placeholder="Write your personal notes, reflections, and key takeaways from this sermon..."
            className="w-full min-h-[200px] border-2 border-gray-300 p-3 sm:p-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 resize-y text-sm sm:text-base"
          />
          <p className="text-xs text-gray-400 mt-2">
            Notes are saved locally in your browser and will persist between visits.
          </p>
        </div>
      )}
    </div>
  )
}
