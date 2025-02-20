/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useMDXComponents } from "../../mdx-components"

export default function MdxWrapper({
  children,
  toc,
  metadata,
}: {
  children: React.ReactNode
  toc?: any
  metadata?: any
}) {
  const Wrapper = useMDXComponents().wrapper
  return (
    <Wrapper
      toc={toc}
      metadata={metadata}
    >
      {children}
    </Wrapper>
  )
}
