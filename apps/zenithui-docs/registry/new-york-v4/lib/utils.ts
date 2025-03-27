import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  // Convert 0 -> 12 for AM and 12 -> 12 for PM
  const formattedHours = hours % 12 || 12
  // Ensure two-digit minutes
  const formattedMinutes = String(minutes).padStart(2, "0")

  return `${formattedHours}:${formattedMinutes} ${period}`
}
