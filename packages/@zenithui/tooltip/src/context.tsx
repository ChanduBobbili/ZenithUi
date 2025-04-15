import { createContext } from "react"
import type { TooltipContextType, TooltipProviderProps } from "./type"

export const TooltipContext: React.Context<TooltipContextType | undefined> =
  createContext<TooltipContextType | undefined>(undefined)

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
