import { useState, useRef, useContext } from "react"
import { TooltipContext } from "./context"
import {
  useFloating,
  offset,
  useHover,
  useFocus,
  useRole,
  useDismiss,
  useInteractions,
  FloatingPortal,
  autoUpdate,
  arrow as floatingArrow,
  shift,
  flip,
  safePolygon,
  type Placement,
} from "@floating-ui/react"

export type UseTooltipStateReturn = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refs: ReturnType<typeof useFloating>["refs"]
  floatingStyles: React.CSSProperties
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"]
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"]
  placement: Placement
  middlewareData: ReturnType<typeof useFloating>["middlewareData"]
  arrowRef: React.RefObject<HTMLDivElement | null>
}

export default function useTooltipState({
  placement = "top",
  offsetValue = 6,
  delayDuration = 700,
}: {
  offsetValue?: number
  placement?: Placement
  delayDuration?: number
}): UseTooltipStateReturn {
  const [open, setOpen] = useState(false)
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
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      floatingArrow({ element: arrowRef.current }),
      shift(),
      flip(),
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

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    role,
    dismiss,
  ])

  return {
    open,
    setOpen,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    arrowRef,
    middlewareData,
    placement: actualPlacement,
  }
}
