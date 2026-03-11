import { cn } from "@zenithui/utils"
import { Fragment } from "react"
import { useGridRow } from "../context"
import type { GridCell, GridRow } from "../types"
import { GridItem } from "./cell"
import { ColResizeHandle } from "./handlers"

/**
 * Props for the GridRowLine component.
 * @template T - The type of the data contained within the cells.
 */
export interface GridRowLineProps<T> {
  row: GridRow<T>
  className?: string
  cellClassName?: string | ((cell: GridCell<T>) => string)

  // Custom renders
  renderItem: (
    cell: GridCell<T>,
    helpers: { dragHandleProps: React.HTMLAttributes<HTMLElement> },
  ) => React.ReactNode
  renderDragHandle?: (props: {
    dragHandleProps: React.HTMLAttributes<HTMLElement>
  }) => React.ReactNode
  renderRowControls?: (row: GridRow<T>) => React.ReactNode
  renderColResizeHandle?: React.ReactNode
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
  className,
  cellClassName,
  renderItem,
  renderDragHandle,
  renderRowControls,
  renderColResizeHandle,
}: GridRowLineProps<T>) {
  const { isDragging, isDragTarget, setRowRef, handlers, state, constants } =
    useGridRow<T>(row.id)

  const isResizing = state.isResizing

  const handleRowDragStart = (e: React.DragEvent) => {
    if ((e.target as HTMLElement).closest('[data-grid-type="cell"]')) return
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData(
      "application/grid-row",
      JSON.stringify({ rowId: row.id }),
    )
    handlers.onDragStart()
  }

  const handleColResize = (
    leftCellId: string,
    rightCellId: string,
    deltaX: number,
  ) => {
    handlers.onResizeCell(row.id, leftCellId, rightCellId, deltaX)
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
        height: row.height ?? constants.minRowHeight,
      }}
      data-grid-type="row"
      draggable
      onDragStart={handleRowDragStart}
      onDragOver={(e) => {
        const target = e.target as HTMLElement
        if (!target.closest('[data-grid-type="cell"]')) {
          e.preventDefault()
          handlers.onDragOver(e)
        }
      }}
      onDragLeave={(e) => {
        const target = e.target as HTMLElement
        if (!target.closest('[data-grid-type="cell"]')) {
          handlers.onDragLeave()
        }
      }}
      onDrop={(e) => {
        const target = e.target as HTMLElement
        if (!target.closest('[data-grid-type="cell"]')) {
          e.preventDefault()
          handlers.onDrop(e)
        }
      }}
      onDragEnd={handlers.onDragEnd}
    >
      {/* Row Controls */}
      {renderRowControls?.(row)}

      {/* Row Inner Container */}
      <div
        ref={setRowRef}
        className="flex h-full w-full gap-0 overflow-hidden"
      >
        {row.cells.map((cell, index) => (
          <Fragment key={cell.id}>
            <GridItem
              cell={cell}
              parentRowId={row.id}
              className={
                typeof cellClassName === "function"
                  ? cellClassName(cell)
                  : cellClassName
              }
              renderItem={renderItem}
              renderDragHandle={renderDragHandle}
            />

            {/* Column Resize Handle */}
            {index < row.cells.length - 1 && row.cells[index + 1] && (
              <ColResizeHandle
                onResizing={(deltaX) => {
                  const nextCell = row.cells[index + 1]
                  if (nextCell) {
                    handlers.onResizingCell(
                      row.id,
                      cell.id,
                      nextCell.id,
                      deltaX,
                    )
                  }
                }}
                onResize={(deltaX) => {
                  const nextCell = row.cells[index + 1]
                  if (nextCell) {
                    handleColResize(cell.id, nextCell.id, deltaX)
                  }
                }}
                onResizeStart={handlers.onResizeStart}
                onResizeEnd={handlers.onResizeEnd}
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
