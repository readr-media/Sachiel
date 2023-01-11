import * as tsImport from 'ts-import'

const { SITE_URL } = await tsImport.load('./constants/environment-variables.ts')

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: SITE_URL,
  sitemapSize: 50000, // limitation from Google, ref: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
  generateRobotsTxt: true,
  exclude: ['/server-sitemaps/*'],
  robotsTxtOptions: {},
}
export default sitemapConfig
