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
 * Represents the configuration and state of the entire grid layout.
 * @template T - The type of the data structure contained within the grid's cells.
 */
export interface GridLayoutConfig<T> {
  rows: GridRow<T>[]
}
