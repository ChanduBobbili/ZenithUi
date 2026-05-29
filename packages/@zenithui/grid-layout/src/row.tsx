import { cn } from "@zenithui/utils"
import { Fragment, useRef } from "react"
import { GridItem } from "./cell"
import { ColResizeHandle } from "./handlers"
import type { GridCell, GridRow } from "./types"

export interface GridRowLineProps<T> {
  row: GridRow<T>
  rowIndex: number
  isDragging?: boolean
  isResizing?: boolean
  isColResizingRow?: boolean
  isDragTarget?: boolean
  showDragHandle?: boolean

  renderItem: (cell: GridCell<T>) => React.ReactNode
  renderDragHandle?: (props: {
    dragHandleProps: React.HTMLAttributes<HTMLButtonElement>
  }) => React.ReactNode
  renderRowControls?: (row: GridRow<T>) => React.ReactNode
  renderColResizeHandle?: React.ReactNode

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

  draggedCellId?: string | null
  dragTargetCellId?: string | null
  dragTargetPosition?: "left" | "right" | "swap" | null
  readonly?: boolean
  /** Horizontal gap between cells in pixels. Default 0. */
  columnGapPx?: number
}

export function GridRowLine<T>({
  row,
  isDragging,
  isResizing,
  isColResizingRow,
  isDragTarget,
  showDragHandle,
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
  draggedCellId,
  readonly = false,
  columnGapPx = 0,
}: GridRowLineProps<T>) {
  const rowRef = useRef<HTMLDivElement>(null)
  const rowReorderable = row.reorderable !== false

  const handleRowDragStart = (e: React.DragEvent) => {
    if (!rowReorderable || readonly) return
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
        "group/row relative rounded-xl",
        "transition-[height] duration-300 ease-in-out",
        isDragging &&
          "border-primary/50 bg-primary/5 ring-primary/30 opacity-40 ring-2",
        isResizing && "transition-none select-none",
        isDragTarget && "bg-primary/5 ring-primary ring-2 ring-offset-2",
      )}
      style={{ height: row.height ?? 280 }}
      data-grid-type="row"
      draggable={rowReorderable && !readonly}
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
      {renderRowControls && renderRowControls(row)}

      <div
        ref={rowRef}
        className="relative flex h-full w-full rounded-lg"
        style={{ columnGap: columnGapPx }}
      >
        {/* 12-column snap guides shown while column-resizing */}
        {isColResizingRow && (
          <div className="pointer-events-none absolute inset-0 z-0">
            {Array.from({ length: 11 }).map((_, index) => {
              const left = `${((index + 1) / 12) * 100}%`
              return (
                <Fragment key={`column-guide-${index}`}>
                  <div
                    className="bg-primary/50 absolute -top-2 h-2 w-2 -translate-x-1/2 rounded-full"
                    style={{ left }}
                  />
                  <div
                    className="bg-primary/50 absolute -bottom-2 h-2 w-2 -translate-x-1/2 rounded-full"
                    style={{ left }}
                  />
                </Fragment>
              )
            })}
          </div>
        )}

        {row.cells.map((cell, index) => {
          const right = row.cells[index + 1]
          const showColResize =
            !readonly &&
            index < row.cells.length - 1 &&
            right &&
            cell.resizable !== false &&
            right.resizable !== false

          return (
            <Fragment key={cell.id}>
              <GridItem
                cell={cell}
                parentRowId={row.id}
                isDragging={draggedCellId === cell.id}
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
                showDragHandle={showDragHandle}
                reorderable={!readonly && cell.reorderable !== false}
              />

              {showColResize && (
                <ColResizeHandle
                  onResize={(deltaX) =>
                    handleColResize(cell.id, right!.id, deltaX)
                  }
                  onResizeStart={onColResizeStart}
                  onResizeEnd={onColResizeEnd}
                >
                  {renderColResizeHandle}
                </ColResizeHandle>
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
