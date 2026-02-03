import type {
  COORDS,
  FAB_CONTEXT,
  FAB_HOOK,
  FAB_STATE,
  PLACEMENT,
  POSITION,
  Rect,
} from "./types"
import * as React from "react"
import { useEventListener, useIsomorphicLayoutEffect } from "@zenithui/utils"

const defaultCoords: COORDS = {
  x: 0,
  y: 0,
}

const X_OFFSET = 40
const Y_OFFSET = 40
const OFFSET = 20

/** Default trigger size used to compute initial position before the trigger is in the DOM. */
const DEFAULT_TRIGGER_SIZE = 56

/** Viewport size excluding scrollbar so trigger position doesn't jump when content opens/closes. */
function getViewportSize(): { width: number; height: number } {
  if (typeof document === "undefined") {
    return { width: 0, height: 0 }
  }
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  }
}

export const FabContext = React.createContext<FAB_CONTEXT | null>(null)

export default function useFabState({
  open: controlledOpen,
  onOpenChange,
  placement: inputPlacement,
  position: inputPosition,
  offset: initialOffset = 0,
  xOffset = 16,
  yOffset = 16,
  dismissOutsideClick = true,
  dismissOnEsc = true,
}: FAB_HOOK): FAB_STATE {
  const isControlled = controlledOpen !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>(false)
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const [position, setPosition] = React.useState<POSITION>(inputPosition)
  const [placement, setPlacement] = React.useState<PLACEMENT>(inputPlacement)
  const [offset, setOffsetState] = React.useState<number>(initialOffset)
  const [triggerCords, setTriggerCoords] = React.useState<COORDS>(defaultCoords)
  const [contentCords, setContentCoords] = React.useState<COORDS>(defaultCoords)
  const [isTriggerReady, setTriggerReady] = React.useState(false)
  const [isContentReady, setContentReady] = React.useState(false)

  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Compute initial trigger position before trigger is in DOM to avoid flash from (0,0)
  useIsomorphicLayoutEffect(() => {
    if (typeof document === "undefined") return
    const viewport = getViewportSize()
    if (viewport.width === 0 && viewport.height === 0) return
    const syntheticRect: Rect = {
      width: DEFAULT_TRIGGER_SIZE,
      height: DEFAULT_TRIGGER_SIZE,
      top: 0,
      left: 0,
      right: DEFAULT_TRIGGER_SIZE,
      bottom: DEFAULT_TRIGGER_SIZE,
    }
    const coords = calculateTriggerPlacement(
      inputPosition,
      xOffset + X_OFFSET,
      yOffset + Y_OFFSET,
      syntheticRect,
    )
    setTriggerCoords(coords)
    setTriggerReady(true)
  }, [inputPosition, xOffset, yOffset])

  const setOffset = React.useCallback((next: number) => {
    setOffsetState(next)
  }, [])

  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (dismissOutsideClick) {
        const target = event.target as HTMLElement
        const trigger = triggerRef.current
        const content = contentRef.current
        if (
          open &&
          trigger &&
          content &&
          !trigger.contains(target) &&
          !content.contains(target)
        ) {
          setOpen(false)
        }
      }
    },
    [open, dismissOutsideClick, setOpen],
  )

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (dismissOnEsc && open && event.key === "Escape") {
        setOpen(false)
      }
    },
    [open, dismissOnEsc, setOpen],
  )

  React.useEffect(() => {
    setPosition(inputPosition)
  }, [inputPosition])

  const updateCoords = React.useCallback(() => {
    const el = triggerRef.current
    if (!el) return

    const trigger = el.getBoundingClientRect() as Rect
    // Use layout dimensions (untransformed) for trigger placement so transform: scale()
    // and other CSS transforms don't cause the trigger to shift position.
    const triggerRectForPlacement: Rect = {
      ...trigger,
      width: el.offsetWidth,
      height: el.offsetHeight,
    }

    const triggerCoords = calculateTriggerPlacement(
      position,
      xOffset + X_OFFSET,
      yOffset + Y_OFFSET,
      triggerRectForPlacement,
    )
    setTriggerCoords(triggerCoords)

    if (open) {
      const content = contentRef.current?.getBoundingClientRect() as Rect
      // Only mark ready when we have real dimensions so we never paint at wrong size/position
      if (content && content.width > 0 && content.height > 0) {
        const {
          x,
          y,
          placement: bestPlacement,
        } = getBestPlacement(
          placement,
          position,
          triggerCoords,
          trigger,
          content,
          offset + OFFSET,
          xOffset + X_OFFSET,
          yOffset + Y_OFFSET,
        )

        setContentCoords({ x, y })
        setContentReady(true)
        if (bestPlacement !== placement) {
          setPlacement(bestPlacement)
        }
      }
    } else {
      setContentReady(false)
    }

    setTriggerCoords(triggerCoords)
  }, [open, placement, position, offset, xOffset, yOffset])

  React.useEffect(() => {
    updateCoords()
  }, [updateCoords])

  // When open, measure content (rendered off-screen) and set position; run again in rAF in case layout wasn't done
  useIsomorphicLayoutEffect(() => {
    if (!open) return
    updateCoords()
    const id = requestAnimationFrame(() => updateCoords())
    return () => cancelAnimationFrame(id)
  }, [open, updateCoords])

  // Re-measure when content gets real dimensions (e.g. first measure was 0x0 before layout)
  React.useEffect(() => {
    if (!open || !contentRef.current) return
    const ro = new ResizeObserver(() => updateCoords())
    ro.observe(contentRef.current)
    return () => ro.disconnect()
  }, [open, updateCoords])

  useEventListener("mousedown", handleClickOutside)
  useEventListener("keydown", handleKeyDown)
  useEventListener("resize", updateCoords)
  useEventListener("DOMContentLoaded", updateCoords)

  return {
    open,
    setOpen,
    position,
    placement,
    triggerRef,
    contentRef,
    triggerCords,
    contentCords,
    setOffset,
    setPlacement,
    isTriggerReady,
    isContentReady,
  }
}

