import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface ResizeHandleProps {
  onResize: (delta: number) => void
  onResizeStart?: () => void
  onResizeEnd?: () => void
  children?: React.ReactNode
  className?: string
}

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
        "group/col-handle relative z-10 flex w-3 shrink-0 cursor-col-resize items-center justify-center",
        "opacity-0 transition-colors hover:bg-primary/5 hover:opacity-100 active:opacity-100",
        isDragging && "bg-primary/10",
        className,
      )}
      onMouseDown={handleMouseDown}
    >
      {/* If children provided, use that as custom handle. Otherwise, default grip */}
      {children ? (
        children
      ) : (
        <>
          <div
            className={cn(
              "absolute inset-y-2 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-border",
              "transition-colors group-hover/col-handle:bg-primary/50",
              isDragging && "bg-primary",
            )}
          />
          <div
            className={cn(
              "z-10 flex flex-col gap-1 opacity-0 transition-opacity group-hover/col-handle:opacity-100",
              isDragging && "opacity-100",
            )}
          >
            <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          </div>
        </>
      )}
    </div>
  )
}

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
        "group/row-handle relative flex h-3 cursor-row-resize items-center justify-center",
        "opacity-0 transition-colors hover:bg-primary/5 hover:opacity-100 active:opacity-100",
        isDragging && "bg-primary/10",
        className,
      )}
      onMouseDown={handleMouseDown}
    >
      {/* If children provided, use that as custom handle. Otherwise, default grip */}
      {children ? (
        children
      ) : (
        <>
          <div
            className={cn(
              "absolute inset-x-4 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-border",
              "transition-colors group-hover/row-handle:bg-primary/50",
              isDragging && "bg-primary",
            )}
          />
          <div
            className={cn(
              "z-10 flex gap-1 opacity-0 transition-opacity group-hover/row-handle:opacity-100",
              isDragging && "opacity-100",
            )}
          >
            <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          </div>
        </>
      )}
    </div>
  )
}
