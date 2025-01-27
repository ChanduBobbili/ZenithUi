import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "./utils"
import PIP_ICON from "./assets/pip.svg?react"
import TRASH_BIN from "./assets/delete.svg?react"
import ARROW_RIGHT from "./assets/arrow.svg?react"

interface LightBoxImages {
  /**
   * The source of the image.
   */
  src: string
  /**
   * The alt text of the image.
   */
  alt?: string
  /**
   * The caption of the image.
   */
  caption?: string
  /**
   * The description of the image.
   */
  captionDescription?: string
}

interface LightBoxClassNames {
  /**
   * The class to apply to the lightbox.
   */
  lightBox?: string
  /**
   * The class to apply to the caption.
   */
  caption?: string
  /**
   * The class to apply to the caption description.
   */
  captionDescription?: string
  /**
   * The class to apply to the pagination.
   */
  pagination?: string
  /**
   * The class to apply to the pagination button.
   */
  paginationButton?: string
  /**
   * The class to apply to the pagination button icon.
   */
  paginationButtonActive?: string
  /**
   * The class to apply to the navigate button.
   */
  navigateButton?: string
  /**
   * The class to apply to the navigate button left.
   */
  navigateButtonLeft?: string
  /**
   * The class to apply to the navigate button right.
   */
  navigateButtonRight?: string
  /**
   * The class to apply to the close button.
   */
  closeButton?: string
  /**
   * The class to apply to the delete button.
   */
  deleteButton?: string
  /**
   * The class to apply to the overlay.
   */
  overLay?: string
}

interface LightBoxProps {
  /**
   * The open state of the lightbox.
   */
  open: boolean
  /**
   * The function to call when the open state of the lightbox changes.
   */
  onOpenChange: (open: boolean) => void
  /**
   * The images to display in the lightbox.
   */
  images: LightBoxImages[] | string[]
  /**
   * The initial index of the image to display.
   */
  initialIndex?: number
  /**
   * Whether to show the close button.
   */
  showCloseButton?: boolean
  /**
   * Whether to show the delete button.
   */
  showDeleteButton?: boolean
  /**
   * Whether to show the pagination.
   */
  showPagination?: boolean
  /**
   * The animation to use for the lightbox.
   */
  animation?: "slide" | "fade" | "stretch" | "flip" | "blur"
  /**
   * The function to call when the image deletes.
   */
  onImageDelete?: (index: number) => void
  /**
   * Whether to show the caption.
   */
  showCaption?: boolean
  classNames?: LightBoxClassNames
}

