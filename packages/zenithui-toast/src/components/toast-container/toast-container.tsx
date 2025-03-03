import "./toast-container.css"
import { createPortal } from "react-dom"
import { useMemo } from "react"
import { Toast, ToastPosition } from "../../lib/types"
import { useToast } from "../../hooks/use-toast"
import { cn, getPositionClass, reverseToasts } from "../../lib/utils"
import { ToastItem } from "../toast-item/toast-item"

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
  const { position: globalPosition, X_Offset, Y_Offset } = useToast()

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
        style={
          {
            "--x-offset": `${X_Offset + 12}px`,
            "--y-offset": `${Y_Offset + 12}px`,
          } as React.CSSProperties
        }
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
