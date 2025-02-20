import "./toast-container.css"
import { createPortal } from "react-dom"
import { Toast, ToastPosition, useToast } from "../toast-provider"
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
  const { position: globalPosition } = useToast()

  // Group toasts by child position (toast position > global position)
  const groupedToasts = useMemo(() => {
    return toasts.reduce(
      (acc, toast) => {
        const childPosition = toast?.options?.position ?? globalPosition

        if (!acc[childPosition]) acc[childPosition] = []

        acc[childPosition].push(toast)
        return acc
      },
      {} as Record<string, Toast[]>,
    )
  }, [toasts])

  // Memoize each group's toasts outside the map
  const memoizedGroupedToasts = useMemo(() => {
    return Object.entries(groupedToasts).reduce(
      (acc, [position, positionToasts]) => {
        acc[position] = [
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ].includes(position)
          ? reverseToasts(positionToasts)
          : positionToasts
        return acc
      },
      {} as Record<string, Toast[]>,
    )
  }, [groupedToasts])

  return Object.entries(memoizedGroupedToasts).map(([position, toasts]) => {
    return createPortal(
      <div
        key={position}
        className={cn(
          "zenithui-toast-container",
          className,
          getPositionClass(position as ToastPosition),
        )}
        {...props}
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
          />
        ))}
      </div>,
      document.body,
    )
  })
}
