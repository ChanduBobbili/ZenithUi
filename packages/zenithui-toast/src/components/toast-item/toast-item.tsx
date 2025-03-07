import { useCallback, useEffect, useRef } from "react"
import { Toast } from "../../lib/types"
import { useToast } from "../../hooks/use-toast"
import { cn, getToastAnimation, getToastTheme } from "../../lib/utils"
import CloseIcon from "@/assets/close.svg?react"
import "./toast-item.css"
import Button from "../button/button"
import { ToastAsset } from "../toast-asset/toast-asset"

interface ToastItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The Instance Item of Toast.
   */
  toast: Toast
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, ...props }) => {
  const {
    richColors,
    animation,
    position,
    showCloseButton,
    disableAutoDismiss,
    duration,
    classNames: globalClassNames,
    removeToast,
    setToasts,
  } = useToast()

  const { options } = toast

  // useRef to store timeout reference
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const setTimer = useCallback(() => {
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
  }, [])

  // Auto-dismiss toast after duration
  useEffect(() => {
    // Clear timeout on unmount
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
        options?.classNames
          ? typeof options.classNames === "string"
            ? options?.classNames
            : (options?.classNames?.className ?? "")
          : (globalClassNames?.className ?? ""),
      )}
      onAnimationEnd={() => {
        setTimer()
        if (toast.remove) {
          removeToast(toast.id)
        }
      }}
    >
      <div className="zenithui-toast">
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div
            data-icon={toast.type}
            style={
              toast.type === "loading"
                ? { position: "relative", width: "16px", height: "16px" }
                : {}
            }
          >
            {options?.icon ? (
              options.icon
            ) : (
              <ToastAsset
                type={toast.type}
                className={cn(
                  options?.classNames
                    ? typeof options.classNames !== "string"
                      ? (options?.classNames?.icon ?? "")
                      : ""
                    : (globalClassNames?.icon ?? ""),
                )}
              />
            )}
          </div>
          <div
            data-content={true}
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <span
              className={cn(
                options?.classNames
                  ? typeof options.classNames !== "string"
                    ? (options?.classNames?.title ?? "")
                    : ""
                  : (globalClassNames?.title ?? ""),
              )}
            >
              {toast?.options?.title || toast.message}
            </span>
            {toast?.options?.description ? (
              <span
                className={cn(
                  options?.classNames
                    ? typeof options.classNames !== "string"
                      ? (options?.classNames?.description ?? "")
                      : ""
                    : (globalClassNames?.description ?? ""),
                )}
              >
                {toast.options.description}
              </span>
            ) : null}
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* action btn */}
          {options?.action ? (
            <options.action
              {...options.action}
              btntype="action"
            />
          ) : (
            <>
              {options?.onAction ? (
                <Button
                  btntype="action"
                  className={cn(
                    options?.classNames
                      ? typeof options.classNames !== "string"
                        ? (options?.classNames?.actionButton ?? "")
                        : ""
                      : (globalClassNames?.actionButton ?? ""),
                  )}
                  onClick={options.onAction}
                >
                  Action
                </Button>
              ) : null}
            </>
          )}
          {/* cancel btn */}
          {options?.cancel ? (
            <options.cancel
              {...options.action}
              btntype="action"
            />
          ) : (
            <>
              {options?.onCancel ? (
                <Button
                  btntype="cancel"
                  className={cn(
                    "cancel",
                    options?.classNames
                      ? typeof options.classNames !== "string"
                        ? (options?.classNames?.cancelButton ?? "")
                        : ""
                      : (globalClassNames?.cancelButton ?? ""),
                  )}
                  onClick={(e) => {
                    options?.onCancel?.(e)
                    setToasts((prev) =>
                      prev.map((t) =>
                        t.id === toast.id ? { ...t, remove: true } : t,
                      ),
                    )
                  }}
                >
                  Cancel
                </Button>
              ) : null}
            </>
          )}
        </div>
      </div>
      {/* close btn */}
      {options?.close ? (
        <options.close
          {...options.action}
          btntype="close"
        />
      ) : (
        <>
          {options?.showCloseButton ? (
            options.showCloseButton
          ) : showCloseButton ? (
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
                options?.classNames
                  ? typeof options.classNames !== "string"
                    ? (options?.classNames?.closeButton ?? "")
                    : ""
                  : (globalClassNames?.closeButton ?? ""),
              )}
              onClick={(e) => {
                options?.onCancel?.(e)
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
        </>
      )}
    </div>
  )
}
