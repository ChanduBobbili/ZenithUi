declare module "*.svg?react" {
  import type * as React from "react"
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module "*.css" {
  const css: string
  export default css
}

declare module "*.svg" {
  const src: string
  export default src
}

declare module "*.svg" {
  import type * as React from "react"
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}
