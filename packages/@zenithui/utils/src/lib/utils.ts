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
      if (typeof cls === 'object' && cls !== null && !Array.isArray(cls)) {
        return Object.entries(cls)
          .filter(([key, value]) => Boolean(key) && Boolean(value)) // Ensure key is a valid string and value is truthy
          .map(([key]) => key) // Extract only the valid class names
          .join(' ');
      }
      return cls;
    })
    .join(' ');
}
