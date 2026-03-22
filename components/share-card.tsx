"use client"

import { Share2 } from "lucide-react"

interface ShareCardProps {
  text: string
  sermonTitle: string
  sermonId: number
}

export function ShareCard({ text, sermonTitle, sermonId }: ShareCardProps) {
  const handleShare = () => {
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://aoa.ng"
    const sermonUrl = `${siteUrl}/sermons/${sermonId}`
    const shareText = `"${text}"\n\n— Pst. (Prof.) Anthony Adegbulugbe\nFrom: ${sermonTitle}\n\n${sermonUrl}`

    // Try WhatsApp first
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`

    // Check if Web Share API is available
    if (navigator.share) {
      navigator
        .share({
          title: sermonTitle,
          text: `"${text}" — Pst. (Prof.) Anthony Adegbulugbe`,
          url: sermonUrl,
        })
        .catch(() => {
          // Fallback to WhatsApp
          window.open(whatsappUrl, "_blank")
        })
    } else {
      window.open(whatsappUrl, "_blank")
    }
  }

  return (
    <button
      onClick={handleShare}
      className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
      title="Share this point"
      type="button"
    >
      <Share2 className="w-3.5 h-3.5" />
    </button>
  )
}
