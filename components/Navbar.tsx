"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Sparkles } from "lucide-react"

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
          <Sparkles className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-xl tracking-tight">PostPolish</span>
        </Link>
        <div className="flex items-center ml-auto space-x-4">
          <span className="text-sm text-muted-foreground hidden sm:inline-block">
            Transform your LinkedIn posts with AI
          </span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
