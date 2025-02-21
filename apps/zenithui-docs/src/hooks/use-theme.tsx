import { useEffect, useState } from "react"

export function useTheme(): string | null {
  const [theme, setTheme] = useState<string | null>(() =>
    localStorage.getItem("theme"),
  )

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme"))
    }

    // Listen for changes to the "theme" key in localStorage
    window.addEventListener("storage", handleStorageChange)

    // Also observe direct changes to localStorage within the app
    const originalSetItem = localStorage.setItem
    localStorage.setItem = (key, value) => {
      originalSetItem.call(localStorage, key, value)
      if (key === "theme") {
        handleStorageChange()
      }
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      localStorage.setItem = originalSetItem // Clean up override
    }
  }, [])

  return theme
}
