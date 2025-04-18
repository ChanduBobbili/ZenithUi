import { Toast, ToastAnimation, ToastPosition, ToastType } from "./types"

/**
 * The Function to reverse the toaats
 * @param toasts @type {Toast}
 * @returns
 */
export function reverseToasts(toasts: Toast[]) {
  const ret = []
  for (let i = toasts.length - 1; i >= 0; i--) {
    ret.push(toasts[i])
  }
  return ret
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

/**
 *
 * @param animation @type {ToastAnimation} The animation of the toast.
 * @param position @type {ToastPosition}
 * @param isEnter @type {boolean}
 * @description Returns the animation class for the toast.
 */
export function getToastAnimation(
  animation: ToastAnimation,
  position: ToastPosition,
  isEnter: boolean,
) {
  switch (animation) {
    case "enter-with-icon":
    case "fade":
      return getFadeAnimation(position, isEnter)
    case "slide":
      return getSlideAnimation(position, isEnter)
    default:
      break
  }
}

/**
 *
 * @param position @type {ToastPosition}
 * @param isEnter @type {boolean}
 * @description Returns the fade animation according to the position
 */
function getFadeAnimation(position: ToastPosition, isEnter: boolean) {
  switch (position) {
    case "top-left":
    case "top-right":
    case "top-center":
      return isEnter ? "zenithui-fade-in-top" : "zenithui-fade-out-top"
    case "bottom-center":
    case "bottom-left":
    case "bottom-right":
    default:
      return isEnter ? "zenithui-fade-in-bottom" : "zenithui-fade-out-bottom"
  }
}

function getSlideAnimation(position: ToastPosition, isEnter: boolean) {
  switch (position) {
    case "top-left":
    case "bottom-left":
      return isEnter ? "zenithui-slide-in-left" : "zenithui-slide-out-left"
    case "top-right":
    case "bottom-right":
      return isEnter ? "zenithui-slide-in-right" : "zenithui-slide-out-right"
    case "top-center":
      return isEnter ? "zenithui-fade-in-top" : "zenithui-fade-out-top"
    case "bottom-center":
      return isEnter ? "zenithui-fade-in-bottom" : "zenithui-fade-out-bottom"
    default:
      return ""
  }
}
