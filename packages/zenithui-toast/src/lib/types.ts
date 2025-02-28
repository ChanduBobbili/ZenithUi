export type ToastType = "success" | "info" | "error" | "warning"

export type Theme = "auto" | "light" | "dark"

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"

export type ToastAnimation = "slide" | "fade"

export type ToastOptions = {
  /**
   * Whether to use rich colors for the toast.
   * @type {boolean}
   * @default false
   */
  richColors?: boolean
  /**
   * The duration of the toast to display.
   * @type {number}
   * @default 5000
   */
  duration?: number
  /**
   * Whether to enable auto dismiss for the toast.
   * @type {boolean}
   * @default true
   */
  disableAutoDismiss?: boolean
  /**
   * The animation of the toast.
   * @type {string}
   * @default "fade"
   */
  animation?: ToastAnimation
  /**
   * Whether to show the close button for the toast.
   * @type {boolean}
   * @default false
   */
  showCloseButton?: boolean
  /**
   * The position of the toast.
   * @type {ToastPosition}
   * @default "top-right"
   * @description This is used to position the toast.
   */
  position?: ToastPosition
}

export type Toast = {
  /**
   * The unique identifier of the toast.
   * @type {string}
   */
  id: string
  /**
   * The toast type which says what kind of toast it is.
   * @type {ToastType}
   */
  type: ToastType
  /**
   * The Message to display in the toast.
   * @type {string}
   */
  message: string
  /**
   * The options to customize the toast.
   * @type {ToastOptions}
   * @description This is used to customize the toast.
   */
  options?: Partial<ToastOptions>
  /**
   * Whether to remove the toast from the toast container.
   * @type {boolean}
   * @default false
   * @description This is used to remove the toast from the toast container.
   */
  remove: boolean
}

export interface ToastContextProps {
  /**
   * The function to add the toast in the toast container
   * @param message
   * @param type
   * @returns
   */
  addToast: (message: string, type: ToastType) => void
  /**
   * The function to remove the toast in the toast container
   * @param id
   * @returns
   */
  removeToast: (id: string) => void
  /**
   * The function to set the toasts in the toast container
   * @param value @type {React.SetStateAction<Toast[]>}
   * @returns
   */
  setToasts: (value: React.SetStateAction<Toast[]>) => void
  /**
   * The position of the toast.
   * @type {ToastPosition}
   */
  position: ToastPosition
  /**
   * Whether to use rich colors for the toast.
   * @type {boolean}
   */
  richColors: boolean
  /**
   * The animation of the toast.
   * @type {string}
   */
  animation: ToastAnimation
  /**
   * Whether to show the close button for the toast.
   * @type {boolean}
   */
  showCloseButton: boolean
  /**
   * Whether to enable auto dismiss for the toast.
   * @type {boolean}
   */
  disableAutoDismiss: boolean
  /**
   * The duration of the toast to display.
   * @type {number}
   */
  duration: number
  /**
   * The X Offset of the toast.
   * @type {number}
   */
  X_Offset: number
  /**
   * The Y Offset of the toast.
   * @type {number}
   */
  Y_Offset: number
}

export interface ToastProviderProps {
  /**
   * The children of the ToastProvider.
   * @type {React.ReactNode}
   */
  children: React.ReactNode
  /**
   * Whether to use rich colors for the toast.
   * @type {boolean}
   * @default false
   */
  richColors?: boolean
  /**
   * The position of the toast.
   * @type {ToastPosition}
   * @default "bottom-right"
   */
  position?: ToastPosition
  /**
   * The duration of the toast to display.
   * @type {number}
   * @default 5000
   */
  duration?: number
  /**
   * Whether to enable auto dismiss for the toast.
   * @type {boolean}
   * @default true
   */
  disableAutoDismiss?: boolean
  /**
   * If too many toasts appear at once, we should queue them instead of overwhelming the user.
   * @type {boolean}
   * @default false
   */
  enableQueueSystem?: boolean
  /**
   * The maximum no of toasts to show when queue system is enabled.
   * @type {number}
   * @default 3
   */
  maxToasts?: number
  /**
   * The animation of the toast.
   * @type {string}
   * @default "fade"
   */
  animation?: ToastAnimation
  /**
   * Whether to show the close button for the toast.
   * @type {boolean}
   * @default false
   */
  showCloseButton?: boolean
  /**
   * The theme of the toast.
   * @type {Theme}
   * @default "light"
   */
  theme?: Theme
  /**
   * The X Offset of the toast.
   * @type {number}
   */
  X_Offset?: number
  /**
   * The Y Offset of the toast.
   * @type {number}
   */
  Y_Offset?: number
  // /**
  //  * The style of the toast.
  //  * @type {React.CSSProperties}
  //  */
  // style?: React.CSSProperties
  // /**
  //  * The class name of the toast.
  //  * @type {string}
  //  */
  // className?: string
  // /**
  //  * The class name of the toast container.
  //  * @type {string}
  //  */
  // containerClassName?: string
  // /**
  //  * The class name of the toast item.
  //  * @type {string}
  //  */
  // itemClassName?: string
  // /**
  //  * The class name of the toast item close button.
  //  * @type {string}
  //  */
  // itemCloseClassName?: string
  // /**
  //  * The class name of the toast item icon.
  //  * @type {string}
  //  */
  // itemIconClassName?: string
  // /**
  //  * The class name of the toast item message.
  //  * @type {string}
  //  */
  // itemMessageClassName?: string
}
