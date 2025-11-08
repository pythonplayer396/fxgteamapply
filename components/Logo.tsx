'use client'

import { motion } from 'framer-motion'

export default function Logo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <motion.div 
      className={`${className} relative`}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
        <span className="text-white font-black text-2xl tracking-wider">FXG</span>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 -z-10 scale-110"></div>
    </motion.div>
  )
}
