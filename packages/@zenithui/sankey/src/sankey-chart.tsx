import { useCallback, useEffect, useMemo } from "react"
import type {
  SankeyChartProps,
  SankeyItemIdentifier,
  SankeyLayoutLink,
  SankeyLayoutNode,
  SankeyLegendItem,
} from "./types"
import {
  SankeyStoreProvider,
  useSankeyContext,
} from "./components/sankey-store-provider"
import { SankeyNodePlot } from "./components/sankey-node-plot"
import { SankeyLinkPlot } from "./components/sankey-link-plot"
import { SankeyNodeLabelPlot } from "./components/sankey-node-label-plot"
import { SankeyTooltip } from "./components/sankey-tooltip"
import { SankeyLegend } from "./components/sankey-legend"
import { useSankeyLayout } from "./hooks/use-sankey-layout"
import { useSankeyEvent } from "./events/use-sankey-events"
import { useResizeObserver } from "@zenithui/utils"
import "./styles/sankey.css"

// ─── Inner Chart (needs store context) ──────────────────────────────

function SankeyChartInner({
  data,
  width: widthProp,
  height,
  nodeOptions = {},
  linkOptions = {},
  iterations = 32,
  valueFormatter,
  onNodeClick,
  onLinkClick,
  onHighlightChange,
  highlightedItem,
  tooltip = true,
  legend,
  classNames = {},
  slots,
  "aria-label": ariaLabel,
  className,
  style,
}: SankeyChartProps) {
  const { ref: containerRef, size } = useResizeObserver<HTMLDivElement>()
  const { store, emitter } = useSankeyContext()

  // Resolve width
  const resolvedWidth =
    typeof widthProp === "number"
      ? widthProp
      : size.width > 0
        ? size.width
        : 800

  // Compute layout
  const layout = useSankeyLayout(data, resolvedWidth, height, {
    nodeWidth: nodeOptions.width ?? 15,
    nodePadding: nodeOptions.padding ?? 8,
    alignment: nodeOptions.alignment ?? "justify",
    iterations,
    nodeColor: nodeOptions.color,
  })

  // Sync layout to store
  useEffect(() => {
    store.getState().setLayout(layout)
  }, [layout, store])

  // Sync controlled highlighting
  useEffect(() => {
    if (highlightedItem !== undefined) {
      store.getState().setHighlightedItem(highlightedItem ?? null)
    }
  }, [highlightedItem, store])

  // Forward events to callbacks
  const handleNodeClick = useCallback(
    (payload: { event: React.MouseEvent; node: SankeyLayoutNode }) => {
      onNodeClick?.(payload.event, payload.node)
    },
    [onNodeClick],
  )

  const handleLinkClick = useCallback(
    (payload: { event: React.MouseEvent; link: SankeyLayoutLink }) => {
      onLinkClick?.(payload.event, payload.link)
    },
    [onLinkClick],
  )

  const handleHighlightChange = useCallback(
    (payload: { item: SankeyItemIdentifier | null }) => {
      onHighlightChange?.(payload.item)
    },
    [onHighlightChange],
  )

  useSankeyEvent(emitter, "node:click", handleNodeClick)
  useSankeyEvent(emitter, "link:click", handleLinkClick)
  useSankeyEvent(emitter, "highlight:change", handleHighlightChange)

  // Build legend items from unique nodes
  const legendItems: SankeyLegendItem[] = useMemo(() => {
    if (!legend) return []
    const seen = new Set<string>()
    return layout.nodes
      .filter((n) => {
        if (seen.has(n.color)) return false
        seen.add(n.color)
        return true
      })
      .map((n) => ({
        id: n.id,
        label: n.label,
        color: n.color,
      }))
  }, [layout.nodes, legend])

  const legendPosition = typeof legend === "object" ? legend.position : "bottom"
  const showLegendTop = legend && legendPosition === "top"
  const showLegendBottom =
    legend && (legendPosition === "bottom" || legendPosition === undefined)

  return (
    <div
      ref={containerRef}
      className={`sankey-chart ${classNames.root ?? ""} ${className ?? ""}`}
      style={{
        width:
          typeof widthProp === "string" ? widthProp : (widthProp ?? "100%"),
        position: "relative",
        ...style,
      }}
    >
      {showLegendTop && (
        <SankeyLegend
          items={legendItems}
          position="top"
          layout={typeof legend === "object" ? legend.layout : "horizontal"}
          className={classNames.legend}
          slots={slots}
        />
      )}

      <svg
        width={resolvedWidth}
        height={height}
        viewBox={`0 0 ${resolvedWidth} ${height}`}
        role="img"
        aria-label={ariaLabel ?? "Sankey chart"}
        className={classNames.svg}
        style={{ display: "block", overflow: "visible" }}
      >
        <SankeyLinkPlot
          links={layout.links}
          colorMode={linkOptions.color}
          opacity={linkOptions.opacity}
          gradient={linkOptions.gradient}
          curveCorrection={linkOptions.curveCorrection}
          className={classNames.link}
          slots={slots}
        />
        <SankeyNodePlot
          nodes={layout.nodes}
          borderRadius={nodeOptions.borderRadius ?? 8}
          className={classNames.node}
          slots={slots}
        />
        <SankeyNodeLabelPlot
          nodes={layout.nodes}
          showLabels={nodeOptions.showLabels ?? true}
          valueFormatter={valueFormatter}
          className={classNames.label}
          slots={slots}
          chartWidth={resolvedWidth}
        />
      </svg>

      {tooltip && (
        <SankeyTooltip
          valueFormatter={valueFormatter}
          className={classNames.tooltip}
          slots={slots}
        />
      )}

      {showLegendBottom && (
        <SankeyLegend
          items={legendItems}
          position="bottom"
          layout={typeof legend === "object" ? legend.layout : "horizontal"}
          className={classNames.legend}
          slots={slots}
        />
      )}
    </div>
  )
}

// ─── Public API ─────────────────────────────────────────────────────

export function SankeyChart(props: SankeyChartProps) {
  return (
    <SankeyStoreProvider>
      <SankeyChartInner {...props} />
    </SankeyStoreProvider>
  )
}

export default SankeyChart
