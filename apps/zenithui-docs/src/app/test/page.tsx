"use client"

import SankeyChart from "@zenithui/sankey"
import type { SankeyData } from "@zenithui/sankey"

const testData: SankeyData = {
  nodes: [
    { id: "organic", label: "Organic Search", color: "#3b82f6" },
    { id: "direct", label: "Direct", color: "#10b981" },
    { id: "social", label: "Social", color: "#f59e0b" },
    { id: "home", label: "Homepage", color: "#6366f1" },
    { id: "product", label: "Product Page", color: "#ec4899" },
    { id: "checkout", label: "Checkout", color: "#8b5cf6" },
    { id: "success", label: "Purchase", color: "#14b8a6" },
  ],
  links: [
    { source: "organic", target: "home", value: 50 },
    { source: "organic", target: "product", value: 30 },
    { source: "direct", target: "home", value: 40 },
    { source: "direct", target: "product", value: 10 },
    { source: "social", target: "home", value: 20 },
    { source: "social", target: "product", value: 10 },
    { source: "home", target: "product", value: 80 },
    { source: "home", target: "checkout", value: 30 },
    { source: "product", target: "checkout", value: 60 },
    { source: "checkout", target: "success", value: 40 },
  ],
}

export default function SankeyTestPage() {
  return (
    <div className="bg-background min-h-screen w-full p-10">
      <h1 className="mb-6 text-2xl font-bold">Sankey Chart Test</h1>

      <div className="bg-background h-150 w-full overflow-hidden rounded-xl border">
        <SankeyChart
          data={testData}
          width="100%"
          height={600}
          nodeOptions={{ alignment: "justify" }}
          legend={{ position: "bottom" }}
        />
      </div>
    </div>
  )
}
