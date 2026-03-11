import { useRef, Fragment } from "react"
import { GridItem } from "./GridItem"
import { ColResizeHandle } from "./GridHandlers"
import type { GridRow, GridCell } from "./types"
import { cn } from "@/lib/utils"

export interface GridRowLineProps<T> {
  row: GridRow<T>
  rowIndex: number
  isDragging?: boolean
  isResizing?: boolean
  isDragTarget?: boolean

  // Custom renders
  renderItem: (cell: GridCell<T>) => React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderDragHandle?: (props: { dragHandleProps: any }) => React.ReactNode
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

  onCellRemove?: (cellId: string) => void
  onRowRemove?: (rowId: string) => void

  onColResize: (leftCellId: string, rightCellId: string, deltaX: number) => void
  onColResizeStart?: () => void
  onColResizeEnd?: () => void

  // State
  draggedCellId?: string | null
  dragTargetCellId?: string | null
  dragTargetPosition?: "left" | "right" | "swap" | null
}

export function GridRowLine<T>({
  row,
  isDragging,
  isResizing,
  isDragTarget,
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
  // Removed unused: onCellRemove, onRowRemove, rowIndex
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
        "group/row relative rounded-xl border-2 border-transparent",
        "transition-[height,border-color] duration-300 ease-in-out hover:border-border/50",
        isDragging &&
          "border-primary/50 bg-primary/5 opacity-40 ring-2 ring-primary/30",
        isResizing && "select-none transition-none", // disable animation during drag
        isDragTarget && "bg-primary/5 ring-2 ring-primary ring-offset-2",
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
      {renderRowControls && renderRowControls(row)}

      {/* Row Inner Container */}
      <div
        ref={rowRef}
        className="flex h-full w-full gap-0 overflow-hidden rounded-lg bg-background"
      >
        {row.cells.map((cell, index) => (
          <Fragment key={cell.id}>
            <GridItem
              cell={cell}
              parentRowId={row.id}
              isResizing={isResizing}
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
                onResize={(deltaX) =>
                  handleColResize(cell.id, row.cells[index + 1]!.id, deltaX)
                }
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
