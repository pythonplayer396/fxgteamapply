'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    title: "Welcome to FxG Team",
    subtitle: "Application Center",
    description: "Join our amazing community"
  },
  {
    title: "We're Hiring",
    subtitle: "Talented Individuals",
    description: "Be part of something extraordinary"
  },
  {
    title: "Ready to Start?",
    subtitle: "Apply Today",
    description: "Your journey begins here"
  }
]

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000) // Faster transitions

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-center z-10"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-4 text-gray-800"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {slides[currentSlide].title}
          </motion.h1>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-light mb-6 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {slides[currentSlide].subtitle}
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {slides[currentSlide].description}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-purple-600 scale-125' 
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
        <motion.div
          className="h-full bg-purple-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          key={currentSlide}
        />
      </div>
    </div>
  )
}
