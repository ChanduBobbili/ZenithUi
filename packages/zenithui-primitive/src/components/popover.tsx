"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "../utils"

const Popover: typeof PopoverPrimitive.Root = PopoverPrimitive.Root

const PopoverTrigger: React.FC<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
> = PopoverPrimitive.Trigger

const PopoverAnchor: React.FC<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor>
> = PopoverPrimitive.Anchor

const animationClassMap = {
  fade: {
    open: "data-[state=open]:animate-zenithui-fade-in",
    close: "data-[state=closed]:animate-zenithui-fade-out",
  },
  zoom: {
    open: "data-[state=open]:animate-zenithui-zoom-in",
    close: "data-[state=closed]:animate-zenithui-zoom-out",
  },
  slide: {
    open: "data-[state=open]:animate-zenithui-slide-in-from-bottom",
    close: "data-[state=closed]:animate-zenithui-slide-out-to-bottom",
  },
  flip: {
    open: "data-[state=open]:animate-zenithui-flip-in",
    close: "data-[state=closed]:animate-zenithui-flip-out",
  },
  rotate: {
    open: "data-[state=open]:animate-zenithui-rotate-in",
    close: "data-[state=closed]:animate-zenithui-rotate-out",
  },
  bounce: {
    open: "data-[state=open]:animate-zenithui-bounce-in",
    close: "data-[state=closed]:animate-zenithui-bounce-out",
  },
}

interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  openAnimate?: "fade" | "zoom" | "slide" | "flip" | "rotate" | "bounce"
  closeAnimate?: "fade" | "zoom" | "slide" | "flip" | "rotate" | "bounce"
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
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
    const openClass =
      animationClassMap[openAnimate]?.open || animationClassMap.fade.open
    const closeClass =
      animationClassMap[closeAnimate]?.close || animationClassMap.fade.close

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md bg-popover p-4 text-popover-foreground shadow-md outline-none",
            openClass,
            closeClass,
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
