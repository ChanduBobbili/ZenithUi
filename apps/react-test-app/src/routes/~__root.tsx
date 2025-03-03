import { Outlet, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 overflow-y-auto bg-slate-50 text-slate-950 subpixel-antialiased dark:bg-slate-950 dark:text-slate-50">
      <Outlet />
    </div>
  )
}
