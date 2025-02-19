/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/~__root"
import { Route as IndexImport } from "./routes/~index"
import { Route as DemoToastImport } from "./routes/~_demo/~toast"
import { Route as DemoTimePickerImport } from "./routes/~_demo/~time-picker"
import { Route as DemoPrimitiveImport } from "./routes/~_demo/~primitive"
import { Route as DemoLightBoxImport } from "./routes/~_demo/~light-box"
import { Route as DemoDayPickerImport } from "./routes/~_demo/~day-picker"

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any)

const DemoToastRoute = DemoToastImport.update({
  id: "/_demo/toast",
  path: "/toast",
  getParentRoute: () => rootRoute,
} as any)

const DemoTimePickerRoute = DemoTimePickerImport.update({
  id: "/_demo/time-picker",
  path: "/time-picker",
  getParentRoute: () => rootRoute,
} as any)

const DemoPrimitiveRoute = DemoPrimitiveImport.update({
  id: "/_demo/primitive",
  path: "/primitive",
  getParentRoute: () => rootRoute,
} as any)

const DemoLightBoxRoute = DemoLightBoxImport.update({
  id: "/_demo/light-box",
  path: "/light-box",
  getParentRoute: () => rootRoute,
} as any)

const DemoDayPickerRoute = DemoDayPickerImport.update({
  id: "/_demo/day-picker",
  path: "/day-picker",
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/"
      path: "/"
      fullPath: "/"
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    "/_demo/day-picker": {
      id: "/_demo/day-picker"
      path: "/day-picker"
      fullPath: "/day-picker"
      preLoaderRoute: typeof DemoDayPickerImport
      parentRoute: typeof rootRoute
    }
    "/_demo/light-box": {
      id: "/_demo/light-box"
      path: "/light-box"
      fullPath: "/light-box"
      preLoaderRoute: typeof DemoLightBoxImport
      parentRoute: typeof rootRoute
    }
    "/_demo/primitive": {
      id: "/_demo/primitive"
      path: "/primitive"
      fullPath: "/primitive"
      preLoaderRoute: typeof DemoPrimitiveImport
      parentRoute: typeof rootRoute
    }
    "/_demo/time-picker": {
      id: "/_demo/time-picker"
      path: "/time-picker"
      fullPath: "/time-picker"
      preLoaderRoute: typeof DemoTimePickerImport
      parentRoute: typeof rootRoute
    }
    "/_demo/toast": {
      id: "/_demo/toast"
      path: "/toast"
      fullPath: "/toast"
      preLoaderRoute: typeof DemoToastImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute
  "/day-picker": typeof DemoDayPickerRoute
  "/light-box": typeof DemoLightBoxRoute
  "/primitive": typeof DemoPrimitiveRoute
  "/time-picker": typeof DemoTimePickerRoute
  "/toast": typeof DemoToastRoute
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute
  "/day-picker": typeof DemoDayPickerRoute
  "/light-box": typeof DemoLightBoxRoute
  "/primitive": typeof DemoPrimitiveRoute
  "/time-picker": typeof DemoTimePickerRoute
  "/toast": typeof DemoToastRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  "/": typeof IndexRoute
  "/_demo/day-picker": typeof DemoDayPickerRoute
  "/_demo/light-box": typeof DemoLightBoxRoute
  "/_demo/primitive": typeof DemoPrimitiveRoute
  "/_demo/time-picker": typeof DemoTimePickerRoute
  "/_demo/toast": typeof DemoToastRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | "/"
    | "/day-picker"
    | "/light-box"
    | "/primitive"
    | "/time-picker"
    | "/toast"
  fileRoutesByTo: FileRoutesByTo
  to:
    | "/"
    | "/day-picker"
    | "/light-box"
    | "/primitive"
    | "/time-picker"
    | "/toast"
  id:
    | "__root__"
    | "/"
    | "/_demo/day-picker"
    | "/_demo/light-box"
    | "/_demo/primitive"
    | "/_demo/time-picker"
    | "/_demo/toast"
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DemoDayPickerRoute: typeof DemoDayPickerRoute
  DemoLightBoxRoute: typeof DemoLightBoxRoute
  DemoPrimitiveRoute: typeof DemoPrimitiveRoute
  DemoTimePickerRoute: typeof DemoTimePickerRoute
  DemoToastRoute: typeof DemoToastRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DemoDayPickerRoute: DemoDayPickerRoute,
  DemoLightBoxRoute: DemoLightBoxRoute,
  DemoPrimitiveRoute: DemoPrimitiveRoute,
  DemoTimePickerRoute: DemoTimePickerRoute,
  DemoToastRoute: DemoToastRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "~__root.tsx",
      "children": [
        "/",
        "/_demo/day-picker",
        "/_demo/light-box",
        "/_demo/primitive",
        "/_demo/time-picker",
        "/_demo/toast"
      ]
    },
    "/": {
      "filePath": "~index.tsx"
    },
    "/_demo/day-picker": {
      "filePath": "~_demo/~day-picker.tsx"
    },
    "/_demo/light-box": {
      "filePath": "~_demo/~light-box.tsx"
    },
    "/_demo/primitive": {
      "filePath": "~_demo/~primitive.tsx"
    },
    "/_demo/time-picker": {
      "filePath": "~_demo/~time-picker.tsx"
    },
    "/_demo/toast": {
      "filePath": "~_demo/~toast.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
