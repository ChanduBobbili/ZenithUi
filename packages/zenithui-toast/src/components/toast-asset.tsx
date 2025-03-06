import { ToastType } from "../lib/types"
import { cn } from "../lib/utils"
import SuccessIcon from "@/assets/success.svg?react"
import InfoIcon from "@/assets/info.svg?react"
import ErrorIcon from "@/assets/error.svg?react"
import WarningIcon from "@/assets/warning.svg?react"

export const ToastAsset: React.FC<{ type: ToastType; className: string }> = ({
  type,
  className,
}) => {
  switch (type) {
    case "success":
      return <SuccessIcon className={cn(className)} />
    case "info":
      return <InfoIcon className={cn(className)} />
    case "error":
      return <ErrorIcon className={cn(className)} />
    case "warning":
      return <WarningIcon className={cn(className)} />
    default:
      return <SuccessIcon className={cn(className)} />
  }
}

// const bars = Array(12).fill(0)

// export const Loader = ({
//   visible,
//   className,
// }: {
//   visible: boolean
//   className?: string
// }) => {
//   return (
//     <div
//       className={["sonner-loading-wrapper", className]
//         .filter(Boolean)
//         .join(" ")}
//       data-visible={visible}
//     >
//       <div className="sonner-spinner">
//         {bars.map((_, i) => (
//           <div
//             className="sonner-loading-bar"
//             key={`spinner-bar-${i}`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }
