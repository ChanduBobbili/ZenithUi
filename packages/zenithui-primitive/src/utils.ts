import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to merge class names
/**
 * Merges class names using clsx and twMerge.
 *
 * @param inputs - Class names to merge.
 * @returns Merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
