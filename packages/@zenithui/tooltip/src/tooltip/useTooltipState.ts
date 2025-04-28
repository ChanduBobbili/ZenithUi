import { useState, useRef, useCallback } from "react"
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
} from "@floating-ui/react"
import type { OPTIONS, UseTooltipStateReturn } from "./types"

export default function useTooltipState({
  placement = "top",
  offset = 6,
  delayDuration = 700,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: {
  offset?: number
  placement?: Placement
  delayDuration?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}): UseTooltipStateReturn {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(false)
  const [options, setOptions] = useState<OPTIONS>({
    placement,
    offset,
    delayDuration,
  })
  const arrowRef = useRef<HTMLDivElement | null>(null)

  // Determine if the tooltip is controlled
  const isControlled = typeof controlledOpen !== "undefined"
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        console.log("setUncontrolledOpen(newOpen)", newOpen)
        setUncontrolledOpen(newOpen)
      }
      console.log("setControlledOpen(newOpen)", newOpen)
      setControlledOpen?.(newOpen)
    },
    [isControlled, setControlledOpen],
  )

  const {
    refs,
    floatingStyles,
    context,
    placement: actualPlacement,
    middlewareData,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: options.placement,
    transform: true,
    nodeId: "tooltip",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      floatingOffset(options.offset),
      floatingArrow({ element: arrowRef.current, padding: 8 }),
      shift({
        padding: 8,
      }),
      flip({
        padding: 8,
      }),
    ],
  })

  const hover = useHover(context, {
    move: false,
    delay: delayDuration,
    handleClose: safePolygon(),
    enabled: !isControlled,
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
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    placement: actualPlacement,
    middlewareData,
    arrowRef,
    updateOptions,
    isMounted,
    transitionStyles,
    isControlled,
  }
}
