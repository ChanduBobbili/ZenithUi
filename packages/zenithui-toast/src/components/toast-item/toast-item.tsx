import "./toast-item.css"
import * as React from "react"
import { Toast } from "../toast-provider"

interface ToastItemProps {
  /**
   * The Instance Item of Toast.
   */
  toast: Toast
  /**
   * The callback function to remove the toast
   * @param id
   * @returns
   */
  removeToast: (id: string) => void
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, removeToast }) => {
  return (
    <div className={"zenithui-toast"}>
      {toast.message}
      <button
        className="zenithui-toast-close"
        onClick={() => removeToast(toast.id)}
      >
        x
      </button>
    </div>
  )
}
