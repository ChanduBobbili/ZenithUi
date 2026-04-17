import type { MouseEvent } from "react"
import type { SankeyLayoutNode, SankeySlots } from "../types"
import { useSankeyContext } from "./sankey-store-provider"

interface SankeyNodePlotProps {
  nodes: SankeyLayoutNode[]
  borderRadius?: number
  className?: string
  slots?: SankeySlots
}

export function SankeyNodePlot({
  nodes,
  borderRadius = 8,
  className,
  slots,
}: SankeyNodePlotProps) {
  const { store, emitter } = useSankeyContext()

  const handleMouseEnter = (node: SankeyLayoutNode) => {
    store.getState().setHoveredItem(node)
    emitter.emit("node:hover", { node })
  }

  const handleMouseLeave = () => {
    store.getState().setHoveredItem(null)
    emitter.emit("node:hover", { node: null })
  }

  const handleClick = (event: MouseEvent, node: SankeyLayoutNode) => {
    emitter.emit("node:click", { event, node })
  }

  return (
    <g className={className}>
      {nodes.map((node) => {
        const x = node.x0
        const y = node.y0
        const width = node.x1 - node.x0
        const height = node.y1 - node.y0

        if (slots?.renderNode) {
          return (
            <g key={`node-${node.id}`}>
              {slots.renderNode(node, { x, y, width, height })}
            </g>
          )
        }

        return (
          <rect
            key={`node-${node.id}`}
            x={x}
            y={y}
            width={width}
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill={node.color}
            className="sankey-node"
            tabIndex={0}
            role="button"
            aria-label={`Node: ${node.label}`}
            onMouseEnter={() => handleMouseEnter(node)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => handleClick(e, node)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick(e as unknown as MouseEvent, node)
              }
            }}
            style={{ cursor: "pointer", transition: "filter 0.2s ease" }}
          />
        )
      })}
    </g>
  )
}
