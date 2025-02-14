"use-client"

import * as React from "react"

type ToggleGroupType = "single" | "multiple"

type ToggleGroupContextType = {
  selectedValues: string | string[]
  toggleValue: (value: string) => void
  type: ToggleGroupType
}

const ToggleGroupContext = React.createContext<
  ToggleGroupContextType | undefined
>(undefined)

type ToggleGroupRootProps = {
  type?: ToggleGroupType
  value: string | string[]
  onChange?: (value: string | string[]) => void
  children: React.ReactNode
}

const ToggleGroupRoot: React.FC<ToggleGroupRootProps> = ({
  type = "single",
  value,
  onChange,
  children,
}) => {
  if (type === "single" && Array.isArray(value)) {
    throw new Error("ToggleGroup: value must be a string when type is single")
  } else if (type === "multiple" && !Array.isArray(value)) {
    throw new Error("ToggleGroup: value must be an array when type is multiple")
  }

  const [selectedValues, setSelectedValues] = React.useState<string | string[]>(
    value,
  )

  const toggleValue = (toggle: string) => {
    if (type === "single") {
      setSelectedValues(toggle)
      onChange?.(toggle)
    } else {
      setSelectedValues((prev) => {
        const prevArray = Array.isArray(prev) ? prev : []
        const newValues = prevArray.includes(toggle)
          ? prevArray.filter((v) => v !== toggle)
          : [...prevArray, toggle]
        onChange?.(newValues)
        return newValues
      })
    }
  }

  return (
    <ToggleGroupContext.Provider value={{ selectedValues, toggleValue, type }}>
      <div role="group">{children}</div>
    </ToggleGroupContext.Provider>
  )
}

type ToggleGroupItemProps = {
  value: string
  children: React.ReactNode
}

const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({
  value,
  children,
}) => {
  const context = React.useContext(ToggleGroupContext)
  if (!context) {
    throw new Error("ToggleGroupItem must be used within a ToggleGroup")
  }

  const { selectedValues, toggleValue, type } = context

  const isSelected =
    type === "single"
      ? selectedValues === value
      : (selectedValues as string[]).includes(value)

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isSelected}
      aria-pressed={isSelected}
      onClick={() => toggleValue(value)}
    >
      {children}
    </button>
  )
}

export { ToggleGroupRoot, ToggleGroupItem }
