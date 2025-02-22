"use-client"

import * as React from "react"
import { registerToast } from "./toast"
import { ToastContainer } from "./toast-container/toast-container"
import { cn, getTheme } from "../utils"

export type ToastType = "success" | "info" | "error" | "warning"
export type Theme = "auto" | "light" | "dark"
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"
export type ToastAnimation = "slide" | "fade"

export interface ToastOptions {
  /**
   * Whether to use rich colors for the toast.
   * @type {boolean}
   * @default false
   */
  richColors?: boolean
  /**
   * The duration of the toast to display.
   * @type {number}
   * @default 5000
   */
  duration?: number
  /**
   * Whether to enable auto dismiss for the toast.
   * @type {boolean}
   * @default true
   */
  disableAutoDismiss?: boolean
  /**
   * The animation of the toast.
   * @type {string}
   * @default "fade"
   */
  animation?: ToastAnimation
  /**
   * Whether to show the close button for the toast.
   * @type {boolean}
   * @default false
   */
  showCloseButton?: boolean
  /**
   * The position of the toast.
   * @type {ToastPosition}
   * @default "top-right"
   * @description This is used to position the toast.
   */
  position?: ToastPosition
}

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
  /**
   * The options to customize the toast.
   * @type {ToastOptions}
   * @description This is used to customize the toast.
   */
  options?: Partial<ToastOptions>
  /**
   * Whether to remove the toast from the toast container.
   * @type {boolean}
   * @default false
   * @description This is used to remove the toast from the toast container.
   */
  remove: boolean
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
  /**
   * The function to set the toasts in the toast container
   * @param value @type {React.SetStateAction<Toast[]>}
   * @returns
   */
  setToasts: (value: React.SetStateAction<Toast[]>) => void
  /**
   * The position of the toast.
   * @type {ToastPosition}
   */
  position: ToastPosition
  /**
   * Whether to use rich colors for the toast.
   * @type {boolean}
   */
  richColors: boolean
  /**
   * The animation of the toast.
   * @type {string}
   */
  animation: ToastAnimation
  /**
   * Whether to show the close button for the toast.
   * @type {boolean}
   */
  showCloseButton: boolean
  /**
   * Whether to enable auto dismiss for the toast.
   * @type {boolean}
   */
  disableAutoDismiss: boolean
  /**
   * The duration of the toast to display.
   * @type {number}
   */
  duration: number
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
export const useToast = (): ToastContextProps => {
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
  /**
   * Whether to use rich colors for the toast.
   * @type {boolean}
   * @default false
   */
  richColors?: boolean
  /**
   * The position of the toast.
   * @type {ToastPosition}
   * @default "bottom-right"
   */
  position?: ToastPosition
  /**
   * The duration of the toast to display.
   * @type {number}
   * @default 5000
   */
  duration?: number
  /**
   * Whether to enable auto dismiss for the toast.
   * @type {boolean}
   * @default true
   */
  disableAutoDismiss?: boolean
  /**
   * If too many toasts appear at once, we should queue them instead of overwhelming the user.
   * @type {boolean}
   * @default false
   */
  enableQueueSystem?: boolean
  /**
   * The maximum no of toasts to show when queue system is enabled.
   * @type {number}
   * @default 3
   */
  maxToasts?: number
  /**
   * The animation of the toast.
   * @type {string}
   * @default "fade"
   */
  animation?: ToastAnimation
  /**
   * Whether to show the close button for the toast.
   * @type {boolean}
   * @default false
   */
  showCloseButton?: boolean
  /**
   * The theme of the toast.
   * @type {Theme}
   * @default "light"
   */
  theme?: Theme
  // /**
  //  * The style of the toast.
  //  * @type {React.CSSProperties}
  //  */
  // style?: React.CSSProperties
  // /**
  //  * The class name of the toast.
  //  * @type {string}
  //  */
  // className?: string
  // /**
  //  * The class name of the toast container.
  //  * @type {string}
  //  */
  // containerClassName?: string
  // /**
  //  * The class name of the toast item.
  //  * @type {string}
  //  */
  // itemClassName?: string
  // /**
  //  * The class name of the toast item close button.
  //  * @type {string}
  //  */
  // itemCloseClassName?: string
  // /**
  //  * The class name of the toast item icon.
  //  * @type {string}
  //  */
  // itemIconClassName?: string
  // /**
  //  * The class name of the toast item message.
  //  * @type {string}
  //  */
  // itemMessageClassName?: string
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "bottom-right",
  animation = "fade",
  theme = "light",
  duration = 5000,
  maxToasts = 3,
  richColors = false,
  disableAutoDismiss = false,
  enableQueueSystem = false,
  showCloseButton = false,
}) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const [queue, setQueue] = React.useState<Toast[]>([])

  const addToast = React.useCallback(
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

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // Process the queue, ensuring only `maxToasts` are displayed at a time
  React.useEffect(() => {
    if (enableQueueSystem && queue.length > 0 && toasts.length < maxToasts) {
      const nextToast = queue[0]
      // Remove the Queue
      setQueue((prev) => prev.slice(1))
      // Render the Toast
      setToasts((prev) => [...prev, nextToast])
    }
  }, [queue, enableQueueSystem, maxToasts, toasts])

  // Automatically register toast singleton when ToastProvider is used
  React.useEffect(() => {
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
        className={cn(getTheme(theme))}
      />
    </ToastContext.Provider>
  )
}
