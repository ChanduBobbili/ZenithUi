/**
 * Represents a single cell within a grid row.
 * @template T - The type of the data structure contained within the cell.
 */
export interface GridCell<T> {
  id: string
  width?: number
  minWidth?: number
  data: T
  className?: string // Added for customization
}

/**
 * Represents a single row within the grid layout, containing multiple cells.
 * @template T - The type of the data structure contained within the cells.
 */
export interface GridRow<T> {
  id: string
  height?: number
  minHeight?: number
  cells: GridCell<T>[]
  className?: string // Added for customization
}

/**
 * Represents the basic layout configuration of the entire grid.
 * @template T - The type of the data structure contained within the grid's cells.
 */
export interface GridLayoutConfig<T> {
  rows: GridRow<T>[]
}

/**
 * Props for rendering a single grid row line.
 * @template T - The type of the data structure contained within the cells.
 */
export interface GridRowLineProps<T> {
  row: GridRow<T>
  className?: string | ((row: GridRow<T>) => string)
  cellClassName?: string | ((cell: GridCell<T>) => string)
  renderItem: (
    cell: GridCell<T>,
    helpers: { dragHandleProps: React.HTMLAttributes<HTMLElement> },
  ) => React.ReactNode
  renderDragHandle?: (props: {
    dragHandleProps: React.HTMLAttributes<HTMLElement>
  }) => React.ReactNode
  renderColResizeHandle?: React.ReactNode
  renderRowControls?: (row: GridRow<T>) => React.ReactNode
}

/**
 * Represents the configuration constants and sensible defaults for the grid layout.
 */
export interface GridLayoutConstants {
  minRowHeight: number
  minCellWidth: number
  maxRows?: number
  maxColumns?: number
  defaultGap: number
  defaultPadding: number
  snapThreshold: number
  animationDuration: number
  defaultTemplate?: { columns?: number; rows?: number }
}

/**
 * Exposes the currently active state of the layout operations.
 * @template T - The type of the data contained within the cells.
 */
export interface GridLayoutState<T> {
  isResizing: boolean
  isDragging: boolean
  draggedType: "row" | "cell" | null
  draggedId: string | null
  dragTargetId: string | null
  dragTargetPosition: "left" | "right" | "swap" | "newRow" | null
  activeCellId: string | null
  dragOffset: { x: number; y: number }
  resizeDimensions: { width: number; height: number }
  layoutState: GridLayoutConfig<T>
}

/**
 * Defines references heavily used during layout measurement and interaction.
 */
export interface GridLayoutRefs {
  containerRef: React.RefObject<HTMLDivElement | null>
  rowRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>
  cellRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>
  dragHandleRefs: React.MutableRefObject<Map<string, HTMLElement | null>>
  resizeHandleRefs: React.MutableRefObject<Map<string, HTMLElement | null>>
}

/**
 * Handler functions exposed to consumers for layout events.
 * @template T - The type of the data contained within the cells.
 */
export interface GridLayoutHandlers<T> {
  onDragStart: (type: "row" | "cell", id: string) => void
  onDragOver: (
    e: React.DragEvent,
    targetId: string,
    position: "left" | "right" | "swap" | "newRow",
  ) => void
  onDragLeave: () => void
  onDrop: (
    e: React.DragEvent,
    targetId: string,
    position: "left" | "right" | "swap" | "newRow",
  ) => void
  onDragEnd: () => void
  onResizeStart: () => void
  onResizingRow: (rowId: string, cumulativeDeltaY: number) => void
  onResizeRow: (rowId: string, deltaY: number) => void
  onResizingCell: (
    rowId: string,
    leftCellId: string,
    rightCellId: string,
    cumulativeDeltaX: number,
  ) => void
  onResizeCell: (
    rowId: string,
    leftCellId: string,
    rightCellId: string,
    deltaX: number,
  ) => void
  onResizeEnd: () => void
  onCellClick: (cellId: string) => void
  onLayoutChange: (newLayout: GridLayoutConfig<T>) => void
}

export interface GridLayoutContextConfig {
  renderDropZoneOverlay?: (
    position: "left" | "right" | "swap" | "newRow",
  ) => React.ReactNode
}

/**
 * The full Context Value passed down to Grid elements.
 * @template T - The type of the data contained within the cells.
 */
export interface GridLayoutContextValue<T> {
  state: GridLayoutState<T>
  config?: GridLayoutContextConfig
  constants: GridLayoutConstants
  refs: GridLayoutRefs
  handlers: GridLayoutHandlers<T>
}
