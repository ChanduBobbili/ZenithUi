import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-docs"

const docsComponents = getDocsMDXComponents()

export const useMDXComponents = (components) => {
  return {
    ...docsComponents,
    ...components,
  }
}
