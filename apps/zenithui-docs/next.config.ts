import nextra from "nextra"

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
  contentDirBasePath: "/docs",
  // ... Other Nextra config options
})

// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  reactStrictMode: true,
  // ... Other Next.js config options
  // output: "export",
  images: {
    unoptimized: true, // mandatory, otherwise won't export
  },
  // Optional: Change the output directory `out` -> `dist`
  // distDir: "build",
  webpack(config: { module: { rules: { test: RegExp; issuer: RegExp; use: string[] }[] } }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
  // ... Other Next.js config options
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
})
