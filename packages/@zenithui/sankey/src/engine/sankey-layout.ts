import type {
  SankeyAlignment,
  SankeyData,
  SankeyLayout,
  SankeyLayoutLink,
  SankeyLayoutNode,
  SankeyNode,
} from "../types"
import { detectAndRemoveCycles } from "./cycle-detection"
import { resolveNodeColor } from "./colors"

// ─── Alignment Strategies ────────────────────────────────────────────

function alignLeft(node: InternalNode, _maxDepth: number): number {
  return node.depth
}

function alignRight(node: InternalNode, maxDepth: number): number {
  return maxDepth - 1 - node.height
}

function alignJustify(node: InternalNode, maxDepth: number): number {
  if (node.sourceLinks.length === 0) {
    return maxDepth - 1
  }
  return node.depth
}

function alignCenter(node: InternalNode, maxDepth: number): number {
  if (node.targetLinks.length === 0) {
    return node.depth
  }
  if (node.sourceLinks.length === 0) {
    return maxDepth - 1
  }
  return node.depth
}

const ALIGN_FNS: Record<
  SankeyAlignment,
  (node: InternalNode, maxDepth: number) => number
> = {
  left: alignLeft,
  right: alignRight,
  justify: alignJustify,
  center: alignCenter,
}

// ─── Internal Types ──────────────────────────────────────────────────

interface InternalNode {
  id: string | number
  label: string
  color: string
  index: number
  depth: number
  height: number
  layer: number
  value: number
  x0: number
  y0: number
  x1: number
  y1: number
  sourceLinks: InternalLink[]
  targetLinks: InternalLink[]
}

interface InternalLink {
  source: InternalNode
  target: InternalNode
  value: number
  color: string
  label?: string
  index: number
  width: number
  y0: number
  y1: number
}

// ─── Layout Options ─────────────────────────────────────────────────

export interface SankeyLayoutOptions {
  nodeWidth?: number
  nodePadding?: number
  alignment?: SankeyAlignment
  iterations?: number
  nodeColor?: string
}

// ─── Main Layout Function ────────────────────────────────────────────

/**
 * Compute the full Sankey layout from input data.
 * Pure function — no side effects, concurrent-safe.
 */
