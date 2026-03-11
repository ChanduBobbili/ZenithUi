import type React from "react"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"
import type {
  GridLayoutConfig,
  GridLayoutConstants,
  GridLayoutContextConfig,
  GridRow,
  GridRowLineProps,
  GridLayoutContextValue,
  GridLayoutHandlers,
  GridLayoutRefs,
  GridLayoutState,
} from "./types"
import {
  insertCellAdjacent,
  moveCellToNewRow,
  resizeCellPair,
  resizeRow,
  swapCells,
  swapRows,
} from "./utils"

const DEFAULT_CONSTANTS: GridLayoutConstants = {
  minRowHeight: 100,
  minCellWidth: 10, // Default to a low minimum size percentage or fixed pixel, depends on usage
  defaultGap: 0,
  defaultPadding: 0,
  snapThreshold: 10,
  animationDuration: 300,
}

// biome-ignore lint/suspicious/noExplicitAny: Internal context default
const GridLayoutContext = createContext<GridLayoutContextValue<any> | null>(
  null,
)

export interface GridLayoutContextState<T> {
  layoutState: GridLayoutConfig<T>
  isDragging: boolean
  draggedId: string | null
  draggedType: "row" | "cell" | null
  dragTargetId: string | null
  dragTargetPosition: "left" | "right" | "swap" | "newRow" | null
  isResizing: boolean
  config?: GridLayoutContextConfig
}

/**
 * Props for the GridLayoutProvider component.
 * @template T - The type of the data contained within the cells.
 */
export interface GridLayoutProviderProps<T> {
  children: React.ReactNode
  layout: GridLayoutConfig<T>
  onChange: (layout: GridLayoutConfig<T>) => void
  constants?: Partial<GridLayoutConstants>
  config?: GridLayoutContextConfig
}

/**
 * Provider component for the GridLayout.
 * Manages refs, states, and handlers to be consumed by the Grid components.
 *
 * @template T - The type of the data contained within the cells.
 */
