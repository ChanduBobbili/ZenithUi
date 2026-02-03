"use client"

import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type FabDemoWrapperProps = {
  title: string
  description?: ReactNode
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
        "rounded-lg border border-border bg-card p-4 shadow-sm",
        className,
      )}
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-muted-foreground mt-1 text-sm">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className={cn(
            "shrink-0 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
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
