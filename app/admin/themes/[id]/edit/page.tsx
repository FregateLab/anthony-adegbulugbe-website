"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { themesApi, getFileUrl, type Theme } from "@/lib/api"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Save, Upload, X } from "lucide-react"

const colorOptions = [
  { value: "bg-red-100 text-red-800", label: "Red", preview: "bg-red-100" },
  { value: "bg-blue-100 text-blue-800", label: "Blue", preview: "bg-blue-100" },
  { value: "bg-green-100 text-green-800", label: "Green", preview: "bg-green-100" },
  { value: "bg-purple-100 text-purple-800", label: "Purple", preview: "bg-purple-100" },
  { value: "bg-yellow-100 text-yellow-800", label: "Yellow", preview: "bg-yellow-100" },
  { value: "bg-indigo-100 text-indigo-800", label: "Indigo", preview: "bg-indigo-100" },
]

export default function EditThemePage() {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color_class: "bg-blue-100 text-blue-800",
    status: "active" as "active" | "inactive",
  })
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    requireAuth()
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const themeId = Number.parseInt(params.id as string)
        const theme = await themesApi.getById(themeId)
        setFormData({
          name: theme.name,
          description: theme.description,
          color_class: theme.color_class,
          status: theme.status,
        })
        setCurrentImage(theme.image || null)
      } catch (error) {
        console.error("Failed to fetch theme:", error)
        alert("Failed to load theme.")
        router.push("/admin")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchTheme()
    }
  }, [isAuthenticated, params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const themeId = Number.parseInt(params.id as string)
      await themesApi.update(themeId, formData)

      if (imageFile) {
        await themesApi.uploadImage(themeId, imageFile)
      }

      alert("Theme updated successfully!")
      router.push("/admin")
    } catch (error) {
      console.error("Failed to update theme:", error)
      alert("Failed to update theme. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
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
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/admin" className="flex items-center gap-2 text-sm font-bold hover:text-red-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            BACK TO ADMIN
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-8">EDIT THEME</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading theme...</p>
          </div>
        ) : (
          <Card className="border-2 border-black bg-white max-w-2xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">THEME NAME *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-3 text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter theme name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">DESCRIPTION *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full border-2 border-black p-3 text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter theme description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">THEME IMAGE</label>
                  {(currentImage || imagePreview) && (
                    <div className="mb-3">
                      <img
                        src={imagePreview || getFileUrl(currentImage)}
                        alt="Theme"
                        className="w-full h-48 object-cover border border-gray-300"
                      />
                    </div>
                  )}
                  <div className="border-2 border-dashed border-gray-400 p-4 text-center">
                    <label className="cursor-pointer block py-2">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {currentImage || imagePreview ? "Click to replace image" : "Click to upload an image"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (max 5MB)</p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setImageFile(file)
                            setImagePreview(URL.createObjectURL(file))
                          }
                        }}
                      />
                    </label>
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => { setImageFile(null); setImagePreview(null) }}
                        className="mt-2 border-2 border-black hover:bg-gray-100 bg-transparent"
                      >
                        <X className="w-3 h-3 mr-1" /> Cancel new image
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">THEME COLOR</label>
                  <div className="grid grid-cols-3 gap-3">
                    {colorOptions.map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="color_class"
                          value={option.value}
                          checked={formData.color_class === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-3 border-2 rounded text-center text-sm font-bold transition-colors ${
                            formData.color_class === option.value ? "border-black" : "border-gray-300 hover:border-gray-400"
                          } ${option.preview}`}
                        >
                          {option.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">STATUS</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border-2 border-black p-3 text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4 border-t-2 border-gray-200">
                  <Link href="/admin">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-2 border-black hover:bg-gray-100 bg-transparent"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={submitting} className="bg-red-600 hover:bg-red-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    {submitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}
