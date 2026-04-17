import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import type {
  SankeyLayoutLink,
  SankeyLayoutNode,
  SankeySlots,
  SankeyTooltipProps,
  SankeyValueFormatter,
} from "../types"
import { useSankeyContext } from "./sankey-store-provider"

interface SankeyTooltipComponentProps {
  valueFormatter?: SankeyValueFormatter
  className?: string
  slots?: SankeySlots
}

function isLayoutNode(
  item: SankeyLayoutNode | SankeyLayoutLink,
): item is SankeyLayoutNode {
  return "id" in item && "sourceLinks" in item
}

export function SankeyTooltip({
  valueFormatter,
  className,
  slots,
}: SankeyTooltipComponentProps) {
  const { store } = useSankeyContext()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const hoveredItem = store((s) => s.hoveredItem)

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setPosition({ x: e.clientX + 12, y: e.clientY + 12 })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!hoveredItem) return null

  const tooltipProps: SankeyTooltipProps = {
    item: hoveredItem,
    position,
    valueFormatter,
    className,
  }

  if (slots?.renderTooltip) {
    return createPortal(slots.renderTooltip(tooltipProps), document.body)
  }

  const formatValue = (v: number) =>
    valueFormatter
      ? valueFormatter(v, { location: "tooltip" })
      : v.toLocaleString()

  return createPortal(
    <div
      className={`sankey-tooltip ${className ?? ""}`}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 9999,
        padding: "10px 14px",
        borderRadius: "var(--sankey-tooltip-radius, 8px)",
        background: "var(--sankey-tooltip-bg, rgba(30, 30, 30, 0.85))",
        backdropFilter: "blur(var(--sankey-tooltip-blur, 12px))",
        WebkitBackdropFilter: "blur(var(--sankey-tooltip-blur, 12px))",
        border:
          "1px solid var(--sankey-tooltip-border, rgba(255, 255, 255, 0.1))",
        color: "var(--sankey-tooltip-color, #F2F2F2)",
        fontSize: "13px",
        fontFamily: "var(--sankey-label-font, 'Inter', system-ui, sans-serif)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        transition: "opacity 0.15s ease",
      }}
    >
      {isLayoutNode(hoveredItem) ? (
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            {hoveredItem.label}
          </div>
          <div style={{ opacity: 0.7 }}>
            Value: {formatValue(hoveredItem.value)}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            {hoveredItem.source.label} → {hoveredItem.target.label}
          </div>
          <div style={{ opacity: 0.7 }}>{formatValue(hoveredItem.value)}</div>
        </div>
      )}
    </div>,
    document.body,
  )
}
