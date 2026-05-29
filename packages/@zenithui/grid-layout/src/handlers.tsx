import { cn } from '@zenithui/utils'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

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
  const indicatorY = useMotionValue(0)
  const indicatorYSpring = useSpring(indicatorY, {
    stiffness: 300,
    damping: 30,
  })

  useEffect(() => {
    onResizeRef.current = onResize
    onResizeStartRef.current = onResizeStart
    onResizeEndRef.current = onResizeEnd
  }, [onResize, onResizeStart, onResizeEnd])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    startXRef.current = e.clientX
    setIsDragging(true)
    onResizeStartRef.current?.()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const relativeY = e.clientY - rect.top
    const clamped =
      Math.max(10, Math.min(rect.height - 10, relativeY || rect.height / 2)) -
      rect.height / 2
    indicatorY.set(clamped)
  }

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault()
      const deltaX = moveEvent.clientX - startXRef.current
      startXRef.current = moveEvent.clientX
      onResizeRef.current(deltaX)
    }

    const onMouseUp = () => {
      setIsDragging(false)
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      onResizeEndRef.current?.()
    }
  }, [isDragging])

  return (
    <motion.div
      className={cn(
        'group/col-handle relative z-10 flex w-4 shrink-0 cursor-col-resize items-center justify-center',
        'opacity-0 transition-colors group-hover/grid:opacity-100 hover:opacity-100 active:opacity-100',
        className,
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      {children ? (
        children
      ) : (
        <div className='bg-primary/20 relative flex h-full w-2 items-center justify-center rounded-full'>
          <motion.div
            className='bg-primary absolute left-1/2 h-10 w-2 -translate-x-1/2 rounded-full shadow-sm'
            style={{ y: indicatorYSpring, scale: isDragging ? 1.2 : 1 }}
            transition={{
              scale: {
                damping: 500,
                stiffness: 500,
                ease: 'easeInOut',
                duration: 1,
              },
            }}
          />
        </div>
      )}
    </motion.div>
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
  const indicatorX = useMotionValue(0)
  const indicatorXSpring = useSpring(indicatorX, {
    stiffness: 300,
    damping: 30,
  })

  useEffect(() => {
    onResizeRef.current = onResize
    onResizeStartRef.current = onResizeStart
    onResizeEndRef.current = onResizeEnd
  }, [onResize, onResizeStart, onResizeEnd])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    startYRef.current = e.clientY
    setIsDragging(true)
    onResizeStartRef.current?.()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const relativeX = e.clientX - rect.left
    const clamped =
      Math.max(10, Math.min(rect.width - 10, relativeX || rect.width / 2)) -
      rect.width / 2
    indicatorX.set(clamped)
  }

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault()
      const deltaY = moveEvent.clientY - startYRef.current
      startYRef.current = moveEvent.clientY
      onResizeRef.current(deltaY)
    }

    const onMouseUp = () => {
      setIsDragging(false)
    }

    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      onResizeEndRef.current?.()
    }
  }, [isDragging])

  return (
    <motion.div
      className={cn(
        'group/row-handle relative z-10 flex h-4 cursor-row-resize items-center justify-center',
        'opacity-0 transition-colors group-hover/grid:opacity-100 hover:opacity-100 active:opacity-100',
        className,
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      {children ? (
        children
      ) : (
        <div className='bg-primary/20 relative flex h-2 w-full items-center justify-center rounded-full'>
          <motion.div
            className='bg-primary absolute top-1/2 h-2 w-10 -translate-y-1/2 rounded-full shadow-sm'
            style={{ x: indicatorXSpring, scale: isDragging ? 1.2 : 1 }}
            transition={{
              scale: {
                damping: 500,
                stiffness: 500,
                ease: 'easeInOut',
                duration: 1,
              },
            }}
          />
        </div>
      )}
    </motion.div>
  )
}
