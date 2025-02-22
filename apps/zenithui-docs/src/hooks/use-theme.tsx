import { useEffect, useState } from "react"

export function useTheme() {
  const getTheme = () => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme === "system" || !storedTheme) {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches
      return systemDark ? "dark" : "light"
    }

    return storedTheme === "dark" ? "dark" : "light"
  }
  const [theme, setTheme] = useState<"dark" | "light">(getTheme())

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(getTheme())
    }

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (
        localStorage.getItem("theme") === "system" ||
        !localStorage.getItem("theme")
      ) {
        setTheme(e.matches ? "dark" : "light")
      }
    }

    // Listen for changes to the "theme" key in localStorage
    window.addEventListener("storage", handleStorageChange)

    // Observe system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", handleSystemThemeChange)

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
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
      localStorage.setItem = originalSetItem // Clean up override
    }
  }, [])

  return theme
}
