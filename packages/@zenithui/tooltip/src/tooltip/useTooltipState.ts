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
}: {
  offset?: number
  placement?: Placement
  delayDuration?: number
}): UseTooltipStateReturn {
  const [open, setOpen] = useState(false)
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
  })

  const focus = useFocus(context)
  const role = useRole(context, { role: "tooltip" })
  const dismiss = useDismiss(context)
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: {
      open: 200,
      close: 200,
    },
    // open: ({ placement }) => ({
    //   transform:
    //     placement.includes("top") || placement.includes("bottom")
    //       ? "scale(0.5)"
    //       : "scale(0.5)",
    // }),
    // close: ({ placement }) => ({
    //   opacity: 0,
    //   transform:
    //     placement.includes("top") || placement.includes("bottom")
    //       ? "scale(1.5)"
    //       : "scale(1.5)",
    // }),
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
  // const getReferenceProps = useCallback(
  //   (props: React.HTMLProps<HTMLElement> = {}) => {
  //     return {
  //       ...getReferenceProps(props),
  //       ref: (node: HTMLElement) => {
  //         refs.setReference(node)
  //         if (typeof props.ref === "function") props.ref(node)
  //         else if (props.ref && typeof props.ref === "object")
  //           props.ref.current = node
  //       },
  //     }
  //   },
  //   [refs, getReferenceProps],
  // )
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
  }
}
