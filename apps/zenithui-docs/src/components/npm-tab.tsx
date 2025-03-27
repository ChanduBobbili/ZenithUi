import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export default function NPMTab({ path }: { path: string }) {
  const tabs: { value: string; content: string }[] = [
    {
      value: "npm",
      content: `npx shadcn@latest add ${path}`,
    },
    {
      value: "pnpm",
      content: `pnpm dlx shadcn@latest add ${path}`,
    },
    {
      value: "yarn",
      content: `yarn dlx shadcn@latest add ${path}`,
    },
    {
      value: "bun",
      content: `bunx shadcn@latest add ${path}`,
    },
  ]
  return (
    <Tabs
      defaultValue="npm"
      className="my-5"
    >
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {tab.value}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="flex items-center overflow-hidden rounded-sm border bg-white p-4 dark:border-white/20 dark:bg-black"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
