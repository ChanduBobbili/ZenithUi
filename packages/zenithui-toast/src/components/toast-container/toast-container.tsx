import "./toast-container.css"
import { createPortal } from "react-dom"
import { Toast, useToast } from "../toast-provider"
import { ToastItem } from "../toast-item/toast-item"
import { cn, getPositionClass, reverseToasts } from "../../utils"
import { useMemo } from "react"

interface ToastContainerProps {
  /**
   * The List of Item of Toast Instance.
   */
  toasts: Toast[]
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const { position } = useToast()

  const memoToasts = useMemo(() => {
    if (["bottom-left", "bottom-center", "bottom-right"].includes(position)) {
      return reverseToasts(toasts)
    } else {
      return toasts
    }
  }, [toasts])

  return createPortal(
    <div className={cn("zenithui-toast-container", getPositionClass(position))}>
      {memoToasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
        />
      ))}
    </div>,
    document.body,
  )
}
