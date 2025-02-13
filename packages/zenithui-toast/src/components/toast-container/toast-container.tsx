import "./toast-container.css"
import { createPortal } from "react-dom"
import { Toast, useToast } from "../toast-provider"
import { ToastItem } from "../toast-item/toast-item"
import { cn, getPositionClass } from "../../utils"

interface ToastContainerProps {
  /**
   * The List of Item of Toast Instance.
   */
  toasts: Toast[]
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const { position } = useToast()
  return createPortal(
    <div className={cn("zenithui-toast-container", getPositionClass(position))}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
        />
      ))}
    </div>,
    document.body,
  )
}
