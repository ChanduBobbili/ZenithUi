import { useThemeMode } from "@zenithui/utils"

export default function SwipeThemeAnimator() {
  const { ref, toggleSwitchTheme, isDarkMode } = useThemeMode({
    animationType: "SWIPE",
    duration: 750,
    blurAmount: 2,
  })

  return (
    <button
      type="button"
      ref={ref}
      onClick={toggleSwitchTheme}
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  )
}
