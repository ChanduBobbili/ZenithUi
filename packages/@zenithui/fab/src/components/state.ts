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
  xOffset: number,
  yOffset: number,
): { x: number; y: number; placement: PLACEMENT } {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const safeArea = 8

  // Base calculation for all positions
  let baseX = triggerCoords.x
  let baseY = triggerCoords.y

  // Adjust for center positions
  if (position.includes("center")) {
    switch (placement) {
      case "top":
        baseX += triggerRect.width / 2 - contentRect.width / 2
        baseY -= contentRect.height + offset
        break
      case "bottom":
        baseX += triggerRect.width / 2 - contentRect.width / 2
        baseY += triggerRect.height + offset
        break
      case "left":
        baseX -= contentRect.width + offset
        baseY += triggerRect.height / 2 - contentRect.height / 2
        break
      case "right":
        baseX += triggerRect.width + offset
        baseY += triggerRect.height / 2 - contentRect.height / 2
        break
    }

    // Special handling for pure center position
    if (position === "center") {
      if (placement === "top" || placement === "bottom") {
        baseX = viewportWidth / 2 - contentRect.width / 2
      } else {
        baseY = viewportHeight / 2 - contentRect.height / 2
      }
    }
  } else {
    // Original position calculations for non-center positions
    switch (placement) {
      case "top":
        baseX += triggerRect.width / 2 - contentRect.width / 2
        baseY -= contentRect.height + offset
        break
      case "bottom":
        baseX += triggerRect.width / 2 - contentRect.width / 2
        baseY += triggerRect.height + offset
        break
      case "left":
        baseX -= contentRect.width + offset
        baseY += triggerRect.height / 2 - contentRect.height / 2
        break
      case "right":
        baseX += triggerRect.width + offset
        baseY += triggerRect.height / 2 - contentRect.height / 2
        break
    }
  }

  // Boundary adjustments
  let adjustedX = Math.max(
    safeArea,
    Math.min(baseX, viewportWidth - contentRect.width - safeArea),
  )
  let adjustedY = Math.max(
    safeArea,
    Math.min(baseY, viewportHeight - contentRect.height - safeArea),
  )
  let adjustedPlacement = placement

  // Special edge case handling for center positions
  if (position.includes("center")) {
    if (placement === "top" && baseY < safeArea) {
      adjustedPlacement = "bottom"
      adjustedY = triggerCoords.y + triggerRect.height + offset
    } else if (
      placement === "bottom" &&
      baseY + contentRect.height > viewportHeight - safeArea
    ) {
      adjustedPlacement = "top"
      adjustedY = triggerCoords.y - contentRect.height - offset
    } else if (placement === "left" && baseX < safeArea) {
      adjustedPlacement = "right"
      adjustedX = triggerCoords.x + triggerRect.width + offset
    } else if (
      placement === "right" &&
      baseX + contentRect.width > viewportWidth - safeArea
    ) {
      adjustedPlacement = "left"
      adjustedX = triggerCoords.x - contentRect.width - offset
    }
  }

  return {
    x: adjustedX,
    y: adjustedY,
    placement: adjustedPlacement,
  }
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
      xOffset,
      yOffset,
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
