import { useCallback, useRef } from 'react'

interface LongPressOptions {
  delay?: number
  moveThreshold?: number
}

interface LongPressHandlers {
  onTouchStart: (e: React.TouchEvent) => void
  onTouchEnd: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchCancel: (e: React.TouchEvent) => void
}

/**
 * Custom hook for detecting long press gestures on touch devices
 * @param onLongPress - Callback function to execute on long press
 * @param options - Configuration options
 * @returns Touch event handlers
 */
export function useLongPress(
  onLongPress: () => void,
  options: LongPressOptions = {}
): LongPressHandlers {
  const { delay = 500, moveThreshold = 10 } = options

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startPositionRef = useRef<{ x: number; y: number } | null>(null)
  const isLongPressTriggeredRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return

      // Store initial touch position
      startPositionRef.current = { x: touch.clientX, y: touch.clientY }
      isLongPressTriggeredRef.current = false

      // Clear any existing timer
      clearTimer()

      // Start long press timer
      timerRef.current = setTimeout(() => {
        isLongPressTriggeredRef.current = true
        onLongPress()
      }, delay)
    },
    [delay, onLongPress, clearTimer]
  )

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0]
      if (!touch || !startPositionRef.current) return

      // Calculate movement distance
      const deltaX = Math.abs(touch.clientX - startPositionRef.current.x)
      const deltaY = Math.abs(touch.clientY - startPositionRef.current.y)
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      // Cancel long press if moved too far
      if (distance > moveThreshold) {
        clearTimer()
      }
    },
    [moveThreshold, clearTimer]
  )

  const onTouchEnd = useCallback(() => {
    clearTimer()
    startPositionRef.current = null
  }, [clearTimer])

  const onTouchCancel = useCallback(() => {
    clearTimer()
    startPositionRef.current = null
  }, [clearTimer])

  return {
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onTouchCancel,
  }
}
