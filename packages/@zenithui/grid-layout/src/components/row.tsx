import { cn } from "@zenithui/utils"
import { Fragment, useRef } from "react"
import type { GridCell, GridRow } from "../types"
import { GridItem } from "./cell"
import { ColResizeHandle } from "./handlers"

/**
 * Props for the GridRowLine component.
 * @template T - The type of the data contained within the cells.
 */
export interface GridRowLineProps<T> {
  row: GridRow<T>
  rowIndex: number
  isDragging?: boolean
  isResizing?: boolean
  isDragTarget?: boolean
  className?: string
  cellClassName?: string | ((cell: GridCell<T>) => string)

  // Custom renders
  renderItem: (cell: GridCell<T>) => React.ReactNode
  renderDragHandle?: (props: {
    dragHandleProps: React.HTMLAttributes<HTMLElement>
  }) => React.ReactNode
  renderRowControls?: (row: GridRow<T>) => React.ReactNode
  renderRowResizeHandle?: React.ReactNode
  renderColResizeHandle?: React.ReactNode

  // Handlers
  onRowDragStart: (rowId: string) => void
  onRowDragOver: (e: React.DragEvent, targetId: string) => void
  onRowDrop: (e: React.DragEvent, targetId: string) => void
  onRowDragEnd: () => void
  onRowDragLeave: () => void

  onCellDragStart: (cellId: string, parentRowId: string) => void
  onCellDragOver: (
    e: React.DragEvent,
    targetId: string,
    position: "left" | "right" | "swap",
  ) => void
  onCellDrop: (
    e: React.DragEvent,
    targetId: string,
    position: "left" | "right" | "swap",
  ) => void
  onCellDragEnd: () => void
  onCellDragLeave: () => void

  onColResize: (leftCellId: string, rightCellId: string, deltaX: number) => void
  onColResizeStart?: () => void
  onColResizeEnd?: () => void

  // State
  draggedCellId?: string | null
  dragTargetCellId?: string | null
  dragTargetPosition?: "left" | "right" | "swap" | null
}

/**
 * Internal component representing a single row in the grid layout.
 * Handles row-level drag and drop, as well as resizing of its constituent cells.
 *
 * @template T - The type of the data contained within the cells.
 * @param props - The component props.
 */
export function GridRowLine<T>({
  row,
  isDragging,
  isResizing,
  isDragTarget,
  className,
  cellClassName,
  renderItem,
  renderDragHandle,
  renderRowControls,
  renderColResizeHandle,
  onRowDragStart,
  onRowDragOver,
  onRowDrop,
  onRowDragEnd,
  onRowDragLeave,
  onCellDragStart,
  onCellDragOver,
  onCellDrop,
  onCellDragEnd,
  onCellDragLeave,
  onColResize,
  onColResizeStart,
  onColResizeEnd,
  dragTargetCellId,
  dragTargetPosition,
}: GridRowLineProps<T>) {
  const rowRef = useRef<HTMLDivElement>(null)

  const handleRowDragStart = (e: React.DragEvent) => {
    // Only drag the row itself if we aren't dragging a cell
    if ((e.target as HTMLElement).closest('[data-grid-type="cell"]')) return
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData(
      "application/grid-row",
      JSON.stringify({ rowId: row.id }),
    )
    onRowDragStart(row.id)
  }

  const handleColResize = (
    leftCellId: string,
    rightCellId: string,
    deltaX: number,
  ) => {
    if (!rowRef.current) return
    const rowWidth = rowRef.current.offsetWidth
    if (rowWidth === 0) return
    const deltaPercent = (deltaX / rowWidth) * 100
    onColResize(leftCellId, rightCellId, deltaPercent)
  }

  return (
    <div
      className={cn(
        "group/row relative",
        "transition-[height] duration-300 ease-in-out",
        isDragging && "opacity-40 ring-2 ring-blue-500/30",
        isResizing && "transition-none select-none", // disable animation during drag
        isDragTarget && "ring-2 ring-blue-500 ring-offset-2",
        row.className,
        className,
      )}
      style={{
        height: row.height ?? 280,
      }}
      data-grid-type="row"
      draggable
      onDragStart={handleRowDragStart}
      onDragOver={(e) => {
        const target = e.target as HTMLElement
        if (!target.closest('[data-grid-type="cell"]')) {
          e.preventDefault()
          onRowDragOver(e, row.id)
        }
      }}
      onDragLeave={(e) => {
        const target = e.target as HTMLElement
        if (!target.closest('[data-grid-type="cell"]')) {
          onRowDragLeave()
        }
      }}
      onDrop={(e) => {
        const target = e.target as HTMLElement
        if (!target.closest('[data-grid-type="cell"]')) {
          e.preventDefault()
          onRowDrop(e, row.id)
        }
      }}
      onDragEnd={onRowDragEnd}
    >
      {/* Row Controls - Absolute positioned to the left (provided by user) */}
      {renderRowControls?.(row)}

      {/* Row Inner Container */}
      <div
        ref={rowRef}
        className="flex h-full w-full gap-0 overflow-hidden"
      >
        {row.cells.map((cell, index) => (
          <Fragment key={cell.id}>
            <GridItem
              cell={cell}
              parentRowId={row.id}
              isResizing={isResizing}
              className={
                typeof cellClassName === "function"
                  ? cellClassName(cell)
                  : cellClassName
              }
              isDragTarget={dragTargetCellId === cell.id}
              dragTargetPosition={
                dragTargetCellId === cell.id ? dragTargetPosition : null
              }
              renderItem={renderItem}
              renderDragHandle={renderDragHandle}
              onDragStart={onCellDragStart}
              onDragOver={onCellDragOver}
              onDrop={onCellDrop}
              onDragEnd={onCellDragEnd}
              onDragLeave={onCellDragLeave}
            />

            {/* Column Resize Handle */}
            {index < row.cells.length - 1 && row.cells[index + 1] && (
              <ColResizeHandle
                onResize={(deltaX) => {
                  const nextCell = row.cells[index + 1]
                  if (nextCell) {
                    handleColResize(cell.id, nextCell.id, deltaX)
                  }
                }}
                onResizeStart={onColResizeStart}
                onResizeEnd={onColResizeEnd}
              >
                {renderColResizeHandle}
              </ColResizeHandle>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
