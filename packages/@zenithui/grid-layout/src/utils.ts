import type { GridCell, GridLayoutConfig, GridRow } from "./types"

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

/**
 * Swaps two rows in the layout.
 *
 * @template T - The type of the data contained within the cells.
 * @param layout - The current grid layout configuration.
 * @param rowId1 - The ID of the first row to swap.
 * @param rowId2 - The ID of the second row to swap.
 * @returns A new layout configuration with the rows swapped.
 */
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

/**
 * Resizes a row to a new height, respecting its minimum height constraint.
 *
 * @template T - The type of the data contained within the cells.
 * @param layout - The current grid layout configuration.
 * @param rowId - The ID of the row to resize.
 * @param newHeight - The new height in pixels.
 * @returns A new layout configuration with the resized row.
 */
export function resizeRow<T>(
  layout: GridLayoutConfig<T>,
  rowId: string,
  newHeight: number,
  minRowHeight: number,
): GridLayoutConfig<T> {
  const newRows = layout.rows.map((row) => {
    if (row.id !== rowId) return row
    const minH = row.minHeight ?? minRowHeight
    return { ...row, height: Math.max(minH, newHeight) }
  })
  return { ...layout, rows: newRows }
}

/**
 * Removes a row from the layout.
 *
 * @template T - The type of the data contained within the cells.
 * @param layout - The current grid layout configuration.
 * @param rowId - The ID of the row to remove.
 * @returns A new layout configuration with the row removed.
 */
export function removeRow<T>(
  layout: GridLayoutConfig<T>,
  rowId: string,
): GridLayoutConfig<T> {
  return {
    ...layout,
    rows: layout.rows.filter((r) => r.id !== rowId),
  }
}

/**
 * Resizes an adjacent pair of cells within a row, proportionally adjusting their widths.
 *
 * @template T - The type of the data contained within the cells.
 * @param layout - The current grid layout configuration.
 * @param rowId - The ID of the row containing the cells.
 * @param leftCellId - The ID of the left cell in the pair.
 * @param rightCellId - The ID of the right cell in the pair.
 * @param deltaPercent - The percentage delta to adjust by (positive expands left, negative expands right).
 * @returns A new layout configuration with the resized cells.
 */
export function resizeCellPair<T>(
  layout: GridLayoutConfig<T>,
  rowId: string,
  leftCellId: string,
  rightCellId: string,
  deltaPercent: number,
  minCellWidthPercent: number,
): GridLayoutConfig<T> {
  const newRows = layout.rows.map((row) => {
    if (row.id !== rowId) return row

    const leftCell = row.cells.find((c) => c.id === leftCellId)
    const rightCell = row.cells.find((c) => c.id === rightCellId)
    if (!leftCell || !rightCell) return row

    const leftWidth = leftCell.width ?? 1
    const rightWidth = rightCell.width ?? 1
    const totalWidth = leftWidth + rightWidth

    let newLeftWidth = leftWidth + (deltaPercent / 100) * totalWidth
    let newRightWidth = rightWidth - (deltaPercent / 100) * totalWidth

    const leftMin =
      ((leftCell.minWidth ?? minCellWidthPercent) / 100) * totalWidth
    const rightMin =
      ((rightCell.minWidth ?? minCellWidthPercent) / 100) * totalWidth

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

/**
 * Swaps the positions of two cells in the grid.
 * Preserves the original container widths while shifting the cell definitions.
 *
 * @template T - The type of the data contained within the cells.
 * @param layout - The current grid layout configuration.
 * @param cellId1 - The ID of the first cell to swap.
 * @param cellId2 - The ID of the second cell to swap.
 * @returns A new layout configuration with the cells swapped.
 */
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

  const target1 = parentRow1.cells.find((c) => c.id === cellId1)
  const target2 = parentRow2.cells.find((c) => c.id === cellId2)
  if (!target1 || !target2) return layout

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

/**
 * Removes a cell from the grid layout. Removes the parent row if it becomes empty.
 *
 * @template T - The type of the data contained within the cells.
 * @param layout - The current grid layout configuration.
 * @param cellId - The ID of the cell to remove.
 * @returns A new layout configuration with the cell removed.
 */
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

/**
 * Moves an existing cell into a newly created row at the specified index.
 *
 * @template T - The type of the data contained within the cells.
 * @param layout - The current grid layout configuration.
 * @param cellId - The ID of the cell to move.
 * @param targetRowIndex - The index at which to insert the new row (0 for top, layout.rows.length for bottom).
 * @returns A new layout configuration with the cell moved.
 */
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
    id: `row-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    cells: [{ ...cellToMove, width: 1 }],
  }

  newRows.splice(targetRowIndex, 0, newRow)
  newRows = newRows.filter((row) => row.cells.length > 0)

  return normalizeLayout({ ...layout, rows: newRows })
}

/**
 * Inserts a cell adjacent to a target cell, sharing the available width equally.
 *
 * @template T - The type of the data contained within the cells.
 * @param layout - The current grid layout configuration.
 * @param sourceCellId - The ID of the cell being moved/inserted.
 * @param targetCellId - The ID of the target cell to insert next to.
 * @param position - Whether to insert the cell to the "left" or "right" of the target.
 * @returns A new layout configuration with the cell inserted.
 */
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
    const targetCell = updatedCells[targetIdx]
    if (!targetCell || !sourceCell) return row

    const newTargetWidth = (targetCell.width || 1) / 2

    updatedCells[targetIdx] = { ...targetCell, width: newTargetWidth }
    const cellToInsert = { ...sourceCell, width: newTargetWidth }

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
