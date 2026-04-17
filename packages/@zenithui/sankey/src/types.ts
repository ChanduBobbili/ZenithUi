import type { CSSProperties, MouseEvent, ReactNode } from "react"

// ─── Data Input Types ────────────────────────────────────────────────

export interface SankeyNode {
  id: string | number
  label?: string
  color?: string
}

export interface SankeyLink {
  source: string | number
  target: string | number
  value: number
  color?: string
  label?: string
}

export interface SankeyData {
  /** Optional — nodes are auto-created from links when omitted */
  nodes?: SankeyNode[]
  links: SankeyLink[]
}

// ─── Computed Layout Types ───────────────────────────────────────────

export interface SankeyLayoutNode {
  id: string | number
  label: string
  color: string
  x0: number
  y0: number
  x1: number
  y1: number
  value: number
  depth: number
  height: number
  sourceLinks: SankeyLayoutLink[]
  targetLinks: SankeyLayoutLink[]
  index: number
}

export interface SankeyLayoutLink {
  source: SankeyLayoutNode
  target: SankeyLayoutNode
  value: number
  width: number
  y0: number
  y1: number
  color: string
  label?: string
  index: number
}

export interface SankeyLayout {
  nodes: SankeyLayoutNode[]
  links: SankeyLayoutLink[]
}

// ─── Alignment ───────────────────────────────────────────────────────

export type SankeyAlignment = "left" | "right" | "center" | "justify"

// ─── Node & Link Options ────────────────────────────────────────────

export type SankeyHighlightMode =
  | "nodes"
  | "links"
  | "incoming"
  | "outgoing"
  | "none"

export type SankeyFadeMode = "global" | "none"

export type SankeySortMode =
  | "auto"
  | "fixed"
  | ((a: SankeyLayoutNode, b: SankeyLayoutNode) => number)

export type SankeyLinkColorMode = "source" | "target" | (string & {})

export interface SankeyNodeOptions {
  width?: number
  padding?: number
  color?: string
  borderRadius?: number
  alignment?: SankeyAlignment
  highlight?: SankeyHighlightMode
  fade?: SankeyFadeMode
  sort?: SankeySortMode
  showLabels?: boolean
}

export interface SankeyLinkOptions {
  color?: SankeyLinkColorMode
  opacity?: number
  curveCorrection?: number
  gradient?: boolean
  showValues?: boolean
  sort?:
    | "auto"
    | "fixed"
    | ((a: SankeyLayoutLink, b: SankeyLayoutLink) => number)
}

// ─── Value Formatting ────────────────────────────────────────────────

export interface SankeyValueContext {
  location: "tooltip" | "label"
}

export type SankeyValueFormatter = (
  value: number,
  context: SankeyValueContext,
) => string

// ─── Item Identifiers ────────────────────────────────────────────────

export interface SankeyNodeIdentifier {
  type: "node"
  id: string | number
}

export interface SankeyLinkIdentifier {
  type: "link"
  sourceId: string | number
  targetId: string | number
}

export type SankeyItemIdentifier = SankeyNodeIdentifier | SankeyLinkIdentifier

// ─── Customization ──────────────────────────────────────────────────

export interface SankeyClassNames {
  root?: string
  svg?: string
  node?: string
  link?: string
  label?: string
  tooltip?: string
  legend?: string
}

export interface SankeySlots {
  renderNode?: (
    node: SankeyLayoutNode,
    props: { x: number; y: number; width: number; height: number },
  ) => ReactNode
  renderLink?: (
    link: SankeyLayoutLink,
    props: { d: string; strokeWidth: number },
  ) => ReactNode
  renderLabel?: (
    node: SankeyLayoutNode,
    props: { x: number; y: number },
  ) => ReactNode
  renderTooltip?: (props: SankeyTooltipProps) => ReactNode
  renderLegend?: (props: SankeyLegendProps) => ReactNode
}

// ─── Tooltip ─────────────────────────────────────────────────────────

export interface SankeyTooltipProps {
  item: SankeyLayoutNode | SankeyLayoutLink | null
  position: { x: number; y: number }
  valueFormatter?: SankeyValueFormatter
  className?: string
}

// ─── Legend ──────────────────────────────────────────────────────────

export interface SankeyLegendItem {
  id: string | number
  label: string
  color: string
}

export type SankeyLegendPosition = "top" | "bottom" | "left" | "right"
export type SankeyLegendLayout = "horizontal" | "vertical"

export interface SankeyLegendProps {
  items: SankeyLegendItem[]
  position?: SankeyLegendPosition
  layout?: SankeyLegendLayout
  className?: string
}

// ─── Events ─────────────────────────────────────────────────────────

export interface SankeyEventMap {
  "node:click": { event: MouseEvent; node: SankeyLayoutNode }
  "node:hover": { node: SankeyLayoutNode | null }
  "link:click": { event: MouseEvent; link: SankeyLayoutLink }
  "link:hover": { link: SankeyLayoutLink | null }
  "highlight:change": { item: SankeyItemIdentifier | null }
}

// ─── Chart Props ─────────────────────────────────────────────────────

export interface SankeyChartProps {
  data: SankeyData
  width?: number | string
  height: number
  nodeOptions?: SankeyNodeOptions
  linkOptions?: SankeyLinkOptions
  iterations?: number
  valueFormatter?: SankeyValueFormatter

  // Events
  onNodeClick?: (event: MouseEvent, node: SankeyLayoutNode) => void
  onLinkClick?: (event: MouseEvent, link: SankeyLayoutLink) => void
  onHighlightChange?: (item: SankeyItemIdentifier | null) => void

  // Controlled highlighting
  highlightedItem?: SankeyItemIdentifier | null

  // Tooltip
  tooltip?: boolean

  // Legend
  legend?: boolean | Omit<SankeyLegendProps, "items">

  // Customization
  classNames?: SankeyClassNames
  slots?: SankeySlots

  // Accessibility
  "aria-label"?: string

  // Standard HTML
  className?: string
  style?: CSSProperties
}
