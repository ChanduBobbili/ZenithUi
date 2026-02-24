import { cn } from "@zenithui/utils"
import * as React from "react"

type ToggleGroupType = "single" | "multiple"

/**
 * The Context used to manage the data across the components
 */
type ToggleGroupContextType = {
  selectedValues: string | string[]
  toggleValue: (value: string) => void
  type: ToggleGroupType
}

const ToggleGroupContext = React.createContext<
  ToggleGroupContextType | undefined
>(undefined)

/**
 * The root component for the toggle group. It provides the context for the toggle group items.
 */
interface ToggleGroupRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The type of the toggle group.
   * @default "single"
   */
  type: ToggleGroupType
  /**
   * The controlled stateful value of the items that are pressed.
   */
  value?: string | string[]
  /**
   * The value of the items that are pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string | string[]
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  onValueChange?: (value: string | string[]) => void
  /**
   * The children of the toggle group.
   */
  children: React.ReactNode
}

const ToggleGroupRoot = React.forwardRef<
  HTMLDivElement, // Type of the element that gets the ref
  ToggleGroupRootProps // Props type
>(
  (
    { type = "single", value, onValueChange, className, children, ...props },
    ref,
  ) => {
    if (type === "single" && Array.isArray(value)) {
      throw new Error("ToggleGroup: value must be a string when type is single")
    }
    if (type === "multiple" && !Array.isArray(value)) {
      throw new Error(
        "ToggleGroup: value must be an array when type is multiple",
      )
    }

    const [selectedValues, setSelectedValues] = React.useState<
      string | string[]
    >(value ?? (type === "single" ? "" : []))

    // useEffect to sync external state changes
    React.useEffect(() => {
      setSelectedValues(value ?? (type === "single" ? "" : []))
    }, [value, type])

    // useCallback for optimized state updates
    const toggleValue = React.useCallback(
      (toggle: string) => {
        if (type === "single") {
          setSelectedValues(toggle)
          onValueChange?.(toggle)
        } else {
          setSelectedValues((prev) => {
            const prevArray = Array.isArray(prev) ? prev : []
            const newValues = prevArray.includes(toggle)
              ? prevArray.filter((v) => v !== toggle)
              : [...prevArray, toggle]
            onValueChange?.(newValues)
            return newValues
          })
        }
      },
      [onValueChange, type],
    )

    return (
      <ToggleGroupContext.Provider
        value={{ selectedValues, toggleValue, type }}
      >
        <div
          {...props}
          ref={ref}
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="group"
          className={cn(className, "toggle-group")}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    )
  },
)

/**
 * The item component for the toggle group. It must be used within a ToggleGroupRoot.
 */
interface ToggleGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
  value: string
}

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement, // Type of the element that gets the ref
  ToggleGroupItemProps // Props type
>(({ value, disabled, className, children, ...props }, ref) => {
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
      {...props}
      ref={ref}
      type="button"
      role="switch"
      className={cn(className, "toggle-group-item")}
      aria-label={value}
      aria-checked={isSelected}
      aria-pressed={isSelected}
      data-disabled={disabled ?? false}
      disabled={disabled}
      onClick={() => toggleValue(value)}
    >
      {children}
    </button>
  )
})

export { ToggleGroupRoot, ToggleGroupItem }
