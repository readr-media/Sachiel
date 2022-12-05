import * as tsImport from 'ts-import'

const { siteUrl } = await tsImport.load('./constants/config.ts')

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl,
  sitemapSize: 50000, // limitation from Google, ref: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
  generateRobotsTxt: true,
  exclude: [
    '/server-sitemap-1.xml',
    '/server-sitemap-2.xml',
    '/server-sitemap-3.xml',
    '/server-sitemap-4.xml',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/server-sitemap-1.xml`, // landing page and election pages
      `${siteUrl}/server-sitemap-2.xml`, // personal pages
      `${siteUrl}/server-sitemap-3.xml`, // politics summary pages
      `${siteUrl}/server-sitemap-4.xml`, // politic detail pages
    ],
  },
}
export default sitemapConfig
