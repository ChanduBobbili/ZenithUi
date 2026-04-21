import { useCallback, useEffect, useEffectEvent, useState } from "react"
import useEventListener from "./use-event-listner"

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = localStorage?.getItem(key)
      return item ? JSON.parse(item) : (initialValue as T)
    } catch (error) {
      console.log(error)
      return initialValue as T
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore =
          typeof value === "function" ? (value as (p: T) => T)(prev) : value
        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
          }
        } catch (error) {
          console.log(error)
        }
        return valueToStore
      })
    },
    [key],
  )

  const handleStorageChange = useEffectEvent((event: StorageEvent) => {
    if (event.key === key) {
      setStoredValue(event.newValue as T)
    }
  })

  useEventListener("storage", handleStorageChange)

  return [storedValue, setValue] as const
}
