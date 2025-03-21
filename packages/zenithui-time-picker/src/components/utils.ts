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
 * Gets the initial hour from a time string.
 *
 * @param time - The time string to get the initial hour from.
 * @returns The initial hour.
 */
export function getInitialHour(time: string) {
  const [inputHour] = time.split(":")
  const hour = parseInt(inputHour)
  return hour === 0
    ? "12"
    : hour > 12
      ? (hour - 12).toString().padStart(2, "0")
      : inputHour
}

/**
 * Gets the initial period from a time string.
 *
 * @param time - The time string to get the initial period from.
 * @returns The initial period.
 */
export function getInitialPeriod(time: string) {
  const [inputHour] = time.split(":")
  return parseInt(inputHour) >= 12 ? "PM" : "AM"
}

/**
 * Converts a time string to 24-hour format.
 *
 * @param hour - The hour to convert.
 * @param period - The period to convert.
 * @returns The converted time string.
 */
export function convertTo24Hour(hour: string, period: string) {
  const intHour = parseInt(hour)
  if (period === "PM" && intHour !== 12) return intHour + 12
  if (period === "AM" && intHour === 12) return "00"
  return hour
}

/**
 * Formats a 24-hour time string to 12-hour format.
 *
 * @param time24 - The 24-hour time string to format.
 * @returns The formatted 12-hour time string.
 */
export function formatTime24To12(time24: string) {
  const [hours24, minutes] = time24.split(":").map(Number) // Split and parse hours and minutes
  const period = hours24 >= 12 ? "PM" : "AM" // Determine AM/PM
  const hours12 = hours24 % 12 || 12 // Convert 24-hour to 12-hour format (0 becomes 12)

  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
}

// Utility function to generate time options
/**
 * Generates an array of time options (hours or minutes) as strings,
 * padded with leading zeros if necessary.
 *
 * @param start - Starting number of the range (inclusive).
 * @param end - Ending number of the range (inclusive).
 * @returns Array of time options as strings.
 */
export function generateTimeOptions(start: number, end: number): string[] {
  return Array.from({ length: end - start + 1 }, (_, i) =>
    (i + start).toString().padStart(2, "0"),
  )
}
