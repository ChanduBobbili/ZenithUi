import "./toast-item.css"
import * as React from "react"
import { Toast, useToast } from "../toast-provider"
import { cn, getToastTheme } from "../../utils"

interface ToastItemProps {
  /**
   * The Instance Item of Toast.
   */
  toast: Toast
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const { richColors, removeToast } = useToast()
  return (
    <div
      className={cn(
        "zenithui-toast",
        richColors ? getToastTheme(toast.type) : "",
        toast.remove ? "zenithui-fade-out-bottom" : "zenithui-fade-in-bottom",
      )}
      onAnimationEnd={() => toast.remove && removeToast(toast.id)}
    >
      {toast.message}
      <button
        className={cn("zenithui-toast-close")}
        onClick={() => removeToast(toast.id)}
      >
        x
      </button>
    </div>
  )
}
