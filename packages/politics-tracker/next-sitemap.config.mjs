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
      // usually, we group data by birthday_year with 12-year range,
      // to keep records amount in each sitemap under 10000,
      // we use 4-year range between 1948 and 1972
      // personal pages
      `${siteUrl}/server-sitemaps/person/null.xml`,
      `${siteUrl}/server-sitemaps/person/-1912.xml`,
      `${siteUrl}/server-sitemaps/person/1912-1924.xml`,
      `${siteUrl}/server-sitemaps/person/1924-1936.xml`,
      `${siteUrl}/server-sitemaps/person/1936-1948.xml`,
      `${siteUrl}/server-sitemaps/person/1948-1952.xml`,
      `${siteUrl}/server-sitemaps/person/1952-1956.xml`,
      `${siteUrl}/server-sitemaps/person/1956-1960.xml`,
      `${siteUrl}/server-sitemaps/person/1960-1964.xml`,
      `${siteUrl}/server-sitemaps/person/1964-1968.xml`,
      `${siteUrl}/server-sitemaps/person/1968-1972.xml`,
      `${siteUrl}/server-sitemaps/person/1972-1984.xml`,
      `${siteUrl}/server-sitemaps/person/1984-1996.xml`,
      `${siteUrl}/server-sitemaps/person/1996-.xml`,

      `${siteUrl}/server-sitemaps/politics-summary.xml`, // politics summary pages
      `${siteUrl}/server-sitemaps/politics-detail.xml`, // politic detail pages
    ],
  },
}
export default sitemapConfig
