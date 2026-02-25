"use client"

import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type FabDemoWrapperProps = {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export default function FabDemoWrapper({
  title,
  description,
  children,
  className,
}: FabDemoWrapperProps) {
  const [show, setShow] = useState(false)

  return (
    <div
      className={cn(
        "border-border bg-card rounded-lg border p-4 shadow-sm",
        className,
      )}
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-foreground font-semibold">{title}</h3>
          {description && (
            <p className="text-muted-foreground mt-1 text-sm">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className={cn(
            "border-input bg-background shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:ring-primary/20 focus:ring-2 focus:ring-offset-2 focus:outline-none",
            "transition-colors",
          )}
        >
          {show ? "Hide FAB" : "Show FAB"}
        </button>
      </div>
      {show && <div className="relative">{children}</div>}
    </div>
  )
}
