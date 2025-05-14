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

export const FabContext = React.createContext<FAB_CONTEXT | null>(null)

export default function useFabState({
  placement: inputPlacement,
  position: inputPosition,
  offset,
  xOffset = 16,
  yOffset = 16,
  dismissOutsideClick = true,
  dismissOnEsc = true,
}: FAB_HOOK): FAB_STATE {
  const [open, setOpen] = React.useState<boolean>(true)
  const [position, setPosition] = React.useState<POSITION>(inputPosition)
  const [placement, setPlacement] = React.useState<PLACEMENT>(inputPlacement)
  const [triggerCords, setTriggerCoords] = React.useState<COORDS>(defaultCoords)
  const [contentCords, setContentCoords] = React.useState<COORDS>(defaultCoords)

  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

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
    [open, dismissOutsideClick],
  )

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (dismissOnEsc && open && event.key === "Escape") {
        setOpen(false)
      }
    },
    [open, dismissOnEsc],
  )

  React.useEffect(() => {
    setPosition(inputPosition)
  }, [inputPosition])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    updateCoords()
  }, [open, placement, position, offset, xOffset, yOffset])

  const updateCoords = () => {
    const trigger = triggerRef.current?.getBoundingClientRect() as Rect
    if (!trigger) return

    const triggerCoords = calculateTriggerPlacement(
      position,
      xOffset + X_OFFSET,
      yOffset + Y_OFFSET,
      trigger,
    )
    setTriggerCoords(triggerCoords)

    if (open) {
      const content = contentRef.current?.getBoundingClientRect() as Rect
      if (content) {
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
        if (bestPlacement !== placement) {
          setPlacement(bestPlacement)
        }
      }
    }

    setTriggerCoords(triggerCoords)
  }

  useEventListener("mousedown", handleClickOutside)
  useEventListener("keydown", handleKeyDown)
  useEventListener("resize", updateCoords)
  useEventListener("DOMContentLoaded", updateCoords)

  console.log(contentCords)
  return {
    open,
    setOpen,
    position,
    placement,
    triggerRef,
    contentRef,
    triggerCords,
    contentCords,
    setOffset: () => {},
    setPlacement,
  }
}

function calculateTriggerPlacement(
  fabPosition: POSITION,
  xOffset: number,
  yOffset: number,
  trigger: Rect,
): { x: number; y: number } {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

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
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
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
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

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

  return (
    x >= safeArea &&
    y >= safeArea &&
    x + contentRect.width <= window.innerWidth - safeArea &&
    y + contentRect.height <= window.innerHeight - safeArea
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
