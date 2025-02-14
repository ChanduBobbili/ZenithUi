import "./toast-item.css"
import { Toast, useToast } from "../toast-provider"
import { cn, getToastAnimation, getToastTheme } from "../../utils"
import { CloseIcon, ToastAsset } from "../toast-asset"
import { useEffect, useRef } from "react"

interface ToastItemProps {
  /**
   * The Instance Item of Toast.
   */
  toast: Toast
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const {
    richColors,
    animation,
    position,
    showCloseButton,
    disableAutoDismiss,
    duration,
    removeToast,
    setToasts,
  } = useToast()

  // useRef to store timeout reference
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-dismiss toast after duration
  useEffect(() => {
    if (!disableAutoDismiss) {
      timeoutRef.current = setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === toast.id ? { ...t, remove: true } : t)),
        )
      }, duration)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      role="alert"
      aria-live="assertive"
      tabIndex={0}
      data-type={toast.type}
      data-rich-colors={richColors}
      className={cn(
        "zenithui-toast-wrapper",
        richColors ? getToastTheme(toast.type) : "",
        getToastAnimation(animation, position, !toast.remove),
      )}
      onAnimationEnd={() => toast.remove && removeToast(toast.id)}
    >
      <div className="zenithui-toast">
        <div data-icon="">
          <ToastAsset type={toast.type} />
        </div>
        <span>{toast.message}</span>
      </div>
      {showCloseButton ? (
        <button
          className={cn(
            "zenithui-toast-close",
            richColors
              ? `${getToastTheme(toast.type)} zenithui-toast-close-rich`
              : "",
          )}
          onClick={() => {
            if (timeoutRef.current) {
              // Clear timeout on manual close
              clearTimeout(timeoutRef.current)
            }
            removeToast(toast.id)
          }}
        >
          <CloseIcon />
        </button>
      ) : null}
    </div>
  )
}