export function computeSankeyLayout(
  data: SankeyData,
  width: number,
  height: number,
  options: SankeyLayoutOptions = {},
): SankeyLayout {
  const {
    nodeWidth = 15,
    nodePadding = 8,
    alignment = "justify",
    iterations = 32,
    nodeColor,
  } = options

  // 1. Parse nodes (auto-create from links if needed)
  const nodesMap = new Map<string | number, InternalNode>()
  let nodeIndex = 0

  function ensureNode(
    id: string | number,
    inputNode?: SankeyNode,
  ): InternalNode {
    let node = nodesMap.get(id)
    if (!node) {
      node = {
        id,
        label: inputNode?.label ?? String(id),
        color: "",
        index: nodeIndex++,
        depth: 0,
        height: 0,
        layer: 0,
        value: 0,
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 0,
        sourceLinks: [],
        targetLinks: [],
      }
      nodesMap.set(id, node)
    }
    if (inputNode?.label) node.label = inputNode.label
    if (inputNode?.color) node.color = inputNode.color
    return node
  }

  // Register explicit nodes first
  if (data.nodes) {
    for (const n of data.nodes) {
      ensureNode(n.id, n)
    }
  }

  // 2. Cycle detection
  const allNodeIds = new Set<string | number>()
  for (const link of data.links) {
    allNodeIds.add(link.source)
    allNodeIds.add(link.target)
  }
  if (data.nodes) {
    for (const n of data.nodes) allNodeIds.add(n.id)
  }

  const { cleanLinks } = detectAndRemoveCycles(data.links, allNodeIds)

  // 3. Build internal links
  const links: InternalLink[] = []
  for (let i = 0; i < cleanLinks.length; i++) {
    const cl = cleanLinks[i]
    const sourceNode = ensureNode(cl.source)
    const targetNode = ensureNode(cl.target)
    const link: InternalLink = {
      source: sourceNode,
      target: targetNode,
      value: cl.value,
      color: cl.color ?? "",
      label: cl.label,
      index: i,
      width: 0,
      y0: 0,
      y1: 0,
    }
    sourceNode.sourceLinks.push(link)
    targetNode.targetLinks.push(link)
    links.push(link)
  }

  const nodes = Array.from(nodesMap.values())

  // Resolve node colors
  for (const node of nodes) {
    node.color = resolveNodeColor(node, nodeColor)
  }

  // 4. Compute node values
  for (const node of nodes) {
    const sumSource = node.sourceLinks.reduce((s, l) => s + l.value, 0)
    const sumTarget = node.targetLinks.reduce((s, l) => s + l.value, 0)
    node.value = Math.max(sumSource, sumTarget)
  }

  // 5. Compute node depths (BFS from sources)
  computeNodeDepths(nodes)

  // 6. Assign layers based on alignment
  const alignFn = ALIGN_FNS[alignment]
  const maxDepth = Math.max(...nodes.map((n) => n.depth)) + 1

  for (const node of nodes) {
    node.layer = alignFn(node, maxDepth)
  }

  // Re-normalize layers to be contiguous
  const uniqueLayers = [...new Set(nodes.map((n) => n.layer))].sort(
    (a, b) => a - b,
  )
  const layerMap = new Map<number, number>()
  uniqueLayers.forEach((l, i) => layerMap.set(l, i))
  for (const node of nodes) {
    node.layer = layerMap.get(node.layer) ?? node.layer
  }

  const numLayers = uniqueLayers.length

  // 7. Compute horizontal positions
  const xScale = numLayers <= 1 ? 0 : (width - nodeWidth) / (numLayers - 1)
  for (const node of nodes) {
    node.x0 = node.layer * xScale
    node.x1 = node.x0 + nodeWidth
  }

  // 8. Group nodes by layer
  const layers: InternalNode[][] = Array.from({ length: numLayers }, () => [])
  for (const node of nodes) {
    layers[node.layer].push(node)
  }

  // 9. Initialize vertical positions
  initializeVerticalPositions(layers, height, nodePadding)

  // 10. Iterative relaxation
  for (let i = 0; i < iterations; i++) {
    const alpha = 0.99 ** i
    const factor = Math.max(alpha, 0.001)

    // Relax from left to right
    for (let l = 1; l < numLayers; l++) {
      for (const node of layers[l]) {
        if (node.targetLinks.length > 0) {
          const weightedY =
            node.targetLinks.reduce(
              (s, link) => s + linkCenter(link, "source") * link.value,
              0,
            ) / node.targetLinks.reduce((s, l) => s + l.value, 0)
          const dy = (weightedY - nodeCenter(node)) * factor
          node.y0 += dy
          node.y1 += dy
        }
      }
      resolveCollisions(layers[l], height, nodePadding)
    }

    // Relax from right to left
    for (let l = numLayers - 2; l >= 0; l--) {
      for (const node of layers[l]) {
        if (node.sourceLinks.length > 0) {
          const weightedY =
            node.sourceLinks.reduce(
              (s, link) => s + linkCenter(link, "target") * link.value,
              0,
            ) / node.sourceLinks.reduce((s, l) => s + l.value, 0)
          const dy = (weightedY - nodeCenter(node)) * factor
          node.y0 += dy
          node.y1 += dy
        }
      }
      resolveCollisions(layers[l], height, nodePadding)
    }
  }

  // 11. Compute link positions (y0, y1, width)
  computeLinkPositions(layers)

  // 12. Build output
  const layoutNodes: SankeyLayoutNode[] = nodes.map((n) => ({
    id: n.id,
    label: n.label,
    color: n.color,
    x0: n.x0,
    y0: n.y0,
    x1: n.x1,
    y1: n.y1,
    value: n.value,
    depth: n.depth,
    height: n.height,
    sourceLinks: [] as SankeyLayoutLink[],
    targetLinks: [] as SankeyLayoutLink[],
    index: n.index,
  }))

  const nodeById = new Map<string | number, SankeyLayoutNode>()
  for (const n of layoutNodes) nodeById.set(n.id, n)

  const layoutLinks: SankeyLayoutLink[] = links.map((l) => {
    const source = nodeById.get(l.source.id)
    const target = nodeById.get(l.target.id)
    if (!source || !target) {
      throw new Error(
        `[sankey-layout] Missing node for link: source="${l.source.id}", target="${l.target.id}"`,
      )
    }
    return {
      source,
      target,
      value: l.value,
      width: l.width,
      y0: l.y0,
      y1: l.y1,
      color: l.color,
      label: l.label,
      index: l.index,
    }
  })

  // Attach links to nodes
  for (const link of layoutLinks) {
    link.source.sourceLinks.push(link)
    link.target.targetLinks.push(link)
  }

  return { nodes: layoutNodes, links: layoutLinks }
}

