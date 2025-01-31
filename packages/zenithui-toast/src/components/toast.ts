export type ToastType = "success" | "error" | "info" | "warning"

export type Toast = {
  id: string
  message: string
  type: ToastType
}

class ToastManager {
  private toasts: Toast[] = []
  private listeners: ((toasts: Toast[]) => void)[] = []
  private isToasterMounted: boolean = false

  addToast(message: string, type: Toast["type"]) {
    if (!this.isToasterMounted) {
      console.error(
        "Toaster component is not mounted. Please add <Toaster /> to your app.",
      )
      return
    }

    const id = Math.random().toString(36).substr(2, 9)
    this.toasts.push({ id, message, type })
    this.notifyListeners()

    setTimeout(() => this.removeToast(id), 3000)
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id)
    this.notifyListeners()
  }

  subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  setToasterMounted(isMounted: boolean) {
    this.isToasterMounted = isMounted
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.toasts))
  }
}

// Export singleton instance
export const toastManager = new ToastManager()

// Export toast API
export const toast = {
  success: (message: string) => toastManager.addToast(message, "success"),
  error: (message: string) => toastManager.addToast(message, "error"),
  info: (message: string) => toastManager.addToast(message, "info"),
  warning: (message: string) => toastManager.addToast(message, "warning"),
}
