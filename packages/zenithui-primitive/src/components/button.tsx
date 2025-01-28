import React, { forwardRef } from "react"
import { cn } from "../utils"
import { cva, VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  [
    // Base Classes
    "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium shadow-none",

    // Transition Classes
    "transition-all duration-150 ease-in-out",

    // Disabled Classes
    "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",

    // Focus Visible Classes
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default:
          "border-b-4 border-b-orange-600 bg-primary text-primary-foreground hover:bg-primary/90 active:border-b-0 data-[disabled=true]:border-b-4",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "rounded-[8px] border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost:
          "font-normal text-blue-500 hover:bg-slate-50 hover:text-blue-500",
        link: "text-primary underline-offset-4 hover:underline",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        unstyled: "",
        calendar:
          "rounded-[8px] border border-transparent bg-slate-100 font-normal text-blue-600 hover:border-blue-400",
        dayPicker: "h-12 w-12 rounded-full bg-sky-500 text-white",
        primary: "bg-primary text-primary-foreground hover:!bg-sky-600",
        primary_gradient: "bg-gradient-to-r from-sky-600 to-primary text-white",
        blue_gradient:
          "bg-gradient-to-t from-blue-900 to-blue-600 text-white hover:from-blue-950 hover:to-blue-700",
        green_gradient:
          "bg-gradient-to-t from-green-700 to-green-500 text-white hover:from-green-800 hover:to-green-600",
        destructive_gradient:
          "bg-destructive bg-gradient-to-t from-red-800/40 to-destructive text-white",
        red: "bg-red-500 text-white hover:!bg-red-600",
        emerald: "hover:!bg-emeral-800 bg-emerald-600 text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8 text-sm",
        xl: "h-12 text-base",
        icon: "h-9 w-9",
      },
    },
    compoundVariants: [
      {
        size: "icon",
        variant: "outline",
        class: "stroke-slate-500 hover:stroke-slate-600",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const { className, variant, size, children, ...rest } = props

    return (
      <button
        {...rest}
        className={cn(
          buttonVariants({ variant, size, className }),
          "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
        )}
        ref={forwardedRef}
      >
        {children}
      </button>
    )
  },
)

export default Button
