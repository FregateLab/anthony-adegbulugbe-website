"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Settings, BarChart3, Menu, X } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function AdminLayout({ children, activeTab = "dashboard", onTabChange }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "books", label: "Books", icon: BookOpen },
    { id: "sermons", label: "Sermons", icon: FileText },
    { id: "themes", label: "Themes", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">ADMIN PANEL</h1>
              <p className="text-lg text-gray-700">Manage your website content, books, sermons, and themes</p>
            </div>
            <Button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden bg-red-600 hover:bg-red-700 text-white"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className={`${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="border-2 border-black bg-white">
              <div className="flex flex-col">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange?.(tab.id)
                      setSidebarOpen(false)
                    }}
                    className={`flex items-center gap-3 px-6 py-4 font-bold border-b-2 border-black last:border-b-0 transition-colors text-left ${
                      activeTab === tab.id ? "bg-red-600 text-white" : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-h-[600px]">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
