import { useCallback, useEffect, useRef, useState } from "react"

interface Size {
  width: number
  height: number
}

/**
 * ResizeObserver-based hook for responsive container sizing.
 * Returns the measured { width, height } of the element.
 */
export default function useResizeObserver<T extends HTMLElement>(): {
  ref: React.RefCallback<T>
  size: Size
} {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })
  const observerRef = useRef<ResizeObserver | null>(null)
  const elementRef = useRef<T | null>(null)

  const ref = useCallback((node: T | null) => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    elementRef.current = node

    if (node) {
      const observer = new ResizeObserver((entries) => {
        const entry = entries[0]
        if (entry) {
          const { width, height } = entry.contentRect
          setSize((prev) => {
            if (prev.width === width && prev.height === height) return prev
            return { width, height }
          })
        }
      })
      observer.observe(node)
      observerRef.current = observer

      // Set initial size
      const rect = node.getBoundingClientRect()
      setSize({ width: rect.width, height: rect.height })
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return { ref, size }
}