function calculateTriggerPlacement(
  fabPosition: POSITION,
  xOffset: number,
  yOffset: number,
  trigger: Rect,
): { x: number; y: number } {
  const { width: viewportWidth, height: viewportHeight } = getViewportSize()

  switch (fabPosition) {
    case "top-left":
      return {
        x: xOffset,
        y: yOffset,
      }
    case "top-right":
      return {
        x: viewportWidth - trigger.width - xOffset,
        y: yOffset,
      }
    case "top-center":
      return {
        x: viewportWidth / 2 - trigger.width / 2 + xOffset,
        y: yOffset,
      }
    case "bottom-left":
      return {
        x: xOffset,
        y: viewportHeight - trigger.height - yOffset,
      }
    case "bottom-right":
      return {
        x: viewportWidth - trigger.width - xOffset,
        y: viewportHeight - trigger.height - yOffset,
      }
    case "bottom-center":
      return {
        x: viewportWidth / 2 - trigger.width / 2 + xOffset,
        y: viewportHeight - trigger.height - yOffset,
      }
    case "center-left":
      return {
        x: xOffset,
        y: viewportHeight / 2 - trigger.height / 2 + yOffset,
      }
    case "center-right":
      return {
        x: viewportWidth - trigger.width - xOffset,
        y: viewportHeight / 2 - trigger.height / 2 + yOffset,
      }
    case "center":
      return {
        x: viewportWidth / 2 - trigger.width / 2 + xOffset,
        y: viewportHeight / 2 - trigger.height / 2 + yOffset,
      }
    default:
      return { x: 0, y: 0 }
  }
}

function calculateContentPlacement(
  placement: PLACEMENT,
  position: POSITION,
  triggerCoords: COORDS,
  triggerRect: Rect,
  contentRect: Rect,
  offset: number,
): { x: number; y: number; placement: PLACEMENT } {
  const { width: viewportWidth, height: viewportHeight } = getViewportSize()
  const safeArea = 8
  const minOffset = 16 // Minimum space between trigger and content

  // Calculate trigger center point
  const triggerCenterX = triggerCoords.x + triggerRect.width / 2
  const triggerCenterY = triggerCoords.y + triggerRect.height / 2

  let baseX = 0
  let baseY = 0
  let adjustedPlacement = placement

  // Calculate base position based on placement
  switch (placement) {
    case "top":
      baseX = triggerCenterX - contentRect.width / 2
      baseY = triggerCoords.y - contentRect.height - offset
      break
    case "bottom":
      baseX = triggerCenterX - contentRect.width / 2
      baseY = triggerCoords.y + triggerRect.height + offset
      break
    case "left":
      baseX = triggerCoords.x - contentRect.width - offset
      baseY = triggerCenterY - contentRect.height / 2
      break
    case "right":
      baseX = triggerCoords.x + triggerRect.width + offset
      baseY = triggerCenterY - contentRect.height / 2
      break
  }

  // Special adjustments for corner positions
  if (position.includes("right") && placement === "top") {
    baseX = triggerCoords.x + triggerRect.width - contentRect.width
  } else if (position.includes("left") && placement === "top") {
    baseX = triggerCoords.x
  }

  // Boundary checks and adjustments
  let adjustedX = baseX
  let adjustedY = baseY

  // Horizontal boundary check
  if (adjustedX < safeArea) {
    adjustedX = safeArea
    // Flip to right placement if pushed too far left
    if (
      placement === "left" &&
      triggerCoords.x + triggerRect.width + minOffset + contentRect.width <
        viewportWidth
    ) {
      adjustedX = triggerCoords.x + triggerRect.width + minOffset
      adjustedPlacement = "right"
    }
  } else if (adjustedX + contentRect.width > viewportWidth - safeArea) {
    adjustedX = viewportWidth - contentRect.width - safeArea
    // Flip to left placement if pushed too far right
    if (
      placement === "right" &&
      triggerCoords.x - minOffset - contentRect.width > 0
    ) {
      adjustedX = triggerCoords.x - contentRect.width - minOffset
      adjustedPlacement = "left"
    }
  }

  // Vertical boundary check
  if (adjustedY < safeArea) {
    adjustedY = safeArea
    // Flip to bottom placement if pushed too far up
    if (
      placement === "top" &&
      triggerCoords.y + triggerRect.height + minOffset + contentRect.height <
        viewportHeight
    ) {
      adjustedY = triggerCoords.y + triggerRect.height + minOffset
      adjustedPlacement = "bottom"
    }
  } else if (adjustedY + contentRect.height > viewportHeight - safeArea) {
    adjustedY = viewportHeight - contentRect.height - safeArea
    // Flip to top placement if pushed too far down
    if (
      placement === "bottom" &&
      triggerCoords.y - minOffset - contentRect.height > 0
    ) {
      adjustedY = triggerCoords.y - contentRect.height - minOffset
      adjustedPlacement = "top"
    }
  }

  // Final position validation to ensure no overlap
  const contentRectFinal = {
    left: adjustedX,
    top: adjustedY,
    right: adjustedX + contentRect.width,
    bottom: adjustedY + contentRect.height,
  }

  const triggerRectFinal = {
    left: triggerCoords.x,
    top: triggerCoords.y,
    right: triggerCoords.x + triggerRect.width,
    bottom: triggerCoords.y + triggerRect.height,
  }

  // If still overlapping, force a valid position
  if (isOverlapping(contentRectFinal, triggerRectFinal)) {
    // Find first non-overlapping position
    const placementsToTry: PLACEMENT[] = ["top", "bottom", "left", "right"]
    for (const newPlacement of placementsToTry) {
      if (newPlacement !== placement) {
        const newCoords = calculateContentPlacement(
          newPlacement,
          position,
          triggerCoords,
          triggerRect,
          contentRect,
          offset,
        )
        if (
          !isOverlapping(
            {
              left: newCoords.x,
              top: newCoords.y,
              right: newCoords.x + contentRect.width,
              bottom: newCoords.y + contentRect.height,
            },
            triggerRectFinal,
          )
        ) {
          return newCoords
        }
      }
    }

    // Fallback position (centered in viewport)
    return {
      x: Math.max(safeArea, (viewportWidth - contentRect.width) / 2),
      y: Math.max(safeArea, (viewportHeight - contentRect.height) / 2),
      placement: adjustedPlacement,
    }
  }

  return {
    x: adjustedX,
    y: adjustedY,
    placement: adjustedPlacement,
  }
}

