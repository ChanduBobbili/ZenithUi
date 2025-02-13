import "./toast-container.css"
import * as React from "react"
import { createPortal } from "react-dom"
import { Toast } from "../toast-provider"
import { ToastItem } from "../toast-item/toast-item"

interface ToastContainerProps {
  /**
   * The List of Item of Toast Instance.
   */
  toasts: Toast[]
  /**
   * The callback function to remove the toast.
   * @param id
   * @returns
   */
  removeToast: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
}) => {
  return toasts.length > 0
    ? createPortal(
        <div className="zenithui-toast-container">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              removeToast={removeToast}
            />
          ))}
        </div>,
        document.body,
      )
    : null
}
