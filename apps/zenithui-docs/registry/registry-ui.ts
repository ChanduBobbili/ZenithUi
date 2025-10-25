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
    name: "theme-toggle",
    type: "registry:ui",
    dependencies: ["@zenithui/utils", "lucide-react"],
    files: [
      {
        path: "ui/theme-toggle.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "animated-list",
    type: "registry:ui",
    title: "Animated List",
    description:
      "A list that animates each item in sequence with a delay. Used to showcase notifications or events on your landing page.",
    dependencies: ["motion"],
    files: [
      {
        path: "ui/animated-list.tsx",
        type: "registry:ui",
      },
    ],
  },
]
