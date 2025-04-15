import { TooltipContext, TooltipProviderContext } from "./context"
import type { TooltipContentProps, TooltipProviderProps } from "./types"
import { FloatingPortal, type Placement } from "@floating-ui/react"
import useTooltipState from "./useTooltipState"
import * as React from "react"

export function TooltipProvider({
  delayDuration = 700,
  disableHoverableContent = false,
  children,
}: TooltipProviderProps) {
  return (
    <TooltipProviderContext.Provider
      value={{ delayDuration, disableHoverableContent }}
    >
      {children}
    </TooltipProviderContext.Provider>
  )
}

export function TooltipRoot({
  delayDuration,
  disableHoverableContent = false,
  children,
}: TooltipProviderProps) {
  const provider = React.useContext(TooltipProviderContext)
  if (!provider)
    throw new Error("TooltipRoot must be used within TooltipProvider")
  const tooltipState = useTooltipState({
    delayDuration: delayDuration ?? provider.delayDuration,
    // Default values that can be overridden by TooltipContent
    placement: "top",
    offset: 12,
  })
  return (
    <TooltipContext.Provider
      value={{
        delayDuration: delayDuration ?? provider.delayDuration,
        disableHoverableContent,
        ...tooltipState,
      }}
    >
      {children}
    </TooltipContext.Provider>
  )
}

export function TooltipTrigger({
  children,
  // asChild,
}: {
  children: React.ReactElement
  // asChild?: boolean
}) {
  const context = React.useContext(TooltipContext)
  if (!context) throw new Error("TooltipTrigger must be used within Tooltip")

  const { refs, getReferenceProps } = context

  //  if (asChild && React.isValidElement(children)) {
  //    return React.cloneElement(children, {
  //      ref: (node: HTMLElement) => {
  //        refs?.setReference(node)
  //        const { ref } = children
  //        if (typeof ref === "function") ref(node)
  //        else if (ref && typeof ref === "object") ref.current = node
  //      },
  //      ...getReferenceProps?.(),
  //    })
  //  }

  return (
    <span
      ref={refs?.setReference}
      {...getReferenceProps?.()}
    >
      {children}
    </span>
  )
}

export function TooltipContent({
  children,
  className,
  side = "top",
  offset = 12,
}: TooltipContentProps) {
  const context = React.useContext(TooltipContext)
  if (!context) throw new Error("TooltipContent must be used within Tooltip")

  const {
    getFloatingProps,
    refs,
    open,
    placement = side,
    arrowRef,
    middlewareData,
    floatingStyles,
    updateOptions,
  } = context

  // Update placement and offset when they change
  React.useEffect(() => {
    if (updateOptions) {
      updateOptions({
        placement: side,
        offset: offset,
      })
    }
  }, [side, offset, updateOptions])

  // Calculate arrow position based on placement
  const getArrowStyle = React.useCallback(() => {
    const baseStyle = {
      position: "absolute",
      width: 8,
      height: 8,
      backgroundColor: "inherit",
      transform: "rotate(45deg)",
    }

    const arrowX = middlewareData?.arrow?.x ?? 0
    const arrowY = middlewareData?.arrow?.y ?? 0

    switch (placement) {
      case "top":
        return {
          ...baseStyle,
          bottom: "-4px",
          left: arrowX,
          transformOrigin: "center center",
        }
      case "bottom":
        return {
          ...baseStyle,
          top: "-4px",
          left: arrowX,
          transformOrigin: "center center",
        }
      case "left":
        return {
          ...baseStyle,
          right: "-4px",
          top: arrowY,
          transformOrigin: "center center",
        }
      case "right":
        return {
          ...baseStyle,
          left: "-4px",
          top: arrowY,
          transformOrigin: "center center",
        }
      default:
        return {
          ...baseStyle,
          bottom: "-4px",
          left: arrowX,
        }
    }
  }, [middlewareData?.arrow?.x, middlewareData?.arrow?.y, placement])

  return (
    <FloatingPortal>
      {open && (
        <div
          ref={refs?.setFloating}
          className={className}
          style={{
            ...floatingStyles,
          }}
          {...getFloatingProps?.()}
          data-side={placement}
          data-state={open ? "open" : "closed"}
        >
          {children}
          <div
            ref={arrowRef}
            style={
              {
                ...getArrowStyle(),
              } as React.CSSProperties
            }
          />
        </div>
      )}
    </FloatingPortal>
  )
}
