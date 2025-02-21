/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import MdxWrapper from "@/components/mdx-wrapper"
import { useState } from "react"
import { useEffect } from "react"

interface MdxPageProps {
  mdxPath: string
  toc: any
  metadata: any
}

export default function MdxPage({ mdxPath, toc, metadata }: MdxPageProps) {
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null)

  console.log(mdxPath, "mdxPath")

  useEffect(() => {
    // Dynamically import the MDX content
    import(`@/content/${mdxPath}.mdx`)
      .then((module) => setMDXContent(() => module.default))
      .catch((err) => console.error("Failed to load MDX content:", err))
  }, [mdxPath])

  return (
    <MdxWrapper
      toc={toc}
      metadata={metadata}
    >
      {MDXContent ? <MDXContent /> : <p>Loading content...</p>}
    </MdxWrapper>
  )
}
