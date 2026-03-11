"use client"

import { useState } from "react"
import {
  ColResizeHandle,
  GridLayout,
  type GridLayoutConfig,
  RowResizeHandle,
} from "@zenithui/grid-layout"
import { GripHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"

// --- Mock Data & Types ---

type WidgetType =
  | "FUNNELS"
  | "RETENTION"
  | "USERFLOWS"
  | "LINE"
  | "STACKED_LINE"
  | "BAR"
  | "STACKED_BAR"
  | "PIE_CHART"
  | "METRIC"
  | "COLUMN"
  | "STACKED_COLUMN"

interface WidgetData {
  type: WidgetType
  name: string
}

const CHART_LABELS: Record<WidgetType, { label: string; color: string }> = {
  FUNNELS: { label: "Funnel", color: "bg-violet-500/20 text-violet-600" },
  RETENTION: {
    label: "Retention",
    color: "bg-emerald-500/20 text-emerald-600",
  },
  USERFLOWS: { label: "User Flows", color: "bg-cyan-500/20 text-cyan-600" },
  LINE: { label: "Line Chart", color: "bg-blue-500/20 text-blue-600" },
  STACKED_LINE: {
    label: "Stacked Line",
    color: "bg-blue-500/20 text-blue-600",
  },
  BAR: { label: "Bar Chart", color: "bg-amber-500/20 text-amber-600" },
  STACKED_BAR: {
    label: "Stacked Bar",
    color: "bg-amber-500/20 text-amber-600",
  },
  PIE_CHART: { label: "Pie Chart", color: "bg-rose-500/20 text-rose-600" },
  METRIC: { label: "Metric", color: "bg-green-500/20 text-green-600" },
  COLUMN: { label: "Column", color: "bg-orange-500/20 text-orange-600" },
  STACKED_COLUMN: {
    label: "Stacked Column",
    color: "bg-orange-500/20 text-orange-600",
  },
}

const initialLayout: GridLayoutConfig<WidgetData> = {
  rows: [
    {
      id: "row-1",
      height: 300,
      minHeight: 150,
      cells: [
        {
          id: "cell-1",
          width: 2,
          minWidth: 20,
          data: { type: "LINE", name: "User Trends" },
        },
        {
          id: "cell-2",
          width: 1,
          minWidth: 15,
          data: { type: "METRIC", name: "Daily Active Users" },
        },
        {
          id: "cell-3",
          width: 1,
          minWidth: 15,
          data: { type: "METRIC", name: "Conversion Rate" },
        },
      ],
    },
    {
      id: "row-2",
      height: 320,
      minHeight: 150,
      cells: [
        {
          id: "cell-4",
          width: 1,
          minWidth: 30,
          data: { type: "BAR", name: "Revenue by Channel" },
        },
        {
          id: "cell-5",
          width: 1,
          minWidth: 30,
          data: { type: "PIE_CHART", name: "Traffic Sources" },
        },
      ],
    },
    {
      id: "row-3",
      height: 280,
      minHeight: 150,
      cells: [
        {
          id: "cell-6",
          width: 1,
          data: { type: "FUNNELS", name: "Signup Funnel" },
        },
      ],
    },
  ],
}

// --- Dashboard Component ---

export default function DashboardDemo() {
  const [layout, setLayout] =
    useState<GridLayoutConfig<WidgetData>>(initialLayout)

  const handleRemoveCell = (cellId: string) => {
    setLayout((prev) => {
      let newRows = prev.rows.map((row) => ({
        ...row,
        cells: row.cells.filter((c) => c.id !== cellId),
      }))
      // Remove empty rows
      newRows = newRows.filter((row) => row.cells.length > 0)
      return { ...prev, rows: newRows }
    })
  }

  const handleRemoveRow = (rowId: string) => {
    setLayout((prev) => ({
      ...prev,
      rows: prev.rows.filter((row) => row.id !== rowId),
    }))
  }

  return (
    <div className="bg-background my-6 flex w-full flex-col overflow-hidden rounded-xl border shadow-sm">
      <div className="bg-muted/30 flex items-center justify-between border-b px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold">Analytics Dashboard</h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Demonstrating resizable grid layout recreating Anthra Labs
            aesthetic.
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-x-hidden p-8">
        <GridLayout
          layout={layout}
          onChange={setLayout}
          className="w-full gap-5"
          dragHandle={() => null} // Disable default drag handle since we use custom ones in renderItem
          renderDropZoneOverlay={(position) => {
            if (position === "swap") {
              return (
                <div className="ring-offset-background pointer-events-none absolute inset-x-2 inset-y-2 z-20 rounded-xl bg-emerald-500/10 ring-2 ring-emerald-500 ring-offset-2 transition-all" />
              )
            }
            if (position === "newRow") {
              return (
                <div className="border-primary/50 bg-primary/10 pointer-events-none absolute inset-x-0 -inset-y-3 z-20 rounded-lg border-2 border-dashed shadow-sm" />
              )
            }
            // left and right insertions
            return (
              <div
                className={cn(
                  "pointer-events-none absolute inset-y-0 z-20 w-3 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]",
                  position === "left" ? "-left-1.5" : "-right-1.5",
                )}
              />
            )
          }}
          renderRowControls={(row) => (
            <div className="absolute top-1/2 -left-10 z-20 flex -translate-y-1/2 flex-col gap-1.5 opacity-0 transition-opacity group-hover/row:opacity-100">
              <button
                type="button"
                className="bg-background hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive text-muted-foreground cursor-pointer rounded-md border p-1.5 shadow-sm transition-colors"
                onClick={() => handleRemoveRow(row.id)}
                aria-label="Remove row"
                title="Remove entire row"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          renderItem={(cell, { dragHandleProps }) => {
            const data = cell.data
            if (!data) return null
            const chartMeta = CHART_LABELS[data.type] ?? {
              label: data.type,
              color: "bg-muted text-muted-foreground",
            }

            return (
              <div className="bg-card group/widget border-border/50 hover:border-primary/30 relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border p-6 pt-12 shadow-sm transition-all hover:shadow-md">
                {/* Hover Actions */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 opacity-0 transition-opacity group-hover/widget:opacity-100 focus-within:opacity-100">
                  <button
                    type="button"
                    {...dragHandleProps}
                    className="bg-background/80 hover:bg-accent text-muted-foreground hover:text-foreground border-border/50 cursor-grab rounded-md border p-1.5 shadow-sm backdrop-blur-sm transition-colors active:cursor-grabbing"
                    aria-label="Drag widget"
                    title="Drag widget"
                  >
                    <GripHorizontal className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute top-3 right-3 z-10 opacity-0 transition-opacity group-hover/widget:opacity-100 focus-within:opacity-100">
                  <button
                    type="button"
                    onClick={() => handleRemoveCell(cell.id)}
                    className="bg-background/80 hover:bg-destructive/10 text-muted-foreground hover:text-destructive border-border/50 cursor-pointer rounded-md border p-1.5 shadow-sm backdrop-blur-sm transition-colors"
                    aria-label="Remove widget"
                    title="Remove widget"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Widget Content */}
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.65rem] font-bold tracking-widest uppercase",
                    chartMeta.color,
                  )}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-20" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                  </span>
                  {chartMeta.label}
                </div>
                <span className="text-foreground text-center text-xl font-semibold tracking-tight">
                  {data.name}
                </span>
                <div className="mt-auto flex items-center gap-2">
                  <span className="text-muted-foreground/60 text-[10px] font-medium">
                    DRAG TO MOVE
                  </span>
                  <div className="bg-muted-foreground/20 h-1 w-1 rounded-full" />
                  <span className="text-muted-foreground/60 text-[10px] font-medium">
                    RESIZE EDGES
                  </span>
                </div>
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}
