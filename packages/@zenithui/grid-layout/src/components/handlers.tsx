import { cn } from "@zenithui/utils"
import { useEffect, useRef, useState } from "react"

/**
 * Props for resize handle components.
 */
export interface ResizeHandleProps {
  onResize: (delta: number) => void
  onResizeStart?: () => void
  onResizeEnd?: () => void
  children?: React.ReactNode
  className?: string
}

/**
 * A handle component used to resize columns (cells horizontally).
 * Renders an invisible draggable area that triggers resize callbacks on drag.
 *
 * @param props - The component props.
 */
export function ColResizeHandle({
  onResize,
  onResizeStart,
  onResizeEnd,
  children,
  className,
}: ResizeHandleProps) {
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const onResizeRef = useRef(onResize)
  const onResizeStartRef = useRef(onResizeStart)
  const onResizeEndRef = useRef(onResizeEnd)

  useEffect(() => {
    onResizeRef.current = onResize
    onResizeStartRef.current = onResizeStart
    onResizeEndRef.current = onResizeEnd
  }, [onResize, onResizeStart, onResizeEnd])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    startXRef.current = e.clientX
    onResizeStartRef.current?.()

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault()
      const deltaX = moveEvent.clientX - startXRef.current
      startXRef.current = moveEvent.clientX
      onResizeRef.current(deltaX)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
      onResizeEndRef.current?.()
    }

    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div
      className={cn(
        "group/col-handle relative z-10 flex w-3 shrink-0 cursor-col-resize items-center justify-center transition-colors",
        className,
      )}
      onMouseDown={handleMouseDown}
    >
      {children ? (
        children
      ) : (
        <>
          <div
            className={cn(
              "absolute inset-y-2 left-1/2 w-0.5 -translate-x-1/2 rounded-full",
              "transition-colors group-hover/col-handle:bg-neutral-300",
              isDragging && "bg-neutral-400",
            )}
          />
          <div
            className={cn(
              "z-10 flex flex-col gap-1 opacity-0 transition-opacity group-hover/col-handle:opacity-100",
              isDragging && "opacity-100",
            )}
          >
            <div className="h-1 w-1 rounded-full bg-neutral-400/50" />
            <div className="h-1 w-1 rounded-full bg-neutral-400/50" />
            <div className="h-1 w-1 rounded-full bg-neutral-400/50" />
          </div>
        </>
      )}
    </div>
  )
}

/**
 * A handle component used to resize rows (vertically).
 * Renders an invisible draggable area that triggers resize callbacks on drag.
 *
 * @param props - The component props.
 */
export function RowResizeHandle({
  onResize,
  onResizeStart,
  onResizeEnd,
  children,
  className,
}: ResizeHandleProps) {
  const [isDragging, setIsDragging] = useState(false)
  const startYRef = useRef(0)
  const onResizeRef = useRef(onResize)
  const onResizeStartRef = useRef(onResizeStart)
  const onResizeEndRef = useRef(onResizeEnd)

  useEffect(() => {
    onResizeRef.current = onResize
    onResizeStartRef.current = onResizeStart
    onResizeEndRef.current = onResizeEnd
  }, [onResize, onResizeStart, onResizeEnd])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    startYRef.current = e.clientY
    onResizeStartRef.current?.()

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault()
      const deltaY = moveEvent.clientY - startYRef.current
      startYRef.current = moveEvent.clientY
      onResizeRef.current(deltaY)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
      onResizeEndRef.current?.()
    }

    document.body.style.cursor = "row-resize"
    document.body.style.userSelect = "none"
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div
      className={cn(
        "group/row-handle relative flex h-3 cursor-row-resize items-center justify-center transition-colors",
        className,
      )}
      onMouseDown={handleMouseDown}
    >
      {children ? (
        children
      ) : (
        <>
          <div
            className={cn(
              "absolute inset-x-4 top-1/2 h-0.5 -translate-y-1/2 rounded-full",
              "transition-colors group-hover/row-handle:bg-neutral-300",
              isDragging && "bg-neutral-400",
            )}
          />
          <div
            className={cn(
              "z-10 flex gap-1 opacity-0 transition-opacity group-hover/row-handle:opacity-100",
              isDragging && "opacity-100",
            )}
          >
            <div className="h-1 w-1 rounded-full bg-neutral-400/50" />
            <div className="h-1 w-1 rounded-full bg-neutral-400/50" />
            <div className="h-1 w-1 rounded-full bg-neutral-400/50" />
          </div>
        </>
      )}
    </div>
  )
}
