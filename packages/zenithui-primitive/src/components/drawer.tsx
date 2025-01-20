import {
	forwardRef,
	type ComponentProps,
	type ComponentPropsWithoutRef,
	type ElementRef,
	type HTMLAttributes,
} from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "../utils"

const Drawer = ({
	shouldScaleBackground = true,
	...props
}: ComponentProps<typeof DrawerPrimitive.Root>) => (
	<DrawerPrimitive.Root
		shouldScaleBackground={shouldScaleBackground}
		{...props}
	/>
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = forwardRef<
	ElementRef<typeof DrawerPrimitive.Overlay>,
	ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Overlay
		ref={ref}
		className={cn("fixed inset-0 z-50 bg-black/80", className)}
		{...props}
	/>
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

interface DrawerContentProps
	extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
	withCloseable?: boolean
	OverlayClassName?: string
	withCloseButton?: boolean
}

const DrawerContent = forwardRef<
	ElementRef<typeof DrawerPrimitive.Content>,
	DrawerContentProps
>(
	(
		{
			className,
			children,
			withCloseable = true,
			withCloseButton = true,
			OverlayClassName = "",
			...props
		},
		ref,
	) => (
		<DrawerPortal>
			<DrawerOverlay className={OverlayClassName} />
			<DrawerPrimitive.Content
				ref={ref}
				className={cn(
					"fixed bottom-0 right-0 z-50 ml-24 flex items-center justify-center rounded-l-[10px] bg-white w-1/3 h-screen",
					className,
				)}
				{...props}
			>
				{withCloseButton && (
					<DrawerClose asChild>
						<button className="absolute -left-16 top-4 flex size-14 items-center justify-center rounded-full bg-slate-300/75 text-slate-950 transition-colors duration-300 ease-in-out hover:bg-slate-300">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="size-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</DrawerClose>
				)}

				{withCloseable && (
					<div
						tabIndex={0}
						className="mx-auto mr-4 h-[100px] w-2 cursor-grab rounded-full bg-muted hover:bg-slate-500 focus:cursor-grabbing"
					/>
				)}
				<div className="flex size-full flex-col">{children}</div>
			</DrawerPrimitive.Content>
		</DrawerPortal>
	),
)
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
		{...props}
	/>
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = forwardRef<
	ElementRef<"div">,
	HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, forwardedRef) => (
	<div
		ref={forwardedRef}
		className={cn("mt-auto flex flex-col gap-2 p-4", className)}
		{...props}
	/>
))
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = forwardRef<
	ElementRef<typeof DrawerPrimitive.Title>,
	ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Title
		ref={ref}
		className={cn(
			"text-lg font-semibold leading-none tracking-tight",
			className,
		)}
		{...props}
	/>
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = forwardRef<
	ElementRef<typeof DrawerPrimitive.Description>,
	ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Description
		ref={ref}
		className={cn("text-sm text-slate-500", className)}
		{...props}
	/>
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
}