export function GridLayoutProvider<T>({
  children,
  layout,
  onChange,
  constants,
  config,
}: GridLayoutProviderProps<T>) {
  // State
  const [isResizing, setIsResizing] = useState(false)
  const [draggedType, setDraggedType] = useState<"row" | "cell" | null>(null)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dragTargetId, setDragTargetId] = useState<string | null>(null)
  const [dragTargetPosition, setDragTargetPosition] = useState<
    "left" | "right" | "swap" | "newRow" | null
  >(null)
  const [activeCellId, setActiveCellId] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeDimensions, setResizeDimensions] = useState({
    width: 0,
    height: 0,
  })

  const mergedConstants = useMemo(
    () => ({ ...DEFAULT_CONSTANTS, ...constants }),
    [constants],
  )

  const state: GridLayoutState<T> = useMemo(
    () => ({
      isResizing,
      isDragging: draggedType !== null,
      draggedType,
      draggedId,
      dragTargetId,
      dragTargetPosition,
      activeCellId,
      dragOffset,
      resizeDimensions,
      layoutState: layout,
    }),
    [
      isResizing,
      draggedType,
      draggedId,
      dragTargetId,
      dragTargetPosition,
      activeCellId,
      dragOffset,
      resizeDimensions,
      layout,
    ],
  )

  // Refs
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rowRefs = useRef(new Map<string, HTMLDivElement | null>())
  const cellRefs = useRef(new Map<string, HTMLDivElement | null>())
  const dragHandleRefs = useRef(new Map<string, HTMLElement | null>())
  const resizeHandleRefs = useRef(new Map<string, HTMLElement | null>())

  // We memoize refs to avoid creating a new object every render,
  // but since we update mutable inner maps, ref mapping properties don't typically break React diffing.
  const refs: GridLayoutRefs = useMemo(
    () => ({
      containerRef,
      rowRefs,
      cellRefs,
      dragHandleRefs,
      resizeHandleRefs,
    }),
    [],
  )

  const handleLayoutChange = useCallback(
    (newLayout: GridLayoutConfig<T>) => {
      onChange(newLayout)
    },
    [onChange],
  )

  const resetDragState = useCallback(() => {
    setDraggedId(null)
    setDraggedType(null)
    setDragTargetId(null)
    setDragTargetPosition(null)
    setDragOffset({ x: 0, y: 0 })
  }, [])

  // Handlers
  const handlers: GridLayoutHandlers<T> = useMemo(
    () => ({
      onDragStart: (type, id) => {
        setDraggedType(type)
        setDraggedId(id)
      },
      onDragOver: (e, targetId, position = "swap") => {
        e.preventDefault()
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = "move"
        }
        if (draggedId !== targetId) {
          setDragTargetId(targetId)
          setDragTargetPosition(position)
        }
      },
      onDragLeave: () => {
        setDragTargetId(null)
      },
      onDrop: (e, targetId, position = "swap") => {
        e.preventDefault()
        if (draggedId && draggedId !== targetId) {
          if (draggedType === "row") {
            handleLayoutChange(swapRows(layout, draggedId, targetId))
          } else if (draggedType === "cell") {
            if (position === "newRow") {
              const targetRowIndex = Number.parseInt(
                targetId.replace("new-row-", ""),
                10,
              )
              if (!Number.isNaN(targetRowIndex)) {
                handleLayoutChange(
                  moveCellToNewRow(layout, draggedId, targetRowIndex),
                )
              }
            } else if (position === "swap") {
              handleLayoutChange(swapCells(layout, draggedId, targetId))
            } else if (position === "left" || position === "right") {
              handleLayoutChange(
                insertCellAdjacent(layout, draggedId, targetId, position),
              )
            }
          }
        }
        resetDragState()
      },
      onDragEnd: () => {
        resetDragState()
      },
      onResizeStart: () => {
        setIsResizing(true)
      },
      onResizingRow: (rowId, cumulativeDeltaY) => {
        const rowElem = rowRefs.current.get(rowId)
        if (!rowElem) return
        const row = layout.rows.find((r) => r.id === rowId)
        if (!row) return

        const updatedHeight = Math.max(
          mergedConstants.minRowHeight,
          (row.height || mergedConstants.minRowHeight) + cumulativeDeltaY,
        )
        rowElem.style.height = `${updatedHeight}px`
      },
      onResizeRow: (rowId, deltaY) => {
        const row = layout.rows.find((r) => r.id === rowId)
        if (row) {
          handleLayoutChange(
            resizeRow(
              layout,
              rowId,
              (row.height || mergedConstants.minRowHeight) + deltaY,
              mergedConstants.minRowHeight,
            ),
          )
        }
      },
      onResizingCell: (rowId, leftCellId, rightCellId, cumulativeDeltaX) => {
        const rowElem = rowRefs.current.get(rowId)
        const leftCellElem = cellRefs.current.get(leftCellId)
        const rightCellElem = cellRefs.current.get(rightCellId)
        if (!rowElem || !leftCellElem || !rightCellElem) return

        const rowWidth = rowElem.offsetWidth
        if (rowWidth === 0) return
        const deltaPercent = (cumulativeDeltaX / rowWidth) * 100

        // compute the new layout optimistically without React reconciliation
        const tempLayout = resizeCellPair(
          layout,
          rowId,
          leftCellId,
          rightCellId,
          deltaPercent,
          mergedConstants.minCellWidth,
        )

        const updatedRow = tempLayout.rows.find((r) => r.id === rowId)
        const updatedLeftCell = updatedRow?.cells.find(
          (c) => c.id === leftCellId,
        )
        const updatedRightCell = updatedRow?.cells.find(
          (c) => c.id === rightCellId,
        )

        if (updatedLeftCell && updatedRightCell) {
          leftCellElem.style.flex = `${updatedLeftCell.width ?? 1}`
          rightCellElem.style.flex = `${updatedRightCell.width ?? 1}`
        }
      },
      onResizeCell: (rowId, leftCellId, rightCellId, deltaX) => {
        const rowElem = rowRefs.current.get(rowId)
        if (!rowElem) return
        const rowWidth = rowElem.offsetWidth
        if (rowWidth === 0) return
        const deltaPercent = (deltaX / rowWidth) * 100
        handleLayoutChange(
          resizeCellPair(
            layout,
            rowId,
            leftCellId,
            rightCellId,
            deltaPercent,
            mergedConstants.minCellWidth,
          ),
        )
      },
      onResizeEnd: () => {
        setIsResizing(false)
      },
      onCellClick: (cellId) => {
        setActiveCellId(cellId)
      },
      onLayoutChange: handleLayoutChange,
    }),
    [
      draggedType,
      draggedId,
      layout,
      handleLayoutChange,
      resetDragState,
      mergedConstants.minRowHeight,
      mergedConstants.minCellWidth,
    ],
  )

  const contextValue: GridLayoutContextValue<T> = useMemo(
    () => ({
      state,
      config,
      constants: mergedConstants,
      refs,
      handlers,
    }),
    [state, config, mergedConstants, refs, handlers],
  )

  return (
    <GridLayoutContext.Provider value={contextValue}>
      {children}
    </GridLayoutContext.Provider>
  )
}

