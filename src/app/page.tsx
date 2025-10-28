'use client'

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'

import GitHubIcon from './GitHubIcon'
import { LibraryCard } from './LibraryCard'
import {
  floatingAnimation,
  titleContainer,
  titleCharacter,
  titleCharacterTransition,
  cardContainerVariants,
  reduxLibraries,
} from './variables'

export default function Home() {
  const titleText = 'Redux Front Page'
  const [visibleTooltip, setVisibleTooltip] = useState<number | null>(null)

  // Toggle tooltip visibility for touch devices
  const handleTooltipToggle = useCallback((index: number) => {
    setVisibleTooltip((prev) => (prev === index ? null : index))
  }, [])

  // Close tooltip when clicking/touching outside
  const handleOutsideTouch = useCallback(() => {
    setVisibleTooltip(null)
  }, [])

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-indigo-50 to-purple-50"
      onTouchStart={handleOutsideTouch}
    >
      {/* GitHub Link */}
      <a
        href="https://github.com/laststance/Redux-Front-Page"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 md:top-8 md:right-8 z-50 transition-transform hover:scale-110"
        aria-label="View source code on GitHub"
      >
        <GitHubIcon width={32} height={32} className="text-white drop-shadow-md" />
      </a>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-sky-300/20 blur-sm"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-indigo-300/20 blur-sm"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-purple-300/20 blur-sm"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-sky-100 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-100 to-transparent"></div>
      </div>

      {/* Heading */}
      <div className="relative z-10 pt-12 md:pt-16 lg:pt-20 text-center">
        <motion.h1
          className="text-xl text-indigo-500 uppercase tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          A State Management Library
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 mb-16 md:mb-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-indigo-700 flex justify-center flex-wrap perspective"
            variants={titleContainer}
            initial="hidden"
            animate="visible"
          >
            {titleText.split('').map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                variants={titleCharacter}
                transition={titleCharacterTransition}
                className={char === ' ' ? 'w-4' : ''}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            className="mt-4 md:mt-6 text-gray-600 max-w-lg mx-auto text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Modern Redux best practices using Redux Toolkit and RTK Query
          </motion.p>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 p-6 sm:p-8 md:p-10 lg:p-12 bg-white/80 rounded-xl shadow-lg backdrop-blur-sm w-full max-w-4xl border-2 border-purple-300/50 relative card-container"
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 opacity-20 blur-sm"></div>
          {reduxLibraries.map((library, index) => (
            <LibraryCard
              key={library.name}
              library={library}
              index={index}
              visibleTooltip={visibleTooltip}
              onTooltipToggle={handleTooltipToggle}
            />
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-center py-10 md:py-16 mt-auto">
        <motion.div
          className="text-center text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          © 2025{' '}
          <a href="https://laststance.io" target="_blank">
            laststance.io
          </a>
        </motion.div>
      </footer>
    </div>
  )
}
