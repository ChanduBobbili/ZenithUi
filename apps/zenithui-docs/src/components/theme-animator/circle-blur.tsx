import { useThemeMode } from "@zenithui/utils"

export default function CircleBlurThemeAnimator() {
  const { ref, toggleSwitchTheme, isDarkMode } = useThemeMode({
    animationType: "CIRCLE-BLUR",
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
