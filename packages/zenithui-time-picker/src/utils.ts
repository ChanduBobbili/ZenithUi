import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs"
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

export function formatTime(time: string) {
  const [hours, minutes] = time.split(":")
  const date = new Date()
  date.setHours(parseInt(hours))
  date.setMinutes(parseInt(minutes))
  return dayjs(date).format("hh:mm A")
}
