import { createContext, useContext } from "react"
import { DayPickerContextProps } from "../components/types"

export const DayPickerContext = createContext<
  DayPickerContextProps | undefined
>(undefined)

export const useDayPicker = () => {
  const context = useContext(DayPickerContext)
  if (!context) {
    throw new Error("useDayPicker must be used within a DayPickerProvider")
  }
  return context
}
