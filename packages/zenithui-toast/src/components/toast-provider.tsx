"use-client"

import * as React from "react"
import { registerToast } from "./toast"
import { ToastContainer } from "./toast-container/toast-container"

export type ToastType = "success" | "info" | "error" | "warning"

export interface Toast {
  /**
   * The unique identifier of the toast.
   * @type {string}
   */
  id: string
  /**
   * The toast type which says what kind of toast it is.
   * @type {ToastType}
   */
  type: ToastType
  /**
   * The Message to display in the toast.
   * @type {string}
   */
  message: string
}

interface ToastContextProps {
  /**
   * The function to add the toast in the toast container
   * @param message
   * @param type
   * @returns
   */
  addToast: (message: string, type: ToastType) => void
  /**
   * The function to remove the toast in the toast container
   * @param id
   * @returns
   */
  removeToast: (id: string) => void
}

/**
 * The Context of the toast which is created using createContext from React.
 * This enables the use of toast in the application.
 * @type {React.Context<ToastContextProps | undefined>}
 */
const ToastContext: React.Context<ToastContextProps | undefined> =
  React.createContext<ToastContextProps | undefined>(undefined)

/**
 * The custom hook to use the toast in the application.
 * This hook is used to add the toast in the toast container.
 * @returns {ToastContextProps}
 */
export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("Toast must be used within a ToastProvider")
  }
  return context
}

interface ToastProviderProps {
  /**
   * The children of the ToastProvider.
   * @type {React.ReactNode}
   */
  children: React.ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 11)
    setToasts((prevToasts) => [...prevToasts, { id, type, message }])
    setTimeout(() => removeToast(id), 3000)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // Automatically register toast singleton when ToastProvider is used
  React.useEffect(() => {
    registerToast(addToast)
  }, [addToast])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
      />
    </ToastContext.Provider>
  )
}
