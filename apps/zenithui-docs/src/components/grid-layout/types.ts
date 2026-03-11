export interface GridCell<T> {
  id: string
  width?: number
  minWidth?: number
  data: T
}

export interface GridRow<T> {
  id: string
  height?: number
  minHeight?: number
  cells: GridCell<T>[]
}

export interface GridLayoutConfig<T> {
  rows: GridRow<T>[]
}
