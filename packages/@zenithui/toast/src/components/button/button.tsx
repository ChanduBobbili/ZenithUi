import { cn } from "@zenithui/utils"
import type { ButtonProps } from "../../lib/types"
import "./button.css"

export default function Button({
  btntype,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn("zenithui-toast-btn", btntype, className)}
    >
      {children}
    </button>
  )
}
