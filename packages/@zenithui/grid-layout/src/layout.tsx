import { cn } from "@zenithui/utils"
import { Fragment, useCallback, useMemo, useState } from "react"
import type { DragEvent } from "react"
import { RowResizeHandle } from "./handlers"
import { GridRowLine } from "./row"
import type { GridCell, GridLayoutConfig, GridRow } from "./types"
import {
  insertCellAdjacent,
  moveCellToNewRow,
  resizeCellPair,
  resizeRow,
  snapRowToGrid,
  swapCells,
  swapRows,
} from "./utils"

function findCell<T>(
  layout: GridLayoutConfig<T>,
  cellId: string,
): GridCell<T> | null {
  for (const row of layout.rows) {
    const c = row.cells.find((cell) => cell.id === cellId)
    if (c) return c
  }
  return null
}

function cellReorderable<T>(cell: GridCell<T> | null | undefined): boolean {
  return cell != null && cell.reorderable !== false
}

function cellResizable<T>(cell: GridCell<T> | null | undefined): boolean {
  return cell != null && cell.resizable !== false
}

function rowReorderable<T>(row: GridRow<T> | null | undefined): boolean {
  return row != null && row.reorderable !== false
}

type DraggedKind = "row" | "cell" | null
type CellDropPosition = "left" | "right" | "swap"
type DragTargetPosition = CellDropPosition | "newRow" | null

export interface GridLayoutProps<T> {
  layout: GridLayoutConfig<T>
  onChange: (layout: GridLayoutConfig<T>) => void
  renderItem: (cell: GridCell<T>) => React.ReactNode

  renderRowControls?: (row: GridRow<T>) => React.ReactNode
  renderEmptyState?: () => React.ReactNode

  rowResizeHandle?: React.ReactNode
  colResizeHandle?: React.ReactNode

  dragHandle?: (props: {
    dragHandleProps: React.HTMLAttributes<HTMLButtonElement>
  }) => React.ReactNode
  showDragHandle?: boolean
  /** When true, disables all drag-and-drop and resize interactions. */
  readonly?: boolean
  /** Horizontal gap between cells in a row, in pixels. Default 0. */
  columnGapPx?: number
  /** Vertical gap between rows, in pixels. Default 0. */
  rowGapPx?: number
}

