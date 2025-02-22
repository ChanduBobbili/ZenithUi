/* eslint-env node */
import { Layout, Navbar } from "nextra-theme-docs"
import { Head } from "nextra/components"
import { getPageMap } from "nextra/page-map"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata } from "next"
import Providers from "./providers"
import "nextra-theme-docs/style.css"
import "./global.css"

export const metadata: Metadata = {
  title: {
    default: "Zenithui",
    template: "%s - Zenithui",
  },
  icons: {
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon-16x16.png",
    apple: "/assets/apple-touch-icon.png",
  },
  description:
    "A ZenithUi React component library containing primitive UI components.",
  applicationName: "Zenithui-Docs",
  generator: "Next.js",
  appleWebApp: {
    title: "Zenithui-Docs",
  },
  other: {
    "msapplication-TileImage": "/assets/android-chrome-512x512.png",
    "msapplication-TileColor": "#fff",
  },
}

const navbar = (
  <Navbar
    logo={
      <div
        style={{
          fontFamily: "cursive",
          fontSize: "2rem",
        }}
        className="text-sky-950 dark:text-white"
      >
        <b>Zenithui</b>
      </div>
    }
    projectLink="https://github.com/ChanduBobbili/ZenithUi"
  />
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap()
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head faviconGlyph="✦" />
      <body>
        <Providers>
          <Layout
            navbar={navbar}
            footer={<></>}
            editLink={null}
            docsRepositoryBase="https://github.com/ChanduBobbili/ZenithUi"
            sidebar={{ defaultMenuCollapseLevel: 1 }}
            pageMap={pageMap}
            lastUpdated={undefined}
          >
            {children}
          </Layout>
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  )
}
