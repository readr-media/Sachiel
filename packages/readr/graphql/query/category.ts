import gql from 'graphql-tag'

import type { ResizedImages } from '~/types/common'

export type Photo = {
  resized: ResizedImages | null
}

export type Post = {
  id: string
  slug?: string
  style?: string
  title?: string
  heroImage?: Photo | null
  ogImage?: Photo | null
  publishTime?: string
  readingTime?: number
}

export type Category = {
  id: string
  slug?: string
  title?: string
  posts?: Post[]
  reports?: Post[]
}

const categories = gql`
  query (
    $first: Int
    $relatedPostFirst: Int = 4
    $relatedReportFirst: Int = 1
    $postSkip: Int
    $reportSkip: Int
    $shouldQueryRelatedPost: Boolean = false
    $shouldQueryRelatedReport: Boolean = false
    $relatedPostTypes: [String!] = ["news", "frame", "blank", "scrollablevideo"]
  ) {
    categories(
      take: $first
      where: { state: { equals: "true" } }
      orderBy: { createdAt: asc }
    ) {
      id
      slug
      title
      posts: relatedPost(
        take: $relatedPostFirst
        skip: $postSkip
        where: {
          state: { equals: "published" }
          style: { in: $relatedPostTypes }
        }
        orderBy: { publishTime: desc }
      ) @include(if: $shouldQueryRelatedPost) {
        id
        slug
        style
        title: name
        heroImage {
          resized {
            original
            w480
            w800
            w1200
            w1600
            w2400
          }
        }
        ogImage {
          resized {
            original
            w480
            w800
            w1200
            w1600
            w2400
          }
        }
        publishTime
        readingTime
      }
      reports: relatedPost(
        take: $relatedReportFirst
        skip: $reportSkip
        where: {
          state: { equals: "published" }
          style: { in: $relatedPostTypes }
        }
        orderBy: { publishTime: desc }
      ) @include(if: $shouldQueryRelatedReport) {
        id
        slug
        style
        title: name
        heroImage {
          resized {
            original
            w480
            w800
            w1200
            w1600
            w2400
          }
        }
        ogImage {
          resized {
            original
            w480
            w800
            w1200
            w1600
            w2400
          }
        }
        publishTime
        readingTime
      }
    }
  }
`

export { categories }
