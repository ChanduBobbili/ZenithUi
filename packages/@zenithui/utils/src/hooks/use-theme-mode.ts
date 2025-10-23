import { useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"

const isBrowser = typeof window !== "undefined"

// Inject base CSS for view transitions
const injectBaseStyles = () => {
  if (isBrowser) {
    const styleId = "zenithui-theme-switch-base-style"
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style")
      style.id = styleId
      const isHighResolution =
        window.innerWidth >= 3000 || window.innerHeight >= 2000

      style.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
          ${isHighResolution ? "transform: translateZ(0);" : ""}
        }

        ${
          isHighResolution
            ? `
        ::view-transition-group(root),
        ::view-transition-image-pair(root),
        ::view-transition-old(root),
        ::view-transition-new(root) {
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translate3d(0, 0, 0);
        }
        `
            : ""
        }
      `
      document.head.appendChild(style)
    }
  }
}

type ThemeAnimationType =
  | "SWIPE"
  | "CIRCLE"
  | "CIRCLE-BLUR"
  | "DIAMOND"
  | "RIPPLE"

interface ReactThemeSwitchAnimationHook {
  ref: React.RefObject<HTMLButtonElement | null>
  toggleSwitchTheme: () => Promise<void>
  isDarkMode: boolean
}

export interface ReactThemeSwitchAnimationProps {
  duration?: number
  easing?: string
  pseudoElement?: string
  globalClassName?: string
  animationType?: ThemeAnimationType
  blurAmount?: number
  styleId?: string
  isDarkMode?: boolean
  rippleCount?: number
  splitDirection?: "horizontal" | "vertical" | "diagonal"
  pixelSize?: number
  glitchIntensity?: number
  onDarkModeChange?: (isDark: boolean) => void
}

const useThemeMode = (
  props?: ReactThemeSwitchAnimationProps,
): ReactThemeSwitchAnimationHook => {
  const {
    duration: propsDuration = 750,
    easing = "ease-in-out",
    pseudoElement = "::view-transition-new(root)",
    globalClassName = "dark",
    animationType = "CIRCLE",
    blurAmount = 2,
    styleId = "zenithui-theme-switch-style",
    isDarkMode: externalDarkMode,
    rippleCount = 3,
    splitDirection = "vertical",
    pixelSize = 20,
    glitchIntensity = 10,
    onDarkModeChange,
  } = props || {}

  const isHighResolution =
    typeof window !== "undefined" &&
    (window.innerWidth >= 3000 || window.innerHeight >= 2000)

  const duration = isHighResolution
    ? Math.max(propsDuration * 0.8, 500)
    : propsDuration

  // Inject base styles when the hook is initialized
  useEffect(() => {
    injectBaseStyles()
  }, [])

  const [internalDarkMode, setInternalDarkMode] = useState(
    isBrowser ? localStorage.getItem("theme") === "dark" : false,
  )

  const isDarkMode = externalDarkMode ?? internalDarkMode
  const setIsDarkMode = (value: boolean | ((prev: boolean) => boolean)) => {
    const newValue = typeof value === "function" ? value(isDarkMode) : value
    if (onDarkModeChange) {
      onDarkModeChange(newValue)
    } else {
      setInternalDarkMode(newValue)
    }
  }

  const ref = useRef<HTMLButtonElement>(null)

  const createBlurCircleMask = (blur: number) => {
    // Using a larger viewBox and centered circle for better scaling
    const isHighResolution =
      typeof window !== "undefined" &&
      (window.innerWidth >= 3000 || window.innerHeight >= 2000)

    const blurFilter = isHighResolution
      ? `<filter id="blur"><feGaussianBlur stdDeviation="${blur}" /></filter>`
      : `<filter id="blur"><feGaussianBlur stdDeviation="${blur}" /></filter>`

    const circleRadius = isHighResolution ? 20 : 25

    return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><defs>${blurFilter}</defs><circle cx="0" cy="0" r="${circleRadius}" fill="white" filter="url(%23blur)"/></svg>')`
  }

  const toggleSwitchTheme = async () => {
    if (
      !ref.current ||
      !(document as Document).startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsDarkMode((isDarkMode) => !isDarkMode)
      return
    }

    const existingStyle = document.getElementById(styleId)
    if (existingStyle) {
      existingStyle.remove()
    }

    const { top, left, width, height } = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2

    // Calculate the distance to each corner of the viewport
    const topLeft = Math.hypot(x, y)
    const topRight = Math.hypot(window.innerWidth - x, y)
    const bottomLeft = Math.hypot(x, window.innerHeight - y)
    const bottomRight = Math.hypot(
      window.innerWidth - x,
      window.innerHeight - y,
    )

    // Find the maximum distance to ensure animation covers the entire viewport
    const maxRadius = Math.max(topLeft, topRight, bottomLeft, bottomRight)

    const viewportSize = Math.max(window.innerWidth, window.innerHeight) + 200

    const isHighResolution =
      window.innerWidth >= 3000 || window.innerHeight >= 2000
    const scaleFactor = isHighResolution ? 2.5 : 4

    const optimalMaskSize = isHighResolution
      ? Math.min(viewportSize * scaleFactor, 5000)
      : viewportSize * scaleFactor

    const finalMaskPosition = {
      x: x - optimalMaskSize / 2,
      y: y - optimalMaskSize / 2,
    }

    if (animationType === "CIRCLE-BLUR") {
      const styleElement = document.createElement("style")
      styleElement.id = styleId

      // Improved sizing and animation for corner positions
      const blurFactor = isHighResolution ? 1.5 : 1.2
      const finalMaskSize = Math.max(optimalMaskSize, maxRadius * 2.5)

      styleElement.textContent = `
        ::view-transition-group(root) {
          animation-duration: ${duration}ms;
          animation-timing-function: ${
            isHighResolution
              ? "cubic-bezier(0.2, 0, 0.2, 1)"
              : "linear(" +
                "0 0%, 0.2342 12.49%, 0.4374 24.99%," +
                "0.6093 37.49%, 0.6835 43.74%," +
                "0.7499 49.99%, 0.8086 56.25%," +
                "0.8593 62.5%, 0.9023 68.75%, 0.9375 75%," +
                "0.9648 81.25%, 0.9844 87.5%," +
                "0.9961 93.75%, 1 100%" +
                ")"
          };
          will-change: transform;
        }

        ::view-transition-new(root) {
          mask: ${createBlurCircleMask(blurAmount * blurFactor)} 0 0 / 100% 100% no-repeat;
          mask-position: ${x}px ${y}px;
          animation: maskScale ${duration}ms ${easing};
          transform-origin: ${x}px ${y}px;
          will-change: mask-size, mask-position;
        }

        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: maskScale ${duration}ms ${easing};
          transform-origin: ${x}px ${y}px;
          z-index: -1;
          will-change: mask-size, mask-position;
        }

        @keyframes maskScale {
          0% {
            mask-size: 0px;
            mask-position: ${x}px ${y}px;
          }
          100% {
            mask-size: ${finalMaskSize}px;
            mask-position: ${x - finalMaskSize / 2}px ${y - finalMaskSize / 2}px;
          }
        }
      `
      document.head.appendChild(styleElement)
    }

    await (document as Document).startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode((isDarkMode) => !isDarkMode)
      })
    }).ready

    if (animationType === "CIRCLE") {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing,
          pseudoElement,
        },
      )
    }

    if (animationType === "CIRCLE-BLUR") {
      setTimeout(() => {
        const styleElement = document.getElementById(styleId)
        if (styleElement) {
          styleElement.remove()
        }
      }, duration)
    }

    if (animationType === "SWIPE") {
      const scanLineWidth = isHighResolution ? 8 : 4
      document.documentElement.animate(
        {
          clipPath: [
            `polygon(0% 0%, ${scanLineWidth}px 0%, ${scanLineWidth}px 100%, 0% 100%)`,
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ],
        },
        {
          duration,
          easing,
          pseudoElement,
        },
      )
    }

    if (animationType === "DIAMOND") {
      const diagonalRadius = Math.hypot(window.innerWidth, window.innerHeight)
      document.documentElement.animate(
        {
          clipPath: [
            `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
            `polygon(${x}px ${y - diagonalRadius}px, ${x + diagonalRadius}px ${y}px, ${x}px ${y + diagonalRadius}px, ${x - diagonalRadius}px ${y}px)`,
          ],
        },
        {
          duration,
          easing,
          pseudoElement,
        },
      )
    }

    if (animationType === "RIPPLE") {
      const styleElement = document.createElement("style")
      styleElement.id = styleId

      const ripples = Array.from({ length: rippleCount }, (_, i) => {
        const delay = (i * duration) / (rippleCount * 2)
        const size = maxRadius * (1 + i * 0.3)
        return `
          @keyframes ripple${i} {
            0% {
              clip-path: circle(0px at ${x}px ${y}px);
              opacity: ${1 - i * 0.2};
            }
            100% {
              clip-path: circle(${size}px at ${x}px ${y}px);
              opacity: 0;
            }
          }
        `
      }).join("\n")

      styleElement.textContent = `
        ${ripples}
        ::view-transition-new(root) {
          animation: ripple0 ${duration}ms ${easing};
        }
      `
      document.head.appendChild(styleElement)

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing,
          pseudoElement,
        },
      )
    }
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add(globalClassName)
      localStorage.theme = "dark"
    } else {
      document.documentElement.classList.remove(globalClassName)
      localStorage.theme = "light"
    }
  }, [isDarkMode, globalClassName])

  return {
    ref,
    toggleSwitchTheme,
    isDarkMode,
  }
}

export default useThemeMode
