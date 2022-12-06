import * as tsImport from 'ts-import'

const { siteUrl } = await tsImport.load('./constants/config.ts')

const sitemapBaseUrl = `${siteUrl}/server-sitemaps`

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl,
  sitemapSize: 50000, // limitation from Google, ref: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
  generateRobotsTxt: true,
  exclude: ['/server-sitemaps/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${sitemapBaseUrl}/landing-and-elections.xml`, // landing page and election pages
      // usually, we group data by birthday_year with 12-year range,
      // to keep records amount in each sitemap under 10000,
      // we use 4-year range between 1948 and 1972
      // personal pages
      `${sitemapBaseUrl}/person/null.xml`,
      `${sitemapBaseUrl}/person/-1912.xml`,
      `${sitemapBaseUrl}/person/1912-1924.xml`,
      `${sitemapBaseUrl}/person/1924-1936.xml`,
      `${sitemapBaseUrl}/person/1936-1948.xml`,
      `${sitemapBaseUrl}/person/1948-1952.xml`,
      `${sitemapBaseUrl}/person/1952-1956.xml`,
      `${sitemapBaseUrl}/person/1956-1960.xml`,
      `${sitemapBaseUrl}/person/1960-1964.xml`,
      `${sitemapBaseUrl}/person/1964-1968.xml`,
      `${sitemapBaseUrl}/person/1968-1972.xml`,
      `${sitemapBaseUrl}/person/1972-1984.xml`,
      `${sitemapBaseUrl}/person/1984-1996.xml`,
      `${sitemapBaseUrl}/person/1996-.xml`,
      // politics summary pages
      `${sitemapBaseUrl}/politics-summary/null.xml`,
      `${sitemapBaseUrl}/politics-summary/-1912.xml`,
      `${sitemapBaseUrl}/politics-summary/1912-1924.xml`,
      `${sitemapBaseUrl}/politics-summary/1924-1936.xml`,
      `${sitemapBaseUrl}/politics-summary/1936-1948.xml`,
      `${sitemapBaseUrl}/politics-summary/1948-1952.xml`,
      `${sitemapBaseUrl}/politics-summary/1952-1956.xml`,
      `${sitemapBaseUrl}/politics-summary/1956-1960.xml`,
      `${sitemapBaseUrl}/politics-summary/1960-1964.xml`,
      `${sitemapBaseUrl}/politics-summary/1964-1968.xml`,
      `${sitemapBaseUrl}/politics-summary/1968-1972.xml`,
      `${sitemapBaseUrl}/politics-summary/1972-1984.xml`,
      `${sitemapBaseUrl}/politics-summary/1984-1996.xml`,
      `${sitemapBaseUrl}/politics-summary/1996-.xml`,

      `${sitemapBaseUrl}/politics-summary.xml`, // politics summary pages
      `${sitemapBaseUrl}/politics-detail.xml`, // politic detail pages
    ],
  },
}
export default sitemapConfig
