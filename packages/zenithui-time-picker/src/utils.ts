import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitialHour(time: string) {
  const [inputHour] = time.split(":")
  const hour = parseInt(inputHour)
  return hour === 0
    ? "12"
    : hour > 12
      ? (hour - 12).toString().padStart(2, "0")
      : inputHour
}

export function getInitialPeriod(time: string) {
  const [inputHour] = time.split(":")
  return parseInt(inputHour) >= 12 ? "PM" : "AM"
}

export function convertTo24Hour(hour: string, period: string) {
  const intHour = parseInt(hour)
  if (period === "PM" && intHour !== 12) return intHour + 12
  if (period === "AM" && intHour === 12) return "00"
  return hour
}

export function formatTime24To12(time24: string) {
  const [hours24, minutes] = time24.split(":").map(Number) // Split and parse hours and minutes
  const period = hours24 >= 12 ? "PM" : "AM" // Determine AM/PM
  const hours12 = hours24 % 12 || 12 // Convert 24-hour to 12-hour format (0 becomes 12)

  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
}
