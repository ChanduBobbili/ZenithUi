import { ToastType } from "./toast-provider"

/**
 * ToastSingleton class to manage the toast
 */
class ToastSingleton {
  private addToast: ((message: string, type: ToastType) => void) | null = null
  // Queue for early calls
  private pendingToasts: { message: string; type: ToastType }[] = []

  register(addToast: (message: string, type: ToastType) => void) {
    this.addToast = addToast

    // Process any pending toasts
    this.pendingToasts.forEach(({ message, type }) =>
      this.addToast?.(message, type),
    )
    // Clear queue after processing
    this.pendingToasts = []
  }

  private showToast = (message: string, type: ToastType) => {
    if (this.addToast) {
      this.addToast(message, type)
    } else {
      // Queue toast if not registered yet
      this.pendingToasts.push({ message, type })
    }
  }

  success = (message: string) => this.showToast(message, "success")
  info = (message: string) => this.showToast(message, "info")
  error = (message: string) => this.showToast(message, "error")
  warning = (message: string) => this.showToast(message, "warning")
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
