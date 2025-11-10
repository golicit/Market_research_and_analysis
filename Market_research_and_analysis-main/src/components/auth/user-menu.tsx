"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom" 
import { Button } from "@/components/ui/button"
import { LogOut, Settings, User } from "lucide-react"

interface UserMenuProps {
  userName: string
}

export default function UserMenu({ userName }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        navigate("/login")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="text-foreground hover:bg-secondary/20">
        <User className="h-4 w-4 mr-2" />
        {userName}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg">
          <button
            onClick={() => {
              navigate("/profile")
              setIsOpen(false)
            }}
            className="w-full text-left px-4 py-2 hover:bg-secondary/20 text-foreground flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </button>
          <button
            onClick={() => {
              navigate("/settings")
              setIsOpen(false)
            }}
            className="w-full text-left px-4 py-2 hover:bg-secondary/20 text-foreground flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <div className="border-t border-border" />
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-destructive/10 text-destructive flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}