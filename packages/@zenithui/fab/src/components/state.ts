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
  xOffset: number,
  yOffset: number,
): { x: number; y: number } {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const safeArea = 8 // Minimum padding from viewport edges

  // 1. Calculate ideal position
  let baseX = 0
  let baseY = 0

  switch (placement) {
    case "top":
      baseX = triggerCoords.x + triggerRect.width / 2 - contentRect.width / 2
      baseY = triggerCoords.y - contentRect.height - offset
      break
    case "bottom":
      baseX = triggerCoords.x + triggerRect.width / 2 - contentRect.width / 2
      baseY = triggerCoords.y + triggerRect.height + offset
      break
    case "left":
      baseX = triggerCoords.x - contentRect.width - offset
      baseY = triggerCoords.y + triggerRect.height / 2 - contentRect.height / 2
      break
    case "right":
      baseX = triggerCoords.x + triggerRect.width + offset
      baseY = triggerCoords.y + triggerRect.height / 2 - contentRect.height / 2
      break
  }

  // 2. Apply position-specific corrections
  if (position.includes("right")) {
    if (placement === "top")
      baseX = triggerCoords.x - contentRect.width + triggerRect.width
    if (placement === "bottom")
      baseX = triggerCoords.x - contentRect.width + triggerRect.width
  } else if (position.includes("left")) {
    if (placement === "top") baseX = triggerCoords.x
    if (placement === "bottom") baseX = triggerCoords.x
  }

  // 3. Boundary collision detection and adjustment
  let adjustedX = baseX
  let adjustedY = baseY
  let adjustedPlacement = placement

  // Horizontal boundaries
  if (baseX < safeArea) {
    adjustedX = safeArea
    // Try shifting to right placement if severely constrained
    if (baseX < -contentRect.width / 2 && placement !== "right") {
      adjustedX = triggerCoords.x + triggerRect.width + offset
      adjustedPlacement = "right"
    }
  } else if (baseX + contentRect.width > viewportWidth - safeArea) {
    adjustedX = viewportWidth - contentRect.width - safeArea
    // Try shifting to left placement if severely constrained
    if (
      baseX + contentRect.width > viewportWidth + contentRect.width / 2 &&
      placement !== "left"
    ) {
      adjustedX = triggerCoords.x - contentRect.width - offset
      adjustedPlacement = "left"
    }
  }

  // Vertical boundaries
  if (baseY < safeArea) {
    adjustedY = safeArea
    // Try shifting to bottom placement if severely constrained
    if (baseY < -contentRect.height / 2 && placement !== "bottom") {
      adjustedY = triggerCoords.y + triggerRect.height + offset
      adjustedPlacement = "bottom"
    }
  } else if (baseY + contentRect.height > viewportHeight - safeArea) {
    adjustedY = viewportHeight - contentRect.height - safeArea
    // Try shifting to top placement if severely constrained
    if (
      baseY + contentRect.height > viewportHeight + contentRect.height / 2 &&
      placement !== "top"
    ) {
      adjustedY = triggerCoords.y - contentRect.height - offset
      adjustedPlacement = "top"
    }
  }

  // 4. Final position validation
  const finalPosition = {
    x: Math.max(
      safeArea,
      Math.min(adjustedX, viewportWidth - contentRect.width - safeArea),
    ),
    y: Math.max(
      safeArea,
      Math.min(adjustedY, viewportHeight - contentRect.height - safeArea),
    ),
    placement: adjustedPlacement,
  }

  // 5. Special cases for corner positions
  if (position.includes("center")) {
    // Center-aligned FABs get special treatment
    if (placement === "top" || placement === "bottom") {
      finalPosition.x =
        triggerCoords.x + triggerRect.width / 2 - contentRect.width / 2
    } else {
      finalPosition.y =
        triggerCoords.y + triggerRect.height / 2 - contentRect.height / 2
    }
  }

  // 6. Ensure content stays attached to trigger
  if (adjustedPlacement === "top" || adjustedPlacement === "bottom") {
    const minX = triggerCoords.x - contentRect.width + triggerRect.width
    const maxX = triggerCoords.x
    finalPosition.x = Math.max(minX, Math.min(finalPosition.x, maxX))
  } else {
    const minY = triggerCoords.y - contentRect.height + triggerRect.height
    const maxY = triggerCoords.y
    finalPosition.y = Math.max(minY, Math.min(finalPosition.y, maxY))
  }
  return finalPosition
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
  const placements: PLACEMENT[] = ["top", "bottom", "left", "right"]

  // Test all placements and find the best one
  const validPlacements = placements
    .map((testPlacement) => {
      const coords = calculateContentPlacement(
        testPlacement,
        position,
        triggerCoords,
        triggerRect,
        contentRect,
        offset,
        xOffset,
        yOffset,
      )

      const isValid = isPlacementValid(coords, contentRect)
      const distance = isValid
        ? distanceFromTrigger(triggerCoords, triggerRect, coords, contentRect)
        : Number.POSITIVE_INFINITY

      return {
        coords,
        placement: testPlacement,
        isValid,
        distance,
      }
    })
    .filter((p) => p.isValid)
    .sort((a, b) => {
      // Prefer the original placement
      if (a.placement === preferredPlacement) return -1
      if (b.placement === preferredPlacement) return 1
      // Then by distance to trigger
      return a.distance - b.distance
    })

  // Return the best placement if found
  if (validPlacements.length > 0) {
    const best = validPlacements[0]
    return {
      x: best.coords.x,
      y: best.coords.y,
      placement: best.placement,
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
