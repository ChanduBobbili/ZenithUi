import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { toastManager } from "./toast"
import { Toast } from "./toast"
import { ToastItem } from "./toast-item"
import { cn } from "../utils"

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    toastManager.setToasterMounted(true)

    const unsubscribe = toastManager.subscribe(setToasts)
    return () => {
      toastManager.setToasterMounted(false)
      unsubscribe()
    }
  }, [])

  return ReactDOM.createPortal(
    <div className={cn("fixed right-4 top-4 z-50 space-y-2")}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
        />
      ))}
    </div>,
    document.body,
  )
}
