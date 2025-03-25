declare module "*.svg?react" {
  import React from "react"
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module "*.svg" {
  const src: string
  export default src
}

declare module "*.svg" {
  import React from "react"
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}
