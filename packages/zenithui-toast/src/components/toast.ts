import { PromiseToast, ToastOptions, ToastType } from "../lib/types"

/**
 * ToastSingleton class to manage the toast
 */
class ToastSingleton {
  private addToast:
    | ((
        message: string | Promise<any>,
        type: ToastType,
        options?: ToastOptions,
      ) => void)
    | null = null
  // Queue for early calls
  private pendingToasts: {
    message: string | Promise<any>
    type: ToastType
    options?: ToastOptions
  }[] = []

  register(
    addToast: (
      message: string | Promise<any>,
      type: ToastType,
      options?: ToastOptions,
    ) => void,
  ) {
    this.addToast = addToast

    // Process any pending toasts
    this.pendingToasts.forEach(({ message, type, options }) =>
      this.addToast?.(message, type, options),
    )
    // Clear queue after processing
    this.pendingToasts = []
  }

  private showToast = (
    message: string | Promise<any>,
    type: ToastType,
    options?: ToastOptions,
  ) => {
    if (this.addToast) {
      this.addToast(message, type, options)
    } else {
      // Queue toast if not registered yet
      this.pendingToasts.push({ message, type, options })
    }
  }

  success = (message: string, options?: ToastOptions) =>
    this.showToast(message, "success", options)

  info = (message: string, options?: ToastOptions) =>
    this.showToast(message, "info", options)

  error = (message: string, options?: ToastOptions) =>
    this.showToast(message, "error", options)

  warning = (message: string, options?: ToastOptions) =>
    this.showToast(message, "warning", options)

  loading = (message: string, options?: ToastOptions) =>
    this.showToast(message, "loading", options)

  promise = (
    message: string | Promise<any>,
    options?: ToastOptions & PromiseToast,
  ) => this.showToast(message, "promise", options)
}

// Private instance
const toastInstance = new ToastSingleton()

// Public API without exposing `register`
export const toast = {
  success: toastInstance.success,
  info: toastInstance.info,
  error: toastInstance.error,
  warning: toastInstance.warning,
  loading: toastInstance.loading,
  promise: toastInstance.promise,
}

// Internal function to register `addToast`
export const registerToast = (
  addToast: (
    message: string | Promise<any>,
    type: ToastType,
    options?: ToastOptions,
  ) => void,
) => {
  toastInstance.register(addToast)
}
