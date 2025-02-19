import type { Metadata } from "next"
import { Layout, Navbar } from "nextra-theme-docs"
import { getPageMap } from "nextra/page-map"
import "./globals.css"
import "nextra-theme-docs/style.css"

export const metadata: Metadata = {
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navbar = (
    <Navbar
      logo={
        <div>
          <b>Zenithui</b>
        </div>
      }
      projectLink="https://github.com/ChanduBobbili/ZenithUi"
    />
  )
  const pageMap = await getPageMap()
  return (
    <html lang="en">
      <body className="antialiased">
        <Layout
          navbar={navbar}
          footer={<></>}
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/shuding/nextra/blob/main/examples/docs"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
          navigation={{
            prev: true,
            next: true,
          }}
          themeSwitch={{
            dark: "Темный",
            light: "Светлый",
            system: "Системный",
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
