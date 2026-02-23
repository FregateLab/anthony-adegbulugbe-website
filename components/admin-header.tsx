"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export function AdminHeader() {
  const { user, logout } = useAuth()

  return (
    <div className="bg-white border-b-2 border-black">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">Welcome back, {user?.username}</p>
              <p className="text-xs text-gray-600">Administrator</p>
            </div>
          </div>
          <Button onClick={logout} variant="outline" className="border-2 border-black hover:bg-red-100 bg-transparent">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
