import * as tsImport from 'ts-import'

const { siteUrl } = await tsImport.load('./constants/config.ts')

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
}
export default sitemapConfig
