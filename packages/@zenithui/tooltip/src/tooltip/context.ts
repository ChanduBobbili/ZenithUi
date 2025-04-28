import { createContext } from "react"
import type { TooltipContextType, TooltipProviderContextType } from "./types"

export const TooltipProviderContext: React.Context<TooltipProviderContextType | null> =
  createContext<TooltipContextType | null>(null)

export const TooltipContext: React.Context<TooltipContextType | null> =
  createContext<TooltipContextType | null>(null)
