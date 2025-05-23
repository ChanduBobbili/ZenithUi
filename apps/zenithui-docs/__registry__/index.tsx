/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {
  "index": {
    name: "index",
    description: "",
    type: "registry:style",
    registryDependencies: ["utils"],
    files: [],
    component: null,
    meta: undefined,
  },
  "time-picker": {
    name: "time-picker",
    description: "",
    type: "registry:ui",
    registryDependencies: ["popover","scroll-area","toggle-group"],
    files: [{
      path: "registry/ui/time-picker.tsx",
      type: "registry:ui",
      target: ""
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/ui/time-picker.tsx")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    }),
    meta: undefined,
  },
  "calendar": {
    name: "calendar",
    description: "",
    type: "registry:ui",
    registryDependencies: undefined,
    files: [{
      path: "registry/ui/calendar.tsx",
      type: "registry:ui",
      target: ""
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/ui/calendar.tsx")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    }),
    meta: undefined,
  },
  "tooltip": {
    name: "tooltip",
    description: "",
    type: "registry:ui",
    registryDependencies: undefined,
    files: [{
      path: "registry/ui/tooltip.tsx",
      type: "registry:ui",
      target: ""
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/ui/tooltip.tsx")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    }),
    meta: undefined,
  },
  "light-box": {
    name: "light-box",
    description: "",
    type: "registry:ui",
    registryDependencies: undefined,
    files: [{
      path: "registry/ui/light-box.tsx",
      type: "registry:ui",
      target: ""
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/ui/light-box.tsx")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    }),
    meta: undefined,
  },
  "utils": {
    name: "utils",
    description: "",
    type: "registry:lib",
    registryDependencies: undefined,
    files: [{
      path: "registry/lib/utils.ts",
      type: "registry:lib",
      target: ""
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/lib/utils.ts")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    }),
    meta: undefined,
  },
  }