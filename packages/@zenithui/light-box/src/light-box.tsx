import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn, useDeviceType } from "@zenithui/utils"
import * as React from "react"
import type {
  CloseButtonProps,
  DeleteButtonProps,
  LightBoxImages,
  LightBoxProps,
  NavigationButtonProps,
  PaginationDotProps,
} from "./types"

const LoadingSpinner = () => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40px",
      height: "40px",
      border: "3px solid rgba(255,255,255,0.3)",
      borderRadius: "50%",
      borderTopColor: "#fff",
      animation: "spin 1s ease-in-out infinite",
    }}
  />
)

const ErrorIcon = () => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      textAlign: "center",
      padding: "1rem",
      backgroundColor: "rgba(255,0,0,0.3)",
      borderRadius: "4px",
    }}
  >
    <div style={{ fontSize: "2rem" }}>⚠️</div>
    <div>Failed to load image</div>
  </div>
)

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
  onImageDelete,
  classNames,
  components,
}: LightBoxProps) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(initialIndex)

  const [loadedImages, setLoadedImages] = React.useState<
    Record<number, boolean>
  >({})
  const [erroredImages, setErroredImages] = React.useState<
    Record<number, boolean>
  >({})
  const [touchStart, setTouchStart] = React.useState<number>(0)
  const [touchEnd, setTouchEnd] = React.useState<number>(0)

  const deviceType = useDeviceType()

  // Initialize states
  React.useEffect(() => {
    const initialLoadState: Record<number, boolean> = {}
    const initialErrorState: Record<number, boolean> = {}
    images.forEach((_, index) => {
      initialLoadState[index] = false
      initialErrorState[index] = false
    })
    setLoadedImages(initialLoadState)
    setErroredImages(initialErrorState)
  }, [images])

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }))
  }

  const handleImageError = (index: number) => {
    setErroredImages((prev) => ({ ...prev, [index]: true }))
  }

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev >= images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const getImageUrl = (image: string | LightBoxImages) =>
    typeof image !== "string" ? image.src : image

  const renderImageWithStates = (
    image: string | LightBoxImages,
    index: number,
  ) => {
    const imageUrl = getImageUrl(image)
    const isLoading = !loadedImages[index] && !erroredImages[index]
    const hasError = erroredImages[index]

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={imageUrl}
          alt=""
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            objectFit: "cover",
            transform: "translate(0%, 0%) scale(1)",
            maxWidth: "unset",
            maxHeight: "unset",
            width: "100%",
            height: "100%",
            opacity: !isLoading && !hasError ? 1 : 0,
            pointerEvents: "none", // avoids image interfering with dragging
            userSelect: "none", // avoids text selection
            willChange: "transform, opacity",
            // objectPosition: "center",
          }}
          onLoad={() => handleImageLoad(index)}
          onError={() => handleImageError(index)}
        />

        {isLoading && <LoadingSpinner />}
        {hasError && <ErrorIcon />}
      </div>
    )
  }

  const renderSlideAnimation = () => (
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
          key={`slide-${index.toString()}`}
          style={{
            flex: "0 0 100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {renderImageWithStates(image, index)}
        </div>
      ))}
    </div>
  )

  const renderFadeAnimation = () => (
    <>
      {images.map((image, index) => (
        <div
          key={`fade-${index.toString()}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            opacity: currentIndex === index ? 1 : 0,
            transition: `opacity ${animationDuration}ms ease-in-out`,
            pointerEvents: currentIndex === index ? "auto" : "none",
          }}
        >
          {renderImageWithStates(image, index)}
        </div>
      ))}
    </>
  )

  const renderFlipAnimation = () => (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        transform: `${currentIndex % 2 === 0 ? "rotateY(180deg)" : "rotateY(0deg)"}`,
        transition: `transform ${animationDuration}ms ease-in-out`,
      }}
    >
      {renderImageWithStates(images[currentIndex], currentIndex)}
    </div>
  )

  const renderBlurAnimation = () => (
    <>
      {images.map((image, index) => (
        <div
          key={`blur-${index.toString()}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            filter: currentIndex === index ? "blur(0)" : "blur(10px)",
            transition: `filter ${animationDuration}ms ease-in-out, opacity ${animationDuration}ms ease-in-out`,
            opacity: currentIndex === index ? 1 : 0,
            pointerEvents: currentIndex === index ? "auto" : "none",
          }}
        >
          {renderImageWithStates(image, index)}
        </div>
      ))}
    </>
  )

  const renderStretchAnimation = () => (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundImage: `url(${getImageUrl(images[currentIndex])})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {renderImageWithStates(images[currentIndex], currentIndex)}
    </div>
  )

  const renderAnimation = () => {
    switch (animation) {
      case "slide":
        return renderSlideAnimation()
      case "fade":
        return renderFadeAnimation()
      case "flip":
        return renderFlipAnimation()
      case "blur":
        return renderBlurAnimation()
      case "stretch":
        return renderStretchAnimation()
      default:
        return renderSlideAnimation()
    }
  }

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogPrimitive.DialogPortal>
        <style>{`
          @keyframes spin {
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}</style>
        <DialogPrimitive.Overlay className={cn(classNames?.overLay)} />
        <DialogPrimitive.Content
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
          onEscapeKeyDown={(e) => {
            if (!closeOnEscape) e.preventDefault()
          }}
          onPointerDownOutside={(e) => {
            if (!closeOnBackdropClick) e.preventDefault()
          }}
          aria-modal="true"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-description"
          className={cn(classNames?.lightBox)}
          data-animation={animation}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (closeOnEscape && e.key === "Escape") {
              onOpenChange(false)
            }
            if (e.key === "ArrowLeft") handlePrev()
            if (e.key === "ArrowRight") handleNext()
            if (e.key === "Home") setCurrentIndex(0)
            if (e.key === "End") setCurrentIndex(images.length - 1)
          }}
          {...(["smallMobile", "largeMobile"].includes(deviceType) && {
            onTouchStart: swipeToNavigate
              ? (e) => setTouchStart(e.touches[0].clientX)
              : undefined,
            onTouchMove: swipeToNavigate
              ? (e) => setTouchEnd(e.touches[0].clientX)
              : undefined,
            onTouchEnd: swipeToNavigate
              ? () => {
                  if (swipeToNavigate) {
                    if (touchStart - touchEnd > 50) handleNext()
                    if (touchStart - touchEnd < -50) handlePrev()
                  }
                }
              : undefined,
          })}
        >
          <DialogPrimitive.Title style={{ display: "none" }}>
            Title
          </DialogPrimitive.Title>

          {renderAnimation()}

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
