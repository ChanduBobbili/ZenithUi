export type ToastType =
  | "success"
  | "info"
  | "error"
  | "warning"
  | "loading"
  | "promise"

export type Theme = "auto" | "light" | "dark"

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"

export type ToastAnimation = "slide" | "fade" | "enter-with-icon"

export type ClassNames = {
  /**
   * The class name of the toast container.
   */
  className: string
  /**
   * The class name of the toast icon.
   */
  icon: string
  /**
   * The class name of the toast message.
   */
  title: string
  /**
   * The class name of the toast description.
   */
  description: string
  /**
   * The class name of the toast close button.
   */
  closeButton: string
  /**
   * The class name of the toast action button.
   */
  actionButton: string
  /**
   * The class name of the toast cancel button.
   */
  cancelButton: string
}

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
  /**
   * The title of the toast.
   * @type {string}
   * @description This is used to display the title of the toast.
   */
  title?: string
  /**
   * The description of the toast.
   * @type {string}
   * @description This is used to display the description of the toast.
   */
  description?: string
  /**
   * The classNames to customise the toast.
   * @type {Partial<ClassNames>}
   */
  classNames?: Partial<ClassNames> | string
  /**
   * The callback function to execute when the action button is clicked.
   * @type {React.MouseEventHandler<HTMLButtonElement>}
   */
  onAction?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * The callback function to execute when the cancel button is clicked.
   * @type {React.MouseEventHandler<HTMLButtonElement>}
   */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * The callback function to execute when the toast is closed.
   * @type {React.MouseEventHandler<HTMLButtonElement>}
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * The custom action button.
   * @type {React.FC<ButtonProps>}
   */
  action?: React.FC<ButtonProps>
  /**
   * The custom cancel button.
   * @type {React.FC<ButtonProps>}
   */
  cancel?: React.FC<ButtonProps>
  /**
   * The custom close button.
   * @type {React.FC<ButtonProps>}
   */
  close?: React.FC<ButtonProps>
  /**
   * The icon to display in the toast.
   * @type {React.ReactNode}
   */
  icon?: React.ReactNode
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
   * @type {string | Promise<any>}
   */
  message: string | Promise<any>
  /**
   * The options to customize the toast.
   * @type {ToastOptions}
   * @description This is used to customize the toast.
   */
  options?: Partial<ToastOptions & PromiseToast>
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
  /**
   * The classNames to customise the toast.
   * @type {Partial<ClassNames>}
   */
  classNames?: Partial<ClassNames>
}

/**
 * Props for the ToastProvider component.
 */
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
   * The duration of the toast to display in milliseconds.
   * @type {number}
   * @default 5000
   */
  duration?: number
  /**
   * Whether to disable auto dismiss for the toast.
   * If true, the toast will not automatically disappear.
   * @type {boolean}
   * @default true
   */
  disableAutoDismiss?: boolean
  /**
   * Whether to enable a queue system for toasts.
   * If true, toasts will be queued if too many appear at once.
   * @type {boolean}
   * @default false
   */
  enableQueueSystem?: boolean
  /**
   * The maximum number of toasts to show when the queue system is enabled.
   * @type {number}
   * @default 3
   */
  maxToasts?: number
  /**
   * The animation type for the toast.
   * @type {ToastAnimation}
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
   * The X Offset of the toast in pixels.
   * @type {number}
   */
  X_Offset?: number
  /**
   * The Y Offset of the toast in pixels.
   * @type {number}
   */
  Y_Offset?: number
  /**
   * The classNames to customize the toast.
   * @type {Partial<ClassNames>}
   */
  classNames?: Partial<ClassNames>
}

/**
 * Interface representing the properties for a Button component.
 * Extends the standard HTML button attributes provided by React.
 *
 * @interface ButtonProps
 * @extends {React.HTMLAttributes<HTMLButtonElement>}
 *
 * @property {("action" | "cancel" | "close")} [btntype] -
 * Optional property to specify the type of button.
 * Can be one of the following values:
 * - "action": Represents a primary action button.
 * - "cancel": Represents a cancel button.
 * - "close": Represents a close button.
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  btntype?: "action" | "cancel" | "close"
}

/**
 * Interface representing the structure of a toast notification for different states of a promise.
 *
 * @interface PromiseToast
 *
 * @property {string} [loading] - The message to be displayed when the promise is in the loading state.
 * @property {string} [success] - The message to be displayed when the promise is successfully resolved.
 * @property {string} [error] - The message to be displayed when the promise is rejected or encounters an error.
 */
export interface PromiseToast {
  loading?: string
  success?: string | ((data: any) => string)
  error?: string | ((data: any) => string)
}
