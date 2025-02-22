import { generateStaticParamsFor, importPage } from "nextra/pages"
import MdxPage from "./mdx-page"

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
  const paths = params.mdxPath
  const { toc, metadata } = await importPage(paths)

  // Pass MDX module path instead of component Fallback to default if no path provided (root "docs" page)
  const mdxPath = paths?.length > 0 ? paths.join("/") : "index"
  return (
    <MdxPage
      mdxPath={mdxPath}
      toc={toc}
      metadata={metadata}
    />
  )
}
