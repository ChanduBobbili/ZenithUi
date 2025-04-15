export type TooltipContextType = {
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
  children: React.ReactNode
}
