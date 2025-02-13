import { ToastType } from "./toast-provider"

/**
 * ToastSingleton class to manage the toast
 */
class ToastSingleton {
  private addToast: ((message: string, type: ToastType) => void) | null = null

  register(addToast: (message: string, type: ToastType) => void) {
    this.addToast = addToast
  }

  success(message: string) {
    this.addToast?.(message, "success")
  }

  info(message: string) {
    this.addToast?.(message, "info")
  }

  error(message: string) {
    this.addToast?.(message, "error")
  }

  warning(message: string) {
    this.addToast?.(message, "warning")
  }
}

// Private instance
const toastInstance = new ToastSingleton()

// Public API without exposing `register`
export const toast = {
  success: toastInstance.success,
  info: toastInstance.info,
  error: toastInstance.error,
  warning: toastInstance.warning,
}

// Internal function to register `addToast`
export const registerToast = (
  addToast: (message: string, type: ToastType) => void,
) => {
  toastInstance.register(addToast)
}
