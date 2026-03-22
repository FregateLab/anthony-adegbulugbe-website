"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, Search } from "lucide-react"
import { SearchModal } from "@/components/search-modal"

export const Navigation = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <nav className="border-t-2 border-black bg-[#f5f1e8] sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Mobile Header */}
          <div className="flex md:hidden justify-between items-center py-2">
            {/* Logo */}
            <Link href="/" className="text-lg font-bold tracking-wide hover:opacity-80 transition-opacity">
              A.A
            </Link>

            <div className="flex items-center gap-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-black hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={toggleMenu}
                className="p-2 hover:bg-black hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Desktop/Tablet Navigation */}
          <div className="hidden md:flex flex-wrap justify-center md:justify-between items-center py-2 md:py-4 text-xs sm:text-sm md:text-base font-medium tracking-wide gap-1 md:gap-0">
            <Link href="/" className="px-2 md:px-4 py-2 hover:bg-black hover:text-white transition-colors">
              HOME
            </Link>
            <Link
              href="/about"
              className={`px-2 md:px-4 py-2 hover:bg-black hover:text-white transition-colors ${
                pathname === "/about" ? "bg-black text-white" : ""
              }`}
            >
              ABOUT
            </Link>
            <Link
              href="/books"
              className={`px-2 md:px-4 py-2 hover:bg-black hover:text-white transition-colors ${
                pathname.startsWith("/books") ? "bg-black text-white" : ""
              }`}
            >
              BOOKS
            </Link>
            <Link
              href="/pastor-profile"
              className={`px-2 md:px-4 py-2 hover:bg-black hover:text-white transition-colors ${
                pathname === "/pastor-profile" ? "bg-black text-white" : ""
              }`}
            >
              PASTOR PROFILE
            </Link>
            <Link
              href="/sermons"
              className={`px-2 md:px-4 py-2 hover:bg-black hover:text-white transition-colors ${
                pathname.startsWith("/sermons") ? "bg-black text-white" : ""
              }`}
            >
              SERMONS
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              className="px-2 md:px-4 py-2 hover:bg-black hover:text-white transition-colors flex items-center gap-1"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-xs text-gray-500 ml-1">Ctrl+K</span>
            </button>
            <Link
              href="/contact"
              className={`px-2 md:px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors ${
                pathname === "/contact" ? "bg-red-700" : ""
              }`}
            >
              GET IN TOUCH
            </Link>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t-2 border-black bg-[#f5f1e8] py-2">
              <div className="flex flex-col text-xs sm:text-sm font-medium tracking-wide">
                <Link
                  href="/"
                  className="px-4 py-3 hover:bg-black hover:text-white transition-colors border-b border-gray-300"
                  onClick={closeMenu}
                >
                  HOME
                </Link>
                <Link
                  href="/about"
                  className={`px-4 py-3 hover:bg-black hover:text-white transition-colors border-b border-gray-300 ${
                    pathname === "/about" ? "bg-black text-white" : ""
                  }`}
                  onClick={closeMenu}
                >
                  ABOUT
                </Link>
                <Link
                  href="/books"
                  className={`px-4 py-3 hover:bg-black hover:text-white transition-colors border-b border-gray-300 ${
                    pathname.startsWith("/books") ? "bg-black text-white" : ""
                  }`}
                  onClick={closeMenu}
                >
                  BOOKS
                </Link>
                <Link
                  href="/pastor-profile"
                  className={`px-4 py-3 hover:bg-black hover:text-white transition-colors border-b border-gray-300 ${
                    pathname === "/pastor-profile" ? "bg-black text-white" : ""
                  }`}
                  onClick={closeMenu}
                >
                  PASTOR PROFILE
                </Link>
                <Link
                  href="/sermons"
                  className={`px-4 py-3 hover:bg-black hover:text-white transition-colors border-b border-gray-300 ${
                    pathname.startsWith("/sermons") ? "bg-black text-white" : ""
                  }`}
                  onClick={closeMenu}
                >
                  SERMONS
                </Link>
                <button
                  onClick={() => {
                    closeMenu()
                    setSearchOpen(true)
                  }}
                  className="px-4 py-3 hover:bg-black hover:text-white transition-colors border-b border-gray-300 text-left flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  SEARCH
                </button>
                <Link
                  href="/contact"
                  className={`px-4 py-3 bg-red-600 text-white hover:bg-red-700 transition-colors ${
                    pathname === "/contact" ? "bg-red-700" : ""
                  }`}
                  onClick={closeMenu}
                >
                  GET IN TOUCH
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}

export default Navigation
