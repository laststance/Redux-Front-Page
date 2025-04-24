export interface ReduxLibrary {
  name: string
  description: string
  color: string
  url: string
}

export const reduxLibraries: ReduxLibrary[] = [
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
export const floatingAnimation = {
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
export const titleContainer = {
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

export const titleCharacter = {
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
export const cardContainerVariants = {
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
export const cardVariants = {
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
export const logoVariants = {
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
export const logoFilters = {
  Redux: 'hue-rotate(195deg) brightness(1.1) saturate(1.2)',
  'React Redux': 'hue-rotate(225deg) brightness(1.05) saturate(0.9)',
  'Redux Toolkit': 'hue-rotate(30deg) brightness(1.15)',
}
