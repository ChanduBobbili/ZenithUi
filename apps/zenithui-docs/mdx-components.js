"use client"

import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-docs"

export const useMDXComponents = (components) => {
  const docsComponents = getDocsMDXComponents()

  return {
    ...docsComponents,
    ...components,
  }
}
