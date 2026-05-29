# @zenithui/grid-layout

A flexible, interactive grid layout component for React with drag-and-drop cell/row reordering, live column and row resizing, and a 12-column snap grid. Part of the [ZenithUI](https://zenithui-docs.vercel.app/) ecosystem.

## Features

- **Drag-and-drop cells** — swap, insert-left/right, or eject to a new row
- **Drag-and-drop rows** — reorder full rows
- **Column resize** — mouse-drag resize between adjacent cells, snaps to 12-column grid on release
- **Row resize** — vertical drag resize with minimum height support
- **Render-prop API** — fully customisable item, drag-handle, row-controls, and empty-state rendering
- **Readonly mode** — disable all interactions with a single boolean
- **Per-cell / per-row flags** — `reorderable` and `resizable` to opt individual cells/rows out
- **Framer-motion animated handles** — spring-animated indicator dot on resize rails

## Installation

```bash
pnpm add @zenithui/grid-layout framer-motion
```

## Basic Usage

```tsx
import { GridLayout } from '@zenithui/grid-layout'
import { useState } from 'react'
import type { GridLayoutConfig } from '@zenithui/grid-layout'

type WidgetData = { title: string }

const initialLayout: GridLayoutConfig<WidgetData> = {
  rows: [
    {
      id: 'row-1',
      cells: [
        { id: 'cell-1', data: { title: 'Widget A' } },
        { id: 'cell-2', data: { title: 'Widget B' } },
      ],
    },
    {
      id: 'row-2',
      cells: [
        { id: 'cell-3', data: { title: 'Widget C' } },
      ],
    },
  ],
}

export function Dashboard() {
  const [layout, setLayout] = useState(initialLayout)

  return (
    <GridLayout
      layout={layout}
      onChange={setLayout}
      renderItem={(cell) => (
        <div className="border rounded-lg p-4 h-full">
          {cell.data.title}
        </div>
      )}
    />
  )
}
```

## API

### `GridLayout<T>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `GridLayoutConfig<T>` | — | The current layout state |
| `onChange` | `(layout: GridLayoutConfig<T>) => void` | — | Called on every structural change |
| `renderItem` | `(cell: GridCell<T>) => ReactNode` | — | Render content for each cell |
| `renderRowControls` | `(row: GridRow<T>) => ReactNode` | — | Optional controls overlay per row |
| `renderEmptyState` | `() => ReactNode` | — | Custom empty state when there are no rows |
| `rowResizeHandle` | `ReactNode` | — | Custom row resize handle UI |
| `colResizeHandle` | `ReactNode` | — | Custom column resize handle UI |
| `dragHandle` | `(props) => ReactNode` | — | Custom drag handle for cells |
| `showDragHandle` | `boolean` | `true` | Show/hide cell drag handles |
| `readonly` | `boolean` | `false` | Disable all drag-and-drop and resize interactions |
| `columnGapPx` | `number` | `0` | Horizontal gap between cells in pixels |
| `rowGapPx` | `number` | `0` | Vertical gap between rows in pixels |

### Types

```ts
interface GridCell<T> {
  id: string
  width?: number      // flex weight (normalised to percentage internally)
  minWidth?: number   // minimum width as percentage (default 10)
  reorderable?: boolean
  resizable?: boolean
  data: T
}

interface GridRow<T> {
  id: string
  height?: number     // pixel height (default 280)
  minHeight?: number  // minimum pixel height (default 100)
  reorderable?: boolean
  cells: GridCell<T>[]
}

interface GridLayoutConfig<T> {
  rows: GridRow<T>[]
}
```

### Utility Functions

All layout mutation helpers are exported for use outside the component:

| Function | Description |
|----------|-------------|
| `swapRows(layout, rowId1, rowId2)` | Swap two rows |
| `swapCells(layout, cellId1, cellId2)` | Swap two cells (preserving slot widths) |
| `insertCellAdjacent(layout, srcId, targetId, position)` | Move cell left/right of target |
| `moveCellToNewRow(layout, cellId, index)` | Eject cell to a new row at index |
| `resizeCellPair(layout, rowId, leftId, rightId, deltaPercent)` | Resize two adjacent cells |
| `resizeRow(layout, rowId, newHeight)` | Resize a row |
| `snapRowToGrid(layout, rowId, columns?)` | Snap cell widths to nearest column |
| `removeCell(layout, cellId)` | Remove a cell |
| `removeRow(layout, rowId)` | Remove a row |

## License

MIT © [Chandu Bobbili](https://github.com/ChanduBobbili)
