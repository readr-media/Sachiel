import * as tsImport from 'ts-import'

const { siteUrl } = await tsImport.load('./constants/config.ts')

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-1.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/server-sitemap-1.xml`],
  },
}
export default sitemapConfig
