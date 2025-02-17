import "./toast-container.css"
import { createPortal } from "react-dom"
import { Toast, useToast } from "../toast-provider"
import { ToastItem } from "../toast-item/toast-item"
import { cn, getPositionClass, reverseToasts } from "../../utils"
import { useMemo } from "react"

interface ToastContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The List of Item of Toast Instance.
   */
  toasts: Toast[]
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  className,
  ...props
}) => {
  const { position } = useToast()

  const memoToasts = useMemo(() => {
    if (["bottom-left", "bottom-center", "bottom-right"].includes(position)) {
      return reverseToasts(toasts)
    } else {
      return toasts
    }
  }, [toasts])

  return memoToasts.length > 0
    ? createPortal(
        <div
          className={cn(
            "zenithui-toast-container",
            className,
            getPositionClass(position),
          )}
          {...props}
        >
          {memoToasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
            />
          ))}
        </div>,
        document.body,
      )
    : null
}
