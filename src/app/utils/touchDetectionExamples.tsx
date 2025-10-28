/**
 * Touch Detection Usage Examples
 */

import React from 'react'
import {
  hasTouchSupport,
  isTouchOnlyDevice,
  isHybridDevice,
  getPrimaryInputType,
  isMobileUserAgent,
  useTouchDetection,
  setupRuntimeTouchDetection,
} from './detectTouch'

// ========================================
// Example 1: Basic Touch Support Check
// ========================================
export function Example1_BasicCheck() {
  const hasTouch = hasTouchSupport()

  return (
    <div>
      <p>Touch support: {hasTouch ? '✅ Yes' : '❌ No'}</p>
      {hasTouch ? <TouchOptimizedUI /> : <MouseOptimizedUI />}
    </div>
  )
}

// ========================================
// Example 2: Conditional Rendering Based on Device Type
// ========================================
export function Example2_ConditionalRendering() {
  const inputType = getPrimaryInputType()

  return (
    <div>
      <p>Input type: {inputType}</p>

      {inputType === 'touch' && <div>📱 Mobile/Tablet optimized interface</div>}

      {inputType === 'mouse' && <div>🖱️ Desktop optimized interface</div>}

      {inputType === 'hybrid' && (
        <div>💻+👆 Hybrid device - supporting both inputs</div>
      )}
    </div>
  )
}

// ========================================
// Example 3: Using React Hook for Touch Detection
// ========================================
export function Example3_ReactHook() {
  const { isTouch, isTouchOnly, isHybrid, inputType } = useTouchDetection()

  return (
    <div>
      <h3>Device Information:</h3>
      <ul>
        <li>Has Touch Support: {isTouch ? 'Yes' : 'No'}</li>
        <li>Touch Only Device: {isTouchOnly ? 'Yes' : 'No'}</li>
        <li>Hybrid Device: {isHybrid ? 'Yes' : 'No'}</li>
        <li>Primary Input: {inputType}</li>
      </ul>

      {/* Adjust tooltip behavior based on device */}
      {isTouchOnly ? (
        <button>Long press for details</button>
      ) : (
        <button title="Hover for details">Click or hover</button>
      )}
    </div>
  )
}

// ========================================
// Example 4: Conditional CSS Classes
// ========================================
export function Example4_ConditionalCSS() {
  const { isTouch, isHybrid } = useTouchDetection()

  return (
    <div
      className={`
        interactive-element
        ${isTouch ? 'touch-optimized' : 'mouse-optimized'}
        ${isHybrid ? 'hybrid-device' : ''}
      `}
    >
      {/* CSS can target these classes:
        .touch-optimized { min-height: 44px; /* Larger touch targets */ }
        .mouse-optimized { cursor: pointer; }
        .hybrid-device { /* Support both interactions */ }
      */}
      Interactive content
    </div>
  )
}

// ========================================
// Example 5: Runtime Detection with First Interaction
// ========================================
export function Example5_RuntimeDetection() {
  const [detectedInput, setDetectedInput] = React.useState<'unknown' | 'touch' | 'mouse'>(
    'unknown'
  )

  React.useEffect(() => {
    setupRuntimeTouchDetection((isTouch) => {
      setDetectedInput(isTouch ? 'touch' : 'mouse')
    })
  }, [])

  return (
    <div>
      <p>Detected input: {detectedInput}</p>
      <p>
        {detectedInput === 'unknown'
          ? 'Waiting for first interaction...'
          : `User is using ${detectedInput}`}
      </p>
    </div>
  )
}

// ========================================
// Example 6: Adaptive Tooltip Component
// ========================================
interface AdaptiveTooltipProps {
  content: string
  children: React.ReactNode
}

