import { useThemeMode } from "@zenithui/utils"

export default function GlitchThemeAnimator() {
  const { ref, toggleSwitchTheme, isDarkMode } = useThemeMode({
    animationType: "GLITCH",
    duration: 750,
    blurAmount: 2,
    glitchIntensity: 5,
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
