"use client"
import type { ComponentProps } from "react"
import { LightBox as LightBoxPrimitive } from "@zenithui/light-box"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Trash2, X } from "lucide-react"

export default function LightBox({
  classNames,
  ...props
}: ComponentProps<typeof LightBoxPrimitive>) {
  return (
    <LightBoxPrimitive
      classNames={{
        overLay: cn(
          "data-[state=open]:animate-zenithui-fade-in data-[state=closed]:animate-zenithui-fade-out fixed inset-0 z-50 bg-black/10",
          classNames?.overLay,
        ),
        lightBox: cn(
          "data-[state=closed]:animate-zenithui-fade-out data-[state=open]:animate-zenithui-fade-in bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg",
          "flex aspect-square min-w-[35%] flex-col justify-between overflow-hidden border-0 bg-white p-6 shadow-[inset_0_0_20px_5px_rgb(0,0,0,0.25)]",
          classNames?.lightBox,
        ),
        controls: cn(
          "z-10 flex w-full flex-row items-center justify-end gap-4 space-y-0",
          classNames?.controls,
        ),
        navigation: cn(
          "z-10 flex w-full items-center justify-between",
          classNames?.navigation,
        ),
        footer: cn(
          "z-10 flex w-full flex-col justify-end sm:flex-col",
          classNames?.footer,
        ),
        caption: cn("text-2xl font-semibold text-white", classNames?.caption),
        captionDescription: cn(
          "text-base font-normal text-white",
          classNames?.captionDescription,
        ),
        pagination: cn(
          "flex w-full items-center justify-center gap-2",
          classNames?.pagination,
        ),
        closeButton: cn(
          "flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white backdrop:blur-sm hover:bg-white/40",
          classNames?.closeButton,
        ),
        deleteButton: cn(
          "flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white backdrop:blur-sm hover:bg-white/40",
          classNames?.deleteButton,
        ),
        navigateButton: cn(
          "flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white backdrop:blur-sm hover:bg-white/40",
          classNames?.navigateButton,
        ),
        paginationButton: cn(
          "size-2.5 cursor-pointer rounded-full border border-white",
          classNames?.paginationButton,
        ),
        paginationButtonActive: cn(
          "bg-white",
          classNames?.paginationButtonActive,
        ),
      }}
      components={{
        DeleteButtonIcon: <Trash2 />,
        CloseButtonIcon: <X />,
        NavigationButtonLeftIcon: <ChevronLeft />,
        NavigationButtonRightIcon: <ChevronRight />,
      }}
      {...props}
    />
  )
}
