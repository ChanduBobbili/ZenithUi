"use client"

import * as React from "react"
import * as ZenithUiDialogPrimitive from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { cn } from "../utils"

const ZenithUiDialog = ZenithUiDialogPrimitive.Root

const ZenithUiDialogTrigger = ZenithUiDialogPrimitive.Trigger

const ZenithUiDialogPortal = ZenithUiDialogPrimitive.Portal

const ZenithUiDialogClose = ZenithUiDialogPrimitive.Close

const ZenithUiDialogOverlay = React.forwardRef<
	React.ElementRef<typeof ZenithUiDialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof ZenithUiDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<ZenithUiDialogPrimitive.Overlay
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-black/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
	/>
))
ZenithUiDialogOverlay.displayName = ZenithUiDialogPrimitive.Overlay.displayName

interface ZenithUiDialogContentProps
	extends React.ComponentPropsWithoutRef<typeof ZenithUiDialogPrimitive.Content> {
	hasCloseButton?: boolean // Optional boolean prop
	closeButtonStyles?: string // Optional string prop for custom styles
}

const ZenithUiDialogContent = React.forwardRef<
	React.ElementRef<typeof ZenithUiDialogPrimitive.Content>,
	ZenithUiDialogContentProps
>(
	(
		{
			className,
			children,
			hasCloseButton = true,
			closeButtonStyles = "",
			...props
		},
		ref,
	) => (
		<ZenithUiDialogPortal>
			<ZenithUiDialogOverlay />
			<ZenithUiDialogPrimitive.Content
				ref={ref}
				className={cn(
					"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
					className,
				)}
				{...props}
			>
				{children}
				{hasCloseButton && (
					<ZenithUiDialogPrimitive.Close
						className={cn(
							"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-sky-100 data-[state=open]:text-slate-950",
							closeButtonStyles,
						)}
					>
						<Cross2Icon className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</ZenithUiDialogPrimitive.Close>
				)}
			</ZenithUiDialogPrimitive.Content>
		</ZenithUiDialogPortal>
	),
)
ZenithUiDialogContent.displayName = ZenithUiDialogPrimitive.Content.displayName

const ZenithUiDialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col space-y-1.5 text-center sm:text-left",
			className,
		)}
		{...props}
	/>
)
ZenithUiDialogHeader.displayName = "ZenithUiDialogHeader"

const ZenithUiDialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
			className,
		)}
		{...props}
	/>
)
ZenithUiDialogFooter.displayName = "ZenithUiDialogFooter"

const ZenithUiDialogTitle = React.forwardRef<
	React.ElementRef<typeof ZenithUiDialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof ZenithUiDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<ZenithUiDialogPrimitive.Title
		ref={ref}
		className={cn(
			"text-lg font-semibold leading-none tracking-tight",
			className,
		)}
		{...props}
	/>
))
ZenithUiDialogTitle.displayName = ZenithUiDialogPrimitive.Title.displayName

const ZenithUiDialogDescription = React.forwardRef<
	React.ElementRef<typeof ZenithUiDialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof ZenithUiDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<ZenithUiDialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-slate-600", className)}
		{...props}
	/>
))
ZenithUiDialogDescription.displayName = ZenithUiDialogPrimitive.Description.displayName

export {
	ZenithUiDialog,
	ZenithUiDialogPortal,
	ZenithUiDialogOverlay,
	ZenithUiDialogTrigger,
	ZenithUiDialogClose,
	ZenithUiDialogContent,
	ZenithUiDialogHeader,
	ZenithUiDialogFooter,
	ZenithUiDialogTitle,
	ZenithUiDialogDescription,
}
