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
  {
    name: "3d-card",
    type: "registry:ui",
    title: "3D Card Effect",
    description:
      "A card perspective effect, hover over the card to elevate card elements.",
    files: [
      {
        path: "ui/3d-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "card-hover-effect",
    type: "registry:ui",
    title: "Hover Effect",
    description:
      "Hover over the cards and the effect slides to the currently hovered card.",
    dependencies: ["motion"],
    files: [
      {
        path: "ui/card-hover-effect.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "expandable-card",
    type: "registry:ui",
    title: "Expandable Cards",
    description: "Click cards to expand them and show additional information.",
    dependencies: ["motion"],
    files: [
      {
        path: "ui/expandable-card.tsx",
        type: "registry:ui",
      },
      {
        path: "hooks/use-outside-click.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "direction-aware-hover",
    type: "registry:ui",
    title: "Direction Aware Hover",
    description: "A direction aware hover effect using Framer Motion.",
    dependencies: ["motion"],
    files: [
      {
        path: "ui/direction-aware-hover.tsx",
        type: "registry:ui",
      },
    ],
  },
]
