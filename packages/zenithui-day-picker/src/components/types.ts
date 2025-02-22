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
export type DateRange = [Date, Date] | { from: Date; to: Date }

export type InternalRange =
  | [Date, Date | null]
  | { from: Date; to: Date | null }

export type DayPickerProps = {
  /**
   * The date that is currently selected.
   */
  selected: Date | DateRange
  /**
   * The function that is called when a date is selected.
   */
  onSelect: (date: any) => void
  /**
   * The selection mode. (single | range)
   */
  mode: DatePickerMode
  /**
   * The class names to apply to the day picker.
   */
  classNames?: Partial<DayPickerclassNames>
  /**
   * Whether to hide the navigation buttons.
   */
  hideNavigation?: boolean
  /**
   * Whether to hide the weekdays.
   */
  hideWeekdays?: boolean
  /**
   * Whether to hide the outside dates.
   */
  hideOutsideDates?: boolean
  /**
   * Enables the theme customization of the calendar.
   * @type{"light"} explicitly enables the light theme
   * @type{"dark"} explicitly enables the dark theme
   * @type{"auto"} automatically enables the theme based on the system preference
   */
  theme?: "light" | "dark" | "auto"
}

export type DayPickerContextProps = {
  selected: Date | DateRange | null
  onSelect: (date: Date | DateRange) => void
  mode: DatePickerMode
  currentMonth: Date
  setCurrentMonth: (date: Date) => void
  state: DayPickerState
  setState: (state: DayPickerState) => void
  range: InternalRange
  setRange: (range: InternalRange) => void
  focus: Date | null
  setFocus: (date: Date | null) => void
  hideWeekdays: boolean
  hideOutsideDates: boolean
  classNames?: Partial<DayPickerclassNames>
}
