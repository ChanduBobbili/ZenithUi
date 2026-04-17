import type { SankeyLink } from "../types"

/**
 * Detect cycles in a directed graph using DFS.
 * Returns the filtered links (with cycles removed) and any detected cycle paths.
 */
export function detectAndRemoveCycles(
  links: SankeyLink[],
  nodeIds: Set<string | number>,
): { cleanLinks: SankeyLink[]; cycles: Array<Array<string | number>> } {
  // Build adjacency list
  const adj = new Map<
    string | number,
    Array<{ target: string | number; linkIndex: number }>
  >()
  for (const id of nodeIds) {
    adj.set(id, [])
  }
  for (let i = 0; i < links.length; i++) {
    const link = links[i]
    const neighbors = adj.get(link.source)
    if (neighbors) {
      neighbors.push({ target: link.target, linkIndex: i })
    }
  }

  const WHITE = 0 // unvisited
  const GRAY = 1 // in current DFS path
  const BLACK = 2 // fully processed

  const color = new Map<string | number, number>()
  for (const id of nodeIds) {
    color.set(id, WHITE)
  }

  const parent = new Map<string | number, string | number | null>()
  const cycles: Array<Array<string | number>> = []
  const cyclicLinkIndices = new Set<number>()

  function dfs(u: string | number): void {
    color.set(u, GRAY)
    const neighbors = adj.get(u) || []
    for (const { target: v, linkIndex } of neighbors) {
      const vColor = color.get(v)
      if (vColor === GRAY) {
        // Found a cycle — trace it back
        const cycle: Array<string | number> = [v, u]
        let cur = u
        while (cur !== v) {
          const p = parent.get(cur)
          if (p === null || p === undefined || p === v) break
          cycle.push(p)
          cur = p
        }
        cycle.reverse()
        cycles.push(cycle)
        cyclicLinkIndices.add(linkIndex)
      } else if (vColor === WHITE) {
        parent.set(v, u)
        dfs(v)
      }
    }
    color.set(u, BLACK)
  }

  for (const id of nodeIds) {
    if (color.get(id) === WHITE) {
      parent.set(id, null)
      dfs(id)
    }
  }

  // Warn about detected cycles
  if (cycles.length > 0) {
    for (const cycle of cycles) {
      console.warn(
        `[@zenithui/sankey] Cycle detected: ${cycle.map(String).join(" → ")}. The offending link has been removed.`,
      )
    }
  }

  const cleanLinks = links.filter((_, i) => !cyclicLinkIndices.has(i))
  return { cleanLinks, cycles }
}
