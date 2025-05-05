import { useState, useRef, useCallback, useEffect } from "react"
import {
  useFloating,
  offset as floatingOffset,
  useHover,
  useFocus,
  useRole,
  useDismiss,
  useInteractions,
  autoUpdate,
  shift,
  flip,
  safePolygon,
  arrow as floatingArrow,
  type Placement,
  useTransitionStyles,
  size,
} from "@floating-ui/react"
import type { OPTIONS, UseTooltipStateReturn } from "./types"

export default function useTooltipState({
  placement = "top",
  offset = 6,
  delayDuration = 700,
  disableHoverableContent,
}: {
  offset: number
  placement: Placement
  delayDuration: number
  disableHoverableContent?: boolean
}): UseTooltipStateReturn {
  const [open, setOpen] = useState<boolean>(false)
  const [isPositioned, setIsPositioned] = useState<boolean>(false)
  const [options, setOptions] = useState<OPTIONS>({
    placement,
    offset,
    delayDuration,
  })
  const arrowRef = useRef<HTMLDivElement | null>(null)

  const {
    refs,
    floatingStyles,
    context,
    placement: actualPlacement,
    middlewareData,
    x,
    y,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: options.placement,
    transform: true,
    nodeId: "tooltip",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      // Prevent initial jump by delaying position calculation
      {
        name: "initialPosition",
        fn: () => ({}),
      },
      floatingOffset(options.offset),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      floatingArrow({ element: arrowRef.current, padding: 8 }),
      // Ensure tooltip doesn't overflow
      size({
        apply({ availableHeight, availableWidth, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${Math.min(availableWidth, 300)}px`,
            maxHeight: `${Math.min(availableHeight, 200)}px`,
          })
        },
        padding: 8,
      }),
    ],
  })

  // Track when positioning is complete
  useEffect(() => {
    // if (open && x !== 0 && y !== 0) {
    //   setIsPositioned(true)
    // } else {
    //   setIsPositioned(false)
    // }
    setIsPositioned(open && x !== 0 && y !== 0)
  }, [open, x, y])

  const hover = useHover(context, {
    move: false,
    delay: delayDuration,
    handleClose: disableHoverableContent ? null : safePolygon(),
  })

  const focus = useFocus(context)
  const role = useRole(context, { role: "tooltip" })
  const dismiss = useDismiss(context)
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 100, close: 100 },
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    role,
    dismiss,
  ])

  const updateOptions = useCallback((options: Partial<OPTIONS>) => {
    setOptions((prevOptions) => ({ ...prevOptions, ...options }))
  }, [])

  return {
    open,
    setOpen,
    refs,
    floatingStyles: {
      ...floatingStyles,
      // Hide until positioned
      visibility: isPositioned ? "visible" : "hidden",
      opacity: isPositioned ? 1 : 0,
    },
    getReferenceProps,
    getFloatingProps,
    placement: actualPlacement,
    middlewareData,
    arrowRef,
    updateOptions,
    isMounted,
    transitionStyles,
    isPositioned,
  }
}
