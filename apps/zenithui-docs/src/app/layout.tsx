/* eslint-env node */
import { Layout, Navbar } from "nextra-theme-docs"
import { Head } from "nextra/components"
import { getPageMap } from "nextra/page-map"
import "nextra-theme-docs/style.css"

export const metadata = {
  metadataBase: new URL("https://nextra.site"),
  title: {
    default: "Zenithui",
    template: "%s - Zenithui",
  },
  description: "Generated by create next app",
  applicationName: "Zenithui-Docs",
  generator: "Next.js",
  appleWebApp: {
    title: "Zenithui-Docs",
  },
  other: {
    "msapplication-TileImage": "/ms-icon-144x144.png",
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
        <Layout
          navbar={navbar}
          footer={<></>}
          editLink={null}
          docsRepositoryBase="https://github.com/ChanduBobbili/ZenithUi"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
