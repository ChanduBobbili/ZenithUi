import { cn } from "@zenithui/utils"
import { Fragment, useState } from "react"
import {
  insertCellAdjacent,
  moveCellToNewRow,
  resizeCellPair,
  resizeRow,
  swapCells,
  swapRows,
} from "../lib/layout-utils"
import type { GridCell, GridLayoutConfig, GridRow } from "../types"
import { RowResizeHandle } from "./handlers"
import { GridRowLine } from "./row"

/**
 * Props for the GridLayout component.
 * @template T - The type of data associated with each grid cell.
 */
export interface GridLayoutProps<T> {
  layout: GridLayoutConfig<T>
  onChange: (layout: GridLayoutConfig<T>) => void
  renderItem: (cell: GridCell<T>) => React.ReactNode

  // Customizations
  className?: string
  rowClassName?: string | ((row: GridRow<T>) => string)
  cellClassName?: string | ((cell: GridCell<T>) => string)
  dropZoneClassName?: string

  renderRowControls?: (row: GridRow<T>) => React.ReactNode
  renderEmptyState?: () => React.ReactNode

  // Custom Handles
  rowResizeHandle?: React.ReactNode
  colResizeHandle?: React.ReactNode
  dragHandle?: (props: {
    dragHandleProps: React.HTMLAttributes<HTMLElement>
  }) => React.ReactNode
}

/**
 * A highly customizable drag-and-drop grid layout component.
 * Supports row and column resizing, reordering, and moving items across rows.
 *
 * @template T - The type of data associated with each grid cell.
 * @param props - The component props.
 */