const LightBox: React.FC<LightBoxProps> = ({
  open,
  onOpenChange,
  images,
  initialIndex = 0,
  showCloseButton = true,
  showDeleteButton = false,
  showPagination = true,
  showCaption = false,
  animation = "slide",
  onImageDelete,
  classNames,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(initialIndex)

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogPrimitive.DialogPortal>
        <DialogPrimitive.Overlay
          className={cn(
            "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-50 bg-black/10",
            classNames?.overLay,
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
            "flex aspect-square min-w-[35%] flex-col justify-between overflow-hidden border-0 bg-white p-6 shadow-[inset_0_0_20px_5px_rgb(0,0,0,0.25)]",
            classNames?.lightBox,
          )}
          style={
            animation === "stretch"
              ? {
                  backgroundImage: `url(${typeof images[currentIndex] !== "string" ? images[currentIndex].src : images[currentIndex]})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          {animation === "slide" && (
            <>
              {/* Slide Animation Image Container */}
              <div
                className="absolute left-0 top-0 flex h-full w-full transition-transform duration-500"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  display: "flex",
                  zIndex: -1,
                }}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundImage: `url(${typeof image !== "string" ? image.src : image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      flex: "0 0 100%",
                    }}
                  />
                ))}
              </div>
            </>
          )}
          {animation === "fade" && (
            <>
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${typeof image !== "string" ? image.src : image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    opacity: currentIndex === index ? 1 : 0,
                    transition: "opacity 1s ease-in-out", // Fade animation
                  }}
                />
              ))}
            </>
          )}
          {animation === "flip" && (
            <div
              className="absolute inset-0 z-0 transition-transform duration-500"
              style={{
                transform:
                  currentIndex % 2 === 0 ? "rotateY(180deg)" : "rotateY(0deg)",
                backgroundImage: `url(${typeof images[currentIndex] !== "string" ? images[currentIndex].src : images[currentIndex]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          )}
          {animation === "blur" && (
            <>
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${typeof image !== "string" ? image.src : image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    filter: currentIndex === index ? "blur(0)" : "blur(10px)",
                    transition:
                      "filter 0.5s ease-in-out, opacity 0.5s ease-in-out",
                    opacity: currentIndex === index ? 1 : 0,
                  }}
                  className="absolute inset-0"
                />
              ))}
            </>
          )}

          <div
            className={cn(
              "z-10 flex w-full flex-row items-center justify-end gap-4 space-y-0",
            )}
          >
            {/* Delete Button */}
            {showDeleteButton && (
              <div
                className={cn(
                  "flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white backdrop:blur-sm hover:bg-white/40",
                  classNames?.deleteButton,
                )}
                onClick={() => {
                  if (onImageDelete) {
                    onImageDelete(currentIndex)
                    if (images.length === 1) {
                      onOpenChange(false)
                    }
                    if (currentIndex === images.length - 1) {
                      setCurrentIndex(currentIndex - 1)
                    } else {
                      setCurrentIndex(currentIndex)
                    }
                  }
                }}
              >
                <TRASH_BIN className="size-1/2" />
              </div>
            )}

            {/* Close Button */}
            {showCloseButton && (
              <div
                className={cn(
                  "flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white backdrop:blur-sm hover:bg-white/40",
                  classNames?.closeButton,
                )}
                onClick={() => onOpenChange(false)}
              >
                <PIP_ICON className="size-1/2" />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="z-10 flex w-full items-center justify-between">
            {/* Previous Button */}
            <NavigationButton
              direction="left"
              onClick={() => {
                const prevIndex = currentIndex - 1
                setCurrentIndex(prevIndex < 0 ? images.length - 1 : prevIndex)
              }}
              className={cn(
                classNames?.navigateButtonLeft,
                classNames?.navigateButton,
              )}
            />

            {/* Next Button */}
            <NavigationButton
              direction="right"
              onClick={() => {
                const nextIndex = currentIndex + 1
                setCurrentIndex(nextIndex >= images.length ? 0 : nextIndex)
              }}
              className={cn(
                classNames?.navigateButtonRight,
                classNames?.navigateButton,
              )}
            />
          </div>

          {/* Footer */}
          <div
            className={cn("z-10 flex w-full flex-col justify-end sm:flex-col")}
          >
            {showCaption && (
              <div className="flex w-full flex-col gap-1 px-2">
                <span
                  className={cn(
                    "text-2xl font-semibold text-white",
                    classNames?.caption,
                  )}
                >
                  {(typeof images[currentIndex] !== "string" &&
                    images[currentIndex].caption) ??
                    "Image caption"}
                </span>
                <span
                  className={cn(
                    "text-base font-normal text-white",
                    classNames?.captionDescription,
                  )}
                >
                  {(typeof images[currentIndex] !== "string" &&
                    images[currentIndex].captionDescription) ??
                    "Image Descripton"}
                </span>
              </div>
            )}
            {showPagination && (
              <div
                className={cn(
                  "flex w-full items-center justify-center gap-2",
                  classNames?.pagination,
                )}
              >
                {Array.from({ length: images.length }).map((_, index) => (
                  <PaginationDot
                    key={index}
                    active={currentIndex === index}
                    onClick={() => setCurrentIndex(index)}
                    className={classNames?.paginationButton}
                    activeClassName={classNames?.paginationButtonActive}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.DialogPortal>
    </DialogPrimitive.Root>
  )
}

const NavigationButton: React.FC<{
  direction: "left" | "right"
  onClick: () => void
  className?: string
}> = ({ direction, onClick, className }) => {
  const isLeft = direction === "left"
  return (
    <div
      className={cn(
        "flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white backdrop:blur-sm hover:bg-white/40",
        className,
      )}
      onClick={onClick}
      aria-label={`Navigate ${direction}`}
    >
      <ARROW_RIGHT className={cn("size-1/2", isLeft && "rotate-180")} />
    </div>
  )
}

const PaginationDot: React.FC<{
  active: boolean
  onClick: () => void
  className?: string
  activeClassName?: string
}> = ({ active, onClick, className, activeClassName }) => (
  <div
    data-active={active}
    className={cn(
      "size-2.5 cursor-pointer rounded-full border border-white",
      className,
      active && (activeClassName || "bg-white"),
    )}
    onClick={onClick}
  />
)

export { LightBox, type LightBoxImages, type LightBoxProps }
