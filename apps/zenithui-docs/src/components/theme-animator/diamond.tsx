import { useThemeMode } from "@zenithui/utils"

export default function DiamondThemeAnimator() {
  const { ref, toggleSwitchTheme, isDarkMode } = useThemeMode({
    animationType: "DIAMOND",
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
