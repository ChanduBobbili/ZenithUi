import MyCodeBlock from "./ui/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

interface CodePreviewProps {
  code: {
    code: string
    language: string
  }
  children: React.ReactNode
}

export default function CodePreview({ code, children }: CodePreviewProps) {
  return (
    <Tabs defaultValue="preview">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="preview"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        className="flex items-center justify-center overflow-hidden rounded-sm bg-slate-100 p-20 dark:bg-zinc-900"
      >
        {children}
      </TabsContent>
      <TabsContent
        value="code"
        className="h-[600px] overflow-auto w-full"
      >
        <MyCodeBlock
          code={code.code}
          language={code.language}
        />
      </TabsContent>
    </Tabs>
  )
}
