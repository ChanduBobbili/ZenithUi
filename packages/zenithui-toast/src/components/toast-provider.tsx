import { registerToast } from "./toast"
import { ToastContainer } from "./toast-container/toast-container"
import { cn } from "../lib/utils"
import {
  Toast,
  ToastOptions,
  ToastProviderProps,
  ToastType,
} from "../lib/types"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ToastContext } from "../hooks/use-toast"
import { useTheme } from "../hooks/use-theme"

export const ToastProvider: React.FC<ToastProviderProps> = ({
  position = "bottom-right",
  animation = "fade",
  theme = "auto",
  duration = 5000,
  maxToasts = 3,
  richColors = false,
  disableAutoDismiss = false,
  enableQueueSystem = false,
  showCloseButton = false,
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [queue, setQueue] = useState<Toast[]>([])

  const hookTheme = useTheme()

  const themeClass = useMemo(
    () => (theme === "auto" ? hookTheme : theme === "dark" ? "dark" : ""),
    [theme],
  )

  const addToast = useCallback(
    (message: string, type: ToastType, options?: ToastOptions) => {
      const id = Math.random().toString(36).substring(2, 11)
      const newToast: Toast = { id, type, message, remove: false, options }

      if (enableQueueSystem) {
        setQueue((prev) => [...prev, newToast])
      } else {
        setToasts((prev) => [...prev, newToast])
      }
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // Process the queue, ensuring only `maxToasts` are displayed at a time
  useEffect(() => {
    if (enableQueueSystem && queue.length > 0 && toasts.length < maxToasts) {
      const nextToast = queue[0]
      // Remove the Queue
      setQueue((prev) => prev.slice(1))
      // Render the Toast
      setToasts((prev) => [...prev, nextToast])
    }
  }, [queue, enableQueueSystem, maxToasts, toasts])

  // Automatically register toast singleton when ToastProvider is used
  useEffect(() => {
    registerToast(addToast)
  }, [addToast])

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
        setToasts,
        richColors,
        position,
        animation,
        showCloseButton,
        disableAutoDismiss,
        duration,
      }}
    >
      {children}
      <ToastContainer
        toasts={toasts}
        className={cn(themeClass)}
      />
    </ToastContext.Provider>
  )
}
