import { type Registry } from "shadcn/registry"

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
    name: "day-picker",
    type: "registry:ui",
    dependencies: ["@zenithui/day-picker", "lucide-react"],
    files: [
      {
        path: "ui/day-picker.tsx",
        type: "registry:ui",
      },
    ],
  },
]
