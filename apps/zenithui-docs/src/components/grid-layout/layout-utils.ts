import type { GridLayoutConfig, GridRow, GridCell } from "./types"

const MIN_ROW_HEIGHT = 100
const DEFAULT_CELL_WIDTH = 1
const MIN_CELL_WIDTH_PERCENT = 10

function normalizeLayout<T>(layout: GridLayoutConfig<T>): GridLayoutConfig<T> {
  const newRows = layout.rows
    .map((row) => {
      if (row.cells.length === 0) return row
      const totalWidth = row.cells.reduce((sum, c) => sum + (c.width ?? 1), 0)
      if (totalWidth === 0) return row

      const cells = row.cells.map((c) => ({
        ...c,
        width: ((c.width ?? 1) / totalWidth) * 100,
      }))
      return { ...row, cells }
    })
    .filter((row) => row.cells.length > 0)

  return { ...layout, rows: newRows }
}

export function swapRows<T>(
  layout: GridLayoutConfig<T>,
  rowId1: string,
  rowId2: string,
): GridLayoutConfig<T> {
  const newRows = [...layout.rows]
  const idx1 = newRows.findIndex((r) => r.id === rowId1)
  const idx2 = newRows.findIndex((r) => r.id === rowId2)
  if (idx1 === -1 || idx2 === -1) return layout
  const temp = newRows[idx1]

  if (temp && newRows[idx2]) {
    newRows[idx1] = newRows[idx2]
    newRows[idx2] = temp
  }

  return { ...layout, rows: newRows }
}

export function resizeRow<T>(
  layout: GridLayoutConfig<T>,
  rowId: string,
  newHeight: number,
): GridLayoutConfig<T> {
  const newRows = layout.rows.map((row) => {
    if (row.id !== rowId) return row
    const minH = row.minHeight ?? MIN_ROW_HEIGHT
    return { ...row, height: Math.max(minH, newHeight) }
  })
  return { ...layout, rows: newRows }
}

export function removeRow<T>(
  layout: GridLayoutConfig<T>,
  rowId: string,
): GridLayoutConfig<T> {
  return {
    ...layout,
    rows: layout.rows.filter((r) => r.id !== rowId),
  }
}

export function resizeCellPair<T>(
  layout: GridLayoutConfig<T>,
  rowId: string,
  leftCellId: string,
  rightCellId: string,
  deltaPercent: number,
): GridLayoutConfig<T> {
  const newRows = layout.rows.map((row) => {
    if (row.id !== rowId) return row

    const leftCell = row.cells.find((c) => c.id === leftCellId)
    const rightCell = row.cells.find((c) => c.id === rightCellId)
    if (!leftCell || !rightCell) return row

    const leftWidth = leftCell.width ?? DEFAULT_CELL_WIDTH
    const rightWidth = rightCell.width ?? DEFAULT_CELL_WIDTH
    const totalWidth = leftWidth + rightWidth

    let newLeftWidth = leftWidth + (deltaPercent / 100) * totalWidth
    let newRightWidth = rightWidth - (deltaPercent / 100) * totalWidth

    const leftMin =
      ((leftCell.minWidth ?? MIN_CELL_WIDTH_PERCENT) / 100) * totalWidth
    const rightMin =
      ((rightCell.minWidth ?? MIN_CELL_WIDTH_PERCENT) / 100) * totalWidth

    if (newLeftWidth < leftMin) {
      newLeftWidth = leftMin
      newRightWidth = totalWidth - leftMin
    }
    if (newRightWidth < rightMin) {
      newRightWidth = rightMin
      newLeftWidth = totalWidth - rightMin
    }

    const newCells = row.cells.map((cell) => {
      if (cell.id === leftCellId) return { ...cell, width: newLeftWidth }
      if (cell.id === rightCellId) return { ...cell, width: newRightWidth }
      return cell
    })

    return { ...row, cells: newCells }
  })
  return normalizeLayout({ ...layout, rows: newRows })
}

