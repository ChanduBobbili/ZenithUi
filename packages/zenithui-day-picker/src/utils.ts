import { DateRange } from "./components/day-picker/index"
import { isAfter, isBefore, isWithinInterval } from "date-fns"

/**
 * Merges class names using clsx and twMerge.
 *
 * @param classes - Class names to merge.
 * @returns Merged class names.
 */
export function cn(
  ...classes: (
    | string
    | undefined
    | null
    | false
    | Record<string, boolean | null | undefined>
    | string[]
  )[]
): string {
  return classes
    .flat(Infinity) // Flatten nested arrays
    .filter(Boolean) // Remove falsy values (false, null, undefined, "")
    .map((cls) => {
      if (typeof cls === "object" && cls !== null && !Array.isArray(cls)) {
        return Object.entries(cls)
          .filter(([key, value]) => Boolean(key) && Boolean(value)) // Ensure key is a valid string and value is truthy
          .map(([key]) => key) // Extract only the valid class names
          .join(" ")
      }
      return cls
    })
    .join(" ")
}

/**
 * Gets the initial date from the selected date or range.
 * If the selected date is a Date, it returns the date.
 * If the selected date is an array, it returns the first element of the array.
 * If the selected date is an object, it returns the from property of the object.
 * @param selected
 * @returns
 */
export function getInitialDate(selected: Date | DateRange): Date {
  return selected instanceof Date
    ? selected
    : Array.isArray(selected)
      ? selected[0]
      : selected.from
}

/**
 * Gets the initial range from the selected date or range.
 * If the selected date is a Date, it returns an object with the same date for both from and to.
 * @param selected
 * @returns
 */
export function getInitialRange(selected: Date | DateRange): DateRange {
  return selected instanceof Date
    ? { from: new Date(), to: new Date() }
    : selected
}

/**
 * Whether the day is between the range and focus
 * @param day The day to check
 * @param range The range to check against
 * @param focus The focus date
 * @returns @type {boolean}
 */
export function isBetweenRange(
  day: Date,
  range: { from: Date | null; to: Date | null },
  focus: Date | null,
) {
  // Ensure required values are present
  if (!range.from || !focus) return false
  if (isAfter(focus, range.from)) {
    // Case 1: focus is after range.from
    return isWithinInterval(day, { start: range.from, end: focus })
  }
  if (isBefore(focus, range.from)) {
    // Case 2: focus is before range.from
    return isWithinInterval(day, { start: focus, end: range.from })
  }
  return false
}
