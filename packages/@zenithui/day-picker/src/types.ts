export type DayPickerclassNames = {
  /**
   * The class names to apply to the calendar.
   */
  calendar: string
  /**
   * The class names to apply to the header.
   */
  header: string
  /**
   * The class names to apply to the month caption.
   */
  monthCaption: string
  /**
   * The class names to apply to the previous month button.
   */
  prevMonthButton: string
  /**
   * The class names to apply to the next month button.
   */
  nextMonthButton: string
  /**
   * The class names to apply to the weekdays.
   */
  weekdays: string
  /**
   * The class names to apply to the weekday.
   */
  weekday: string
  /**
   * The class names to apply to the months and Years.
   */
  months: string
  /**
   * The class names to apply to the days.
   */
  days: string
  /**
   * The class names to apply to the day.
   */
  day: string
  /**
   * The class names to apply to the selected day.
   */
  daySelected: string
  /**
   * The class names to apply to the range start date.
   */
  rangeStart: string
  /**
   * The class names to apply to the range end date.
   */
  rangeEnd: string
  /**
   * The class names to apply to the dates in the range.
   */
  rangeDates: string
  /**
   * The class names to apply to the outside date (not in the current month).
   */
  outsideDate: string
  /**
   * The class names to apply to the today date.
   */
  today: string
}

export type DatePickerMode = "single" | "range"
export type DayPickerState = "day" | "month" | "year"
export type DateRange = { from: Date; to: Date }
/**
 * The day of the week.
 * @example
 * 0: Sunday...
 * 6: Saturday
 */
type DayOfWeek =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"

/**
 * Represents the disabled dates configuration for a date picker component.
 *
 * @typedef {Object} Disabled
 *
 * @property {Date | string} before - Disables all dates before the specified date.
 * @property {Date | string} after - Disables all dates after the specified date.
 * @property {Date | string} date - Disables a specific date.
 * @property {Date[] | string[]} dates - Disables an array of specific dates.
 * @property {DayOfWeek[]} days - Disables specific days of the week.
 * @property {(date: Date) => boolean} modifier - A function that takes a date and returns a boolean indicating whether the date should be disabled.
 */
export type Disabled = {
  before: Date | string
  after: Date | string
  date: Date | string
  dates: Date[] | string[]
  days: DayOfWeek[]
  modifier: (date: Date) => boolean
}

export type InternalRange = { from: Date | null; to: Date | null }

export type BaseDayPickerProps = {
  /**
   * The class names to apply to the day picker.
   * Allows partial customization of the day picker class names.
   */
  classNames?: Partial<DayPickerclassNames>

  /**
   * Whether to hide the navigation buttons.
   * If true, the navigation buttons will not be displayed.
   */
  hideNavigation?: boolean

  /**
   * Whether to disable the navigation buttons.
   * If true, the navigation buttons will be disabled.
   */
  disableNavigation?: boolean

  /**
   * Whether to hide the weekdays.
   * If true, the weekdays will not be displayed.
   */
  hideWeekdays?: boolean

  /**
   * Whether to hide the outside dates.
   * If true, dates outside the current month will not be displayed.
   */
  hideOutsideDates?: boolean

  /**
   * Enables the theme customization of the calendar.
   * - "light": explicitly enables the light theme.
   * - "dark": explicitly enables the dark theme.
   * - "auto": automatically enables the theme based on the system preference.
   */
  theme?: "light" | "dark" | "auto"

  /**
   * Whether to disable the date.
   * Allows partial customization of the disabled dates.
   */
  disabled?: Partial<Disabled>
}

export type SingleDayPickerProps = {
  /**
   * The date that is currently selected.
   * Can be a single date or a range of dates.
   */
  selected?: Date
  /**
   * The function that is called when a date is selected.
   * @param date - The selected date or date range.
   */
  onSelect?: (date: Date) => void
  /**
   * The selection mode for the date picker.
   * Can be either "single" for single date selection or "range" for date range selection.
   */
  mode: "single"
}

export type RangeDayPickerProps = {
  /**
   * The date that is currently selected.
   * Can be a single date or a range of dates.
   */
  selected?: DateRange
  /**
   * The function that is called when a date is selected.
   * @param date - The selected date or date range.
   */
  onSelect?: (date: DateRange) => void
  /**
   * The selection mode for the date picker.
   * Can be either "single" for single date selection or "range" for date range selection.
   */
  mode: "range"
}

/**
 * Props for the DayPicker component.
 */
export type DayPickerProps =
  | (BaseDayPickerProps & SingleDayPickerProps)
  | (BaseDayPickerProps & RangeDayPickerProps)

export type DayPickerContextProps = {
  selected: Date | DateRange | null
  onSelect: ((date: Date) => void) | ((date: DateRange) => void)
  mode: DatePickerMode
  currentMonth: Date
  setCurrentMonth: (date: Date) => void
  state: DayPickerState
  setState: (state: DayPickerState) => void
  range: InternalRange
  setRange: (range: InternalRange) => void
  focus: Date | null
  setFocus: (date: Date | null) => void
  disableNavigation: boolean
  hideWeekdays: boolean
  hideOutsideDates: boolean
  classNames?: Partial<DayPickerclassNames>
  disabled?: Partial<Disabled>
}
