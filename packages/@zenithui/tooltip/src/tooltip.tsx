import { TooltipContext } from "./context"
import type { TooltipProviderProps } from "./type"
import { FloatingPortal } from "@floating-ui/react"
import useTooltipState from "./useTooltipState"
import * as React from "react"

function TooltipRoot({
  delayDuration = 700,
  disableHoverableContent = false,
  children,
}: TooltipProviderProps) {
  const context = React.useContext(TooltipContext)
  if (!context) throw new Error("Tooltip must be used within TooltipProvider")
  const tooltipState = useTooltipState({
    placement: "top",
    offsetValue: 6,
    delayDuration,
  })
  return (
    <TooltipContext.Provider
      value={{ delayDuration, disableHoverableContent, ...tooltipState }}
    >
      {children}
    </TooltipContext.Provider>
  )
}

function TooltipTrigger({
  children,
  // asChild,
}: {
  children: React.ReactElement
  // asChild?: boolean
}) {
  const context = React.useContext(TooltipContext)
  if (!context)
    throw new Error("TooltipTrigger must be used within TooltipProvider")

  const { refs, getReferenceProps } = context

  // if (asChild && React.isValidElement(children)) {
  //   return React.cloneElement(children, {
  // ref: refs?.setReference,
  //     ...getReferenceProps?.(),
  //   })
  // }

  return (
    <span
      ref={refs?.setReference}
      {...getReferenceProps?.()}
    >
      {children}
    </span>
  )
}

function TooltipContent({
  children,
  className,
  sideOffset = 6,
  side = "top",
}: {
  children: React.ReactNode
  className?: string
  sideOffset?: number
  side?: "top" | "right" | "bottom" | "left"
}) {
  const context = React.useContext(TooltipContext)
  if (!context)
    throw new Error("TooltipContent must be used within TooltipProvider")

  const {
    getFloatingProps,
    refs,
    open,
    placement,
    arrowRef,
    middlewareData,
    floatingStyles,
  } = context
  return (
    <FloatingPortal>
      {open && (
        <div
          ref={refs?.setFloating}
          className={className}
          style={floatingStyles}
          {...getFloatingProps?.()}
          data-side={placement}
          data-state={open ? "open" : "closed"}
        >
          {children}
          <div
            className="absolute h-2 w-2 rotate-45 bg-inherit"
            ref={arrowRef}
            style={{
              position: "absolute",
              left: middlewareData?.arrow?.x ?? 0,
              top: middlewareData?.arrow?.y ?? 0,
              // position opposite the side:
              [placement?.startsWith("top") ? "bottom" : "top"]: "-4px",
            }}
          />
        </div>
      )}
    </FloatingPortal>
  )
}

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
}
