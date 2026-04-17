import type {
  SankeyLegendItem,
  SankeyLegendLayout,
  SankeyLegendPosition,
  SankeySlots,
  SankeyLegendProps,
} from "../types"

interface SankeyLegendComponentProps {
  items: SankeyLegendItem[]
  position?: SankeyLegendPosition
  layout?: SankeyLegendLayout
  className?: string
  slots?: SankeySlots
}

export function SankeyLegend({
  items,
  position = "bottom",
  layout = "horizontal",
  className,
  slots,
}: SankeyLegendComponentProps) {
  if (items.length === 0) return null

  if (slots?.renderLegend) {
    const legendProps: SankeyLegendProps = {
      items,
      position,
      layout,
      className,
    }
    return <>{slots.renderLegend(legendProps)}</>
  }

  const isVertical = layout === "vertical"

  return (
    <div
      className={`sankey-legend ${className ?? ""}`}
      style={{
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        flexWrap: "wrap",
        gap: isVertical ? "6px" : "16px",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px 0",
        fontFamily: "var(--sankey-label-font, 'Inter', system-ui, sans-serif)",
        fontSize: "12px",
        color: "var(--sankey-legend-color, #F2F2F2)",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              borderRadius: 3,
              backgroundColor: item.color,
              flexShrink: 0,
            }}
          />
          <span style={{ opacity: 0.85 }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