export function GridLayout<T>({
  layout,
  onChange,
  renderItem,
  className,
  rowClassName,
  cellClassName,
  dropZoneClassName,
  renderRowControls,
  renderEmptyState,
  rowResizeHandle,
  colResizeHandle,
  dragHandle,
}: GridLayoutProps<T>) {
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [draggedType, setDraggedType] = useState<"row" | "cell" | null>(null)
  const [dragTargetId, setDragTargetId] = useState<string | null>(null)
  const [dragTargetPosition, setDragTargetPosition] = useState<
    "left" | "right" | "swap" | "newRow" | null
  >(null)
  const [isResizing, setIsResizing] = useState(false)

  // -- ROW DRAG HANDLERS --
  const handleRowDragStart = (rowId: string) => {
    setDraggedId(rowId)
    setDraggedType("row")
  }

  const handleRowDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (draggedType === "row" && draggedId !== targetId) {
      setDragTargetId(targetId)
      setDragTargetPosition("swap")
    }
  }

  const handleRowDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (draggedType === "row" && draggedId && draggedId !== targetId) {
      onChange(swapRows(layout, draggedId, targetId))
    }
    resetDragState()
  }

  // -- CELL DRAG HANDLERS --
  const handleCellDragStart = (cellId: string) => {
    setDraggedId(cellId)
    setDraggedType("cell")
  }

  const handleCellDragOver = (
    e: React.DragEvent,
    targetId: string,
    position: "left" | "right" | "swap",
  ) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (draggedType === "cell" && draggedId !== targetId) {
      setDragTargetId(targetId)
      setDragTargetPosition(position)
    }
  }

  const handleCellDrop = (
    e: React.DragEvent,
    targetId: string,
    position: "left" | "right" | "swap",
  ) => {
    e.preventDefault()
    if (draggedType === "cell" && draggedId && draggedId !== targetId) {
      if (position === "swap") {
        onChange(swapCells(layout, draggedId, targetId))
      } else {
        onChange(insertCellAdjacent(layout, draggedId, targetId, position))
      }
    }
    resetDragState()
  }

  // -- NEW ROW DROP ZONE (For Cells) --
  const handleNewRowDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedType === "cell") {
      setDragTargetId(`new-row-${index}`)
      setDragTargetPosition("newRow")
    }
  }

  const handleNewRowDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedType === "cell" && draggedId) {
      onChange(moveCellToNewRow(layout, draggedId, index))
    }
    resetDragState()
  }

  const resetDragState = () => {
    setDraggedId(null)
    setDraggedType(null)
    setDragTargetId(null)
    setDragTargetPosition(null)
  }

  if (layout.rows.length === 0) {
    if (renderEmptyState) return <>{renderEmptyState()}</>

    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-12 text-center text-neutral-500",
          className,
        )}
      >
        <p className="text-sm">No items in the layout.</p>
      </div>
    )
  }

  const resolveClassName = <U,>(
    item: U,
    classProp: string | ((item: U) => string) | undefined,
  ) => {
    if (typeof classProp === "function") {
      return classProp(item)
    }
    return classProp
  }

  return (
    <div
      className={cn(
        "group/grid mx-auto flex w-full flex-col gap-0 px-2",
        className,
      )}
    >
      {/* Top Drop Zone for new row */}
      {draggedType === "cell" && (
        <div
          className={cn(
            "z-10 -my-2 h-4 w-full rounded-md transition-all duration-300",
            dragTargetId === "new-row-0"
              ? "scale-y-150 bg-blue-500/40 ring-2 ring-blue-500"
              : "bg-transparent hover:bg-blue-500/20",
            dropZoneClassName,
          )}
          onDragOver={(e) => handleNewRowDragOver(e, 0)}
          onDragLeave={() => setDragTargetId(null)}
          onDrop={(e) => handleNewRowDrop(e, 0)}
        />
      )}

      {layout.rows.map((row, index) => (
        <Fragment key={row.id}>
          <div className="group/row-wrapper relative">
            <GridRowLine
              row={row}
              rowIndex={index}
              className={resolveClassName(row, rowClassName)}
              cellClassName={cellClassName}
              isDragging={draggedId === row.id && draggedType === "row"}
              isResizing={isResizing}
              isDragTarget={dragTargetId === row.id && draggedType === "row"}
              renderItem={renderItem}
              renderDragHandle={dragHandle}
              renderColResizeHandle={colResizeHandle}
              renderRowControls={renderRowControls}
              onRowDragStart={handleRowDragStart}
              onRowDragOver={handleRowDragOver}
              onRowDrop={handleRowDrop}
              onRowDragEnd={resetDragState}
              onRowDragLeave={() => setDragTargetId(null)}
              onCellDragStart={handleCellDragStart}
              onCellDragOver={handleCellDragOver}
              onCellDrop={handleCellDrop}
              onCellDragEnd={resetDragState}
              onCellDragLeave={() => setDragTargetId(null)}
              onColResize={(leftId, rightId, delta) =>
                onChange(resizeCellPair(layout, row.id, leftId, rightId, delta))
              }
              onColResizeStart={() => setIsResizing(true)}
              onColResizeEnd={() => setIsResizing(false)}
              dragTargetCellId={dragTargetId}
              dragTargetPosition={
                dragTargetPosition === "newRow" ? null : dragTargetPosition
              }
            />
          </div>

          {/* Row Resize or New Row Drop Zone */}
          {index < layout.rows.length - 1 ? (
            <div className="relative">
              <RowResizeHandle
                onResize={(deltaY) =>
                  onChange(
                    resizeRow(layout, row.id, (row.height || 280) + deltaY),
                  )
                }
                onResizeStart={() => setIsResizing(true)}
                onResizeEnd={() => setIsResizing(false)}
              >
                {rowResizeHandle}
              </RowResizeHandle>

              {/* Overlay new row drop zone onto the resize handle when dragging a cell */}
              {draggedType === "cell" && (
                <div
                  className={cn(
                    "absolute inset-0 z-20 rounded-md transition-all duration-300",
                    dragTargetId === `new-row-${index + 1}`
                      ? "bg-blue-500/40 ring-2 ring-blue-500"
                      : "bg-transparent hover:bg-blue-500/20",
                    dropZoneClassName,
                  )}
                  onDragOver={(e) => handleNewRowDragOver(e, index + 1)}
                  onDragLeave={() => setDragTargetId(null)}
                  onDrop={(e) => handleNewRowDrop(e, index + 1)}
                />
              )}
            </div>
          ) : (
            // Bottom Drop Zone for new row
            draggedType === "cell" && (
              <div
                className={cn(
                  "z-10 mt-2 -mb-2 h-4 w-full rounded-md transition-all duration-300",
                  dragTargetId === `new-row-${layout.rows.length}`
                    ? "scale-y-150 bg-blue-500/40 ring-2 ring-blue-500"
                    : "bg-transparent hover:bg-blue-500/20",
                  dropZoneClassName,
                )}
                onDragOver={(e) => handleNewRowDragOver(e, layout.rows.length)}
                onDragLeave={() => setDragTargetId(null)}
                onDrop={(e) => handleNewRowDrop(e, layout.rows.length)}
              />
            )
          )}
        </Fragment>
      ))}
    </div>
  )
}
