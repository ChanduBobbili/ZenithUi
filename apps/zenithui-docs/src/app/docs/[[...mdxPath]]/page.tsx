// "use client"

import MdxWrapper from "@/components/mdx-wrapper"
import { generateStaticParamsFor, importPage } from "nextra/pages"

export const generateStaticParams = generateStaticParamsFor("mdxPath")

export async function generateMetadata(props: {
  params: Promise<{
    mdxPath: string[]
  }>
}) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

export default async function Page(props: {
  params: Promise<{
    mdxPath: string[]
  }>
}) {
  const params = await props.params
  const result = await importPage(params.mdxPath)
  const { default: MDXContent, toc, metadata } = result
  return (
    <MdxWrapper
      toc={toc}
      metadata={metadata}
    >
      <MDXContent
        {...props}
        params={params}
      />
    </MdxWrapper>
  )
}
