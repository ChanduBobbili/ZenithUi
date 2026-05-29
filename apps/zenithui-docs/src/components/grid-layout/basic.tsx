"use client"

import { GridLayout } from "@zenithui/grid-layout"
import { useState } from "react"
import CodePreview from "../code-preview"
import { demoLayout, renderWidget } from "./demo-data"

const previewClassName =
  "flex items-center justify-center overflow-visible rounded-sm bg-slate-100 p-12 dark:bg-zinc-900"

export default function BasicGridLayout() {
  const [layout, setLayout] = useState(demoLayout)

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        Hover the grid to reveal resize handles. Drag cells to reorder, resize
        columns between adjacent cells, and drag rows to swap order.
      </p>
      <CodePreview
        previewClassName={previewClassName}
        code={{
          code: `
import { GridLayout } from "@zenithui/grid-layout"
import { useState } from "react"

const initialLayout = {
  rows: [
    {
      id: "row-1",
      height: 220,
      cells: [
        { id: "cell-1", width: 2, data: { title: "Widget A" } },
        { id: "cell-2", width: 1, data: { title: "Widget B" } },
      ],
    },
    {
      id: "row-2",
      height: 220,
      cells: [{ id: "cell-3", width: 1, data: { title: "Widget C" } }],
    },
  ],
}

export default function BasicGridLayout() {
  const [layout, setLayout] = useState(initialLayout)

  return (
    <GridLayout
      layout={layout}
      onChange={setLayout}
      columnGapPx={8}
      rowGapPx={8}
      renderItem={(cell) => (
        <div className="flex h-full items-center justify-center rounded-lg border p-4">
          {cell.data.title}
        </div>
      )}
    />
  )
}
        `,
          language: "jsx",
        }}
      >
        <div className="w-full max-w-3xl">
          <GridLayout
            layout={layout}
            onChange={setLayout}
            columnGapPx={8}
            rowGapPx={8}
            renderItem={renderWidget}
          />
        </div>
      </CodePreview>
    </div>
  )
}
