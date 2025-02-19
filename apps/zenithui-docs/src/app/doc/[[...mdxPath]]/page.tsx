import { generateStaticParamsFor, importPage } from "nextra/pages"
import { useMDXComponents } from "../../../../mdx-components"

export const generateStaticParams = generateStaticParamsFor("mdxPath")

export async function generateMetadata(props: {
  params: { mdxPath: string[] }
}) {
  const { mdxPath } = await props.params
  try {
    const { metadata } = await importPage([...mdxPath])
    return metadata
  } catch (error) {
    console.error("Metadata Error:", error)
    return {}
  }
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const Wrapper = useMDXComponents().wrapper

export default async function Page(props: { params: { mdxPath: string[] } }) {
  const { mdxPath } = await props.params
  try {
    // Ensure the correct path to MDX files
    const result = await importPage([ ...mdxPath])
    const { default: MDXContent, toc, metadata } = result

    return (
      <Wrapper
        toc={toc}
        metadata={metadata}
      >
        <MDXContent
          {...props}
          params={props.params}
        />
      </Wrapper>
    )
  } catch (error) {
    console.error("Page Import Error:", error)
    return <div>Error loading page.</div>
  }
}