/**
 * Hook to consume the GridLayoutContext.
 * @template T - The type of the data contained within the cells.
 * @returns The GridLayoutContextValue.
 * @throws If used outside of a GridLayoutProvider.
 */
export function useGridLayout<T>(): GridLayoutContextValue<T> {
  const context = useContext(GridLayoutContext)
  if (!context) {
    throw new Error("useGridLayout must be used within a GridLayoutProvider")
  }
  return context as GridLayoutContextValue<T>
}

/**
 * Hook to abstract context usage for a specific row.
 * @template T - The type of the data contained within the cells.
 * @param rowId - The ID of the row.
 * @returns Row-specific state and handlers.
 */
export function useGridRow<T>(rowId: string) {
  const context = useGridLayout<T>()
  const { state, handlers, refs } = context

  const setRowRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        refs.rowRefs.current.set(rowId, node)
      } else {
        refs.rowRefs.current.delete(rowId)
      }
    },
    [rowId, refs.rowRefs],
  )

  return {
    ...context,
    isDragging: state.draggedType === "row" && state.draggedId === rowId,
    isDragTarget: state.draggedType === "row" && state.dragTargetId === rowId,
    setRowRef,
    handlers: {
      ...handlers,
      onDragStart: () => handlers.onDragStart("row", rowId),
      onDragOver: (e: React.DragEvent) => handlers.onDragOver(e, rowId, "swap"),
      onDrop: (e: React.DragEvent) => handlers.onDrop(e, rowId, "swap"),
    },
  }
}

/**
 * Hook to abstract context usage for a specific cell.
 * @template T - The type of the data contained within the cells.
 * @param cellId - The ID of the cell.
 * @returns Cell-specific state and handlers.
 */
export function useGridCell<T>(cellId: string) {
  const { state, handlers, refs, config } = useGridLayout<T>()

  const isActive = state.activeCellId === cellId
  const isDragging = state.draggedType === "cell" && state.draggedId === cellId
  const isDragTarget =
    state.dragTargetId === cellId && state.draggedType === "cell"
  const dragTargetPosition = isDragTarget ? state.dragTargetPosition : null

  const setCellRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        refs.cellRefs.current.set(cellId, node)
      } else {
        refs.cellRefs.current.delete(cellId)
      }
    },
    [cellId, refs.cellRefs],
  )

  return {
    state,
    contextConfig: config,
    isDragging,
    isDragTarget,
    dragTargetPosition,
    isActive,
    setCellRef,
    handlers: {
      ...handlers,
      onDragStart: () => handlers.onDragStart("cell", cellId),
      onDragOver: (e: React.DragEvent, position: "left" | "right" | "swap") =>
        handlers.onDragOver(e, cellId, position),
      onDrop: (e: React.DragEvent, position: "left" | "right" | "swap") =>
        handlers.onDrop(e, cellId, position),
      onClick: () => handlers.onCellClick(cellId),
    },
  }
}
