import { useMemo } from "react"
import {
  computeSankeyLayout,
  type SankeyLayoutOptions,
} from "../engine/sankey-layout"
import type { SankeyData, SankeyLayout } from "../types"

/**
 * Memoized layout computation hook.
 * Recomputes only when data, dimensions, or options change.
 */
export function useSankeyLayout(
  data: SankeyData,
  width: number,
  height: number,
  options: SankeyLayoutOptions = {},
): SankeyLayout {
  const { nodeWidth, nodePadding, alignment, iterations, nodeColor } = options
  return useMemo(
    () =>
      computeSankeyLayout(data, width, height, {
        nodeWidth,
        nodePadding,
        alignment,
        iterations,
        nodeColor,
      }),
    [
      data,
      width,
      height,
      nodeWidth,
      nodePadding,
      alignment,
      iterations,
      nodeColor,
    ],
  )
}