export function Example6_AdaptiveTooltip({ content, children }: AdaptiveTooltipProps) {
  const { isTouchOnly } = useTouchDetection()
  const [isVisible, setIsVisible] = React.useState(false)

  if (isTouchOnly) {
    // Touch device: Show on tap
    return (
      <div onClick={() => setIsVisible(!isVisible)}>
        {children}
        {isVisible && <div className="tooltip">{content}</div>}
      </div>
    )
  }

  // Desktop: Show on hover
  return (
    <div className="has-hover-tooltip" title={content}>
      {children}
      <div className="tooltip-on-hover">{content}</div>
    </div>
  )
}

// ========================================
// Example 7: Different Event Handlers by Device
// ========================================
export function Example7_AdaptiveEvents() {
  const { isTouchOnly } = useTouchDetection()
  const [message, setMessage] = React.useState('')

  if (isTouchOnly) {
    // Touch device: Use touch events
    return (
      <div
        onTouchStart={() => setMessage('Touch started')}
        onTouchEnd={() => setMessage('Touch ended')}
      >
        Touch this area
        <p>{message}</p>
      </div>
    )
  }

  // Desktop: Use mouse events
  return (
    <div
      onMouseEnter={() => setMessage('Mouse entered')}
      onMouseLeave={() => setMessage('Mouse left')}
      onClick={() => setMessage('Clicked')}
    >
      Hover or click this area
      <p>{message}</p>
    </div>
  )
}

// ========================================
// Example 8: Server-Side Safe Detection
// ========================================
export function Example8_SSRSafe() {
  const [deviceInfo, setDeviceInfo] = React.useState<{
    hasTouch: boolean
    inputType: string
  } | null>(null)

  React.useEffect(() => {
    // Only run detection on client-side
    setDeviceInfo({
      hasTouch: hasTouchSupport(),
      inputType: getPrimaryInputType(),
    })
  }, [])

  if (!deviceInfo) {
    // Server-side or initial render: show neutral UI
    return <div>Loading device detection...</div>
  }

  return (
    <div>
      <p>Device has touch: {deviceInfo.hasTouch ? 'Yes' : 'No'}</p>
      <p>Input type: {deviceInfo.inputType}</p>
    </div>
  )
}

// ========================================
// Example 9: Media Query Based Detection (CSS)
// ========================================
export function Example9_CSSMediaQueries() {
  return (
    <div className="adaptive-container">
      {/* In your CSS:

        @media (pointer: coarse) {
          /* Touch device styles */
          .adaptive-container {
            padding: 1rem;
          }
          button { min-height: 44px; }
        }

        @media (pointer: fine) {
          /* Mouse device styles */
          .adaptive-container {
            padding: 0.5rem;
          }
          button { min-height: 32px; }
        }

        @media (hover: hover) {
          /* Device supports hover */
          .hover-effect:hover {
            background: blue;
          }
        }

        @media (hover: none) {
          /* Device doesn't support hover (touch) */
          .hover-effect:active {
            background: blue;
          }
        }
      */}
      <button className="hover-effect">Adaptive Button</button>
    </div>
  )
}

// ========================================
// Example 10: Complete Implementation (Current Project)
// ========================================
export function Example10_CompleteImplementation() {
  const { isTouchOnly, isHybrid, inputType } = useTouchDetection()

  return (
    <div>
      <h3>Current Device:</h3>
      <div className="device-info">
        <p>Type: {inputType}</p>
        <p>Touch Only: {isTouchOnly ? 'Yes' : 'No'}</p>
        <p>Hybrid: {isHybrid ? 'Yes' : 'No'}</p>
      </div>

      <div className="interaction-instructions">
        {isTouchOnly && <p>👆 Long press cards to see tooltips</p>}
        {isHybrid && <p>🖱️ Hover or 👆 long press cards to see tooltips</p>}
        {inputType === 'mouse' && <p>🖱️ Hover over cards to see tooltips</p>}
      </div>
    </div>
  )
}

// Helper components
function TouchOptimizedUI() {
  return <div>Touch optimized UI</div>
}

function MouseOptimizedUI() {
  return <div>Mouse optimized UI</div>
}
