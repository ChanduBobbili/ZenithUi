import { useThemeMode } from "@zenithui/utils"

export default function RippleThemeAnimator() {
  const { ref, toggleSwitchTheme, isDarkMode } = useThemeMode({
    animationType: "RIPPLE",
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
