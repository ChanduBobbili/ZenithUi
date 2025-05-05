"use client"
import { ToastProvider } from "@zenithui/toast"
import * as TooltipPrimitive from "@zenithui/tooltip"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider enableQueueSystem>
      <TooltipPrimitive.Provider>{children}</TooltipPrimitive.Provider>
    </ToastProvider>
  )
}
