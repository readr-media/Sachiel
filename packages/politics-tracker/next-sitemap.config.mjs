import * as tsImport from 'ts-import'

const { siteUrl } = await tsImport.load('./constants/config.ts')

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl,
  sitemapSize: 50000, // limitation from Google, ref: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
  generateRobotsTxt: true,
  exclude: ['/server-sitemaps/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/server-sitemaps/landing-and-elections.xml`, // landing page and election pages
      `${siteUrl}/server-sitemaps/person.xml`, // personal pages
      `${siteUrl}/server-sitemaps/politics-summary.xml`, // politics summary pages
      `${siteUrl}/server-sitemaps/politics-detail.xml`, // politic detail pages
    ],
  },
}
export default sitemapConfig
