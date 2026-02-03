import type { Registry } from "shadcn/registry"

export const ui: Registry["items"] = [
  {
    name: "time-picker",
    type: "registry:ui",
    dependencies: ["@zenithui/time-picker", "lucide-react"],
    registryDependencies: ["popover", "scroll-area", "toggle-group"],
    files: [
      {
        path: "ui/time-picker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "calendar",
    type: "registry:ui",
    dependencies: ["@zenithui/day-picker", "lucide-react"],
    files: [
      {
        path: "ui/calendar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tooltip",
    type: "registry:ui",
    dependencies: ["@zenithui/tooltip"],
    files: [
      {
        path: "ui/tooltip.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "light-box",
    type: "registry:ui",
    dependencies: ["@zenithui/light-box", "lucide-react"],
    files: [
      {
        path: "ui/light-box.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "fab",
    type: "registry:ui",
    dependencies: ["@zenithui/fab"],
    files: [
      {
        path: "ui/fab.tsx",
        type: "registry:ui",
      },
    ],
  },
]
