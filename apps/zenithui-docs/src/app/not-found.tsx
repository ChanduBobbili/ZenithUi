import Link from "next/link"

export default function NotFound() {
  return (
    <main
      className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8"
      style={{
        height: "calc(100vh - var(--nextra-navbar-height))",
      }}
    >
      <div className="text-center">
        <h1 className="mb-4 bg-gradient-to-r from-sky-600 to-cyan-400 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent lg:text-9xl">
          404
        </h1>
        <p className="mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
          Something&apos;s missing.
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore
          on the home page.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/">
            Go Home <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
