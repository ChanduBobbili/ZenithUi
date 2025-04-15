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
  return (
    <TooltipContext.Provider value={{ delayDuration, disableHoverableContent }}>
      {children}
    </TooltipContext.Provider>
  )
}

function TooltipTrigger({
  children,
  asChild,
}: {
  children: React.ReactElement
  asChild?: boolean
}) {
  const context = React.useContext(TooltipContext)
  if (!context)
    throw new Error("TooltipTrigger must be used within TooltipProvider")

  const { getReferenceProps, refs } = useTooltipState({})

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, refs.setReference)
  }

  return (
    <span
      ref={refs.setReference}
      {...getReferenceProps()}
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
  const {
    getFloatingProps,
    refs,
    open,
    setOpen,
    placement,
    arrowRef,
    middlewareData,
  } = useTooltipState({ offsetValue: sideOffset, placement: side })
  return (
    <FloatingPortal>
      {open && (
        <div
          ref={refs.setFloating}
          className={className}
          style={{
            ...(middlewareData.arrow?.y && {
              top: middlewareData.arrow?.y,
            }),
            ...(middlewareData.arrow?.x && {
              left: middlewareData.arrow?.x,
            }),
            ...(middlewareData.arrow?.centerOffset && {
              left: middlewareData.arrow?.centerOffset,
            }),
          }}
          {...getFloatingProps()}
        >
          {children}
          <div
            className="absolute h-2 w-2 rotate-45 bg-inherit"
            style={{
              ...(middlewareData.arrow?.y && {
                top: "-4px",
              }),
              ...(middlewareData.arrow?.x && {
                left: "-4px",
              }),
              ...(middlewareData.arrow?.centerOffset && {
                left: middlewareData.arrow?.centerOffset - 4,
              }),
            }}
            ref={arrowRef}
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
