/* eslint-env node */
import { Layout, Navbar } from "nextra-theme-docs"
import { Head } from "nextra/components"
import { getPageMap } from "nextra/page-map"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata, Viewport } from "next"
import Providers from "./providers"
import "nextra-theme-docs/style.css"
import Image from "next/image"
import "./global.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
}

export const metadata: Metadata = {
  title: {
    default: "Zenithui",
    template: "%s - Zenithui",
  },
  description:
    "A ZenithUi React component library containing primitive UI components.",
  metadataBase: new URL("https://zenithui-docs.vercel.app/"),
  keywords: [
    "react",
    "components",
    "ui",
    "zenithui",
    "accessible",
    "design-system",
    "styled-components",
    "styled-system",
    "typescript",
    "toast",
    "light-box",
    "day-picker",
    "calendar",
    "time-picker",
    "countdown",
  ],
  openGraph: {
    url: "https://zenithui-docs.vercel.app/",
    type: "website",
    siteName: "Zenithui-Docs",
    locale: "en_US",
    title: "ZenithUi React component library documentation",
    description:
      "A ZenithUi React component library containing primitive UI components.",
    images: [
      {
        url: "https://zenithui-docs.vercel.app/open-graph.png",
        width: 1200,
        height: 630,
        alt: "zenithui",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZenithUi React component library documentation",
    description:
      "A ZenithUi React component library containing primitive UI components.",
    creator: "@ChanduBobbili",
    site: "@ChanduBobbili",
    images: [
      {
        url: "https://zenithui-docs.vercel.app/open-graph.png",
        width: 1200,
        height: 630,
        alt: "zenithui",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  alternates: {
    canonical: "https://zenithui-docs.vercel.app/",
    types: {
      "application/rss+xml": "https://zenithui-docs.vercel.app/rss.xml",
    },
  },
  applicationName: "Zenithui-Docs",
  appleWebApp: {
    title: "Zenithui-Docs",
    statusBarStyle: "default",
    capable: true,
  },
  icons: {
    icon: [
      {
        url: "/assets/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/assets/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/assets/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      // add favicon-96x96.png
    ],
    shortcut: [
      {
        url: "/assets/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/assets/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      // add apple-icon-72x72.png, apple-icon-76x76.png, apple-icon-114x114.png, apple-icon-120x120.png, apple-icon-144x144.png, apple-icon-152x152.png
    ],
  },
  generator: "Next.js",
  other: {
    "msapplication-TileImage": "/assets/android-chrome-512x512.png",
    "msapplication-TileColor": "#fff",
  },
}

const navbar = (
  <Navbar
    logo={
      <Image
        src={"/assets/logo.svg"}
        alt="zenithui-logo"
        width={120}
        height={40}
      />
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "WebSite",
              name: "zenithui",
              url: "https://zenithui-docs.vercel.app/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://zenithui-docs.vercel.app/{search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
