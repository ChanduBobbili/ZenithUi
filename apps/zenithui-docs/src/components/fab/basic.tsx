"use client"
import * as FabPrimitive from "@zenithui/fab"
import { useState } from "react"

export default function BasicFab() {
  const [open, setOpen] = useState(false)
  return (
    <FabPrimitive.Root
      open={open}
      onOpenChange={setOpen}
      position="top-right"
    >
      <FabPrimitive.Trigger>B</FabPrimitive.Trigger>
      <FabPrimitive.Content placement="bottom">Content</FabPrimitive.Content>
    </FabPrimitive.Root>
  )
}
