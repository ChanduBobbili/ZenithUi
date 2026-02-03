"use client"
import { useMergeRefs } from "@floating-ui/react"
import { createPortal } from "react-dom"
import useFabState, { FabContext } from "./state"
import type {
  FAB_CHECKBOX_ITEM,
  FAB_CONTENT,
  FAB_GROUP,
  FAB_ITEM,
  FAB_ITEM_INDICATOR,
  FAB_LABEL,
  FAB_RADIO_GROUP,
  FAB_RADIO_ITEM,
  FAB_ROOT,
  FAB_SEPARATOR,
  FAB_TRIGGER,
} from "./types"
import * as React from "react"
import { cn } from "@zenithui/utils"

const FabRadioGroupContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
} | null>(null)

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
    open,
    onOpenChange,
    placement: "top",
    position,
    xOffset,
    yOffset,
    dismissOnEsc,
    dismissOutsideClick,
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
  className,
  style,
  ...props
}: FAB_TRIGGER) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const context = React.useContext(FabContext)
  if (!context) {
    throw new Error("Fab Trigger must be used within a Fab Root")
  }

  const { open, triggerRef, triggerCords, setOpen } = context

  const positionStyle: React.CSSProperties = {
    zIndex: 9999,
    position: "fixed",
    left: `${triggerCords.x}px`,
    top: `${triggerCords.y}px`,
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open)
    onClick?.(e)
  }

  const triggerProps = {
    ref: triggerRef,
    type: "button" as const,
    "aria-expanded": open,
    "aria-haspopup": true,
    style: { ...positionStyle, ...style },
    className: cn(className),
    onClick: handleClick,
    ...props,
  }

  if (!mounted || typeof document === "undefined") {
    return null
  }

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<Record<string, unknown>>
    const childRef =
      "ref" in child ? (child.ref as React.Ref<unknown>) : undefined
    const mergedRef = useMergeRefs([triggerRef, childRef])
    return createPortal(
      React.cloneElement(child, {
        ...child.props,
        ref: mergedRef,
        "aria-expanded": open,
        "aria-haspopup": true,
        style: {
          ...positionStyle,
          ...style,
          ...(child.props.style as React.CSSProperties),
        },
        className: cn(className, (child.props.className as string) ?? ""),
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          handleClick(e)
          ;(
            child.props.onClick as React.MouseEventHandler<HTMLButtonElement>
          )?.(e)
        },
      } as Record<string, unknown>),
      document.body,
    )
  }

  return createPortal(
    <button {...triggerProps}>{children}</button>,
    document.body,
  )
}

export function FabContent({
  placement = "top",
  offset = 0,
  className,
  style,
  children,
}: FAB_CONTENT) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const context = React.useContext(FabContext)
  if (!context) {
    throw new Error("Fab Content must be used within a Fab Root")
  }

  const { open, contentRef, contentCords, setPlacement, setOffset } = context

  React.useEffect(() => {
    setPlacement(placement)
    setOffset(offset)
  }, [placement, offset, setPlacement, setOffset])

  const positionStyle: React.CSSProperties = {
    zIndex: 9999,
    position: "fixed",
    left: `${contentCords.x}px`,
    top: `${contentCords.y}px`,
  }

  if (!mounted || typeof document === "undefined") {
    return null
  }

  return open
    ? createPortal(
        <div
          ref={contentRef}
          style={{ ...positionStyle, ...style }}
          className={cn(className)}
          aria-modal="true"
          role="menu"
        >
          {children}
        </div>,
        document.body,
      )
    : null
}

export function FabGroup({ className, children, ...props }: FAB_GROUP) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: menu group uses role="group" per ARIA menu pattern, not form fieldset
    <div
      role="group"
      className={cn(className)}
      data-fab-group
      {...props}
    >
      {children}
    </div>
  )
}

export function FabLabel({
  className,
  children,
  id: idProp,
  ...props
}: FAB_LABEL) {
  const generatedId = React.useId()
  const labelId = idProp ?? generatedId
  return (
    <div
      id={labelId}
      role="presentation"
      className={cn(className)}
      data-fab-label
      {...props}
    >
      {children}
    </div>
  )
}

