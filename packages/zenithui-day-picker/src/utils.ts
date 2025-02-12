import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DateRange } from "./components/day-picker"

/**
 * Merges class names using clsx and twMerge.
 *
 * @param inputs - Class names to merge.
 * @returns Merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
