import { cn } from "@zenithui/utils"
import { useRef, useState } from "react"
import { useGridCell } from "../context"
import type { GridCell } from "../types"

/**
 * Props for the GridItem component.
 * @template T - The type of the data contained within the cell.
 */
export interface GridItemProps<T> {
  cell: GridCell<T>
  parentRowId: string
  className?: string

  // Custom renders
  renderItem: (
    cell: GridCell<T>,
    helpers: { dragHandleProps: React.HTMLAttributes<HTMLElement> },
  ) => React.ReactNode
  renderDragHandle?: (props: {
    dragHandleProps: React.HTMLAttributes<HTMLElement>
  }) => React.ReactNode
}

/**
 * Internal component representing a single cell in the grid layout.
 * Manages cell-level drag and drop interactions and rendering of the cell content.
 *
 * @template T - The type of the data contained within the cell.
 * @param props - The component props.
 */
export function GridItem<T>({
  cell,
  parentRowId,
  className,
  renderItem,
  renderDragHandle,
}: GridItemProps<T>) {
  const {
    state,
    contextConfig,
    isDragging,
    isDragTarget,
    dragTargetPosition,
    isActive,
    setCellRef,
    handlers,
  } = useGridCell<T>(cell.id)

  const dragTargetRef = useRef<HTMLElement | null>(null)

  const isResizing = state.isResizing

  const [internalDropPos, setInternalDropPos] = useState<
    "left" | "right" | "swap" | null
  >(null)

  const handleDragStart = (e: React.DragEvent) => {
    if (
      dragTargetRef.current &&
      !dragTargetRef.current.closest('[data-grid-drag-handle="true"]')
    ) {
      e.preventDefault()
      return
    }

    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData(
      "application/grid-cell",
      JSON.stringify({ cellId: cell.id, parentRowId }),
    )
    handlers.onDragStart()
  }

  const handleDragOverLocal = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left

    const threshold = rect.width * 0.25
    let position: "left" | "right" | "swap" = "swap"

    if (x < threshold) position = "left"
    else if (x > rect.width - threshold) position = "right"

    setInternalDropPos(position)
    handlers.onDragOver(e, position)
  }

  const handleDragLeaveLocal = () => {
    setInternalDropPos(null)
    handlers.onDragLeave()
  }

  const handleDropLocal = (e: React.DragEvent) => {
    e.preventDefault()
    if (internalDropPos) {
      handlers.onDrop(e, internalDropPos)
    } else {
      handlers.onDrop(e, "swap")
    }
    setInternalDropPos(null)
  }

  const activeDropPos = isDragTarget
    ? dragTargetPosition || internalDropPos
    : null

  return (
    <div
      ref={setCellRef}
      className={cn(
        "group/cell relative h-full",
        "transition-[flex] duration-300 ease-in-out",
        isDragging && "opacity-40",
        isResizing && "pointer-events-none transition-none select-none",
        isActive && "ring-1 ring-blue-500", // Optional: style active cells
        cell.className,
        className,
      )}
      style={{
        flex: cell.width ?? 1,
        minWidth: 0,
      }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOverLocal}
      onDragLeave={handleDragLeaveLocal}
      onDrop={handleDropLocal}
      onDragEnd={handlers.onDragEnd}
      onMouseDown={(e) => {
        dragTargetRef.current = e.target as HTMLElement
      }}
      onClick={handlers.onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handlers.onClick()
        }
      }}
      data-grid-type="cell"
    >
      {/* Drop Zone Highlights */}
      {activeDropPos === "left" && (
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-0">
          {contextConfig?.renderDropZoneOverlay?.("left") ?? (
            <div className="absolute inset-y-0 -left-1 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          )}
        </div>
      )}
      {activeDropPos === "right" && (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-0">
          {contextConfig?.renderDropZoneOverlay?.("right") ?? (
            <div className="absolute inset-y-0 -right-1 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          )}
        </div>
      )}
      {activeDropPos === "swap" && (
        <div className="pointer-events-none absolute inset-0 z-20">
          {contextConfig?.renderDropZoneOverlay?.("swap") ?? (
            <div className="absolute inset-0 rounded-md bg-blue-500/15 ring-2 ring-blue-500 ring-offset-1" />
          )}
        </div>
      )}

      {/* Internal Content */}
      <div className="relative h-full w-full">
        {renderItem(cell, {
          dragHandleProps: {
            "aria-label": "Drag to reorder",
            "data-grid-drag-handle": "true",
          } as React.HTMLAttributes<HTMLElement> & {
            "data-grid-drag-handle": string
          },
        })}
      </div>

      {/* Custom or default drag handle directly rendered by GridItem (if not embedded in renderItem) */}
      <div className="absolute top-2 left-2 z-10 opacity-0 transition-opacity group-hover/cell:opacity-100">
        {renderDragHandle ? (
          renderDragHandle({
            dragHandleProps: {
              "aria-label": "Drag to reorder",
              "data-grid-drag-handle": "true",
              className: "cursor-grab active:cursor-grabbing",
            } as React.HTMLAttributes<HTMLElement> & {
              "data-grid-drag-handle": string
            },
          })
        ) : (
          <div
            className="cursor-grab rounded border border-neutral-200 bg-white/50 p-1 shadow-sm backdrop-blur-sm active:cursor-grabbing"
            data-grid-drag-handle="true"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-500"
              aria-hidden="true"
            >
              <path
                d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM5.5 14C4.67157 14 4 13.3284 4 12.5C4 11.6716 4.67157 11 5.5 11C6.32843 11 7 11.6716 7 12.5C7 13.3284 6.32843 14 5.5 14ZM9.5 6C10.3284 6 11 5.32843 11 4.5C11 3.67157 10.3284 3 9.5 3C8.67157 3 8 3.67157 8 4.5C8 5.32843 8.67157 6 9.5 6ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM5.5 10C4.67157 10 4 9.32843 4 8.5C4 7.67157 4.67157 7 5.5 7C6.32843 7 7 7.67157 7 8.5C7 9.32843 6.32843 10 5.5 10ZM9.5 10C10.3284 10 11 9.32843 11 8.5C11 7.67157 10.3284 7 9.5 7C8.67157 7 8 7.67157 8 8.5C8 9.32843 8.67157 10 9.5 10Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
