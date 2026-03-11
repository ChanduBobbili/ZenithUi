"use client"

import ExpandableCardDemo from "@/components/ui/expandable-card"

export function ExpandableCardPreview() {
  return (
    <div className="bg-background relative h-full min-h-[500px] w-full overflow-hidden rounded-xl p-8">
      <h2 className="text-foreground mb-8 text-center text-2xl font-bold">
        Artists Library
      </h2>
      <ExpandableCardDemo />
    </div>
  )
}
