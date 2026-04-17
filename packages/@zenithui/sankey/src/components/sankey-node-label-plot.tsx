import type {
  SankeyLayoutNode,
  SankeySlots,
  SankeyValueFormatter,
} from "../types"

interface SankeyNodeLabelPlotProps {
  nodes: SankeyLayoutNode[]
  showLabels?: boolean
  valueFormatter?: SankeyValueFormatter
  className?: string
  slots?: SankeySlots
  chartWidth?: number
}

export function SankeyNodeLabelPlot({
  nodes,
  showLabels = true,
  valueFormatter,
  className,
  slots,
  chartWidth = 0,
}: SankeyNodeLabelPlotProps) {
  if (!showLabels) return null

  return (
    <g className={className}>
      {nodes.map((node) => {
        // const nodeWidth = node.x1 - node.x0
        const nodeHeight = node.y1 - node.y0

        // Position: outside-right for left columns, outside-left for rightmost
        const isRightmost = chartWidth > 0 && node.x1 >= chartWidth - 1
        const labelX = isRightmost ? node.x0 - 8 : node.x1 + 8
        const labelY = node.y0 + nodeHeight / 2
        const textAnchor = isRightmost ? "end" : "start"

        if (slots?.renderLabel) {
          return (
            <g key={`label-${node.id}`}>
              {slots.renderLabel(node, { x: labelX, y: labelY })}
            </g>
          )
        }

        const formattedValue = valueFormatter
          ? valueFormatter(node.value, { location: "label" })
          : undefined

        return (
          <g key={`label-${node.id}`}>
            <text
              x={labelX}
              y={labelY}
              dy="0.35em"
              textAnchor={textAnchor}
              className="sankey-label"
              style={{
                fill: "var(--sankey-label-color, #F2F2F2)",
                fontSize: "var(--sankey-label-size, 12px)",
                fontFamily:
                  "var(--sankey-label-font, 'Inter', system-ui, sans-serif)",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {node.label}
            </text>
            {formattedValue && (
              <text
                x={labelX}
                y={labelY + 16}
                dy="0.35em"
                textAnchor={textAnchor}
                className="sankey-label sankey-label-value"
                style={{
                  fill: "var(--sankey-label-color, #F2F2F2)",
                  fontSize: "var(--sankey-label-size, 11px)",
                  fontFamily:
                    "var(--sankey-label-font, 'Inter', system-ui, sans-serif)",
                  opacity: 0.7,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {formattedValue}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}
