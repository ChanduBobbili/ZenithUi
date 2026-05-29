export interface GridCell<T> {
  id: string
  width?: number
  minWidth?: number
  /** When false, cell cannot be dragged or used as a drop target for reorder. Default: true */
  reorderable?: boolean
  /** When false, no column resize handle after this cell (paired with next). Default: true */
  resizable?: boolean
  data: T
}

export interface GridRow<T> {
  id: string
  height?: number
  minHeight?: number
  /** When false, row cannot be dragged to swap row order. Default: true */
  reorderable?: boolean
  cells: GridCell<T>[]
}

export interface GridLayoutConfig<T> {
  rows: GridRow<T>[]
}
