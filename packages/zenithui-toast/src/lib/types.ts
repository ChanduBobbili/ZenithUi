export type ToastType = "success" | "info" | "error" | "warning" | "loading"

export type Theme = "auto" | "light" | "dark"

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"

export type ToastAnimation = "slide" | "fade"

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
  /**
   * The classNames to customise the toast.
   * @type {Partial<ClassNames>}
   */
  classNames?: Partial<ClassNames>
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
  /**
   * The classNames to customise the toast.
   * @type {Partial<ClassNames>}
   */
  classNames?: Partial<ClassNames>
}

/**
 * The Button component props.
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  btntype?: "action" | "cancel" | "close"
}
