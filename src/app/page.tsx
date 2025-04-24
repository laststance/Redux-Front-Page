'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface ReduxLibrary {
  name: string
  description: string
  color: string
  url: string
}

const reduxLibraries: ReduxLibrary[] = [
  {
    name: 'Redux',
    description:
      'A predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments, and are easy to test.',
    color: 'bg-purple-600 hover:bg-purple-700',
    url: 'https://redux.js.org/',
  },
  {
    name: 'React Redux',
    description:
      'The official React binding for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update data.',
    color: 'bg-purple-500 hover:bg-purple-600',
    url: 'https://react-redux.js.org/',
  },
  {
    name: 'Redux Toolkit',
    description:
      'The official, opinionated, batteries-included toolset for efficient Redux development. It includes utilities to simplify common Redux use cases.',
    color: 'bg-purple-400 hover:bg-purple-500',
    url: 'https://redux-toolkit.js.org/',
  },
]

// Enhanced floating animation variants
const floatingAnimation = {
  initial: { y: 0, opacity: 0.4 },
  animate: {
    y: [0, -15, 0],
    opacity: [0.4, 0.6, 0.4],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Text animation variants
const titleContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04 * i,
      when: 'beforeChildren',
    },
  }),
}

const titleCharacter = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: 40,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
}

// Card container animation
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
}

// Individual card animation
const cardVariants = {
  hidden: {
    y: 50,
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.15)',
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 250,
    },
  },
}

// Logo animation
const logoVariants = {
  initial: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    scale: [1, 1.2, 1.15],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  },
}

// Tooltip animation
const tooltipVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  },
}

// Color filters for each Redux library logo
const logoFilters = {
  Redux: 'hue-rotate(0deg) brightness(1.05)',
  'React Redux': 'hue-rotate(15deg) brightness(1.1)',
  'Redux Toolkit': 'hue-rotate(30deg) brightness(1.15)',
}

export default function Home() {
  const titleText = 'Redux Front Page'

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-950 dark:via-purple-950 dark:to-indigo-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-pink-300/20 dark:bg-pink-800/20 blur-sm"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: 0 }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-purple-300/20 dark:bg-purple-800/20 blur-sm"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-indigo-300/20 dark:bg-indigo-800/20 blur-sm"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
        />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-pink-200 to-transparent dark:from-pink-900 dark:to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-indigo-200 to-transparent dark:from-indigo-900 dark:to-transparent"></div>
      </div>

      {/* Project Framework Heading */}
      <div className="relative z-10 pt-8 text-center">
        <motion.h1
          className="text-xl text-gray-500 uppercase tracking-wide dark:text-gray-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          PROJECT FRAMEWORK
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 mb-12"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-purple-700 dark:text-purple-300 flex justify-center flex-wrap perspective"
            variants={titleContainer}
            initial="hidden"
            animate="visible"
          >
            {titleText.split('').map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                variants={titleCharacter}
                className={char === ' ' ? 'w-4' : ''}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            className="mt-2 text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Modern Redux best practices using Redux Toolkit and RTK Query
          </motion.p>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-6 md:p-8 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg backdrop-blur-sm w-full max-w-4xl border-2 border-purple-300/50 dark:border-purple-700/50 relative overflow-hidden"
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 dark:from-purple-700 dark:via-pink-700 dark:to-indigo-700 opacity-20 blur-sm"></div>
          {reduxLibraries.map((library, index) => (
            <motion.div
              key={library.name}
              className="group relative flex flex-col items-center"
              variants={cardVariants}
              whileHover="hover"
            >
              <Link
                href={library.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-full ${library.color} flex items-center justify-center shadow-md`}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    variants={logoVariants}
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
                        filter:
                          logoFilters[library.name as keyof typeof logoFilters],
                      }}
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  className="mt-4 text-center font-medium text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  {library.name}
                </motion.div>
              </Link>

              {/* Tooltip */}
              <AnimatePresence>
                <motion.div
                  className="absolute pointer-events-none opacity-0 group-hover:opacity-100 bottom-full mb-2 z-20 w-full max-w-xs"
                  variants={tooltipVariants}
                  initial="hidden"
                  whileHover="visible"
                >
                  <motion.div
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mx-auto"
                    initial={{ scale: 0.9 }}
                    whileHover={{ scale: 1 }}
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      {library.name}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {library.description}
                    </p>
                  </motion.div>
                  <div className="w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 absolute -bottom-1 left-1/2 -ml-2"></div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-center py-6 mt-auto">
        <motion.div
          className="text-center text-gray-600 dark:text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          © 2024 Redux Front Page
        </motion.div>
        <motion.div
          className="mt-4 flex space-x-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
        >
          <a
            href="https://redux.js.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-all duration-300 hover:underline hover:translate-y-[-2px] inline-block"
          >
            Official Documentation
          </a>
          <a
            href="https://github.com/reduxjs/redux"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-all duration-300 hover:underline hover:translate-y-[-2px] inline-block"
          >
            GitHub
          </a>
        </motion.div>
      </footer>
    </div>
  )
}