export function swapCells<T>(
  layout: GridLayoutConfig<T>,
  cellId1: string,
  cellId2: string,
): GridLayoutConfig<T> {
  let parentRow1: GridRow<T> | null = null
  let parentRow2: GridRow<T> | null = null

  for (const row of layout.rows) {
    if (row.cells.find((c) => c.id === cellId1)) parentRow1 = row
    if (row.cells.find((c) => c.id === cellId2)) parentRow2 = row
  }

  if (!parentRow1 || !parentRow2) return layout

  const target1 = parentRow1.cells.find((c) => c.id === cellId1)!
  const target2 = parentRow2.cells.find((c) => c.id === cellId2)!

  const newRows = layout.rows.map((row) => {
    const newCells = row.cells.map((cell) => {
      if (cell.id === cellId1) {
        return { ...target2, width: cell.width } // Swap cell but preserve original container's width
      }
      if (cell.id === cellId2) {
        return { ...target1, width: cell.width }
      }
      return cell
    })
    return { ...row, cells: newCells }
  })

  return normalizeLayout({ ...layout, rows: newRows })
}

export function removeCell<T>(
  layout: GridLayoutConfig<T>,
  cellId: string,
): GridLayoutConfig<T> {
  let newRows = layout.rows.map((row) => ({
    ...row,
    cells: row.cells.filter((c) => c.id !== cellId),
  }))
  newRows = newRows.filter((row) => row.cells.length > 0)
  return normalizeLayout({ ...layout, rows: newRows })
}

export function moveCellToNewRow<T>(
  layout: GridLayoutConfig<T>,
  cellId: string,
  targetRowIndex: number, // 0 means top, layout.rows.length means bottom
): GridLayoutConfig<T> {
  let cellToMove: GridCell<T> | null = null
  for (const row of layout.rows) {
    const found = row.cells.find((c) => c.id === cellId)
    if (found) {
      cellToMove = found
      break
    }
  }

  if (!cellToMove) return layout

  let newRows = layout.rows.map((row) => ({
    ...row,
    cells: row.cells.filter((c) => c.id !== cellId),
  }))

  const newRow: GridRow<T> = {
    id: `row-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    cells: [{ ...cellToMove, width: 1 }],
  }

  newRows.splice(targetRowIndex, 0, newRow)
  newRows = newRows.filter((row) => row.cells.length > 0)

  return normalizeLayout({ ...layout, rows: newRows })
}

export function insertCellAdjacent<T>(
  layout: GridLayoutConfig<T>,
  sourceCellId: string,
  targetCellId: string,
  position: "left" | "right",
): GridLayoutConfig<T> {
  if (sourceCellId === targetCellId) return layout

  let sourceCell: GridCell<T> | null = null
  for (const row of layout.rows) {
    const found = row.cells.find((c) => c.id === sourceCellId)
    if (found) {
      sourceCell = found
      break
    }
  }
  if (!sourceCell) return layout

  let newRows = layout.rows.map((row) => ({
    ...row,
    cells: row.cells.filter((c) => c.id !== sourceCellId),
  }))

  newRows = newRows.map((row) => {
    const targetIdx = row.cells.findIndex((c) => c.id === targetCellId)
    if (targetIdx === -1) return row

    const updatedCells = [...row.cells]
    const targetCell = updatedCells[targetIdx]!
    const newTargetWidth = (targetCell.width || 1) / 2

    updatedCells[targetIdx] = { ...targetCell, width: newTargetWidth }
    const cellToInsert = { ...sourceCell!, width: newTargetWidth }

    if (position === "left") {
      updatedCells.splice(targetIdx, 0, cellToInsert)
    } else {
      updatedCells.splice(targetIdx + 1, 0, cellToInsert)
    }

    return { ...row, cells: updatedCells }
  })

  newRows = newRows.filter((row) => row.cells.length > 0)

  return normalizeLayout({ ...layout, rows: newRows })
}
