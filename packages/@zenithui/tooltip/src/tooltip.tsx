// Tooltip Architecture using Floating UI with animation, theme support, delay behavior, arrow positioning, and keyboard accessibility

"use client"

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useId,
  cloneElement,
  isValidElement,
} from "react"
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
} from "@floating-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import clsx from "clsx"

// Context for Tooltip State
const TooltipContext = createContext(null)

function useTooltipState({
  delay = { open: 100, close: 100 },
  placement = "top",
  offsetValue = 6,
} = {}) {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef(null)

  const {
    refs,
    floatingStyles,
    context,
    placement: actualPlacement,
    middlewareData,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(offsetValue),
      floatingArrow({ element: arrowRef }),
      shift(),
      flip(),
    ],
    placement,
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, {
    move: false,
    delay,
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
    placement: actualPlacement,
    middlewareData,
    arrowRef,
  }
}

export const Tooltip = {
  Root: ({ children, delay, placement, offsetValue }) => {
    const tooltip = useTooltipState({ delay, placement, offsetValue })
    return (
      <TooltipContext.Provider value={tooltip}>
        {children}
      </TooltipContext.Provider>
    )
  },

  Trigger: ({ children, asChild = false }) => {
    const context = useContext(TooltipContext)
    if (!context)
      throw new Error("Tooltip.Trigger must be used within Tooltip.Root")

    const { refs, getReferenceProps } = context
    const id = useId()

    if (asChild && isValidElement(children)) {
      return cloneElement(children, {
        ref: refs.setReference,
        "aria-describedby": id,
        ...getReferenceProps(children.props),
      })
    }

    return (
      <button
        ref={refs.setReference}
        aria-describedby={id}
        {...getReferenceProps()}
      >
        {children}
      </button>
    )
  },

  Content: ({ children, className = "" }) => {
    const context = useContext(TooltipContext)
    if (!context)
      throw new Error("Tooltip.Content must be used within Tooltip.Root")

    const {
      open,
      refs,
      floatingStyles,
      getFloatingProps,
      middlewareData,
      arrowRef,
    } = context

    const id = useId()
    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[context.placement?.split("-")[0] ?? "top"]

    return (
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps({
                id,
                role: "tooltip",
              })}
              className={clsx(
                "z-50 rounded bg-black px-2 py-1 text-sm text-white shadow-lg",
                className,
              )}
            >
              {children}
              <div
                ref={arrowRef}
                className="absolute z-50 h-2 w-2 rotate-45 bg-black"
                style={{
                  left:
                    middlewareData.arrow?.x != null
                      ? `${middlewareData.arrow.x}px`
                      : "",
                  top:
                    middlewareData.arrow?.y != null
                      ? `${middlewareData.arrow.y}px`
                      : "",
                  [staticSide]: "-0.5rem",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    )
  },
}
