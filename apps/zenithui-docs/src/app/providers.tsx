"use client"
import { ToastProvider } from "@zenithui/toast"
import { TooltipProvider } from "@zenithui/tooltip"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider enableQueueSystem>
      <TooltipProvider>{children}</TooltipProvider>
    </ToastProvider>
  )
}