// ─── Helpers ─────────────────────────────────────────────────────────

function computeNodeDepths(nodes: InternalNode[]): void {
  const remaining = new Set(nodes)
  let currentDepth = 0

  while (remaining.size > 0) {
    const nextSet: InternalNode[] = []
    for (const node of remaining) {
      if (node.targetLinks.every((l) => !remaining.has(l.source))) {
        node.depth = currentDepth
        nextSet.push(node)
      }
    }
    if (nextSet.length === 0) {
      // Break ties for cycles that slipped through
      const first = remaining.values().next().value
      if (first) {
        first.depth = currentDepth
        remaining.delete(first)
      }
      continue
    }
    for (const node of nextSet) {
      remaining.delete(node)
    }
    currentDepth++
  }

  // Compute height (max distance to a sink)
  const maxDepth = Math.max(...nodes.map((n) => n.depth))
  for (const node of nodes) {
    node.height = maxDepth - node.depth
  }
}

function initializeVerticalPositions(
  layers: InternalNode[][],
  height: number,
  padding: number,
): void {
  for (const layer of layers) {
    const totalValue = layer.reduce((s, n) => s + n.value, 0)
    const availableHeight = height - (layer.length - 1) * padding
    const scale = totalValue > 0 ? availableHeight / totalValue : 0

    let y = 0
    for (const node of layer) {
      const nodeHeight = Math.max(node.value * scale, 1)
      node.y0 = y
      node.y1 = y + nodeHeight
      y += nodeHeight + padding
    }

    // Center the layer vertically if it doesn't fill the height
    const totalUsed = y - padding
    if (totalUsed < height) {
      const offset = (height - totalUsed) / 2
      for (const node of layer) {
        node.y0 += offset
        node.y1 += offset
      }
    }
  }
}

function resolveCollisions(
  layer: InternalNode[],
  height: number,
  padding: number,
): void {
  // Sort by current y position
  layer.sort((a, b) => a.y0 - b.y0)

  // Push down overlapping nodes
  let y = 0
  for (const node of layer) {
    const dy = Math.max(0, y - node.y0)
    if (dy > 0) {
      node.y0 += dy
      node.y1 += dy
    }
    y = node.y1 + padding
  }

  // Push up if exceeding bottom
  const lastNode = layer[layer.length - 1]
  if (lastNode && lastNode.y1 > height) {
    const overflow = lastNode.y1 - height
    lastNode.y0 -= overflow
    lastNode.y1 -= overflow

    for (let i = layer.length - 2; i >= 0; i--) {
      const below = layer[i + 1]
      const current = layer[i]
      const dy = Math.max(0, current.y1 + padding - below.y0)
      if (dy > 0) {
        current.y0 -= dy
        current.y1 -= dy
      }
    }
  }
}

function nodeCenter(node: InternalNode): number {
  return (node.y0 + node.y1) / 2
}

function linkCenter(link: InternalLink, side: "source" | "target"): number {
  const node = link[side]
  return (node.y0 + node.y1) / 2
}

function computeLinkPositions(layers: InternalNode[][]): void {
  for (const layer of layers) {
    for (const node of layer) {
      // Sort source links by target y position
      node.sourceLinks.sort((a, b) => a.target.y0 - b.target.y0)
      // Sort target links by source y position
      node.targetLinks.sort((a, b) => a.source.y0 - b.source.y0)
    }
  }

  for (const layer of layers) {
    for (const node of layer) {
      const nodeHeight = node.y1 - node.y0
      const totalSourceValue = node.sourceLinks.reduce((s, l) => s + l.value, 0)

      // Distribute source link positions along right edge
      let sy = node.y0
      for (const link of node.sourceLinks) {
        const linkHeight =
          totalSourceValue > 0
            ? (link.value / totalSourceValue) * nodeHeight
            : 0
        link.width = linkHeight
        link.y0 = sy + linkHeight / 2
        sy += linkHeight
      }

      // Distribute target link positions along left edge
      const totalTargetValue = node.targetLinks.reduce((s, l) => s + l.value, 0)
      let ty = node.y0
      for (const link of node.targetLinks) {
        const linkHeight =
          totalTargetValue > 0
            ? (link.value / totalTargetValue) * nodeHeight
            : 0
        link.width = Math.max(link.width, linkHeight)
        link.y1 = ty + linkHeight / 2
        ty += linkHeight
      }
    }
  }
}
