/**
 * Touch device detection utilities
 */

/**
 * Method 1: Check if touch events are supported
 * Most reliable for basic touch detection
 */
export function hasTouchSupport(): boolean {
  if (typeof window === 'undefined') return false

  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  )
}

/**
 * Method 2: Check if device is ONLY touch (mobile/tablet)
 * Combines touch support with screen size and pointer type
 */
export function isTouchOnlyDevice(): boolean {
  if (typeof window === 'undefined') return false

  const hasTouchEvents = hasTouchSupport()
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
  const isMobileSize = window.matchMedia('(max-width: 1024px)').matches

  return hasTouchEvents && (hasCoarsePointer || isMobileSize)
}

/**
 * Method 3: Detect hybrid devices (touch + mouse)
 * Like Surface Pro, touchscreen laptops
 */
export function isHybridDevice(): boolean {
  if (typeof window === 'undefined') return false

  const hasTouchEvents = hasTouchSupport()
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches
  const hasAnyPointerCoarse = window.matchMedia('(any-pointer: coarse)').matches

  return hasTouchEvents && hasFinePointer && hasAnyPointerCoarse
}

/**
 * Method 4: Get primary input type
 * Returns the most likely input method user will use
 */
export type InputType = 'touch' | 'mouse' | 'hybrid' | 'unknown'

export function getPrimaryInputType(): InputType {
  if (typeof window === 'undefined') return 'unknown'

  const hasTouchEvents = hasTouchSupport()

  // Check pointer media queries (most reliable)
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches
  const hasAnyPointerCoarse = window.matchMedia('(any-pointer: coarse)').matches

  // Hybrid device detection
  if (hasTouchEvents && hasFinePointer && hasAnyPointerCoarse) {
    return 'hybrid'
  }

  // Touch-only device (mobile, tablet)
  if (hasTouchEvents && hasCoarsePointer) {
    return 'touch'
  }

  // Mouse-only device (desktop without touch)
  if (!hasTouchEvents && hasFinePointer) {
    return 'mouse'
  }

  // Fallback: check user agent (less reliable)
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = ['android', 'iphone', 'ipad', 'ipod', 'mobile']
  const isMobileUserAgent = mobileKeywords.some(keyword => userAgent.includes(keyword))

  if (hasTouchEvents || isMobileUserAgent) {
    return 'touch'
  }

  return 'mouse'
}

/**
 * Method 5: User Agent detection (least reliable, use as fallback)
 */
export function isMobileUserAgent(): boolean {
  if (typeof window === 'undefined') return false

  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = [
    'android',
    'webos',
    'iphone',
    'ipad',
    'ipod',
    'blackberry',
    'windows phone',
    'mobile',
  ]

  return mobileKeywords.some(keyword => userAgent.includes(keyword))
}

/**
 * Method 6: React hook for touch detection with state updates
 */
export function useTouchDetection() {
  if (typeof window === 'undefined') {
    return {
      isTouch: false,
      isTouchOnly: false,
      isHybrid: false,
      inputType: 'unknown' as InputType,
    }
  }

  // Initialize on mount
  const [touchState, setTouchState] = React.useState({
    isTouch: hasTouchSupport(),
    isTouchOnly: isTouchOnlyDevice(),
    isHybrid: isHybridDevice(),
    inputType: getPrimaryInputType(),
  })

  React.useEffect(() => {
    // Update on resize (for responsive changes)
    const handleResize = () => {
      setTouchState({
        isTouch: hasTouchSupport(),
        isTouchOnly: isTouchOnlyDevice(),
        isHybrid: isHybridDevice(),
        inputType: getPrimaryInputType(),
      })
    }

    window.addEventListener('resize', handleResize)

    // Also listen for pointer type changes
    const pointerQuery = window.matchMedia('(pointer: coarse)')
    const handlePointerChange = () => handleResize()

    // Modern browsers
    if (pointerQuery.addEventListener) {
      pointerQuery.addEventListener('change', handlePointerChange)
    } else {
      // Legacy browsers
      pointerQuery.addListener(handlePointerChange)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (pointerQuery.removeEventListener) {
        pointerQuery.removeEventListener('change', handlePointerChange)
      } else {
        pointerQuery.removeListener(handlePointerChange)
      }
    }
  }, [])

  return touchState
}

/**
 * Method 7: Runtime touch detection (detects first touch)
 * Most accurate for actual usage patterns
 */
let hasDetectedTouch = false

export function setupRuntimeTouchDetection(callback?: (isTouch: boolean) => void) {
  if (typeof window === 'undefined') return

  const detectTouch = () => {
    if (!hasDetectedTouch) {
      hasDetectedTouch = true
      document.documentElement.classList.add('touch-device')
      callback?.(true)
    }
  }

  const detectMouse = () => {
    if (!hasDetectedTouch) {
      document.documentElement.classList.add('mouse-device')
      callback?.(false)
    }
  }

  // Listen for first touch
  window.addEventListener('touchstart', detectTouch, { once: true, passive: true })

  // Listen for first mouse move (with delay to avoid false positives)
  let mouseMoveTimeout: NodeJS.Timeout
  const handleMouseMove = () => {
    clearTimeout(mouseMoveTimeout)
    mouseMoveTimeout = setTimeout(detectMouse, 100)
  }
  window.addEventListener('mousemove', handleMouseMove, { once: true })
}

// Add this to React component
import React from 'react'
