"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isDark, setIsDark] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("darkMode") === "true" ||
      (!localStorage.getItem("darkMode") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setIsDark(isDarkMode)
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Novarch
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="#about" className="text-sm hover:text-primary transition">
              About
            </Link>
            <Link href="/disease" className="text-sm hover:text-primary transition">
              Disease Detection
            </Link>
            <Link href="/chat" className="text-sm hover:text-primary transition">
              AI Chatbot
            </Link>
            <Link href="/report" className="text-sm hover:text-primary transition">
              Report Analyzer
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden gap-2 items-center">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
              {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            <Link href="#about" className="block px-4 py-2 rounded hover:bg-secondary transition">
              About
            </Link>
            <Link href="/disease" className="block px-4 py-2 rounded hover:bg-secondary transition">
              Disease Detection
            </Link>
            <Link href="/chat" className="block px-4 py-2 rounded hover:bg-secondary transition">
              AI Chatbot
            </Link>
            <Link href="/report" className="block px-4 py-2 rounded hover:bg-secondary transition">
              Report Analyzer
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
