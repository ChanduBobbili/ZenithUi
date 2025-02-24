"use client"
import { CodeBlock } from "react-code-block"
import { themes } from "prism-react-renderer"
import { useTheme } from "@/hooks/use-theme"

interface MyCodeBlockProps {
  code: string
  language: string
  showLines?: boolean
}

function MyCodeBlock({ code, language, showLines = false }: MyCodeBlockProps) {
  const theme = useTheme()

  return (
    <CodeBlock
      code={code}
      language={language}
      theme={theme === "light" ? themes.github : themes.nightOwl}
    >
      <CodeBlock.Code className="rounded-xl bg-slate-100 p-6 text-gray-500 shadow-lg dark:bg-zinc-900 w-fit">
        <div className="table-row">
          {showLines && (
            <CodeBlock.LineNumber className="table-cell pr-4 text-right text-gray-400" />
          )}
          <CodeBlock.LineContent className="table-cell">
            <CodeBlock.Token />
          </CodeBlock.LineContent>
        </div>
      </CodeBlock.Code>
    </CodeBlock>
  )
}

export default MyCodeBlock
