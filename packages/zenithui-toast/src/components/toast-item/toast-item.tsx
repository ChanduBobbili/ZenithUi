import "./toast-item.css"
import { Toast, useToast } from "../toast-provider"
import {
  cn,
  getToastAnimation,
  getToastTheme,
} from "../../utils"
import { CloseIcon, ToastAsset } from "../toast-asset"
import { useEffect, useRef } from "react"

interface ToastItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The Instance Item of Toast.
   */
  toast: Toast
}

export const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  className,
  ...props
}) => {
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

  const { options } = toast

  // useRef to store timeout reference
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-dismiss toast after duration
  useEffect(() => {
    if (
      !(options?.disableAutoDismiss
        ? options.disableAutoDismiss
        : disableAutoDismiss)
    ) {
      timeoutRef.current = setTimeout(
        () => {
          setToasts((prev) =>
            prev.map((t) => (t.id === toast.id ? { ...t, remove: true } : t)),
          )
        },
        options?.duration ? options?.duration : duration,
      )
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      {...props}
      role="alert"
      aria-live="assertive"
      tabIndex={0}
      data-type={toast.type}
      data-rich-colors={options?.richColors ? options.richColors : richColors}
      className={cn(
        "zenithui-toast-wrapper",
        options?.richColors
          ? options.richColors
            ? getToastTheme(toast.type)
            : ""
          : richColors
            ? getToastTheme(toast.type)
            : "",
        getToastAnimation(
          options?.animation ? options.animation : animation,
          position,
          !toast.remove,
        ),
        className,
      )}
      onAnimationEnd={() => toast.remove && removeToast(toast.id)}
    >
      <div className="zenithui-toast">
        <div data-icon="">
          <ToastAsset type={toast.type} />
        </div>
        <span>{toast.message}</span>
      </div>
      {(
        options?.showCloseButton ? options.showCloseButton : showCloseButton
      ) ? (
        <button
          className={cn(
            "zenithui-toast-close",
            options?.richColors
              ? options.richColors
                ? `${getToastTheme(toast.type)} zenithui-toast-close-rich`
                : ""
              : richColors
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
