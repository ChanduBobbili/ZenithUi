import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import type {
  CloseButtonProps,
  DeleteButtonProps,
  LightBoxProps,
  NavigationButtonProps,
  PaginationDotProps,
} from "./types"
import { cn, uuid } from "@zenithui/utils"

export function LightBox({
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
  components,
}: LightBoxProps) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(initialIndex)

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogPrimitive.DialogPortal>
        <DialogPrimitive.Overlay className={cn(classNames?.overLay)} />
        <DialogPrimitive.Content
          className={cn(classNames?.lightBox)}
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
          data-animation={animation}
        >
          <DialogPrimitive.Title style={{ display: "none" }}>
            Title
          </DialogPrimitive.Title>
          {animation === "slide" && (
            <>
              {/* Slide Animation Image Container */}
              <div
                className="absolute top-0 left-0 flex h-full w-full transition-transform duration-500"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  display: "flex",
                  zIndex: -1,
                }}
              >
                {images.map((image) => (
                  <div
                    key={`image-slide-${image.toString()}-${uuid()}`}
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

          {animation === "fade" &&
            images.map((image, index) => (
              <div
                key={`image-fade-${image.toString()}-${uuid()}`}
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
          {animation === "blur" &&
            images.map((image, index) => (
              <div
                key={`image-blur-${image.toString()}-${uuid()}`}
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

          {/* Controls */}
          <div
            className={cn(classNames?.controls)}
            data-animation={animation}
          >
            {/* Delete Button */}
            {showDeleteButton &&
              (components?.DeleteButton ? (
                <components.DeleteButton
                  onImageDelete={onImageDelete}
                  currentIndex={currentIndex}
                  images={images}
                  onOpenChange={onOpenChange}
                  setCurrentIndex={setCurrentIndex}
                  className={classNames?.deleteButton}
                />
              ) : (
                <DeleteButton
                  onImageDelete={onImageDelete}
                  currentIndex={currentIndex}
                  images={images}
                  onOpenChange={onOpenChange}
                  setCurrentIndex={setCurrentIndex}
                  className={classNames?.deleteButton}
                >
                  {components?.DeleteButtonIcon}
                </DeleteButton>
              ))}

            {/* Close Button */}
            {showCloseButton &&
              (components?.CloseButton ? (
                <components.CloseButton
                  onOpenChange={onOpenChange}
                  className={classNames?.closeButton}
                >
                  {components?.CloseButtonIcon}
                </components.CloseButton>
              ) : (
                <CloseButton
                  onOpenChange={onOpenChange}
                  className={classNames?.closeButton}
                >
                  {components?.CloseButtonIcon}
                </CloseButton>
              ))}
          </div>

          {/* Navigation Buttons */}
          <div
            className={cn(classNames?.navigation)}
            data-animation={animation}
          >
            {/* Previous Button */}
            {components?.NavigationButtonLeft ? (
              <components.NavigationButtonLeft
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
            ) : (
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
              >
                {components?.NavigationButtonLeftIcon}
              </NavigationButton>
            )}

            {/* Next Button */}
            {components?.NavigationButtonRight ? (
              <components.NavigationButtonRight
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
            ) : (
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
              >
                {components?.NavigationButtonRightIcon}
              </NavigationButton>
            )}
          </div>

          {/* Footer */}
          <div
            className={cn(classNames?.footer)}
            data-animation={animation}
          >
            {showCaption && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingInline: "1rem",
                  gap: "0.5rem",
                  width: "100%",
                }}
              >
                <span className={cn(classNames?.caption)}>
                  {(typeof images[currentIndex] !== "string" &&
                    images[currentIndex].caption) ??
                    "Image caption"}
                </span>
                <span className={cn(classNames?.captionDescription)}>
                  {(typeof images[currentIndex] !== "string" &&
                    images[currentIndex].captionDescription) ??
                    "Image Descripton"}
                </span>
              </div>
            )}
            {showPagination && (
              <div className={cn(classNames?.pagination)}>
                {Array.from({ length: images.length }).map((_, index) => (
                  <PaginationDot
                    key={`pagination-${index.toString()}`}
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

const CloseButton: React.FC<CloseButtonProps> = ({
  onOpenChange,
  className,
  children,
}) => {
  return (
    <button
      type="button"
      className={cn(className)}
      onClick={() => onOpenChange(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onOpenChange(false)
        }
      }}
    >
      {children}
    </button>
  )
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onImageDelete,
  setCurrentIndex,
  currentIndex,
  images,
  onOpenChange,
  className,
  children,
}) => {
  return (
    <button
      type="button"
      className={cn(className)}
      tabIndex={0}
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
      onKeyDown={(event) => {
        if (event.key === "Delete") {
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
        }
      }}
    >
      {children}
    </button>
  )
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
  className,
  children,
}) => (
  <button
    type="button"
    className={cn(className)}
    onClick={onClick}
    aria-label={`Navigate ${direction}`}
  >
    {children}
  </button>
)

const PaginationDot: React.FC<PaginationDotProps> = ({
  active,
  onClick,
  className,
  activeClassName,
}) => (
  <div
    data-active={active}
    className={cn(className, active && (activeClassName || ""))}
    onClick={onClick}
    onKeyUp={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        onClick()
      }
    }}
    tabIndex={0}
    role="button"
    aria-pressed={active}
  />
)
