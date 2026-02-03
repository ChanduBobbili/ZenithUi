import type { HTMLAttributes } from "react"

export type POSITION =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "center-left"
  | "center-right"
  | "center"

export type PLACEMENT = "left" | "right" | "top" | "bottom"

export type COORDS = {
  x: number
  y: number
}

export type Rect = {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
}

export type FAB_ROOT = {
  /**
   * The open state of the FAB (controlled mode).
   * When provided with onOpenChange, the FAB is controlled.
   * @type {boolean | undefined}
   */
  open?: boolean
  /**
   * Called when the open state changes (controlled mode).
   * @param open boolean - The new open state of the FAB.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * The position of the FAB on the screen.
   * @type {POSITION}
   * @defaultValue "bottom-right"
   */
  position?: POSITION
  /**
   * The x offset of the FAB from the edges of the screen.
   * @type {number}
   * @defaultValue 0
   */
  xOffset?: number
  /**
   * The y offset of the FAB from the edges of the screen.
   * @type {number}
   * @defaultValue 0
   */
  yOffset?: number
  /**
   * The Fab content dismisses when clicking outside of it.
   * @type {boolean}
   * @defaultValue true
   */
  dismissOutsideClick?: boolean
  /**
   * The Fab content dismisses when pressing the escape key.
   * @type {boolean}
   * @defaultValue true
   */
  dismissOnEsc?: boolean
  /**
   * The children of the FAB.
   * @type {React.ReactNode}
   */
  children: React.ReactNode
}

export type FAB_TRIGGER = HTMLAttributes<HTMLButtonElement> & {
  /**
   * The content of the FAB trigger (e.g. icon or label).
   */
  children: React.ReactNode

  /**
   * When `true`, merges props and behavior onto the child element instead of rendering a button.
   * @defaultValue false
   */
  asChild?: boolean
}

export type FAB_CONTENT = {
  /**
   * The position of the content relative to the trigger.
   * @type {"left" | "right" | "top" | "bottom"}
   * @defaultValue "top"
   */
  placement?: PLACEMENT
  /**
   * The offset between the trigger and the content.
   * @type {number}
   * @defaultValue 0
   */
  offset?: number
  /**
   * The class name to apply to the content.
   * @type {string}
   */
  className?: string
  /**
   * Optional inline styles (merged with position styles).
   */
  style?: React.CSSProperties
  /**
   * The content to be displayed inside the Fab Content.
   * @type {React.ReactNode}
   */
  children: React.ReactNode
}

export type FAB_STATE = {
  open: boolean
  setOpen: (open: boolean) => void
  position: POSITION
  placement: PLACEMENT
  triggerCords: COORDS
  contentCords: COORDS
  triggerRef: React.RefObject<HTMLButtonElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  setPlacement: (placement: PLACEMENT) => void
  setOffset: (offset: number) => void
  isTriggerReady: boolean
  isContentReady: boolean
}

export type FAB_HOOK = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  position: POSITION
  placement: PLACEMENT
  offset?: number
  xOffset: number
  yOffset: number
  dismissOutsideClick?: boolean
  dismissOnEsc?: boolean
}

export type FAB_CONTEXT = {
  open: boolean
  setOpen: (open: boolean) => void
  position: POSITION
  placement: PLACEMENT
  triggerCords: COORDS
  contentCords: COORDS
  triggerRef: React.RefObject<HTMLButtonElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  setPlacement: (placement: PLACEMENT) => void
  setOffset: (offset: number) => void
  /** True after initial trigger position is computed (avoids flash from 0,0). */
  isTriggerReady: boolean
  /** True after content position is computed when open (avoids flash from 0,0). */
  isContentReady: boolean
}

// Menu sub-components (used inside FabContent)

export type FAB_GROUP = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export type FAB_LABEL = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export type FAB_SEPARATOR = React.HTMLAttributes<HTMLDivElement>

export type FAB_ITEM = React.HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  /** When true, closes the FAB content on select. @defaultValue true */
  closeOnSelect?: boolean
}

export type FAB_ITEM_INDICATOR = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode
}

export type FAB_CHECKBOX_ITEM = Omit<
  React.HTMLAttributes<HTMLButtonElement>,
  "onSelect"
> & {
  children: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** When true, closes the FAB content on select. @defaultValue true */
  closeOnSelect?: boolean
}

export type FAB_RADIO_GROUP = React.HTMLAttributes<HTMLDivElement> & {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export type FAB_RADIO_ITEM = React.HTMLAttributes<HTMLButtonElement> & {
  value: string
  children: React.ReactNode
  /** When true, closes the FAB content on select. @defaultValue true */
  closeOnSelect?: boolean
}
