import { useFloating, type Placement } from "@floating-ui/react"
import type { FAB_STATE } from "./types"
import * as React from "react"

export default function useFabState({
  placement,
  offset,
}: {
  placement: Placement
  offset: number
}) {
  const [open, setOpen] = React.useState<boolean>(false)

  const {} = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
  })
}
