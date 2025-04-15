import type {
  Placement,
  useFloating,
  useInteractions,
} from "@floating-ui/react"
import type { HTMLAttributes } from "react"

export type OPTIONS = {
  placement: Placement
  delayDuration: number
  offset: number
}

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
  updateOptions: (options: Partial<OPTIONS>) => void
}

export type TooltipContextType = Partial<UseTooltipStateReturn> & {
  delayDuration: number
  disableHoverableContent: boolean
}

export type TooltipProviderContextType = {
  delayDuration: number
  disableHoverableContent: boolean
}

export type TooltipProviderProps = {
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   * @defaultValue 700
   */
  delayDuration?: number
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean
  // /**
  //  * The placement content of the tooltip.
  //  * @defaultValue "top"
  //  */
  // placement?: Placement
  children: React.ReactNode
}

export type TooltipContentProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The content to be displayed inside the tooltip.
   */
  children: React.ReactNode

  /**
   * A custom class name to apply to the tooltip content element for styling purposes.
   */
  className?: string

  /**
   * Specifies the side of the trigger element where the tooltip should appear.
   * For example, "top", "bottom", "left", or "right".
   */
  side?: Placement

  /**
   * The distance in pixels between the tooltip and the trigger element along the specified side.
   */
  offset?: number

  /**
   * Forces the tooltip to be mounted in the DOM, even when it is not visible.
   * This can be useful for applying styles or animations to the tooltip.
   */
  // forceMount?: true
}

export type TooltipTriggerProps = HTMLAttributes<HTMLDivElement> & {
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