export function FabSeparator({ className, ...props }: FAB_SEPARATOR) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      tabIndex={-1}
      className={cn(className)}
      data-fab-separator
      {...props}
    />
  )
}

export function FabItem({
  children,
  className,
  closeOnSelect = true,
  onClick,
  ...props
}: FAB_ITEM) {
  const context = React.useContext(FabContext)
  if (!context) {
    throw new Error(
      "FabItem must be used within a Fab Root (inside FabContent)",
    )
  }
  const { setOpen } = context
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    if (closeOnSelect) setOpen(false)
  }
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(className)}
      onClick={handleClick}
      data-fab-item
      {...props}
    >
      {children}
    </button>
  )
}

export function FabItemIndicator({
  className,
  children,
  ...props
}: FAB_ITEM_INDICATOR) {
  return (
    <span
      className={cn(className)}
      data-fab-item-indicator
      aria-hidden
      {...props}
    >
      {children}
    </span>
  )
}

export function FabCheckboxItem({
  children,
  className,
  checked: controlledChecked,
  onCheckedChange,
  closeOnSelect = true,
  onClick,
  ...props
}: FAB_CHECKBOX_ITEM) {
  const context = React.useContext(FabContext)
  if (!context) {
    throw new Error(
      "FabCheckboxItem must be used within a Fab Root (inside FabContent)",
    )
  }
  const { setOpen } = context
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(false)
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : uncontrolledChecked
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isControlled) setUncontrolledChecked((c) => !c)
    onCheckedChange?.(!checked)
    onClick?.(e)
    if (closeOnSelect) setOpen(false)
  }
  return (
    <button
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      className={cn(className)}
      onClick={handleClick}
      data-fab-checkbox-item
      data-state={checked ? "checked" : "unchecked"}
      {...props}
    >
      {children}
    </button>
  )
}

export function FabRadioGroup({
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: FAB_RADIO_GROUP) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState("")
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue
  const handleValueChange = React.useCallback(
    (v: string) => {
      if (!isControlled) setUncontrolledValue(v)
      onValueChange?.(v)
    },
    [isControlled, onValueChange],
  )
  return (
    <FabRadioGroupContext.Provider
      value={{ value, onValueChange: handleValueChange }}
    >
      <div
        role="radiogroup"
        className={cn(className)}
        aria-orientation="vertical"
        data-fab-radio-group
        {...props}
      >
        {children}
      </div>
    </FabRadioGroupContext.Provider>
  )
}

export function FabRadioItem({
  value: itemValue,
  children,
  className,
  closeOnSelect = true,
  onClick,
  ...props
}: FAB_RADIO_ITEM) {
  const fabContext = React.useContext(FabContext)
  const radioContext = React.useContext(FabRadioGroupContext)
  if (!fabContext) {
    throw new Error(
      "FabRadioItem must be used within a Fab Root (inside FabContent)",
    )
  }
  if (!radioContext) {
    throw new Error("FabRadioItem must be used within a FabRadioGroup")
  }
  const { setOpen } = fabContext
  const { value, onValueChange } = radioContext
  const checked = value === itemValue
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onValueChange(itemValue)
    onClick?.(e)
    if (closeOnSelect) setOpen(false)
  }
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={checked}
      className={cn(className)}
      onClick={handleClick}
      data-fab-radio-item
      data-state={checked ? "checked" : "unchecked"}
      {...props}
    >
      {children}
    </button>
  )
}

FabRoot.displayName = "FabRoot"
FabTrigger.displayName = "FabTrigger"
FabContent.displayName = "FabContent"
FabGroup.displayName = "FabGroup"
FabLabel.displayName = "FabLabel"
FabSeparator.displayName = "FabSeparator"
FabItem.displayName = "FabItem"
FabItemIndicator.displayName = "FabItemIndicator"
FabCheckboxItem.displayName = "FabCheckboxItem"
FabRadioGroup.displayName = "FabRadioGroup"
FabRadioItem.displayName = "FabRadioItem"
