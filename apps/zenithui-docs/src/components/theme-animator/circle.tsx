import { useThemeMode } from "@zenithui/utils"

export default function CircleThemeAnimator() {
  const { ref, toggleSwitchTheme, isDarkMode } = useThemeMode({
    animationType: "CIRCLE",
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
