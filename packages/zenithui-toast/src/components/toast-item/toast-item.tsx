import "./toast-item.css"
import { Toast, useToast } from "../toast-provider"
import { cn, getToastAnimation, getToastTheme } from "../../utils"
import { ToastAsset } from "../toast-asset"

interface ToastItemProps {
  /**
   * The Instance Item of Toast.
   */
  toast: Toast
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const { richColors, animation, position, removeToast } = useToast()
  return (
    <div
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
      {/* <button
        className={cn("zenithui-toast-close")}
        onClick={() => removeToast(toast.id)}
      >
        x
      </button> */}
    </div>
  )
}
