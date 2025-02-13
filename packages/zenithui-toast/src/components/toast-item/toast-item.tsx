import "./toast-item.css"
import { Toast, useToast } from "../toast-provider"
import { cn, getToastTheme } from "../../utils"
import { ToastAsset } from "../toast-asset"

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
      data-type={toast.type}
      data-rich-colors={richColors}
      className={cn(
        "zenithui-toast-wrapper",
        richColors ? getToastTheme(toast.type) : "",
        toast.remove ? "zenithui-fade-out-bottom" : "zenithui-fade-in-bottom",
      )}
      onAnimationEnd={() => toast.remove && removeToast(toast.id)}
    >
      <div className="zenithui-toast">
        <div data-icon="">
          <ToastAsset type={toast.type} />
        </div>
        <span>{toast.message}</span>
      </div>
      {/* <button
        className={cn("zenithui-toast-close")}
        onClick={() => removeToast(toast.id)}
      >
        x
      </button> */}
    </div>
  )
}
