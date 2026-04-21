import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { flushSync } from "react-dom"

const isBrowser = typeof window !== "undefined"

const getIsHighResolution = () =>
  isBrowser && (window.innerWidth >= 3000 || window.innerHeight >= 2000)

const injectBaseStyles = () => {
  if (!isBrowser) return
  const styleId = "zenithui-theme-switch-base-style"
  if (document.getElementById(styleId)) return

  const style = document.createElement("style")
  style.id = styleId
  const isHiDpi = getIsHighResolution()
  style.textContent = `
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
      ${isHiDpi ? "transform: translateZ(0);" : ""}
    }
    ${
      isHiDpi
        ? `
    ::view-transition-group(root),
    ::view-transition-image-pair(root),
    ::view-transition-old(root),
    ::view-transition-new(root) {
      backface-visibility: hidden;
      perspective: 1000px;
      transform: translate3d(0, 0, 0);
    }`
        : ""
    }
  `
  document.head.appendChild(style)
}

// Centralised style injection — idempotent, no leaks
function upsertStyle(id: string, css: string) {
  let el = document.getElementById(id) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement("style")
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = css
}

function removeStyle(id: string, delay = 0) {
  if (delay > 0) {
    setTimeout(() => document.getElementById(id)?.remove(), delay)
  } else {
    document.getElementById(id)?.remove()
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

type Theme = "light" | "dark" | "system"

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
  theme?: Theme
  rippleCount?: number
  splitDirection?: "horizontal" | "vertical" | "diagonal"
  pixelSize?: number
  glitchIntensity?: number
  storageKey?: string
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
    theme: externalTheme,
    rippleCount = 3,
    splitDirection = "vertical",
    pixelSize = 10,
    glitchIntensity = 5,
    storageKey = "theme",
    onDarkModeChange,
  } = props || {}

  const isHiDpi = getIsHighResolution()
  const duration = isHiDpi ? Math.max(propsDuration * 0.8, 500) : propsDuration

  useEffect(() => {
    injectBaseStyles()
  }, [])

  const [internalDarkMode, setInternalDarkMode] = useState(() =>
    isBrowser ? localStorage.getItem(storageKey) === "dark" : false,
  )

  // explicit undefined branch so ?? correctly falls back to internalDarkMode
  // SSR guard — no window access on server
  const externalDarkMode = useMemo(() => {
    if (externalTheme === "dark") return true
    if (externalTheme === "light") return false
    return undefined
  }, [externalTheme])

  const isDarkMode = externalDarkMode ?? internalDarkMode

  // setIsDarkMode passes functional updater directly to real state setter
  const setIsDarkMode = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      if (onDarkModeChange) {
        const newValue = typeof value === "function" ? value(isDarkMode) : value
        onDarkModeChange(newValue)
      } else {
        setInternalDarkMode(value)
      }
    },
    [isDarkMode, onDarkModeChange],
  )

  const ref = useRef<HTMLButtonElement>(null)

  const createBlurCircleMask = (blur: number) => {
    const blurFilter = `<filter id="blur"><feGaussianBlur stdDeviation="${blur}" /></filter>`
    const circleRadius = isHiDpi ? 20 : 25
    return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><defs>${blurFilter}</defs><circle cx="0" cy="0" r="${circleRadius}" fill="white" filter="url(%23blur)"/></svg>')`
  }

  const toggleSwitchTheme = async () => {
    if (
      !ref.current ||
      !(document as Document).startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsDarkMode((prev) => !prev)
      return
    }

    // remove any existing style before injecting a new one (no accumulation)
    removeStyle(styleId)

    const { top, left, width, height } = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2

    const topLeft = Math.hypot(x, y)
    const topRight = Math.hypot(window.innerWidth - x, y)
    const bottomLeft = Math.hypot(x, window.innerHeight - y)
    const bottomRight = Math.hypot(
      window.innerWidth - x,
      window.innerHeight - y,
    )
    const maxRadius = Math.max(topLeft, topRight, bottomLeft, bottomRight)

    const viewportSize = Math.max(window.innerWidth, window.innerHeight) + 200
    const scaleFactor = isHiDpi ? 2.5 : 4
    const optimalMaskSize = isHiDpi
      ? Math.min(viewportSize * scaleFactor, 5000)
      : viewportSize * scaleFactor

    if (animationType === "CIRCLE-BLUR") {
      const blurFactor = isHiDpi ? 1.5 : 1.2
      const finalMaskSize = Math.max(optimalMaskSize, maxRadius * 2.5)
      upsertStyle(
        styleId,
        `
        ::view-transition-group(root) {
          animation-duration: ${duration}ms;
          animation-timing-function: ${isHiDpi ? "cubic-bezier(0.2, 0, 0.2, 1)" : "linear(0 0%, 0.9961 93.75%, 1 100%)"};
          will-change: transform;
        }
        ::view-transition-new(root) {
          mask: ${createBlurCircleMask(blurAmount * blurFactor)} 0 0 / 100% 100% no-repeat;
          mask-position: ${x}px ${y}px;
          animation: maskScale ${duration}ms ${easing};
          transform-origin: ${x}px ${y}px;
          will-change: mask-size, mask-position;
        }
        ::view-transition-old(root) {
          animation: maskScale ${duration}ms ${easing};
          transform-origin: ${x}px ${y}px;
          z-index: -1;
        }
        @keyframes maskScale {
          0%   { mask-size: 0px; mask-position: ${x}px ${y}px; }
          100% { mask-size: ${finalMaskSize}px; mask-position: ${x - finalMaskSize / 2}px ${y - finalMaskSize / 2}px; }
        }
      `,
      )
    }

    await (document as Document).startViewTransition(() => {
      flushSync(() => setIsDarkMode((prev) => !prev))
    }).ready

    if (animationType === "CIRCLE") {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        { duration, easing, pseudoElement },
      )
    }

    if (animationType === "CIRCLE-BLUR") {
      // continued: clean up after animation completes
      removeStyle(styleId, duration)
    }

    if (animationType === "SWIPE") {
      const scanLineWidth = isHiDpi ? 8 : 4
      document.documentElement.animate(
        {
          clipPath: [
            `polygon(0% 0%, ${scanLineWidth}px 0%, ${scanLineWidth}px 100%, 0% 100%)`,
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ],
        },
        { duration, easing, pseudoElement },
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
        { duration, easing, pseudoElement },
      )
    }

    if (animationType === "RIPPLE") {
      // removed duplicate CSS animation — drive only via Web Animations API
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        { duration, easing, pseudoElement },
      )
    }

    if (animationType === "SHUTTER") {
      const segments = 8
      const radius = maxRadius * 1.5
      const createShutterPolygon = (angle: number, open: boolean) => {
        const nextAngle = angle + 360 / segments
        const openRadius = open ? radius : 0
        const x1 = x + Math.cos((angle * Math.PI) / 180) * openRadius
        const y1 = y + Math.sin((angle * Math.PI) / 180) * openRadius
        const x2 = x + Math.cos((nextAngle * Math.PI) / 180) * openRadius
        const y2 = y + Math.sin((nextAngle * Math.PI) / 180) * openRadius
        return `${x}px ${y}px, ${x1}px ${y1}px, ${x2}px ${y2}px`
      }
      const closedPath = Array.from({ length: segments }, (_, i) =>
        createShutterPolygon(i * (360 / segments), false),
      ).join(", ")
      const openPath = Array.from({ length: segments }, (_, i) =>
        createShutterPolygon(i * (360 / segments), true),
      ).join(", ")
      document.documentElement.animate(
        { clipPath: [`polygon(${closedPath})`, `polygon(${openPath})`] },
        { duration, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement },
      )
    }

    if (animationType === "SPLIT") {
      const xPct = `${(x / window.innerWidth) * 100}%`
      const yPct = `${(y / window.innerHeight) * 100}%`
      const clipPaths =
        splitDirection === "horizontal"
          ? [
              `polygon(0% ${yPct}, 100% ${yPct}, 100% ${yPct}, 0% ${yPct})`,
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ]
          : splitDirection === "vertical"
            ? [
                `polygon(${xPct} 0%, ${xPct} 0%, ${xPct} 100%, ${xPct} 100%)`,
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ]
            : [
                `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ]
      document.documentElement.animate(
        { clipPath: clipPaths },
        { duration, easing, pseudoElement },
      )
    }

    if (animationType === "SPIRAL") {
      upsertStyle(
        styleId,
        `
        @keyframes spiral {
          0%   { clip-path: circle(0px at ${x}px ${y}px); transform: rotate(0deg); }
          100% { clip-path: circle(${maxRadius}px at ${x}px ${y}px); transform: rotate(1080deg); }
        }
        ::view-transition-new(root) {
          animation: spiral ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: ${x}px ${y}px;
        }
      `,
      )
      removeStyle(styleId, duration)
    }

    if (animationType === "PIXELATE") {
      const cols = Math.ceil(window.innerWidth / pixelSize)
      const rows = Math.ceil(window.innerHeight / pixelSize)
      upsertStyle(
        styleId,
        `
        @keyframes pixelate {
          0%   { filter: blur(${pixelSize}px) brightness(0.5); transform: scale(0.9); }
          50%  { filter: blur(${pixelSize / 2}px) brightness(0.75); }
          100% { filter: blur(0px) brightness(1); transform: scale(1); }
        }
        ::view-transition-new(root) { animation: pixelate ${duration}ms steps(${Math.min(cols, rows, 20)}) forwards; }
        ::view-transition-old(root) { animation: pixelate ${duration}ms steps(${Math.min(cols, rows, 20)}) reverse; }
      `,
      )
      removeStyle(styleId, duration)
    }

    if (animationType === "WARP") {
      upsertStyle(
        styleId,
        `
        @keyframes warp {
          0%   { transform: perspective(1000px) rotateY(90deg) scale(0.5); filter: blur(10px); opacity: 0; }
          50%  { transform: perspective(1000px) rotateY(45deg) scale(0.75); filter: blur(5px); opacity: 0.5; }
          100% { transform: perspective(1000px) rotateY(0deg) scale(1); filter: blur(0px); opacity: 1; }
        }
        ::view-transition-new(root) {
          animation: warp ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: center center;
        }
      `,
      )
      removeStyle(styleId, duration)
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
      // actually use startPath / endPath
      const startPath = corners
        .map((c) => `circle(0px at ${c.x}px ${c.y}px)`)
        .join(", ")
      const endPath = corners
        .map((c) => `circle(${maxCornerRadius}px at ${c.x}px ${c.y}px)`)
        .join(", ")
      document.documentElement.animate(
        { clipPath: [startPath, endPath] },
        {
          duration,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          pseudoElement,
        },
      )
    }

    if (animationType === "RANDOM_BLOCKS") {
      const blockSize = 50
      const cols = Math.ceil(window.innerWidth / blockSize)
      const rows = Math.ceil(window.innerHeight / blockSize)
      const totalBlocks = cols * rows
      upsertStyle(
        styleId,
        `
        @keyframes randomBlocks {
          0%   { clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%); }
          100% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
        }
        ::view-transition-new(root) {
          animation: randomBlocks ${duration}ms steps(${Math.min(totalBlocks, 50)}) forwards;
        }
      `,
      )
      removeStyle(styleId, duration)
    }

    if (animationType === "GLITCH") {
      const slices = 20
      const glitchKeyframes = Array.from({ length: 10 }, (_, i) => {
        const pct = i * 10
        const offset = Math.random() * glitchIntensity - glitchIntensity / 2
        return `${pct}% { transform: translate(${offset}px, 0); }`
      }).join("\n")
      upsertStyle(
        styleId,
        `
        @keyframes glitch { ${glitchKeyframes} 100% { transform: translate(0, 0); } }
        @keyframes glitchRGB {
          0%, 100% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); filter: none; }
          25%  { filter: hue-rotate(90deg); }
          50%  { filter: hue-rotate(180deg); }
          75%  { filter: hue-rotate(270deg); }
        }
        ::view-transition-new(root) {
          animation: glitch ${duration * 0.3}ms steps(${slices}) 3,
                     glitchRGB ${duration}ms ease-in-out;
        }
      `,
      )
      removeStyle(styleId, duration)
    }
  }

  // storageKey is now used on write, matching the read on init
  useEffect(() => {
    document.documentElement.classList.toggle(globalClassName, isDarkMode)
    localStorage.setItem(storageKey, isDarkMode ? "dark" : "light")
  }, [isDarkMode, globalClassName, storageKey])

  return { ref, toggleSwitchTheme, isDarkMode }
}

export default useThemeMode
