import type { GridLayoutConfig } from "@zenithui/grid-layout"

export type WidgetData = { title: string; color: string }

export const demoLayout: GridLayoutConfig<WidgetData> = {
  rows: [
    {
      id: "row-1",
      height: 220,
      cells: [
        {
          id: "cell-1",
          width: 2,
          data: { title: "Widget A", color: "bg-blue-500/10 border-blue-500/30" },
        },
        {
          id: "cell-2",
          width: 1,
          data: { title: "Widget B", color: "bg-emerald-500/10 border-emerald-500/30" },
        },
      ],
    },
    {
      id: "row-2",
      height: 220,
      cells: [
        {
          id: "cell-3",
          width: 1,
          data: { title: "Widget C", color: "bg-violet-500/10 border-violet-500/30" },
        },
      ],
    },
  ],
}

export function renderWidget(cell: { data: WidgetData }) {
  return (
    <div
      className={`flex h-full w-full flex-col justify-center rounded-lg border p-4 ${cell.data.color}`}
    >
      <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
        Widget
      </span>
      <span className="text-foreground text-lg font-semibold">{cell.data.title}</span>
    </div>
  )
}
