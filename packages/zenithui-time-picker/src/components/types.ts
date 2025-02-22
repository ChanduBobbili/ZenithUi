export type TimePickerClassNames = {
  /**
   * Class name for the popover content.
   */
  popoverContent?: string
  /**
   * Class name for the popover trigger button.
   */
  button?: string

  /**
   * Class name for the time scroll list.
   */
  timeScrollList?: string

  /**
   * Class name for the time scroll list item.
   */
  timeScrollListItem?: string
  /**
   * Class name for the time scroll list item when selected.
   */
  Selected?: string
}

export type TimePickerProps = {
  /**
   * The selected time in "HH:MM" format (24-hour clock).
   */
  time: string

  /**
   * Callback function to handle time changes, receives updated time in "HH:MM" format (24-hour clock).
   */
  onTimeChange: (time: string) => void

  /**
   * Alignment of the popover relative to the trigger element.
   * Can be "center", "end", or "start".
   * Default: "center".
   */
  align?: "center" | "end" | "start"

  /**
   * Side of the trigger element where the popover will appear.
   * Can be "top", "right", "bottom", or "left".
   * Default: "bottom".
   */
  side?: "top" | "right" | "bottom" | "left"

  /**
   * Offset for popover alignment along the alignment axis.
   * Default: 10.
   */
  alignOffset?: number

  /**
   * Offset for popover alignment along the side axis.
   * Default: 10.
   */
  sideOffset?: number
  /**
   * Class names for the Time Picker.
   */
  classNames?: TimePickerClassNames
  /**
   * Enables the theme customization of the calendar.
   * @description{"light"} explicitly enables the light theme
   * @description{"dark"} explicitly enables the dark theme
   * @description{"auto"} automatically enables the theme based on the system preference
   */
  theme?: "light" | "dark" | "auto"
  /**
   * Custom formatter for time display.
   * @param time - The time in "HH:MM" format (24-hour clock).
   * @returns Formatted time string.
   */
  formatter?: (time: string) => string
}

export type TimeScrollListProps = {
  /**
   * List of time options to display (e.g., hours, minutes, or AM/PM).
   */
  options: string[]

  /**
   * The currently selected value from the list.
   */
  value: string

  /**
   * Callback function triggered when a new value is selected.
   */
  onChange: (value: string) => void
  /**
   * Class names for the Time Scroll List.
   */
  classNames?: TimePickerClassNames
}

export type CountDownTimerProps = {
  /**
   * The start time for the countdown timer in a string format (ISO).
   */
  startTime: string

  /**
   * The format of the countdown display.
   * Can be "with-names" to include labels (e.g., hours, minutes) or "without-names" for a plain numeric display.
   * @default "without-names"
   */
  format?: "with-names" | "without-names"

  /**
   * Additional CSS class name(s) to apply to the countdown timer component.
   */
  className?: string

  /**
   * Description text to display alongside the countdown timer.
   */
  description?: string

  /**
   * The number of minutes for the countdown timer.
   * @default 5
   */
  minutes?: number

  /**
   * Additional CSS class name(s) to apply to the description text.
   */
  descriptionClassName?: string
  /**
   * Enables the theme customization of the Count Down.
   */
  theme?: "light" | "dark" | "auto"

  /**
   * Callback function to be called when the countdown timer expires.
   * @param isExpire - A boolean indicating whether the timer has expired.
   */
  onExpired?: (isExpire: boolean) => void
}
