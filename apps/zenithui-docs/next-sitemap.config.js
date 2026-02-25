/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || "https://zenithui-docs.vercel.app/",
  generateRobotsTxt: true, // (optional)
  // ...other options
  generateIndexSitemap: false,
}
