import type { SankeyLayoutLink } from "../types"

/**
 * Generate a cubic Bézier SVG path `d` attribute for a Sankey link.
 *
 * The path has horizontal tangents at both endpoints, producing the
 * characteristic S-curve. A `curveCorrection` value shifts the control
 * point x-offset for visual thickness tuning.
 *
 * Uses manual path construction (no d3-path dependency needed).
 */
export function sankeyLinkPath(
  link: SankeyLayoutLink,
  curveCorrection = 0,
): string {
  const sourceX = link.source.x1
  const targetX = link.target.x0
  const midX = (sourceX + targetX) / 2 + curveCorrection

  const sourceY = link.y0
  const targetY = link.y1

  // Cubic Bézier with horizontal tangents
  return (
    `M${sourceX},${sourceY}` +
    `C${midX},${sourceY} ${midX},${targetY} ${targetX},${targetY}`
  )
}

/**
 * Generate a filled area path for wider links (ribbon-style).
 * This creates a path that represents a band of width `link.width`.
 */
export function sankeyLinkRibbonPath(
  link: SankeyLayoutLink,
  curveCorrection = 0,
): string {
  const sourceX = link.source.x1
  const targetX = link.target.x0
  const midX = (sourceX + targetX) / 2 + curveCorrection
  const halfWidth = link.width / 2

  const sy0 = link.y0 - halfWidth
  const sy1 = link.y0 + halfWidth
  const ty0 = link.y1 - halfWidth
  const ty1 = link.y1 + halfWidth

  // Top edge: source top → target top
  const topEdge =
    `M${sourceX},${sy0}` + `C${midX},${sy0} ${midX},${ty0} ${targetX},${ty0}`

  // Bottom edge: target bottom → source bottom (reversed)
  const bottomEdge =
    `L${targetX},${ty1}` + `C${midX},${ty1} ${midX},${sy1} ${sourceX},${sy1}`

  return `${topEdge}${bottomEdge}Z`
}
