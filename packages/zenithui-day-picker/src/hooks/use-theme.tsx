import { useEffect, useState } from "react"

export function useTheme() {
  const getTheme = () => {
    const storedTheme = localStorage.getItem("theme")

    // Check if body or #root has the "dark" class
    const hasDarkClass =
      document.body.classList.contains("dark") ||
      document.getElementById("root")?.classList.contains("dark")

    if (storedTheme === "system" || !storedTheme) {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches
      return hasDarkClass || systemDark ? "dark" : ""
    }

    return storedTheme === "dark" || hasDarkClass ? "dark" : ""
  }

  const [theme, setTheme] = useState<"dark" | "">(getTheme)

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(getTheme())
    }

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (
        localStorage.getItem("theme") === "system" ||
        !localStorage.getItem("theme")
      ) {
        setTheme(e.matches ? "dark" : "")
      }
    }

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange)

    // Observe system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", handleSystemThemeChange)

    // Override localStorage.setItem
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
      localStorage.setItem = originalSetItem
    }
  }, [])

  return theme
}
