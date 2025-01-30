import React, { useEffect, useState } from "react"
import { Toast, toastManager } from "./toast"

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
      className={`toast toast-${toast.type} rounded p-4 shadow-md ${fadeOut ? "toast-dismiss" : ""}`}
    >
      {toast.message}
    </div>
  )
}
