import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  // const [value, setValue] = useState<string[]>([])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 overflow-y-auto bg-slate-100">
      <button onClick={() => navigate({ to: "/day-picker" })}>
        Day Picker
      </button>
      <button onClick={() => navigate({ to: "/light-box" })}>Light Box</button>
      <button onClick={() => navigate({ to: "/primitive" })}>Primitive</button>
      <button onClick={() => navigate({ to: "/time-picker" })}>
        Time Picker
      </button>
      <button onClick={() => navigate({ to: "/toast" })}>Toast</button>
    </div>
  )
}
