import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ToastPosition, ToastType } from "./components/toast-provider"

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
 *
 * @param position @type {ToastPosition} The position of the toast.
 * @description Returns the position class for the toast.
 * @example
 * getPositionClass("top-right")
 */
export function getPositionClass(position: ToastPosition) {
  switch (position) {
    case "top-left":
      return "zenithui-top-left"
    case "top-right":
      return "zenithui-top-right"
    case "bottom-left":
      return "zenithui-bottom-left"
    case "bottom-right":
      return "zenithui-bottom-right"
    case "top-center":
      return "zenithui-top-center"
    case "bottom-center":
      return "zenithui-bottom-center"
    default:
      return "zenithui-top-right"
  }
}

/**
 *
 * @param type @type {ToastType} The type of toast.
 * @description Returns the theme class for the toast.
 * @example
 * getToastTheme("success")
 */
export function getToastTheme(type: ToastType) {
  switch (type) {
    case "success":
      return "zenithui-toast-success"
    case "info":
      return "zenithui-toast-info"
    case "error":
      return "zenithui-toast-error"
    case "warning":
      return "zenithui-toast-warning"
    default:
      return "zenithui-toast-success"
  }
}
