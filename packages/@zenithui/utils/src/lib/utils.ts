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
    .flat(Number.POSITIVE_INFINITY) // Flatten nested arrays
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

type SortableKey<T> = keyof T
/**
 * Sorts an array of objects by a specified key in ascending or descending order.
 *
 * @template T - The type of objects in the array.
 * @param array - The array of objects to be sorted.
 * @param key - The key of the object by which the array should be sorted. The key must exist in the objects.
 * @param order - The order of sorting, either "asc" for ascending or "desc" for descending. Defaults to "asc".
 * @returns A new array sorted by the specified key in the specified order.
 */
export function sortByKey<T>(
  array: T[],
  key: SortableKey<T>,
  order: "asc" | "desc" = "asc",
): T[] {
  return [...array].sort((a, b) => {
    const valueA = a[key]
    const valueB = b[key]

    if (valueA < valueB) return order === "asc" ? -1 : 1
    if (valueA > valueB) return order === "asc" ? 1 : -1
    return 0
  })
}

/**
 * Compares two values deeply to determine if they are equal.
 *
 * This utility function performs a deep comparison between two objects or values
 * to check if they are structurally identical. It handles nested objects, arrays,
 * and primitive types. If the values are not objects or one of them is `null`,
 * it performs a strict equality check.
 *
 * @param obj1 - The first value or object to compare.
 * @param obj2 - The second value or object to compare.
 * @returns `true` if the two values are deeply equal, otherwise `false`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepEqual(obj1: unknown, obj2: unknown): boolean {
  if (obj1 === obj2) return true
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false
  }

  // Handle Date instances
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime()
  }

  // Prevent object vs array mismatch
  const isArray1 = Array.isArray(obj1)
  const isArray2 = Array.isArray(obj2)
  if (isArray1 !== isArray2) return false

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (const key of keys1) {
    if (
      !keys2.includes(key) ||
      !deepEqual(
        (obj1 as Record<string, unknown>)[key],
        (obj2 as Record<string, unknown>)[key],
      )
    ) {
      return false
    }
  }

  return true
}

/**
 * Groups an array of objects by a specified key.
 *
 * @template T - The type of objects in the array.
 * @param array - The array of objects to be grouped.
 * @param key - The key by which to group the objects.
 * @returns An object where the keys are the values of the specified key and the values are arrays of grouped objects.
 */
export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K,
): Record<string, T[]> {
  return array.reduce(
    (acc, item) => {
      const groupKey = String(item[key])
      acc[groupKey] = acc[groupKey] || []
      acc[groupKey].push(item)
      return acc
    },
    {} as Record<string, T[]>,
  )
}

/**
 * Removes duplicate objects from an array based on a specified key.
 *
 * @template T - The type of objects in the array.
 * @param array - The array to filter for unique objects.
 * @param key - The key to determine uniqueness.
 * @returns A new array containing only unique objects based on the specified key.
 */
export function uniqueByKey<T, K extends keyof T>(array: T[], key: K): T[] {
  const seen = new Set<T[K]>()
  return array.filter((item) => {
    const val = item[key]
    if (seen.has(val)) return false
    seen.add(val)
    return true
  })
}

/**
 * Creates a debounced function that delays execution until after a specified delay.
 *
 * @template T - The type of the function.
 * @param func - The function to debounce.
 * @param delay - The number of milliseconds to delay execution.
 * @returns A new debounced function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}

/**
 * Creates a throttled function that only invokes the provided function at most once per specified time interval.
 *
 * @template T - The type of the function.
 * @param func - The function to throttle.
 * @param limit - The time interval in milliseconds.
 * @returns A throttled function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= limit) {
      lastCall = now
      func(...args)
    }
  }
}

/**
 * Creates a deep clone of an object.
 *
 * @template T - The type of the object.
 * @param obj - The object to clone.
 * @returns A deep copy of the object.
 */
export function cloneDeep<T>(obj: T): T {
  return JSON.parse(
    JSON.stringify(obj, (_, value) => {
      if (value instanceof Map || value instanceof Set) {
        return undefined
      }
      if (value instanceof RegExp) {
        return {} // replace RegExp with empty object
      }
      return value
    }),
  )
}

