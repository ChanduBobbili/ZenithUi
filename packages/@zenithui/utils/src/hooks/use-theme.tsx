import { useEffect, useState } from "react"

export default function useTheme() {
  const getTheme = () => {
    let storedTheme: string
    if (typeof window !== "undefined") {
      storedTheme = localStorage.getItem("theme") ?? ""
    } else {
      storedTheme = "system"
    }

    // Check if body or #root has the "dark" class
    let hasDarkClass: boolean = false
    if (typeof document !== "undefined") {
      hasDarkClass =
        document.body.classList.contains("dark") ||
        document.getElementById("root")?.classList.contains("dark") ||
        false
    }
    let systemDark: boolean = false
    if (storedTheme === "system" || !storedTheme) {
      if (typeof window !== "undefined") {
        systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      }
      return hasDarkClass || systemDark ? "dark" : ""
    }

    return storedTheme === "dark" || hasDarkClass ? "dark" : ""
  }

  const [theme, setTheme] = useState<"dark" | "">("")

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

    handleStorageChange()
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
      localStorage.setItem = originalSetItem
    }
  }, [])

  return theme
}
