import React, { useEffect, useState } from "react"
import { Toast, toastManager } from "./toast"
import { cn } from "../utils"

interface ToastProps {
  toast: Toast
}

export const ToastItem: React.FC<ToastProps> = ({ toast }) => {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => toastManager.removeToast(toast.id), 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [toast.id])

  return (
    <div
      className={cn(
        "rounded p-4 shadow-md text-white",
        fadeOut ? "toast-dismiss" : "",
        toast.type === "success" && "bg-green-500",
        toast.type === "error" && "bg-red-500",
        toast.type === "info" && "bg-blue-500",
        toast.type === "warning" && "bg-yellow-500",
      )}
    >
      {toast.message}
    </div>
  )
}
