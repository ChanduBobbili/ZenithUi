import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Footer() {
  return (
    <footer
      className={cn(
        "border-border bg-background mt-auto border-t",
        "flex flex-col items-center justify-center gap-4 px-4 py-8 sm:flex-row sm:flex-wrap sm:gap-6",
      )}
    >
      <nav
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        aria-label="Footer"
      >
        <Link
          href="/docs"
          className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
        >
          Documentation
        </Link>
        <a
          href="https://github.com/ChanduBobbili/ZenithUi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
        >
          GitHub
        </a>
      </nav>
      <p className="text-muted-foreground w-full text-center text-xs">
        ZenithUi is free and open source software released under the MIT
        license.
      </p>
    </footer>
  )
}