function isOverlapping(
  rect1: { left: number; top: number; right: number; bottom: number },
  rect2: { left: number; top: number; right: number; bottom: number },
): boolean {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  )
}

function getBestPlacement(
  preferredPlacement: PLACEMENT,
  position: POSITION,
  triggerCoords: COORDS,
  triggerRect: Rect,
  contentRect: Rect,
  offset: number,
  xOffset: number,
  yOffset: number,
): { x: number; y: number; placement: PLACEMENT } {
  const { width: viewportWidth, height: viewportHeight } = getViewportSize()

  // For center positions, prioritize placements that make visual sense
  const placementPriority: Record<string, PLACEMENT[]> = {
    "center-left": ["right", "top", "bottom", "left"],
    "center-right": ["left", "top", "bottom", "right"],
    center: ["top", "bottom", "left", "right"],
    default: [preferredPlacement, "top", "bottom", "left", "right"],
  }

  const placementsToTry =
    placementPriority[position] || placementPriority.default

  for (const testPlacement of placementsToTry) {
    const coords = calculateContentPlacement(
      testPlacement,
      position,
      triggerCoords,
      triggerRect,
      contentRect,
      offset,
    )

    if (isPlacementValid(coords, contentRect)) {
      return {
        x: coords.x,
        y: coords.y,
        placement: coords.placement,
      }
    }
  }

  // Fallback to viewport center if no valid placement found
  return {
    x: Math.max(0, (viewportWidth - contentRect.width) / 2),
    y: Math.max(0, (viewportHeight - contentRect.height) / 2),
    placement: preferredPlacement,
  }
}

function isPlacementValid(coords: COORDS, contentRect: Rect): boolean {
  const { x, y } = coords
  const safeArea = 8
  const { width: viewportWidth, height: viewportHeight } = getViewportSize()

  return (
    x >= safeArea &&
    y >= safeArea &&
    x + contentRect.width <= viewportWidth - safeArea &&
    y + contentRect.height <= viewportHeight - safeArea
  )
}

function distanceFromTrigger(
  triggerCoords: COORDS,
  triggerRect: Rect,
  contentCoords: COORDS,
  contentRect: Rect,
): number {
  const triggerCenter = {
    x: triggerCoords.x + triggerRect.width / 2,
    y: triggerCoords.y + triggerRect.height / 2,
  }

  const contentCenter = {
    x: contentCoords.x + contentRect.width / 2,
    y: contentCoords.y + contentRect.height / 2,
  }

  return Math.sqrt(
    (contentCenter.x - triggerCenter.x) ** 2 +
      (contentCenter.y - triggerCenter.y) ** 2,
  )
}
