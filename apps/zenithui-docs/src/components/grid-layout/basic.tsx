"use client"

import { useState } from "react"
import { GridLayout, type GridLayoutConfig } from "@zenithui/grid-layout"

const initialLayout: GridLayoutConfig<{ label: string }> = {
  rows: [
    {
      id: "row-1",
      height: 200,
      cells: [
        { id: "cell-1", width: 1, data: { label: "Cell 1" } },
        { id: "cell-2", width: 1, data: { label: "Cell 2" } },
      ],
    },
    {
      id: "row-2",
      height: 200,
      cells: [{ id: "cell-3", width: 1, data: { label: "Cell 3" } }],
    },
  ],
}

export default function BasicGridLayout() {
  const [layout, setLayout] = useState(initialLayout)

  return (
    <div className="bg-background my-6 rounded-xl border p-4 shadow-sm">
      <GridLayout
        layout={layout}
        onChange={setLayout}
        className="gap-4"
        renderItem={(cell) => (
          <div className="bg-primary/10 border-primary/20 flex h-full w-full items-center justify-center rounded-lg border text-sm font-medium">
            {cell.data.label}
          </div>
        )}
      />
    </div>
  )
}