/**
 * Picks specific keys from an object, returning a new object with only those keys.
 *
 * @template T - The type of the object.
 * @param obj - The source object.
 * @param keys - The keys to pick.
 * @returns A new object with only the picked keys.
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  return keys.reduce(
    (result, key) => {
      if (key in obj) {
        result[key] = obj[key]
      }
      return result
    },
    {} as Pick<T, K>,
  )
}

/**
 * Omits specific keys from an object, returning a new object without those keys.
 *
 * @template T - The type of the object.
 * @param obj - The source object.
 * @param keys - The keys to omit.
 * @returns A new object without the omitted keys.
 */
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}

/**
 * Generates a random integer between min and max (inclusive).
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random integer between min and max.
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Delays execution for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Converts a byte size into a human-readable format (KB, MB, GB, etc.).
 *
 * @param bytes - The number of bytes.
 * @param decimals - The number of decimal places.
 * @returns A human-readable string.
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (!bytes) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(decimals))} ${sizes[i]}`
}

/**
 * Generates a UUID (v4).
 *
 * @returns A random UUID string.
 */
export function uuid(): string {
  return crypto.randomUUID()
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string): string {
  return str
    .split(" ")
    .map((i) => {
      return i.charAt(0).toUpperCase() + i.slice(1).toLocaleLowerCase()
    })
    .join(" ")
}

/**
 * Splits a string into an array of words.
 * @param str - The string to split.
 * @param seperator - The seperator to split the string by.
 * @returns An array of words.
 */
export function splitWord(str: string, seperator: string) {
  if (str.length < 1) return []

  return str.split(seperator)
}

/**
 * Converts a string to title case.
 * @param str - The string to convert to title case.
 * @returns The title case string.
 */
export function convertToTitleCase(str: string) {
  if (str.length < 1) return ""

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Format a number to a string with the appropriate suffix.
 *
 * 1000 -> 1k
 * 1000000 -> 1M
 * 1000000000 -> 1B
 * 1000000000000 -> 1T
 *
 * @param num - The number to format.
 * @returns - The formatted number.
 */
export function formatNumber(num: number): string {
  if (num === null || num === undefined || Number.isNaN(num)) return "0"

  const absNum = Math.abs(num)
  const sign = num < 0 ? "-" : ""

  const tiers = [
    { value: 1e12, suffix: "T" },
    { value: 1e9, suffix: "B" },
    { value: 1e6, suffix: "M" },
    { value: 1e3, suffix: "k" },
  ]

  for (const { value, suffix } of tiers) {
    if (absNum >= value) {
      const formatted = (absNum / value).toFixed(1).replace(/\.0$/, "")
      return `${sign}${formatted}${suffix}`
    }
  }

  return `${sign}${absNum}`
}

/**
 * This function calculates the delta percentage between two numbers.
 * @param present - The present value.
 * @param past - The past value.
 * @returns The delta percentage.
 */
export function computeDeltaPercent(
  present: number,
  past: number,
): number | null {
  if (past === 0 || Number.isNaN(past) || Number.isNaN(present)) return null
  return ((present - past) / past) * 100
}

/**
 * Formats a delta percentage to a string with the appropriate sign and percentage.
 * @param delta - The delta to format.
 * @param decimals - The number of decimal places to round the delta to.
 * @returns The formatted delta.
 */
export function formatDelta(delta: number | null, decimals = 1): string {
  if (delta == null || Number.isNaN(delta)) return "—"
  if (delta === 0) return "0.0%"
  const sign = delta > 0 ? "+" : ""
  return `${sign}${Number.parseFloat(delta.toFixed(decimals))}%`
}

/**
 * Get the differences between two objects.
 * @param oldObj - The old object to compare.
 * @param newObj - The new object to compare.
 * @returns The differences between the two objects.
 * @returns The old record and the new record.
 */
export function getDifferences<T extends object>(
  oldObj: T,
  newObj: T,
): { oldRecord: Partial<T>; newRecord: Partial<T> } {
  const oldRecord: Partial<T> = {}
  const newRecord: Partial<T> = {}

  const keys = new Set<keyof T>([
    ...(Object.keys(oldObj) as Array<keyof T>),
    ...(Object.keys(newObj) as Array<keyof T>),
  ])

  for (const key of Array.from(keys)) {
    const oldVal = oldObj[key]
    const newVal = newObj[key]

    if (!Object.is(oldVal, newVal)) {
      oldRecord[key] = oldVal
      newRecord[key] = newVal
    }
  }

  return { oldRecord, newRecord }
}
