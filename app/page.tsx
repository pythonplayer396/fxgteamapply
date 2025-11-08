'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Code, ChevronDown } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import ThreeBackground from '@/components/ThreeBackground'
import Slideshow from '@/components/Slideshow'
import Logo from '@/components/Logo'

export default function Home() {
  const { data: session } = useSession()
  const [showMainContent, setShowMainContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainContent(true)
    }, 12000) // Show main content after slideshow

    return () => clearTimeout(timer)
  }, [])

  const scrollToContent = () => {
    setShowMainContent(true)
    const element = document.getElementById('main-content')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Slideshow Section */}
      {!showMainContent && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-20"
        >
          <Slideshow />
          
          {/* Skip button */}
          <button
            onClick={() => setShowMainContent(true)}
            className="absolute top-8 right-8 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white/30 transition-all duration-300 z-30"
          >
            Skip
          </button>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: showMainContent ? 1 : 0 }}
        transition={{ duration: 1 }}
        className={`${showMainContent ? 'relative' : 'fixed inset-0 pointer-events-none'}`}
      >
        {/* Header with Logo */}
        <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo className="w-12 h-12" />
              <span className="text-2xl font-bold text-gray-800">FxG</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#positions" className="text-gray-600 hover:text-purple-600 transition-colors">
                Positions
              </Link>
              <Link href={session ? "/dashboard" : "/auth/login"}>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                  {session ? "Dashboard" : "Apply Now"}
                </button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-8">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                <span className="text-purple-700 font-medium text-sm">Now Hiring</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  FakePixel Giveaways
                </span>
                <br />
                Team Application Center
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join our amazing community and become part of something extraordinary. 
                We're looking for talented individuals to help us grow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={session ? "/dashboard" : "/auth/login"}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold text-lg hover:bg-purple-700 transition-all duration-300 shadow-lg shadow-purple-600/25 flex items-center gap-3"
                  >
                    {session ? "Go to Dashboard" : "Start Application"}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToContent}
                  className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg border border-gray-200"
                >
                  View Positions
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </section>

        {/* Positions Section */}
        <section id="positions" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Open Positions
              </h2>
              <p className="text-xl text-gray-600">
                Choose your path and join our team
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Helper Position */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={session ? "/dashboard/applications/helper" : "/auth/login"}>
                  <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">Helper</h3>
                        <p className="text-green-600 font-medium">Community Support</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      Support and assist our community members. Help create a welcoming 
                      environment and ensure everyone has a great experience.
                    </p>

                    <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Developer Position */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link href={session ? "/dashboard/applications/developer" : "/auth/login"}>
                  <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">Developer</h3>
                        <p className="text-purple-600 font-medium">Technical Innovation</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      Build and create amazing features for our platform. Work with 
                      cutting-edge technologies and help shape the future of our services.
                    </p>

                    <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Logo className="w-10 h-10" />
              <span className="text-xl font-bold text-gray-800">FakePixel Giveaways</span>
            </div>
            <p className="text-gray-600">
              Building the future, one application at a time.
            </p>
          </div>
        </footer>
      </motion.div>
    </div>
  )
}
