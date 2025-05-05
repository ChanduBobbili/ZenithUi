import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import type {
  CloseButtonProps,
  DeleteButtonProps,
  LightBoxImages,
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
  animationDuration = 500,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  swipeToNavigate = true,
  zoomable = false,
  onImageDelete,
  classNames,
  components,
}: LightBoxProps) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(initialIndex)
  const [touchStart, setTouchStart] = React.useState<number>(0)
  const [touchEnd, setTouchEnd] = React.useState<number>(0)
  const [zoomLevel, setZoomLevel] = React.useState<number>(1)
  const [loadedImages, setLoadedImages] = React.useState<
    Record<number, boolean>
  >({})
  const [errorImages, setErrorImages] = React.useState<Record<number, boolean>>(
    {},
  )

  const imageRefs = React.useRef<(HTMLImageElement | null)[]>([])

  // Initialize loaded state
  React.useEffect(() => {
    const initialLoadState: Record<number, boolean> = {}
    images.forEach((_, index) => {
      initialLoadState[index] = false
    })
    setLoadedImages(initialLoadState)
    imageRefs.current = images.map(() => null)
  }, [images])

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }))
  }

  const handleImageError = (index: number) => {
    setErrorImages((prev) => ({ ...prev, [index]: true }))
  }

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev >= images.length - 1 ? 0 : prev + 1))
    setZoomLevel(1)
  }, [images.length])

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? images.length - 1 : prev - 1))
    setZoomLevel(1)
  }, [images.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (swipeToNavigate) {
      if (touchStart - touchEnd > 50) handleNext()
      if (touchStart - touchEnd < -50) handlePrev()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (closeOnEscape && e.key === "Escape") {
      onOpenChange(false)
    }
    if (e.key === "ArrowLeft") handlePrev()
    if (e.key === "ArrowRight") handleNext()
    if (e.key === "Home") setCurrentIndex(0)
    if (e.key === "End") setCurrentIndex(images.length - 1)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    setZoomLevel(1) // Reset zoom on image change
  }, [currentIndex])

  const handleZoom = (e: React.WheelEvent) => {
    if (!zoomable || animation !== "stretch") return

    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 1), 3)) // Min 1 for stretch
  }

  const getImageUrl = (image: string | { src: string }) =>
    typeof image !== "string" ? image.src : image

  // Improved image rendering with proper loading states
  const renderImage = (image: string | LightBoxImages, index: number) => {
    const imageUrl = typeof image !== "string" ? image.src : image
    return (
      <img
        ref={(el) => {
          if (el) {
            imageRefs.current[index] = el
          }
        }}
        src={imageUrl}
        alt={
          typeof image !== "string"
            ? image.alt || `Image ${index + 1}`
            : `Image ${index + 1}`
        }
        onLoad={() => handleImageLoad(index)}
        onError={() => handleImageError(index)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${zoomLevel})`,
          minWidth: "100%",
          minHeight: "100%",
          objectFit: "cover",
          opacity: loadedImages[index] ? 1 : 0,
          transition: `opacity ${animationDuration}ms ease, transform ${animationDuration}ms ease`,
          willChange: "transform, opacity",
        }}
        className="lightbox-image"
      />
    )
  }

  // Stretch Animation Implementation
  const renderStretchAnimation = () => {
    return (
      <>
        {/* Background fallback for stretch effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -2,
            backgroundImage: `url(${getImageUrl(images[currentIndex])})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: loadedImages[currentIndex] ? 1 : 0,
            transition: `opacity ${animationDuration}ms ease`,
          }}
        />

        {/* Foreground image with zoom */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            opacity: loadedImages[currentIndex] ? 1 : 0,
            transition: `opacity ${animationDuration}ms ease`,
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center center",
          }}
        >
          <img
            ref={(el) => {
              if (el) {
                imageRefs.current[currentIndex] = el
              }
            }}
            src={getImageUrl(images[currentIndex])}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onLoad={() => handleImageLoad(currentIndex)}
          />
        </div>
      </>
    )
  }

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogPrimitive.DialogPortal>
        <DialogPrimitive.Overlay className={cn(classNames?.overLay)} />
        <DialogPrimitive.Content
          onEscapeKeyDown={(e) => {
            if (!closeOnEscape) e.preventDefault()
          }}
          onPointerDownOutside={(e) => {
            if (!closeOnBackdropClick) e.preventDefault()
          }}
          aria-modal="true"
          aria-labelledby={
            typeof images[currentIndex] !== "string"
              ? images[currentIndex]?.caption
              : ""
          }
          aria-describedby={
            typeof images[currentIndex] !== "string"
              ? images[currentIndex]?.captionDescription
              : ""
          }
          className={cn(classNames?.lightBox)}
          data-animation={animation}
          style={
            {
              "--animation-duration": `${animationDuration}ms`,
              ...(animation === "stretch"
                ? {
                    overflow: "hidden",
                  }
                : {}),
            } as React.CSSProperties
          }
          onKeyDown={handleKeyDown}
          onTouchStart={swipeToNavigate ? handleTouchStart : undefined}
          onTouchMove={swipeToNavigate ? handleTouchMove : undefined}
          onTouchEnd={swipeToNavigate ? handleTouchEnd : undefined}
          onWheel={zoomable ? handleZoom : undefined}
        >
          <DialogPrimitive.Title style={{ display: "none" }}>
            Title
          </DialogPrimitive.Title>

          {/* Slide Animation */}
          {animation === "slide" && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                height: "100%",
                width: "100%",
                zIndex: -1,
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: `transform ${animationDuration}ms ease-in-out`,
              }}
            >
              {images.map((image, index) => (
                <div
                  key={`image-slide-${getImageUrl(image)}-${index}`}
                  style={{
                    flex: "0 0 100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {renderImage(image, index)}
                </div>
              ))}
            </div>
          )}

          {/* Fade Animation */}
          {animation === "fade" &&
            images.map((image, index) => (
              <div
                key={`image-fade-${getImageUrl(image)}-${index}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: -1,
                  opacity:
                    currentIndex === index ? (loadedImages[index] ? 1 : 0) : 0,
                  transition: `opacity ${animationDuration}ms ease-in-out`,
                  pointerEvents: currentIndex === index ? "auto" : "none",
                }}
              >
                {renderImage(image, index)}
              </div>
            ))}

          {/* Flip Animation */}
          {animation === "flip" && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                transform: `${
                  currentIndex % 2 === 0 ? "rotateY(180deg)" : "rotateY(0deg)"
                }`,
                transition: `transform ${animationDuration}ms ease-in-out`,
                opacity: loadedImages[currentIndex] ? 1 : 0,
              }}
            >
              {renderImage(images[currentIndex], currentIndex)}
            </div>
          )}

          {/* Blur Animation */}
          {animation === "blur" &&
            images.map((image, index) => (
              <div
                key={`image-blur-${getImageUrl(image)}-${index}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: -1,
                  filter: currentIndex === index ? "blur(0)" : "blur(10px)",
                  transition: `filter ${animationDuration}ms ease-in-out, opacity ${animationDuration}ms ease-in-out`,
                  opacity:
                    currentIndex === index ? (loadedImages[index] ? 1 : 0) : 0,
                  pointerEvents: currentIndex === index ? "auto" : "none",
                }}
              >
                {renderImage(image, index)}
              </div>
            ))}

          {animation === "stretch" && renderStretchAnimation()}

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
                onClick={handlePrev}
                className={cn(
                  classNames?.navigateButton,
                  classNames?.navigateButtonLeft,
                )}
              />
            ) : (
              <NavigationButton
                direction="left"
                onClick={handlePrev}
                className={cn(
                  classNames?.navigateButton,
                  classNames?.navigateButtonLeft,
                )}
              >
                {components?.NavigationButtonLeftIcon}
              </NavigationButton>
            )}

            {/* Next Button */}
            {components?.NavigationButtonRight ? (
              <components.NavigationButtonRight
                direction="right"
                onClick={handleNext}
                className={cn(
                  classNames?.navigateButton,
                  classNames?.navigateButtonRight,
                )}
              />
            ) : (
              <NavigationButton
                direction="right"
                onClick={handleNext}
                className={cn(
                  classNames?.navigateButton,
                  classNames?.navigateButtonRight,
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
                className={cn(classNames?.captionContainer)}
              >
                <span className={cn(classNames?.caption)}>
                  {(typeof images[currentIndex] !== "string" &&
                    images[currentIndex].caption) ??
                    ""}
                </span>
                <span className={cn(classNames?.captionDescription)}>
                  {(typeof images[currentIndex] !== "string" &&
                    images[currentIndex].captionDescription) ??
                    ""}
                </span>
              </div>
            )}
            {showPagination && (
              <div className={cn(classNames?.pagination)}>
                {Array.from({ length: images.length }).map((_, index) => (
                  <PaginationDot
                    key={`pagination-${index.toString()}`}
                    active={currentIndex === index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setZoomLevel(1)
                    }}
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

const CloseButton = React.memo(
  ({ onOpenChange, className, children }: CloseButtonProps) => {
    return (
      <button
        type="button"
        className={cn(className)}
        onClick={() => onOpenChange(false)}
      >
        {children}
      </button>
    )
  },
)

const DeleteButton = React.memo(
  ({
    currentIndex,
    images,
    onOpenChange,
    setCurrentIndex,
    className,
    onImageDelete,
    children,
  }: DeleteButtonProps) => {
    const handleDelete = React.useCallback(() => {
      if (onImageDelete) {
        onImageDelete(currentIndex)
        if (images.length === 1) {
          onOpenChange(false)
        } else if (currentIndex === images.length - 1) {
          setCurrentIndex(currentIndex - 1)
        }
      }
    }, [
      currentIndex,
      images.length,
      onImageDelete,
      onOpenChange,
      setCurrentIndex,
    ])
    return (
      <button
        type="button"
        className={cn(className)}
        tabIndex={0}
        onClick={handleDelete}
        aria-label="Delete current image"
      >
        {children}
      </button>
    )
  },
)

const NavigationButton = React.memo(
  ({ direction, onClick, className, children }: NavigationButtonProps) => {
    return (
      <button
        type="button"
        className={cn(className)}
        onClick={onClick}
        aria-label={`Navigate ${direction}`}
      >
        {children}
      </button>
    )
  },
)

const PaginationDot = React.memo(
  ({ active, onClick, activeClassName, className }: PaginationDotProps) => {
    return (
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
        aria-label={`Go to image ${active ? "(current)" : ""}`}
      />
    )
  },
)
