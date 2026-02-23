"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Lock, User } from "lucide-react"

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login({
        username: formData.username,
        password: formData.password
      })

      // Redirect to admin dashboard
      router.push("/admin")
    } catch (error: any) {
      setError(error.message || "Invalid username or password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-6 md:mb-8 text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">ADMIN LOGIN</h1>
            <p className="text-sm md:text-lg text-gray-700">Access the admin panel</p>
          </div>

          <Card className="border-2 border-black bg-white">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-100 border-2 border-red-600 text-red-800 p-3 rounded">
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold mb-2">USERNAME *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-black pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">PASSWORD *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-black pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-base font-bold"
                >
                  {isLoading ? "SIGNING IN..." : "SIGN IN"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded border">
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Demo Credentials:</strong>
                </p>
                <p className="text-xs text-gray-600">Username: admin</p>
                <p className="text-xs text-gray-600">Password: password123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
