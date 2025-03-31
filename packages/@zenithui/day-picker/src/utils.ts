import { isAfter, isBefore, isSameDay, isWithinInterval } from "date-fns"
import { DateRange, Disabled, InternalRange } from "./types"

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
export function getInitialRange(selected: Date | DateRange): InternalRange {
  return selected instanceof Date
    ? { from: new Date(), to: new Date() }
    : Array.isArray(selected)
      ? { from: selected[0], to: selected[1] }
      : selected
}

/**
 * Checks if a given day is within a specified range, considering a focus date.
 *
 * @param day - The date to check if it falls within the range.
 * @param range - An object containing the start (`from`) and end (`to`) dates of the range.
 *                 Both `from` and `to` can be `null`.
 * @param focus - A date that serves as a reference point to determine the interval.
 *                It can be `null`.
 * @returns `true` if the day is within the range considering the focus date, otherwise `false`.
 *
 * The function works as follows:
 * - If `range.from` or `focus` is `null`, it returns `false`.
 * - If `focus` is after `range.from`, it checks if the day is within the interval from `range.from` to `focus`.
 * - If `focus` is before `range.from`, it checks if the day is within the interval from `focus` to `range.from`.
 * - If none of the above conditions are met, it returns `false`.
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

/**
 * Parses a given date input and returns a Date object.
 *
 * @param date - The date input which can be either a Date object or a string representing a date.
 * @returns A Date object parsed from the input.
 *
 * @example
 * ```typescript
 * const date1 = parseDate("2023-10-05");
 * const date2 = parseDate(new Date());
 * ```
 */
export function parseDate(date: Date | string): Date {
  return typeof date === "string" ? new Date(date) : date
}

/**
 * Determines if a given date should be disabled based on various constraints.
 *
 * @param current - The date to check for disabling.
 * @param disable - An object containing various disabling constraints.
 *   - `before` (Date | string): Disables dates before this date.
 *   - `after` (Date | string): Disables dates after this date.
 *   - `date` (Date | string): Disables a specific date.
 *   - `dates` (Array<Date | string>): Disables an array of specific dates.
 *   - `days` (Array<number | string>): Disables specific days of the week.
 *     Days can be specified as numbers (0 for Sunday, 1 for Monday, etc.) or
 *     as strings ("sunday", "monday", etc.).
 *   - `modifier` (function): A custom function that takes a date and returns
 *     a boolean indicating whether the date should be disabled.
 *
 * @returns `true` if the date should be disabled, `false` otherwise.
 */
export function getDisabled(
  current: Date,
  disable: Partial<Disabled> | undefined,
): boolean {
  if (!disable) return false

  // Handle before/after constraints
  if (disable.before && isBefore(current, parseDate(disable.before)))
    return true
  if (disable.after && isAfter(current, parseDate(disable.after))) return true

  // Check specific date
  if (disable.date && isSameDay(current, parseDate(disable.date))) return true

  // Check array of dates
  if (
    disable.dates &&
    disable.dates.some((date) => isSameDay(current, parseDate(date)))
  )
    return true

  // Check days of week
  if (disable.days) {
    const currentDay = current.getDay()
    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ]

    // Check if the current day is in the disabled days list
    if (
      disable.days.some((day) => {
        if (typeof day === "number") return currentDay === day
        return dayNames.indexOf(day.toLowerCase()) === currentDay
      })
    )
      return true
  }

  // Check custom modifier function
  if (disable.modifier && disable.modifier(current)) return true

  // If none of the conditions matched, the date is not disabled
  return false
}
