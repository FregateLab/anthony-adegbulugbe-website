"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CheckCircle2, XCircle, Loader2, FileText, Play, RotateCcw } from "lucide-react"
import { sermonsApi, type BatchSermonStatus } from "@/lib/api"

interface BatchExtractPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BatchExtractPanel({ open, onOpenChange }: BatchExtractPanelProps) {
  const [results, setResults] = useState<BatchSermonStatus[]>([])
  const [total, setTotal] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [failed, setFailed] = useState(0)
  const [running, setRunning] = useState(false)
  const [currentSermon, setCurrentSermon] = useState<string | null>(null)
  const [starting, setStarting] = useState(false)
  const [force, setForce] = useState(false)
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

  const pollProgress = useCallback(async () => {
    try {
      const progress = await sermonsApi.getBatchExtractProgress()
      setResults(progress?.results || [])
      setTotal(progress?.total || 0)
      setCompleted(progress?.completed || 0)
      setFailed(progress?.failed || 0)
      setCurrentSermon(progress?.current_sermon || null)
      setRunning(progress?.running || false)

      if (!progress.running && pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
      }
    } catch (err) {
      console.error("Failed to poll progress:", err)
    }
  }, [])

  // Start polling when extraction begins
  useEffect(() => {
    if (running && !pollingRef.current) {
      pollingRef.current = setInterval(pollProgress, 2000)
    }
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
      }
    }
  }, [running, pollProgress])

  // Check for existing progress when panel opens
  useEffect(() => {
    if (open) {
      pollProgress()
    }
  }, [open, pollProgress])

  const handleStart = async () => {
    setStarting(true)
    try {
      // Start extraction - this is a long-running request
      // We start polling immediately to track progress
      setRunning(true)

      // Fire and forget - the polling will track progress
      sermonsApi.startBatchExtract({ force }).then((result) => {
        // Final update when request completes
        setResults(result?.results || [])
        setTotal(result?.total || 0)
        setCompleted(result?.completed || 0)
        setFailed(result?.failed || 0)
        setRunning(false)
        setCurrentSermon(null)
      }).catch((err) => {
        console.error("Batch extract failed:", err)
        setRunning(false)
      })

      // Start polling after a short delay
      setTimeout(() => {
        if (!pollingRef.current) {
          pollingRef.current = setInterval(pollProgress, 2000)
        }
      }, 1000)
    } finally {
      setStarting(false)
    }
  }

  const progressPercent = total > 0 ? Math.round(((completed + failed) / total) * 100) : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            PDF TEXT EXTRACTION
          </DialogTitle>
          <DialogDescription>
            Convert sermon PDFs to formatted markdown text using the Python service.
          </DialogDescription>
        </DialogHeader>

        {/* Controls */}
        <div className="flex items-center gap-3 py-3 border-b border-gray-200">
          <Button
            onClick={handleStart}
            disabled={running || starting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {running ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Running...
              </>
            ) : starting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Starting...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Extraction
              </>
            )}
          </Button>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={force}
              onChange={(e) => setForce(e.target.checked)}
              disabled={running}
              className="rounded border-gray-300"
            />
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3 h-3" />
              Force re-extract all
            </span>
          </label>
        </div>

        {/* Progress bar */}
        {total > 0 && (
          <div className="py-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">
                {running ? `Processing: ${currentSermon || '...'}` : 'Complete'}
              </span>
              <span className="text-gray-600">
                {completed + failed}/{total} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 h-3 overflow-hidden border border-gray-300">
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  background: failed > 0
                    ? `linear-gradient(to right, #16a34a ${(completed / (completed + failed)) * 100}%, #dc2626 ${(completed / (completed + failed)) * 100}%)`
                    : '#16a34a'
                }}
              />
            </div>
            <div className="flex gap-4 text-xs mt-2 text-gray-600">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full inline-block" />
                {completed} done
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-600 rounded-full inline-block" />
                {failed} failed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full inline-block" />
                {total - completed - failed} pending
              </span>
            </div>
          </div>
        )}

        {/* Results list */}
        <div className="flex-1 overflow-y-auto border-t border-gray-200 pt-2">
          {results.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Click "Run Extraction" to process sermon PDFs.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((sermon) => (
                <div
                  key={sermon.id}
                  className={`flex items-center gap-3 px-3 py-2 text-sm border-l-4 ${
                    sermon.status === 'done'
                      ? 'border-green-600 bg-green-50/50'
                      : sermon.status === 'failed'
                      ? 'border-red-600 bg-red-50/50'
                      : sermon.status === 'processing'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-gray-300 bg-gray-50/50'
                  }`}
                >
                  {/* Status icon */}
                  <div className="flex-shrink-0">
                    {sermon.status === 'done' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                    {sermon.status === 'failed' && <XCircle className="w-4 h-4 text-red-600" />}
                    {sermon.status === 'processing' && <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />}
                    {sermon.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                  </div>

                  {/* Sermon info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{sermon.title}</p>
                    {sermon.status === 'done' && sermon.word_count && (
                      <p className="text-xs text-gray-500">{sermon.word_count.toLocaleString()} words</p>
                    )}
                    {sermon.status === 'failed' && sermon.error && (
                      <p className="text-xs text-red-600 truncate">{sermon.error}</p>
                    )}
                  </div>

                  {/* Status label */}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    sermon.status === 'done' ? 'bg-green-100 text-green-700'
                    : sermon.status === 'failed' ? 'bg-red-100 text-red-700'
                    : sermon.status === 'processing' ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                  }`}>
                    {sermon.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
