import { createContext } from "react"
import type { TooltipContextType, TooltipProviderProps } from "./type"
import type { UseTooltipStateReturn } from "./useTooltipState"

export const TooltipContext: React.Context<
  (Partial<UseTooltipStateReturn> & TooltipContextType) | null
> = createContext<(Partial<UseTooltipStateReturn> & TooltipContextType) | null>(
  null,
)

export function TooltipProvider({
  delayDuration = 700,
  disableHoverableContent = false,
  children,
}: TooltipProviderProps) {
  return (
    <TooltipContext.Provider value={{ delayDuration, disableHoverableContent }}>
      {children}
    </TooltipContext.Provider>
  )
}
