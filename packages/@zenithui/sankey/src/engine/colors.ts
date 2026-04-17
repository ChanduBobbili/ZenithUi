import type { SankeyLayoutLink, SankeyLinkColorMode } from "../types"

/** Default 10-color palette — curated for dark backgrounds */
export const DEFAULT_PALETTE = [
  "#4932A4", // primary purple
  "#6C5CE7",
  "#A29BFE",
  "#0984E3",
  "#74B9FF",
  "#00CEC9",
  "#55EFC4",
  "#FDCB6E",
  "#E17055",
  "#D63031",
] as const

export const DEFAULT_NODE_COLOR = DEFAULT_PALETTE[0]

/**
 * Resolve node color:
 * 1. Per-node color override (node.color)
 * 2. Global nodeOptions.color
 * 3. Palette by index
 */
export function resolveNodeColor(
  node: { color?: string; index: number },
  globalColor?: string,
): string {
  if (node.color) return node.color
  if (globalColor) return globalColor
  return DEFAULT_PALETTE[node.index % DEFAULT_PALETTE.length]
}

/**
 * Resolve link color based on mode:
 * - 'source': inherit source node color
 * - 'target': inherit target node color
 * - any other string: use as a hex color
 */
export function resolveLinkColor(
  link: SankeyLayoutLink,
  mode: SankeyLinkColorMode = "source",
): string {
  if (mode === "source") return link.source.color
  if (mode === "target") return link.target.color
  return mode
}

/**
 * Generate a unique SVG gradient ID for a link.
 */
export function linkGradientId(link: SankeyLayoutLink): string {
  return `sankey-gradient-${link.source.id}-${link.target.id}-${link.index}`
}
