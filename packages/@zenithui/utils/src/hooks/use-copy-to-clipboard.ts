import { useCallback, useState } from "react"

function oldSchoolCopy(text: string) {
  const tempTextArea = document.createElement("textarea")
  tempTextArea.value = text
  document.body.appendChild(tempTextArea)
  tempTextArea.select()
  document.execCommand("copy")
  document.body.removeChild(tempTextArea)
}

/**
 * The copied text as `string` or `null` if nothing has been copied yet.
 */
type CopiedValue = string | null

/**
 * Function to copy text to the clipboard.
 * @param text - The text to copy to the clipboard.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the text was copied successfully, or `false` otherwise.
 */
type CopyFn = (text: string, enableOldSchoolCopy?: boolean) => Promise<boolean>

/**
 * Custom hook that copies text to the clipboard using the [`Clipboard API`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
 * @returns An Object containing the copied text and a function to copy text to the clipboard.
 * @description
 * - `copiedText` is the text that has been copied to the clipboard.
 * - `copyToClipboard` is a function that takes a string and copies it to the clipboard.
 * - If the copy operation is successful, `copiedText` will be updated with the copied text.
 * - If the copy operation fails, `copiedText` will be set to `null`.
 * - The function will log a warning to the console if the copy operation fails.
 * - The function will also log a warning if the clipboard API is not supported.
 * - The function will use the `navigator.clipboard` API if available, otherwise it will fall back to the old school method of copying text to the clipboard.
 * - The function will return `true` if the copy operation is successful, and `false` if it fails.
 */
export default function useCopyToClipboard(): {
  copiedText: CopiedValue
  copyToClipboard: CopyFn
} {
  const [state, setState] = useState<CopiedValue>(null)

  const copyToClipboard: CopyFn = useCallback(
    async (text, enableOldSchoolCopy = false) => {
      if (!navigator?.clipboard) {
        console.warn("Clipboard not supported")
        // Fallback to old school copy if enabled
        if (enableOldSchoolCopy) {
          oldSchoolCopy(text)
          setState(text)
          return true
        }
        // Clipboard API not supported
        return false
      }

      // Try to save to clipboard then save it in the state if worked
      try {
        await navigator.clipboard.writeText(text)
        setState(text)
        return true
      } catch (error) {
        console.warn("Copy failed", error)
        return false
      }
    },
    [],
  )

  return { copiedText: state, copyToClipboard }
}
