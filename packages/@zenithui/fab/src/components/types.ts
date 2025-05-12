import type {
  Placement,
  useFloating,
  useInteractions,
} from "@floating-ui/react"
import type { HTMLAttributes } from "react"

export type POSITION =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"

export type FAB_ROOT = {
  /**
   * The open state of the FAB.
   * When set to `true`, the FAB is open.
   * When set to `false`, the FAB is closed.
   * @type {boolean}
   */
  open: boolean
  /**
   * The function to call when the open state of the FAB changes.
   * @param open boolean - The new open state of the FAB.
   */
  onOpenChange: (open: boolean) => void
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
}

export type FAB_TRIGGER = HTMLAttributes<HTMLDivElement> & {
  /**
   * The content to be displayed inside the tooltip.
   */
  children: React.ReactNode

  /**
   * When set to `true`, the tooltip trigger will inherit the behavior and styling of its child element.
   * This allows you to use a custom component or element as the trigger while maintaining the tooltip functionality.
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
  placement?: "left" | "right" | "top" | "bottom"
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
}

export type FAB_STATE = {
  open: boolean
  setOpen: (open: boolean) => void
  placement: Placement
  setPosition: (position: POSITION) => void
  xOffset: number
  yOffset: number
  refs: ReturnType<typeof useFloating>["refs"]
  floatingStyles: React.CSSProperties
  middlewareData: ReturnType<typeof useFloating>["middlewareData"]
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"]
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"]
}
