export function getTheme() {
  const theme = localStorage.getItem("theme")
  if (theme) {
    return theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : ""
      : theme === "dark"
        ? "dark"
        : ""
  }
  return ""
}
