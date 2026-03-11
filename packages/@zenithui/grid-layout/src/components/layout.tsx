import { cn } from "@zenithui/utils"
import { Fragment } from "react"
import { GridLayoutProvider, useGridLayout } from "../context"
import type {
  GridCell,
  GridLayoutConfig,
  GridLayoutConstants,
  GridRow,
} from "../types"
import { RowResizeHandle } from "./handlers"
import { GridRowLine } from "./row"

export interface GridLayoutPresentationProps<T> {
  renderItem: (
    cell: GridCell<T>,
    helpers: { dragHandleProps: React.HTMLAttributes<HTMLElement> },
  ) => React.ReactNode
  className?: string
  rowClassName?: string | ((row: GridRow<T>) => string)
  cellClassName?: string | ((cell: GridCell<T>) => string)
  dropZoneClassName?: string
  renderRowControls?: (row: GridRow<T>) => React.ReactNode
  renderEmptyState?: () => React.ReactNode
  renderDropZoneOverlay?: (
    position: "left" | "right" | "swap" | "newRow",
  ) => React.ReactNode
  rowResizeHandle?: React.ReactNode
  colResizeHandle?: React.ReactNode
  dragHandle?: (props: {
    dragHandleProps: React.HTMLAttributes<HTMLElement>
  }) => React.ReactNode
}

/**
 * The inner presentation component for GridLayout.
 * Used internally, assumes it is wrapped in GridLayoutProvider.
 */
export function GridLayoutPresentation<T>({
  renderItem,
  className,
  rowClassName,
  cellClassName,
  dropZoneClassName,
  renderRowControls,
  renderEmptyState,
  renderDropZoneOverlay,
  rowResizeHandle,
  colResizeHandle,
  dragHandle,
}: GridLayoutPresentationProps<T>) {
  const { state, handlers, refs } = useGridLayout<T>()
  const { layoutState: layout, draggedType, dragTargetId } = state

  const handleNewRowDragOver = (e: React.DragEvent, index: number) => {
    if (draggedType === "cell") {
      e.preventDefault()
      handlers.onDragOver(e, `new-row-${index}`, "newRow")
    }
  }

  const handleNewRowDrop = (e: React.DragEvent, index: number) => {
    if (draggedType === "cell") {
      e.preventDefault()
      handlers.onDrop(e, `new-row-${index}`, "newRow")
    }
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
      ref={refs.containerRef}
      className={cn(
        "group/grid mx-auto flex w-full flex-col gap-0 px-2",
        className,
      )}
    >
      {/* Top Drop Zone for new row */}
      {draggedType === "cell" && (
        <div
          className={cn(
            "relative z-20 -my-3 h-6 w-full rounded-md transition-all duration-300",
            dragTargetId === "new-row-0"
              ? "bg-blue-500/10"
              : "bg-transparent hover:bg-blue-500/5",
            dropZoneClassName,
          )}
          onDragOver={(e) => handleNewRowDragOver(e, 0)}
          onDragLeave={handlers.onDragLeave}
          onDrop={(e) => handleNewRowDrop(e, 0)}
        >
          {dragTargetId === "new-row-0" &&
            (renderDropZoneOverlay?.("newRow") ?? (
              <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            ))}
        </div>
      )}

      {layout.rows.map((row, index) => (
        <Fragment key={row.id}>
          <div className="group/row-wrapper relative">
            <GridRowLine
              row={row}
              className={resolveClassName(row, rowClassName)}
              cellClassName={cellClassName}
              renderItem={renderItem}
              renderDragHandle={dragHandle}
              renderColResizeHandle={colResizeHandle}
              renderRowControls={renderRowControls}
            />
          </div>

          {/* Row Resize or New Row Drop Zone */}
          {index < layout.rows.length - 1 ? (
            <div className="relative">
              <RowResizeHandle
                onResizing={(deltaY) => handlers.onResizingRow(row.id, deltaY)}
                onResize={(deltaY) => handlers.onResizeRow(row.id, deltaY)}
                onResizeStart={handlers.onResizeStart}
                onResizeEnd={handlers.onResizeEnd}
              >
                {rowResizeHandle}
              </RowResizeHandle>

              {draggedType === "cell" && (
                <div
                  className={cn(
                    "pointer-events-auto absolute inset-x-0 -top-3 bottom-0 z-30 transition-all duration-300",
                    dragTargetId === `new-row-${index + 1}`
                      ? "bg-blue-500/10"
                      : "bg-transparent hover:bg-blue-500/5",
                    dropZoneClassName,
                  )}
                  onDragOver={(e) => handleNewRowDragOver(e, index + 1)}
                  onDragLeave={handlers.onDragLeave}
                  onDrop={(e) => handleNewRowDrop(e, index + 1)}
                >
                  {dragTargetId === `new-row-${index + 1}` &&
                    (renderDropZoneOverlay?.("newRow") ?? (
                      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    ))}
                </div>
              )}
            </div>
          ) : (
            // Bottom Drop Zone for new row
            draggedType === "cell" && (
              <div
                className={cn(
                  "relative z-20 mt-2 -mb-2 h-6 w-full rounded-md transition-all duration-300",
                  dragTargetId === `new-row-${layout.rows.length}`
                    ? "bg-blue-500/10"
                    : "bg-transparent hover:bg-blue-500/5",
                  dropZoneClassName,
                )}
                onDragOver={(e) => handleNewRowDragOver(e, layout.rows.length)}
                onDragLeave={handlers.onDragLeave}
                onDrop={(e) => handleNewRowDrop(e, layout.rows.length)}
              >
                {dragTargetId === `new-row-${layout.rows.length}` &&
                  (renderDropZoneOverlay?.("newRow") ?? (
                    <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  ))}
              </div>
            )
          )}
        </Fragment>
      ))}
    </div>
  )
}

export interface GridLayoutProps<T> extends GridLayoutPresentationProps<T> {
  layout: GridLayoutConfig<T>
  onChange: (layout: GridLayoutConfig<T>) => void
  constants?: Partial<GridLayoutConstants>
}

/**
 * A highly customizable drag-and-drop grid layout component.
 * Supports row and column resizing, reordering, and moving items across rows.
 * Automatically wraps the grid in a `GridLayoutProvider`.
 *
 * @template T - The type of data associated with each grid cell.
 * @param props - The component props.
 */
export function GridLayout<T>({
  layout,
  onChange,
  constants,
  ...presentationProps
}: GridLayoutProps<T>) {
  return (
    <GridLayoutProvider
      layout={layout}
      onChange={onChange}
      constants={constants}
      config={{
        renderDropZoneOverlay: presentationProps.renderDropZoneOverlay,
      }}
    >
      <GridLayoutPresentation {...presentationProps} />
    </GridLayoutProvider>
  )
}
