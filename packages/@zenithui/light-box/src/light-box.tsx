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
import { useGesture } from "react-use-gesture"

const EPSILON = 0.01

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
  zoomable = false,
  maxZoom = 4,
  minZoom = 1,
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

  const [zoom, setZoom] = React.useState(1)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

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

  // Reset zoom when image changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: Running on every image change
  React.useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [currentIndex])

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

  // Calculate boundaries with proper edge handling
  const calculateBounds = React.useCallback(() => {
    if (!containerRef.current || !contentRef.current)
      return {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
      }

    const container = containerRef.current.getBoundingClientRect()
    const content = contentRef.current.getBoundingClientRect()

    const scaledWidth = content.width * zoom
    const scaledHeight = content.height * zoom

    const maxX = Math.max(0, (scaledWidth - container.width) / 2)
    const maxY = Math.max(0, (scaledHeight - container.height) / 2)

    return {
      minX: -maxX,
      maxX,
      minY: -maxY,
      maxY,
    }
  }, [zoom])

  // Constrain position to keep image edges visible
  const constrainPosition = React.useCallback(
    (x: number, y: number) => {
      const { minX, maxX, minY, maxY } = calculateBounds()
      return {
        x: Math.min(Math.max(x, minX), maxX),
        y: Math.min(Math.max(y, minY), maxY),
      }
    },
    [calculateBounds],
  )

  // Enhanced gesture handlers with perfect edge handling
  const bind = useGesture(
    {
      onDrag: ({ movement: [mx, my], memo, event }) => {
        if (!zoomable || zoom <= 1) return
        event?.preventDefault()

        if (!memo) {
          // On first drag event, store the initial position
          memo = position
        }

        const newX = memo.x + mx
        const newY = memo.y + my

        const constrained = constrainPosition(newX, newY)
        setPosition(constrained)
        setIsDragging(true)

        // Update cursor immediately
        if (containerRef.current) {
          containerRef.current.style.cursor = "grabbing"
        }
        // important: return memo so it persists through the drag
        return memo
      },
      onDragEnd: ({ swipe: [swipeX], direction: [dirX], velocity: vx }) => {
        setIsDragging(false)

        if (["smallMobile", "largeMobile"].includes(deviceType)) {
          if (!swipeToNavigate || zoom > 1) return
          if (Math.abs(swipeX) === 1 && vx > 0.3) {
            if (dirX < 0) {
              handleNext()
            } else if (dirX > 0) {
              handlePrev()
            }
          }
        }
      },
      onPinch: ({ origin, movement: [d], da: [distance], memo, event }) => {
        if (!zoomable || !containerRef.current) return
        event.preventDefault()

        const rect = containerRef.current.getBoundingClientRect()

        // Get the center of the pinch relative to the container
        const [ox, oy] = origin
        const localX = ox - rect.left - position.x
        const localY = oy - rect.top - position.y

        const delta = distance - (memo?.lastDistance ?? distance)
        const zoomDelta = delta * 0.01 // adjust sensitivity here

        const newZoom = Math.min(Math.max(zoom + zoomDelta, minZoom), maxZoom)
        const zoomChange = newZoom / zoom

        // Adjust position so the pinch point remains under fingers
        const newX = position.x - localX * (zoomChange - 1)
        const newY = position.y - localY * (zoomChange - 1)

        const constrained = constrainPosition(newX, newY)
        setZoom(newZoom)
        setPosition(constrained)

        return { lastDistance: distance } // store for next event
      },
      onWheel: ({ event, delta: [dx, dy] }) => {
        if (!zoomable || !containerRef.current) return

        // Block zooming out if already at or below minZoom and scrolling down
        if (zoom <= minZoom && dy >= 0) {
          // Re-constrain position after zoom to avoid background leak
          const constrained = constrainPosition(position.x, position.y)
          setPosition(constrained)
          return
        }

        const delta = dy > 0 ? -0.1 : 0.1
        let proposedZoom = zoom + delta

        // Clamp and round to avoid float drift
        proposedZoom =
          Math.round(Math.min(Math.max(proposedZoom, minZoom), maxZoom) * 100) /
          100

        if (proposedZoom <= minZoom) {
          setZoom(minZoom)
          // Re-constrain position after zoom to avoid background leak
          const constrained = constrainPosition(position.x, position.y)
          setPosition(constrained)
          return
        }

        // If zoom doesn't actually change, skip updates
        if (Math.abs(proposedZoom - zoom) < EPSILON) return

        const rect = containerRef.current.getBoundingClientRect()

        // Correct reference point: relative to untransformed image
        const pointX = (event.clientX - rect.left - position.x) / zoom
        const pointY = (event.clientY - rect.top - position.y) / zoom

        const zoomChange = proposedZoom / zoom

        // Calculate new position to keep pointer under cursor
        const newX = position.x - pointX * (zoomChange - 1)
        const newY = position.y - pointY * (zoomChange - 1)

        const constrained = constrainPosition(newX, newY)
        setPosition(constrained)
        setZoom(proposedZoom)
      },
      onDoubleClick: ({ event }) => {
        if (!zoomable) return
        event.preventDefault()
        setZoom(1)
        setPosition({ x: 0, y: 0 })
      },
    },
    {
      drag: {
        filterTaps: true,
        bounds: () => {
          const { minX, maxX, minY, maxY } = calculateBounds()
          return { left: minX, right: maxX, top: minY, bottom: maxY }
        },
        rubberband: 0.2,
      },
      pinch: {
        distanceBounds: { min: minZoom, max: maxZoom },
        rubberband: 0.2,
      },
      wheel: {
        rubberband: 0.2,
      },
      eventOptions: {
        passive: true,
      },
    },
  )

  React.useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.style.cursor = zoom > minZoom ? "grab" : "auto"
    const preventTouchScroll = (e: TouchEvent) => {
      if (zoom > 1) e.preventDefault()
    }
    if (["smallMobile", "largeMobile"].includes(deviceType)) {
      containerRef.current.addEventListener("touchmove", preventTouchScroll, {
        passive: false,
      })
    }
    return () => {
      containerRef.current?.removeEventListener("touchmove", preventTouchScroll)
    }
  }, [zoom, minZoom, deviceType])

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
        ref={index === currentIndex ? contentRef : null}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          touchAction: zoomable ? "none" : undefined,
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
            width: "100%",
            height: "100%",
            transform: zoomable
              ? `translate(${position.x}px, ${position.y}px) scale(${zoom})`
              : undefined,
            transition: isDragging
              ? "none"
              : `transform ${animationDuration}ms ease-out`,
            opacity: !isLoading && !hasError ? 1 : 0,
            willChange: "transform, opacity",
            pointerEvents: "none",
            userSelect: "none",
            touchAction: "none",
            MozUserSelect: "none",
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
          ref={containerRef}
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
          {...(zoomable ? bind() : {})}
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
