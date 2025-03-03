export default function PreviewComponent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center gap-4 overflow-hidden rounded-sm bg-slate-100 p-20 dark:bg-zinc-900">
      {children}
    </div>
  )
}
