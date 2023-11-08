import * as tsImport from 'ts-import'

const { siteUrl } = await tsImport.load('./constants/config.ts')
const sitemapBaseUrl = `${siteUrl}/server-sitemaps`

/** @type {(string|number)[]} */
const yearList = ['']
const begin = 1900
const end = 1996
for (let year = begin; year <= end; ) {
  yearList.push(year)
  // usually, we group data by year with 12-year range,
  // to keep records amount in each sitemap under 10000,
  // we use 4-year range between 1948 and 1972
  year += year >= 1948 && year < 1972 ? 4 : 12
}
yearList.push('')

/**
 * @param {string} baseUrl
 * @param {string} group
 * @returns {string[]}
 */
function getSitemapGroup(baseUrl, group) {
  /** @type {string[]} */
  const urlGroup = []
  yearList.reduce((/** @type {null|string|number} */ prev, curr) => {
    let url
    if (prev === null) {
      url = `${baseUrl}/${group}/null.xml`
    } else {
      url = `${baseUrl}/${group}/${prev}-${curr}.xml`
    }
    urlGroup.push(url)
    return curr
  }, null)

  return urlGroup
}

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl,
  sitemapSize: 50000, // limitation from Google, ref: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
  generateRobotsTxt: true,
  exclude: ['/server-sitemaps/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${sitemapBaseUrl}/landing-and-elections.xml`, // landing pages and election pages
      ...getSitemapGroup(sitemapBaseUrl, 'person'), // personal pages
      ...getSitemapGroup(sitemapBaseUrl, 'politics-summary-related-to-person'), // politics summary pages (person)
      `${sitemapBaseUrl}/politics-detail-related-to-person.xml`, // politic detail pages (person)
      `${sitemapBaseUrl}/politics-detail-related-to-party.xml`, // politic detail pages (party)
    ],
  },
}
export default sitemapConfig
