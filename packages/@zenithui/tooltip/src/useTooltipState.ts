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
}: {
  offsetValue?: number
  placement?: Placement
}): UseTooltipStateReturn {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const context = useContext(TooltipContext)

  if (!context) throw new Error("Tooltip must be used within a TooltipProvider")

  const { delayDuration } = context

  const {
    refs,
    floatingStyles,
    context: floatingContext,
    placement: actualPlacement,
    middlewareData,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      floatingArrow({ element: arrowRef }),
      shift(),
      flip(),
    ],
  })

  const hover = useHover(floatingContext, {
    move: false,
    delay: delayDuration,
    handleClose: safePolygon(),
  })

  const focus = useFocus(floatingContext)
  const role = useRole(floatingContext, { role: "tooltip" })
  const dismiss = useDismiss(floatingContext)

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
