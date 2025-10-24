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

export type ThemeAnimationType =
  | "SWIPE"
  | "CIRCLE"
  | "CIRCLE-BLUR"
  | "DIAMOND"
  | "RIPPLE"
  | "SHUTTER"
  | "SPLIT"
  | "SPIRAL"
  | "PIXELATE"
  | "RANDOM_BLOCKS"
  | "CORNERS"
  | "WARP"
  | "GLITCH"

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
    pixelSize = 10,
    glitchIntensity = 5,
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

    if (animationType === "SHUTTER") {
      const segments = 8
      const centerX = x
      const centerY = y
      const radius = maxRadius * 1.5

      const createShutterPolygon = (angle: number, open: boolean) => {
        const nextAngle = angle + 360 / segments
        const openRadius = open ? radius : 0

        const x1 = centerX + Math.cos((angle * Math.PI) / 180) * openRadius
        const y1 = centerY + Math.sin((angle * Math.PI) / 180) * openRadius
        const x2 = centerX + Math.cos((nextAngle * Math.PI) / 180) * openRadius
        const y2 = centerY + Math.sin((nextAngle * Math.PI) / 180) * openRadius

        return `${centerX}px ${centerY}px, ${x1}px ${y1}px, ${x2}px ${y2}px`
      }

      const closedPath = Array.from({ length: segments }, (_, i) =>
        createShutterPolygon(i * (360 / segments), false),
      ).join(", ")

      const openPath = Array.from({ length: segments }, (_, i) =>
        createShutterPolygon(i * (360 / segments), true),
      ).join(", ")

      document.documentElement.animate(
        {
          clipPath: [`polygon(${closedPath})`, `polygon(${openPath})`],
        },
        {
          duration,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement,
        },
      )
    }

    if (animationType === "SPLIT") {
      let clipPaths: string[] = []

      if (splitDirection === "horizontal") {
        clipPaths = [
          `polygon(0% ${(y / window.innerHeight) * 100}%, 100% ${(y / window.innerHeight) * 100}%, 100% ${(y / window.innerHeight) * 100}%, 0% ${(y / window.innerHeight) * 100}%)`,
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ]
      } else if (splitDirection === "vertical") {
        clipPaths = [
          `polygon(${(x / window.innerWidth) * 100}% 0%, ${(x / window.innerWidth) * 100}% 0%, ${(x / window.innerWidth) * 100}% 100%, ${(x / window.innerWidth) * 100}% 100%)`,
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ]
      } else {
        clipPaths = [
          `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ]
      }

      document.documentElement.animate(
        {
          clipPath: clipPaths,
        },
        {
          duration,
          easing,
          pseudoElement,
        },
      )
    }

    if (animationType === "SPIRAL") {
      const styleElement = document.createElement("style")
      styleElement.id = styleId

      const turns = 3
      const steps = 60
      const spiralPath = Array.from({ length: steps }, (_, i) => {
        const progress = i / steps
        const angle = progress * turns * 2 * Math.PI
        const radius = progress * maxRadius
        const spiralX = x + Math.cos(angle) * radius
        const spiralY = y + Math.sin(angle) * radius
        return `${spiralX}px ${spiralY}px`
      }).join(", ")

      styleElement.textContent = `
        @keyframes spiral {
          0% {
            clip-path: circle(0px at ${x}px ${y}px);
            transform: rotate(0deg);
          }
          100% {
            clip-path: circle(${maxRadius}px at ${x}px ${y}px);
            transform: rotate(${turns * 360}deg);
          }
        }
        ::view-transition-new(root) {
          animation: spiral ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: ${x}px ${y}px;
        }
      `
      document.head.appendChild(styleElement)
    }

    if (animationType === "PIXELATE") {
      const styleElement = document.createElement("style")
      styleElement.id = styleId

      const cols = Math.ceil(window.innerWidth / pixelSize)
      const rows = Math.ceil(window.innerHeight / pixelSize)

      styleElement.textContent = `
        @keyframes pixelate {
          0% {
            filter: blur(${pixelSize}px) brightness(0.5);
            transform: scale(0.9);
          }
          50% {
            filter: blur(${pixelSize / 2}px) brightness(0.75);
          }
          100% {
            filter: blur(0px) brightness(1);
            transform: scale(1);
          }
        }
        ::view-transition-new(root) {
          animation: pixelate ${duration}ms steps(${Math.min(cols, rows, 20)}) forwards;
        }
        ::view-transition-old(root) {
          animation: pixelate ${duration}ms steps(${Math.min(cols, rows, 20)}) reverse;
        }
      `
      document.head.appendChild(styleElement)
    }

    if (animationType === "WARP") {
      const styleElement = document.createElement("style")
      styleElement.id = styleId

      styleElement.textContent = `
        @keyframes warp {
          0% {
            transform: perspective(1000px) rotateY(90deg) scale(0.5);
            filter: blur(10px);
            opacity: 0;
          }
          50% {
            transform: perspective(1000px) rotateY(45deg) scale(0.75);
            filter: blur(5px);
            opacity: 0.5;
          }
          100% {
            transform: perspective(1000px) rotateY(0deg) scale(1);
            filter: blur(0px);
            opacity: 1;
          }
        }
        ::view-transition-new(root) {
          animation: warp ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: center center;
        }
      `
      document.head.appendChild(styleElement)
    }

    if (animationType === "CORNERS") {
      const corners = [
        { x: 0, y: 0 },
        { x: window.innerWidth, y: 0 },
        { x: window.innerWidth, y: window.innerHeight },
        { x: 0, y: window.innerHeight },
      ]

      const maxCornerRadius =
        Math.hypot(window.innerWidth, window.innerHeight) / 1.5

      const startPath = corners
        .map((c) => `circle(0px at ${c.x}px ${c.y}px)`)
        .join(", ")
      const endPath = corners
        .map((c) => `circle(${maxCornerRadius}px at ${c.x}px ${c.y}px)`)
        .join(", ")

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          pseudoElement,
        },
      )
    }

    if (animationType === "RANDOM_BLOCKS") {
      const styleElement = document.createElement("style")
      styleElement.id = styleId

      const blockSize = 50
      const cols = Math.ceil(window.innerWidth / blockSize)
      const rows = Math.ceil(window.innerHeight / blockSize)
      const totalBlocks = cols * rows

      styleElement.textContent = `
        @keyframes randomBlocks {
          0% {
            clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%);
          }
          100% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }
        ::view-transition-new(root) {
          animation: randomBlocks ${duration}ms steps(${Math.min(totalBlocks, 50)}) forwards;
        }
      `
      document.head.appendChild(styleElement)
    }

    if (animationType === "GLITCH") {
      const styleElement = document.createElement("style")
      styleElement.id = styleId

      const slices = 20
      const glitchKeyframes = Array.from({ length: 10 }, (_, i) => {
        const percent = i * 10
        const offset = Math.random() * glitchIntensity - glitchIntensity / 2
        return `${percent}% { transform: translate(${offset}px, 0); }`
      }).join("\n")

      styleElement.textContent = `
        @keyframes glitch {
          ${glitchKeyframes}
          100% { transform: translate(0, 0); }
        }
        @keyframes glitchRGB {
          0%, 100% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            filter: none;
          }
          25% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            filter: hue-rotate(90deg);
          }
          50% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            filter: hue-rotate(180deg);
          }
          75% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            filter: hue-rotate(270deg);
          }
        }
        ::view-transition-new(root) {
          animation: glitch ${duration * 0.3}ms steps(${slices}) 3,
                     glitchRGB ${duration}ms ease-in-out;
        }
      `
      document.head.appendChild(styleElement)
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
