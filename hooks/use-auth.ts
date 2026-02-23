"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authApi, type Admin, ApiError } from "@/lib/api"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<Admin | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const token = localStorage.getItem("authToken")
      const userData = localStorage.getItem("adminUser")

      if (token && userData) {
        try {
          // Verify token with backend
          const verificationResult = await authApi.verify()
          
          if (verificationResult.valid) {
            setIsAuthenticated(true)
            setUser(verificationResult.admin)
            // Update stored user data in case it changed
            localStorage.setItem("adminUser", JSON.stringify(verificationResult.admin))
          } else {
            // Token invalid, clear storage
            clearAuth()
          }
        } catch (error) {
          // Token verification failed, clear storage
          console.error("Token verification failed:", error)
          clearAuth()
        }
      } else {
        clearAuth()
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      clearAuth()
    } finally {
      setIsLoading(false)
    }
  }

  const clearAuth = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("adminUser")
    setIsAuthenticated(false)
    setUser(null)
  }

  const login = async (credentials: { username: string; password: string }) => {
    try {
      setIsLoading(true)
      setError(null)

      let response: any = await authApi.login(credentials)

      if (response.data) response = response.data
      console.log("Login successful:", response)  
      // Store token and user data
      localStorage.setItem("authToken", response.token)
      localStorage.setItem("adminUser", JSON.stringify(response.admin))
      
      setIsAuthenticated(true)
      setUser(response.admin)
      
      return response
    } catch (error) {
      console.error("Login failed:", error)
      
      if (error instanceof ApiError) {
        setError(error.message)
        throw error
      } else {
        const errorMessage = "Login failed. Please try again."
        setError(errorMessage)
        throw new Error(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      
      // Call backend logout (this handles session cleanup)
      await authApi.logout()
    } catch (error) {
      console.error("Logout API call failed:", error)
      // Continue with logout even if API call fails
    } finally {
      clearAuth()
      setIsLoading(false)
      router.push("/admin/login")
    }
  }

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login")
    }
  }

  const changePassword = async (passwordData: {
    current_password: string
    new_password: string
    confirm_password: string
  }) => {
    try {
      setError(null)
      await authApi.changePassword(passwordData)
      return true
    } catch (error) {
      console.error("Password change failed:", error)
      
      if (error instanceof ApiError) {
        setError(error.message)
        throw error
      } else {
        const errorMessage = "Password change failed. Please try again."
        setError(errorMessage)
        throw new Error(errorMessage)
      }
    }
  }

  const getCurrentUser = async () => {
    try {
      const userData = await authApi.getCurrentUser()
      setUser(userData)
      localStorage.setItem("adminUser", JSON.stringify(userData))
      return userData
    } catch (error) {
      console.error("Failed to get current user:", error)
      throw error
    }
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    logout,
    requireAuth,
    checkAuth,
    changePassword,
    getCurrentUser,
  }
}
