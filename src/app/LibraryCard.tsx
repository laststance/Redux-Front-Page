'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { useLongPress } from './useLongPress'
import { cardVariants, cardTransition, logoVariants, logoHoverTransition, logoFilters } from './variables'
import type { ReduxLibrary } from './variables'

interface LibraryCardProps {
  library: ReduxLibrary
  index: number
  visibleTooltip: number | null
  onTooltipToggle: (index: number) => void
}

export function LibraryCard({ library, index, visibleTooltip, onTooltipToggle }: LibraryCardProps) {
  // Long press handlers for touch devices
  const longPressHandlers = useLongPress(() => onTooltipToggle(index), {
    delay: 500,
    moveThreshold: 10,
  })

  return (
    <motion.div
      className="group relative flex flex-col items-center p-4 md:p-6 isolate rounded-lg transition-shadow duration-300 ease-out hover:shadow-[0_8px_30px_rgba(99,102,241,0.12),0_2px_8px_rgba(99,102,241,0.08)]"
      variants={cardVariants}
      transition={cardTransition}
      whileHover="hover"
      initial="hidden"
      animate="visible"
      {...longPressHandlers}
      onTouchStart={(e) => {
        e.stopPropagation() // Prevent closing when touching card
        longPressHandlers.onTouchStart(e)
      }}
    >
      {/* Container with link */}
      <a
        href={library.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center no-underline relative"
      >
        {/* Logo */}
        <motion.div
          className={`w-24 h-24 md:w-32 md:h-32 rounded-full ${library.color} flex items-center justify-center shadow-md relative z-10`}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            variants={logoVariants}
            transition={logoHoverTransition}
            initial="initial"
            whileHover="hover"
          >
            <Image
              src="/redux-logo.svg"
              alt={library.name}
              width={48}
              height={48}
              className="w-12 h-12 md:w-16 md:h-16 invert redux-logo-glow"
              style={{
                filter: logoFilters[library.name as keyof typeof logoFilters],
              }}
            />
          </motion.div>
        </motion.div>

        {/* Library name */}
        <motion.div
          className="mt-6 md:mt-8 text-center font-medium text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.2 }}
        >
          {library.name}
        </motion.div>
      </a>

      {/* Tooltip with absolute positioning */}
      <div
        className={`tooltip-container bottom-[120%] ${
          visibleTooltip === index ? 'opacity-100 visible' : 'opacity-0'
        }`}
        data-tooltip-active={visibleTooltip === index}
      >
        <div
          className={`p-6 rounded-xl shadow-xl mx-auto backdrop-blur-sm ${
            library.name === 'Redux'
              ? 'bg-sky-100/90 border border-sky-200'
              : library.name === 'React Redux'
                ? 'bg-indigo-100/90 border border-indigo-200'
                : 'bg-purple-100/90 border border-purple-200'
          }`}
        >
          <h3
            className={`font-bold mb-3 text-xl ${
              library.name === 'Redux'
                ? 'text-sky-900'
                : library.name === 'React Redux'
                  ? 'text-indigo-900'
                  : 'text-purple-900'
            }`}
          >
            {library.name}
          </h3>
          <p className="text-lg text-gray-700 mb-3 text-balance">{library.description}</p>
        </div>
        <div
          className={`w-5 h-5 transform rotate-45 absolute -bottom-2 left-1/2 -ml-2 ${
            library.name === 'Redux'
              ? 'bg-sky-100/90 border-b border-r border-sky-200'
              : library.name === 'React Redux'
                ? 'bg-indigo-100/90 border-b border-r border-indigo-200'
                : 'bg-purple-100/90 border-b border-r border-purple-200'
          }`}
        ></div>
      </div>
    </motion.div>
  )
}
