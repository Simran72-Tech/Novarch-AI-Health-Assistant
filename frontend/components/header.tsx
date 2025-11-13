"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const links = [
    { href: "/", label: "Home" },
    { href: "/disease", label: "Disease Detection" },
    { href: "/chat", label: "Chatbot" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">N</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">Novarch</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <select
              onChange={(e) => (window.location.href = e.target.value)}
              defaultValue={pathname}
              className="px-2 py-1 rounded border border-border bg-background text-foreground text-sm"
            >
              {links.map((link) => (
                <option key={link.href} value={link.href}>
                  {link.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}
