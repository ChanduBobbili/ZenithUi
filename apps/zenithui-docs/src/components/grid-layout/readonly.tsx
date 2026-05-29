"use client"

import { GridLayout } from "@zenithui/grid-layout"
import CodePreview from "../code-preview"
import { demoLayout, renderWidget } from "./demo-data"

const previewClassName =
  "flex items-center justify-center overflow-visible rounded-sm bg-slate-100 p-12 dark:bg-zinc-900"

export default function ReadonlyGridLayout() {
  return (
    <CodePreview
      previewClassName={previewClassName}
      code={{
        code: `
import { GridLayout } from "@zenithui/grid-layout"

export default function ReadonlyGridLayout() {
  return (
    <GridLayout
      layout={layout}
      onChange={() => {}}
      readonly
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
          layout={demoLayout}
          onChange={() => {}}
          readonly
          columnGapPx={8}
          rowGapPx={8}
          renderItem={renderWidget}
        />
      </div>
    </CodePreview>
  )
}
