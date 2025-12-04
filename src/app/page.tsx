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
      {/* GitHub Link - Improved with glassmorphism */}
      <a
        href="https://github.com/laststance/Redux-Front-Page"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 lg:top-8 lg:right-8 z-50 p-2 sm:p-2.5 md:p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.3),0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:-translate-y-1 active:scale-95 group"
        aria-label="View source code on GitHub"
      >
        <GitHubIcon width={28} height={28} className="text-indigo-700 drop-shadow-md transition-all duration-300 group-hover:text-indigo-900 group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
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
          className="text-xl text-indigo-500 uppercase tracking-[0.15em] font-medium"
          style={{ textShadow: '0 1px 2px rgba(99, 102, 241, 0.1)' }}
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
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent flex justify-center flex-wrap perspective"
            style={{ textShadow: '0 2px 4px rgba(99, 102, 241, 0.15)' }}
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
            className="mt-4 md:mt-6 text-gray-600 max-w-lg mx-auto text-sm md:text-base font-light tracking-wide leading-relaxed"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 p-8 sm:p-10 md:p-12 lg:p-14 glass-enhanced rounded-2xl backdrop-blur-md w-full max-w-4xl relative card-container"
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Enhanced gradient border glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 opacity-25 blur-md rounded-2xl"></div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-200/30 via-purple-200/30 to-pink-200/30 rounded-2xl"></div>
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
          <a
            href="https://laststance.io"
            target="_blank"
            className="text-indigo-600 hover:text-indigo-700 transition-all duration-300 hover:underline decoration-2 underline-offset-4 hover:drop-shadow-[0_0_4px_rgba(99,102,241,0.3)]"
          >
            laststance.io
          </a>
        </motion.div>
      </footer>
    </div>
  )
}
