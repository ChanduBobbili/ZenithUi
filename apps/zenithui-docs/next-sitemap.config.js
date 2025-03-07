/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://zenithui-docs.vercel.app/",
  generateRobotsTxt: true, // (optional)
  // ...other options
}
