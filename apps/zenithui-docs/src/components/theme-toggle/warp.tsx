"use client"

import { useThemeMode } from "@zenithui/utils"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"

export default function WarpThemeAnimator() {
  const { ref, toggleSwitchTheme, isDarkMode } = useThemeMode({
    animationType: "WARP",
    duration: 750,
    blurAmount: 2,
  })

  return (
    <div className="bg-background flex h-32 items-center justify-center rounded-2xl border p-4">
      <Button
        ref={ref}
        variant="outline"
        size="icon"
        className={cn("relative size-fit rounded-full p-3 transition-all")}
        onClick={toggleSwitchTheme}
      >
        {isDarkMode ? (
          <Moon className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 opacity-0 transition-all dark:scale-100 dark:rotate-0 dark:opacity-100" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 opacity-100 transition-all dark:scale-0 dark:-rotate-90 dark:opacity-0" />
        )}
      </Button>
    </div>
  )
}
