import { generateStaticParamsFor, importPage } from "nextra/pages"
import MdxPage from "./mdx-page"

export const generateStaticParams = generateStaticParamsFor("mdxPath")

export async function generateMetadata(props: {
  params: { mdxPath: string[] }
}) {
  const { params } = props
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

export default async function Page({
  params,
}: {
  params: { mdxPath: string[] }
}) {
  const paths = params.mdxPath ?? [""]
  const { toc, metadata } = await importPage(paths)

  console.log(paths, "paths------------")

  // Pass MDX module path instead of component
  const mdxPath = params.mdxPath?.join("/") ?? "/"
  return (
    <MdxPage
      mdxPath={mdxPath}
      toc={toc}
      metadata={metadata}
    />
  )
}
