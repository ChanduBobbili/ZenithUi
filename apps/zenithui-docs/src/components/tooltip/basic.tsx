"use client"
import * as TooltipPrimitive from "@zenithui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import CodePreview from "../code-preview"

export default function BasicTooltip() {
  return (
    <CodePreview
      code={{
        code: `
  import * as TooltipPrimitive from "@zenithui/tooltip"
  
  export default function BasicTooltip() {
    return (
      <TooltipPrimitive.Root>
         <TooltipPrimitive.Trigger asChild>
          <Button variant="outline">Hover</Button>
         </TooltipPrimitive.Trigger>
         <TooltipPrimitive.Content
          side="top"
          animation="fade"
          className={cn(
            "bg-card-foreground text-card z-50 rounded-sm px-3.5 py-2 text-sm",
          )}
        >
          Add to library
          <TooltipPrimitive.Arrow />
         </TooltipPrimitive.Content>
       </TooltipPrimitive.Root>
    );
  }
  `,
        language: "jsx",
      }}
    >
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side="top"
          animation="fade"
          className={cn(
            "bg-card-foreground text-card z-50 rounded-sm px-3.5 py-2 text-sm",
          )}
        >
          Add to library
          <TooltipPrimitive.Arrow />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </CodePreview>
  )
}
