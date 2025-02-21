"use client"
import { CodeBlock } from "react-code-block"
import { themes } from "prism-react-renderer"
import { useTheme } from "@/hooks/use-theme"

function MyCodeBlock({ code, language }: { code: string; language: string }) {
  const theme = useTheme()

  return (
    <CodeBlock
      code={code}
      language={language}
      theme={theme === "light" ? themes.github : themes.nightOwl}
    >
      <CodeBlock.Code className="rounded-xl bg-slate-100 p-6 text-gray-500 shadow-lg dark:bg-slate-800">
        <div className="table-row">
          <CodeBlock.LineNumber className="table-cell select-none pr-4 text-right text-sm text-gray-800" />
          <CodeBlock.LineContent className="table-cell">
            <CodeBlock.Token />
          </CodeBlock.LineContent>
        </div>
      </CodeBlock.Code>
    </CodeBlock>
  )
}

export default MyCodeBlock
