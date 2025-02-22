"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "../../utils"

const Popover: typeof PopoverPrimitive.Root = PopoverPrimitive.Root

const PopoverTrigger: React.FC<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>> = PopoverPrimitive.Trigger

const PopoverAnchor: React.FC<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor>> = PopoverPrimitive.Anchor

interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  openAnimate?: "fade" | "zoom" | "slide" | "flip" | "rotate" | "bounce"
  closeAnimate?: "fade" | "zoom" | "slide" | "flip" | "rotate" | "bounce"
}

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      align = "center",
      sideOffset = 4,
      openAnimate = "fade",
      closeAnimate = "fade",
      ...props
    },
    ref,
  ) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "popover-content",
            `data-[side=bottom]:slide-in-from-top data-[side=left]:slide-in-from-right data-[side=right]:slide-in-from-left data-[side=top]:slide-in-from-bottom`,
            openAnimate === "fade" && "fade-in",
            closeAnimate === "fade" && "fade-out",
            openAnimate === "zoom" && "zoom-in",
            closeAnimate === "zoom" && "zoom-out",
            openAnimate === "bounce" && "bounce-in",
            closeAnimate === "bounce" && "bounce-out",
            openAnimate === "flip" && "flip-in",
            closeAnimate === "flip" && "flip-out",
            openAnimate === "rotate" && "rotate-in",
            closeAnimate === "rotate" && "rotate-out",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Portal>
    )
  },
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
