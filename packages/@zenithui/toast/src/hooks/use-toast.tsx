import { createContext, useContext } from "react"
import { ToastContextProps } from "../lib/types"

/**
 * The Context of the toast which is created using createContext from React.
 * This enables the use of toast in the application.
 * @type {React.Context<ToastContextProps | undefined>}
 */
export const ToastContext: React.Context<ToastContextProps | undefined> =
  createContext<ToastContextProps | undefined>(undefined)

/**
 * The custom hook to use the toast in the application.
 * This hook is used to add the toast in the toast container.
 * @returns {ToastContextProps}
 */
export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("Toast must be used within a ToastProvider")
  }
  return context
}
