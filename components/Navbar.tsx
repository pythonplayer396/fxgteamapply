'use client'

import Link from 'next/link'
import { Menu, X, User, FileText, LogOut, Home } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Logo from './Logo'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { data: session } = useSession()

  const navLinks = [
    { href: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    ...(session ? [
      { href: '/dashboard', label: 'Dashboard', icon: <FileText className="w-4 h-4" /> },
      { href: '/dashboard/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
      { href: '/dashboard/status', label: 'Applications', icon: <FileText className="w-4 h-4" /> },
    ] : [])
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Add background when scrolled
      setIsScrolled(currentScrollY > 10)
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${
      isScrolled 
        ? 'bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Logo className="w-11 h-11" />
            <span className="text-2xl font-black hidden sm:block text-white">
              FxG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-300 text-gray-300 hover:text-white font-semibold"
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <button
                onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-red-500/10 transition-all duration-300 text-red-400 hover:text-red-300 font-semibold ml-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-discord-blurple/20 transition-all duration-300 text-gray-300 hover:text-white"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            {session && (
              <button
                onClick={() => {
                  setIsOpen(false)
                  signOut({ callbackUrl: '/', redirect: true })
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-red-500/20 transition-all duration-300 text-gray-300 hover:text-white w-full"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
