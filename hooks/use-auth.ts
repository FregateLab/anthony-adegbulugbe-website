"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const authToken = localStorage.getItem("adminAuth")
      const adminUser = localStorage.getItem("adminUser")

      if (authToken === "true" && adminUser) {
        setIsAuthenticated(true)
        setUser(adminUser)
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = (username: string) => {
    localStorage.setItem("adminAuth", "true")
    localStorage.setItem("adminUser", username)
    setIsAuthenticated(true)
    setUser(username)
  }

  const logout = () => {
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminUser")
    setIsAuthenticated(false)
    setUser(null)
    router.push("/admin/login")
  }

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login")
    }
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    requireAuth,
    checkAuth,
  }
}
