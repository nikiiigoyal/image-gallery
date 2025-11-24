'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LandingPage() {
  // Split the first line into words for individual animation
  const titleWords = "Welcome to".split(" ")

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#191920] text-white text-center px-4">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-50 pointer-events-none" />

      <div className="z-10 flex flex-col items-center gap-8">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter flex flex-col items-center leading-tight">
          
          {/* Line 1: "Welcome to" (Animated word by word) */}
          <div className="flex gap-3 md:gap-5 overflow-hidden">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }} // Start invisible and slightly down
                animate={{ opacity: 1, y: 0 }}  // Fade in and move up
                transition={{ 
                  duration: 1,      // Slow fade duration
                  delay: i * 0.5,   // 0.5s delay between each word
                  ease: [0.2, 0.65, 0.3, 0.9] // Smooth easing
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Line 2: "RaveNhouse" (Appears last) */}
          <motion.span 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: titleWords.length * 0.5 }} // Wait for previous words
            className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to bg-pink-900"
          >
            NFT's Gallery
          </motion.span>
        </h1>
        
        {/* Description Text (Fades in after title) */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: (titleWords.length * 0.5) + 1 }}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl"
        >
          Step into a curated dimension of digital art. 
          Experience the premium gallery in 3D.
        </motion.p>

        {/* Button (Fades in last) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: (titleWords.length * 0.5) + 1.5 }}
        >
          <Link 
            href="/gallery" 
            className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 ease-in-out inline-block"
          >
            View Our Premium Gallery
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-full blur-md bg-orange-500 opacity-0 group-hover:opacity-50 transition-opacity -z-10" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