export function GridLayout<T>({
  layout,
  onChange,
  renderItem,
  renderRowControls,
  renderEmptyState,
  rowResizeHandle,
  colResizeHandle,
  dragHandle,
  showDragHandle = true,
  readonly = false,
  columnGapPx = 0,
  rowGapPx = 0,
}: GridLayoutProps<T>) {
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [draggedType, setDraggedType] = useState<DraggedKind>(null)
  const [dragTargetId, setDragTargetId] = useState<string | null>(null)
  const [dragTargetPosition, setDragTargetPosition] =
    useState<DragTargetPosition>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [colResizingRowId, setColResizingRowId] = useState<string | null>(null)

  const hasRows = layout.rows.length > 0

  const resetDragState = useCallback(() => {
    setDraggedId(null)
    setDraggedType(null)
    setDragTargetId(null)
    setDragTargetPosition(null)
  }, [])

  // ── Row drag handlers ────────────────────────────────────────────────────────

  const handleRowDragStart = useCallback(
    (rowId: string) => {
      const row = layout.rows.find((r) => r.id === rowId)
      if (!rowReorderable(row)) return
      setDraggedId(rowId)
      setDraggedType("row")
    },
    [layout.rows],
  )

  const handleRowDragOver = useCallback(
    (event: DragEvent, targetId: string) => {
      const target = layout.rows.find((r) => r.id === targetId)
      if (!rowReorderable(target)) return
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
      if (draggedType === "row" && draggedId && draggedId !== targetId) {
        const source = layout.rows.find((r) => r.id === draggedId)
        if (!rowReorderable(source)) return
        setDragTargetId(targetId)
        setDragTargetPosition("swap")
      }
    },
    [draggedId, draggedType, layout.rows],
  )

  const handleRowDrop = useCallback(
    (event: DragEvent, targetId: string) => {
      event.preventDefault()
      if (draggedType === "row" && draggedId && draggedId !== targetId) {
        const from = layout.rows.find((r) => r.id === draggedId)
        const to = layout.rows.find((r) => r.id === targetId)
        if (rowReorderable(from) && rowReorderable(to)) {
          onChange(swapRows(layout, draggedId, targetId))
        }
      }
      resetDragState()
    },
    [draggedId, draggedType, layout, onChange, resetDragState],
  )

  // ── Cell drag handlers ───────────────────────────────────────────────────────

  const handleCellDragStart = useCallback(
    (cellId: string) => {
      const cell = findCell(layout, cellId)
      if (!cellReorderable(cell)) return
      setDraggedId(cellId)
      setDraggedType("cell")
    },
    [layout],
  )

  const handleCellDragOver = useCallback(
    (event: DragEvent, targetId: string, position: CellDropPosition) => {
      const target = findCell(layout, targetId)
      if (!cellReorderable(target)) return
      const source = draggedId ? findCell(layout, draggedId) : null
      if (!(draggedType === "cell" && draggedId && draggedId !== targetId))
        return
      if (!cellReorderable(source)) return
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
      setDragTargetId(targetId)
      setDragTargetPosition(position)
    },
    [draggedId, draggedType, layout],
  )

  const handleCellDrop = useCallback(
    (event: DragEvent, targetId: string, position: CellDropPosition) => {
      event.preventDefault()
      if (!(draggedType === "cell" && draggedId && draggedId !== targetId)) {
        resetDragState()
        return
      }
      const source = findCell(layout, draggedId)
      const target = findCell(layout, targetId)
      if (!cellReorderable(source) || !cellReorderable(target)) {
        resetDragState()
        return
      }
      const nextLayout =
        position === "swap"
          ? swapCells(layout, draggedId, targetId)
          : insertCellAdjacent(layout, draggedId, targetId, position)
      onChange(nextLayout)
      resetDragState()
    },
    [draggedId, draggedType, layout, onChange, resetDragState],
  )

  // ── New-row drop handlers ────────────────────────────────────────────────────

  const handleNewRowDragOver = useCallback(
    (event: DragEvent, index: number) => {
      if (draggedType !== "cell" || !draggedId) return
      const source = findCell(layout, draggedId)
      if (!cellReorderable(source)) return
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
      setDragTargetId(`new-row-${index}`)
      setDragTargetPosition("newRow")
    },
    [draggedId, draggedType, layout],
  )

  const handleNewRowDrop = useCallback(
    (event: DragEvent, index: number) => {
      event.preventDefault()
      if (draggedType === "cell" && draggedId) {
        const source = findCell(layout, draggedId)
        if (cellReorderable(source)) {
          onChange(moveCellToNewRow(layout, draggedId, index))
        }
      }
      resetDragState()
    },
    [draggedId, draggedType, layout, onChange, resetDragState],
  )

  // ── Resize handlers ──────────────────────────────────────────────────────────

  const handleColResize = useCallback(
    (rowId: string, leftId: string, rightId: string, deltaPercent: number) => {
      const left = findCell(layout, leftId)
      const right = findCell(layout, rightId)
      if (!cellResizable(left) || !cellResizable(right)) return
      onChange(resizeCellPair(layout, rowId, leftId, rightId, deltaPercent))
    },
    [layout, onChange],
  )

  const handleRowResize = useCallback(
    (rowId: string, currentHeight: number | undefined, deltaY: number) => {
      const baseHeight = currentHeight ?? 280
      onChange(resizeRow(layout, rowId, baseHeight + deltaY))
    },
    [layout, onChange],
  )

  // ── Derived state ────────────────────────────────────────────────────────────

  const topDropZoneActive = useMemo(() => {
    if (readonly) return false
    if (draggedType !== "cell" || !draggedId) return false
    return cellReorderable(findCell(layout, draggedId))
  }, [readonly, draggedType, draggedId, layout])

  // ── Render ───────────────────────────────────────────────────────────────────

  if (!hasRows) {
    if (renderEmptyState) return <>{renderEmptyState()}</>

    return (
      <div className="border-muted-foreground/20 text-muted-foreground flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center">
        <h3 className="text-foreground text-lg font-medium">Empty Dashboard</h3>
        <p className="text-sm">Add a widget to get started.</p>
      </div>
    )
  }

  return (
    <div className="group/grid mx-auto flex w-full flex-col gap-0 px-2">
      {/* Top drop zone strip */}
      {topDropZoneActive && (
        <div
          className={cn(
            "z-10 -my-2 h-4 w-full rounded-md transition-all duration-300",
            dragTargetId === "new-row-0"
              ? "bg-primary/40 ring-primary scale-y-150 ring-2"
              : "hover:bg-primary/20 bg-transparent",
          )}
          onDragOver={(e) => handleNewRowDragOver(e, 0)}
          onDragLeave={() => setDragTargetId(null)}
          onDrop={(e) => handleNewRowDrop(e, 0)}
        />
      )}

      {layout.rows.map((row, index) => {
        const isRowDragSource = draggedType === "row" && draggedId === row.id
        const isRowDragTarget = draggedType === "row" && dragTargetId === row.id

        return (
          <Fragment key={row.id}>
            <div
              className="group/row-wrapper relative"
              style={{
                marginBottom:
                  index < layout.rows.length - 1 ? rowGapPx : undefined,
              }}
            >
              {renderRowControls && renderRowControls(row)}
              <GridRowLine
                row={row}
                rowIndex={index}
                isDragging={isRowDragSource}
                isResizing={isResizing}
                isColResizingRow={colResizingRowId === row.id}
                isDragTarget={isRowDragTarget}
                showDragHandle={showDragHandle && !readonly}
                readonly={readonly}
                columnGapPx={columnGapPx}
                renderItem={renderItem}
                renderDragHandle={dragHandle}
                renderColResizeHandle={colResizeHandle}
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
                  handleColResize(row.id, leftId, rightId, delta)
                }
                onColResizeStart={() => {
                  setIsResizing(true)
                  setColResizingRowId(row.id)
                }}
                onColResizeEnd={() => {
                  setIsResizing(false)
                  setColResizingRowId(null)
                  onChange(snapRowToGrid(layout, row.id))
                }}
                dragTargetCellId={dragTargetId}
                dragTargetPosition={
                  dragTargetPosition === "newRow" ? null : dragTargetPosition
                }
                draggedCellId={draggedType === "cell" ? draggedId : null}
              />
            </div>

            {index < layout.rows.length - 1 ? (
              <div className="relative z-10">
                {!readonly && (
                  <RowResizeHandle
                    onResize={(deltaY) =>
                      handleRowResize(row.id, row.height, deltaY)
                    }
                    onResizeStart={() => setIsResizing(true)}
                    onResizeEnd={() => setIsResizing(false)}
                  >
                    {rowResizeHandle}
                  </RowResizeHandle>
                )}

                {topDropZoneActive && !readonly && (
                  <div
                    className={cn(
                      "absolute inset-0 z-20 rounded-md transition-all duration-300",
                      dragTargetId === `new-row-${index + 1}`
                        ? "bg-primary/40 ring-primary ring-2"
                        : "hover:bg-primary/20 bg-transparent",
                    )}
                    onDragOver={(e) => handleNewRowDragOver(e, index + 1)}
                    onDragLeave={() => setDragTargetId(null)}
                    onDrop={(e) => handleNewRowDrop(e, index + 1)}
                  />
                )}
              </div>
            ) : (
              topDropZoneActive &&
              !readonly && (
                <div
                  className={cn(
                    "z-10 mt-2 -mb-2 h-4 w-full rounded-md transition-all duration-300",
                    dragTargetId === `new-row-${layout.rows.length}`
                      ? "bg-primary/40 ring-primary scale-y-150 ring-2"
                      : "hover:bg-primary/20 bg-transparent",
                  )}
                  onDragOver={(e) =>
                    handleNewRowDragOver(e, layout.rows.length)
                  }
                  onDragLeave={() => setDragTargetId(null)}
                  onDrop={(e) => handleNewRowDrop(e, layout.rows.length)}
                />
              )
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
