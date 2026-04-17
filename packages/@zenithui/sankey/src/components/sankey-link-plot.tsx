import type { MouseEvent } from "react"
import type {
  SankeyLayoutLink,
  SankeyLinkColorMode,
  SankeySlots,
} from "../types"
import { sankeyLinkRibbonPath } from "../engine/link-path"
import { resolveLinkColor, linkGradientId } from "../engine/colors"
import { useSankeyContext } from "./sankey-store-provider"

interface SankeyLinkPlotProps {
  links: SankeyLayoutLink[]
  colorMode?: SankeyLinkColorMode
  opacity?: number
  gradient?: boolean
  curveCorrection?: number
  className?: string
  slots?: SankeySlots
}

export function SankeyLinkPlot({
  links,
  colorMode = "source",
  opacity = 0.8,
  gradient = true,
  curveCorrection = 0,
  className,
  slots,
}: SankeyLinkPlotProps) {
  const { store, emitter } = useSankeyContext()

  const handleMouseEnter = (link: SankeyLayoutLink) => {
    store.getState().setHoveredItem(link)
    emitter.emit("link:hover", { link })
  }

  const handleMouseLeave = () => {
    store.getState().setHoveredItem(null)
    emitter.emit("link:hover", { link: null })
  }

  const handleClick = (event: MouseEvent, link: SankeyLayoutLink) => {
    emitter.emit("link:click", { event, link })
  }

  return (
    <g className={className}>
      {/* Gradient definitions */}
      {gradient && (
        <defs>
          {links.map((link) => {
            const gradId = linkGradientId(link)
            return (
              <linearGradient
                key={gradId}
                id={gradId}
                gradientUnits="userSpaceOnUse"
                x1={link.source.x1}
                x2={link.target.x0}
              >
                <stop
                  offset="0%"
                  stopColor={link.source.color}
                  stopOpacity={opacity}
                />
                <stop
                  offset="100%"
                  stopColor={link.target.color}
                  stopOpacity={opacity}
                />
              </linearGradient>
            )
          })}
        </defs>
      )}

      {/* Link paths */}
      {links.map((link) => {
        const d = sankeyLinkRibbonPath(link, curveCorrection)
        const strokeWidth = link.width

        if (slots?.renderLink) {
          return (
            <g key={`link-${link.index}`}>
              {slots.renderLink(link, { d, strokeWidth })}
            </g>
          )
        }

        const fill = gradient
          ? `url(#${linkGradientId(link)})`
          : resolveLinkColor(link, colorMode)

        return (
          <path
            key={`link-${link.index}`}
            d={d}
            fill={fill}
            fillOpacity={gradient ? 1 : opacity}
            stroke="none"
            className="sankey-link"
            tabIndex={0}
            role="button"
            aria-label={`Link: ${link.source.label} to ${link.target.label}`}
            onMouseEnter={() => handleMouseEnter(link)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => handleClick(e, link)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick(e as unknown as MouseEvent, link)
              }
            }}
            style={{
              cursor: "pointer",
              transition: "fill-opacity 0.2s ease",
            }}
          />
        )
      })}
    </g>
  )
}
