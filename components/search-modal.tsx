"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import { publicApi, type SearchResults } from "@/lib/api"
import { BookOpen, FileText, Loader2 } from "lucide-react"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const data = await publicApi.search.query(query)
        setResults(data)
      } catch (error) {
        console.error("Search failed:", error)
        setResults({ sermons: [], books: [] })
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = useCallback(
    (type: string, id: number) => {
      onOpenChange(false)
      setQuery("")
      setResults(null)
      router.push(`/${type}/${id}`)
    },
    [onOpenChange, router]
  )

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("")
      setResults(null)
    }
  }, [open])

  const hasSermons = results && results.sermons.length > 0
  const hasBooks = results && results.books.length > 0
  const hasResults = hasSermons || hasBooks
  const showEmpty = query.length >= 2 && !loading && results && !hasResults

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search sermons and books..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {loading && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">Searching...</span>
          </div>
        )}

        {showEmpty && (
          <CommandEmpty>No results found for &ldquo;{query}&rdquo;</CommandEmpty>
        )}

        {hasSermons && (
          <CommandGroup heading="Sermons">
            {results!.sermons.map((sermon) => (
              <CommandItem
                key={`sermon-${sermon.id}`}
                value={`sermon-${sermon.title}`}
                onSelect={() => handleSelect("sermons", sermon.id)}
                className="cursor-pointer"
              >
                <FileText className="w-4 h-4 mr-2 text-red-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{sermon.title}</p>
                  {sermon.date && (
                    <p className="text-xs text-gray-500">{sermon.date}</p>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {hasSermons && hasBooks && <CommandSeparator />}

        {hasBooks && (
          <CommandGroup heading="Books">
            {results!.books.map((book) => (
              <CommandItem
                key={`book-${book.id}`}
                value={`book-${book.title}`}
                onSelect={() => handleSelect("books", book.id)}
                className="cursor-pointer"
              >
                <BookOpen className="w-4 h-4 mr-2 text-red-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{book.title}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {query.length < 2 && !loading && (
          <div className="py-6 text-center text-sm text-gray-500">
            Type at least 2 characters to search...
          </div>
        )}
      </CommandList>
    </CommandDialog>
  )
}
