"use client"

import { useEffect, useRef } from "react"
import { TimeScrollListProps } from "../types"
import { ToggleGroupItem, ToggleGroupRoot } from "../toggle-group"
import { cn } from "@zenithui/utils"

const TimeScrollList: React.FC<TimeScrollListProps> = ({
  options,
  value,
  classNames,
  onChange,
}) => {
  const listRef = useRef<HTMLDivElement>(null)

  // Scroll to the selected item when the list renders
  useEffect(() => {
    const index = options.findIndex((option) => option === value)
    if (listRef.current && index >= 0) {
      const item = listRef.current.children[index] as HTMLElement
      item?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [value, options])

  return (
    <div className="zenithui-time-custom-scroll">
      <ToggleGroupRoot
        ref={listRef}
        type="single"
        className={cn(
          "zenithui-time-scroll-container",
          classNames?.timeScrollList,
        )}
        value={value}
        onValueChange={(selectedValue) => {
          if (typeof selectedValue === "string") {
            onChange(selectedValue)
          }
        }}
      >
        {options.map((option) => {
          return (
            <ToggleGroupItem
              key={option}
              value={option}
              aria-label={option}
              className={cn(
                "zenithui-time-item",
                classNames?.timeScrollListItem,
                value === option ? "zenithui-selected" : "",
                value === option ? classNames?.Selected : "",
              )}
            >
              {option}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroupRoot>
    </div>
  )
}

export default TimeScrollList
