"use client"
import { ToastProvider } from "zenithui-toast"

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ToastProvider >{children}</ToastProvider>
}
