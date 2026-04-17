// ─── Components ──────────────────────────────────────────────────────
export { SankeyChart, default } from "./sankey-chart"
export {
  SankeyStoreProvider,
  useSankeyContext,
} from "./components/sankey-store-provider"
export { SankeyNodePlot } from "./components/sankey-node-plot"
export { SankeyLinkPlot } from "./components/sankey-link-plot"
export { SankeyNodeLabelPlot } from "./components/sankey-node-label-plot"
export { SankeyTooltip } from "./components/sankey-tooltip"
export { SankeyLegend } from "./components/sankey-legend"

// ─── Hooks ───────────────────────────────────────────────────────────
export { useSankeyLayout } from "./hooks/use-sankey-layout"
export { useSankeyEvent } from "./events/use-sankey-events"

// ─── Engine ──────────────────────────────────────────────────────────
export { computeSankeyLayout } from "./engine/sankey-layout"
export { sankeyLinkPath, sankeyLinkRibbonPath } from "./engine/link-path"
export { detectAndRemoveCycles } from "./engine/cycle-detection"
export {
  DEFAULT_PALETTE,
  DEFAULT_NODE_COLOR,
  resolveNodeColor,
  resolveLinkColor,
  linkGradientId,
} from "./engine/colors"

// ─── Store ───────────────────────────────────────────────────────────
export { createSankeyStore } from "./store/sankey-store"
export { createSankeyEmitter } from "./events/sankey-events"

// ─── Types ───────────────────────────────────────────────────────────
export type {
  SankeyNode,
  SankeyLink,
  SankeyData,
  SankeyLayoutNode,
  SankeyLayoutLink,
  SankeyLayout,
  SankeyAlignment,
  SankeyHighlightMode,
  SankeyFadeMode,
  SankeySortMode,
  SankeyLinkColorMode,
  SankeyNodeOptions,
  SankeyLinkOptions,
  SankeyValueContext,
  SankeyValueFormatter,
  SankeyNodeIdentifier,
  SankeyLinkIdentifier,
  SankeyItemIdentifier,
  SankeyClassNames,
  SankeySlots,
  SankeyTooltipProps,
  SankeyLegendItem,
  SankeyLegendPosition,
  SankeyLegendLayout,
  SankeyLegendProps,
  SankeyEventMap,
  SankeyChartProps,
} from "./types"
export type { SankeyLayoutOptions } from "./engine/sankey-layout"
export type { SankeyStore, SankeyStoreState } from "./store/sankey-store"
export type { SankeyEmitter } from "./events/sankey-events"
