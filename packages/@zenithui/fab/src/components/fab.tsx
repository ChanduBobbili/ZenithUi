import { createPortal } from "react-dom"
import useFabState, { FabContext } from "./state"
import type { FAB_CONTENT, FAB_ROOT, FAB_TRIGGER } from "./types"
import * as React from "react"
import { cn } from "@zenithui/utils"

export function FabRoot({
  open,
  onOpenChange,
  position = "bottom-right",
  xOffset = 0,
  yOffset = 0,
  dismissOutsideClick = true,
  dismissOnEsc = true,
  children,
}: FAB_ROOT) {
  const {
    open: stateOpen,
    contentCords,
    contentRef,
    triggerRef,
    triggerCords,
    position: statePosition,
    placement,
    setOpen,
    setOffset,
    setPlacement,
  } = useFabState({
    placement: "top",
    position: position,
    offset: 0,
    xOffset: xOffset,
    yOffset: yOffset,
    dismissOnEsc: dismissOnEsc,
    dismissOutsideClick: dismissOutsideClick,
  })
  return (
    <FabContext.Provider
      value={{
        open: stateOpen,
        setOpen,
        position: statePosition,
        placement,
        triggerCords,
        contentCords,
        triggerRef,
        contentRef,
        setOffset,
        setPlacement,
      }}
    >
      {children}
    </FabContext.Provider>
  )
}

export function FabTrigger({
  children,
  asChild = false,
  onClick,
  ...props
}: FAB_TRIGGER) {
  const context = React.useContext(FabContext)
  if (!context) {
    throw new Error("Fab Trigger must be used within a Fab Root")
  }

  const { open, triggerRef, triggerCords, setOpen } = context

  return createPortal(
    <button
      {...props}
      ref={triggerRef}
      type="button"
      style={{
        zIndex: 9999,
        position: "fixed",
        left: `${triggerCords.x}px`,
        top: `${triggerCords.y}px`,
        minWidth: "40px",
        minHeight: "40px",
        backgroundColor: "cornflowerblue",
        cursor: "pointer",
        // transform: "translate(-50%, -50%)",
      }}
      onClick={(e) => {
        setOpen(!open)
        onClick?.(e)
      }}
    >
      {children}
    </button>,
    document.body,
  )
}

export function FabContent({
  placement = "top",
  offset = 0,
  className,
  children,
}: FAB_CONTENT) {
  const context = React.useContext(FabContext)
  if (!context) {
    throw new Error("Fab Content must be used within a Fab Root")
  }

  const { open, contentRef, contentCords, setPlacement, setOffset } = context

  // biome-ignore lint/correctness/useExhaustiveDependencies: When the placement or offset changes, we need to update the content position
  React.useEffect(() => {
    if (placement) setPlacement(placement)
    if (offset) setOffset(offset)
  }, [placement, offset])

  return open
    ? createPortal(
        <div
          ref={contentRef}
          style={{
            zIndex: 9999,
            position: "fixed",
            left: `${contentCords.x}px`,
            top: `${contentCords.y}px`,
            minWidth: "400px",
            minHeight: "400px",
            backgroundColor: "cornflowerblue",
          }}
          className={cn(className)}
        >
          {children}
        </div>,
        document.body,
      )
    : null
}

FabRoot.displayName = "FabRoot"
FabTrigger.displayName = "FabTrigger"
FabContent.displayName = "FabContent"
