'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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
      "Redux mainly provides the createStore() API and offers state management functionality using plain JavaScript objects. It's a library that operates independently from the DOM or any UI framework.",
    color: 'bg-sky-400 hover:bg-sky-500',
    url: 'https://redux.js.org/',
  },
  {
    name: 'React Redux',
    description:
      'In addition to Redux, it provides React bindings like Provider and hooks. Before the Toolkit came along, this library was the de facto standard.',
    color: 'bg-indigo-800 hover:bg-indigo-900',
    url: 'https://react-redux.js.org/',
  },
  {
    name: 'Redux Toolkit',
    description:
      "Nowadays, if you're using Redux in a React app, this is your best bet. It lets you manage state with less and more organized code compared to using React Redux directly.",
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
    zIndex: 40,
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

// Color filters for each Redux library logo
const logoFilters = {
  Redux: 'hue-rotate(195deg) brightness(1.1) saturate(1.2)',
  'React Redux': 'hue-rotate(225deg) brightness(1.05) saturate(0.9)',
  'Redux Toolkit': 'hue-rotate(30deg) brightness(1.15)',
}

export default function Home() {
  const titleText = 'Redux Front Page'

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-indigo-50 to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-sky-300/20 blur-sm"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: 0 }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-indigo-300/20 blur-sm"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-purple-300/20 blur-sm"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
        />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-sky-100 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-100 to-transparent"></div>
      </div>

      {/* Heading */}
      <div className="relative z-10 pt-8 text-center">
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
          className="mt-6 mb-12"
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
                className={char === ' ' ? 'w-4' : ''}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            className="mt-2 text-gray-600 max-w-lg mx-auto text-sm md:text-base"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-6 md:p-8 bg-white/80 rounded-xl shadow-lg backdrop-blur-sm w-full max-w-4xl border-2 border-purple-300/50 relative card-container"
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 opacity-20 blur-sm"></div>
          {reduxLibraries.map((library, index) => (
            <motion.div
              key={library.name}
              className="group relative flex flex-col items-center p-4 isolate"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
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

                {/* Library name */}
                <motion.div
                  className="mt-4 text-center font-medium text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  {library.name}
                </motion.div>
              </a>

              {/* Tooltip with absolute positioning */}
              <div className="tooltip-container opacity-0 bottom-[120%]">
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
                  <p className="text-lg text-gray-700 mb-3 text-balance">
                    {library.description}
                  </p>
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
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-center py-6 mt-auto">
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
