import gql from 'graphql-tag'

import type { Post } from '~/graphql/fragments/post'
import { postFragment } from '~/graphql/fragments/post'
import type { GenericCategory } from '~/types/common'
import { ValidPostStyle } from '~/types/common'
import { convertToStringList } from '~/utils/common'

export type Category = Pick<GenericCategory, 'id' | 'slug' | 'title'> & {
  posts?: Post[]
  reports?: Post[]
}

const postStyles = [
  ValidPostStyle.NEWS,
  ValidPostStyle.FRAME,
  ValidPostStyle.BLANK,
  ValidPostStyle.SCROLLABLE_VIDEO,
]

const reportStyles = [
  ValidPostStyle.EMBEDDED,
  ValidPostStyle.PROJECT3,
  ValidPostStyle.REPORT,
]

const categories = gql`
  query (
    $first: Int
    $relatedPostFirst: Int = 4
    $relatedReportFirst: Int = 1
    $postSkip: Int
    $reportSkip: Int
    $shouldQueryRelatedPost: Boolean = false
    $shouldQueryRelatedReport: Boolean = false
    $relatedPostTypes: [String!] = [${convertToStringList(postStyles)}]
    $relatedReportTypes: [String!] = [${convertToStringList(reportStyles)}]
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
        ...PostFields
      }
      reports: relatedPost(
        take: $relatedReportFirst
        skip: $reportSkip
        where: {
          state: { equals: "published" }
          style: { in: $relatedReportTypes }
        }
        orderBy: { publishTime: desc }
      ) @include(if: $shouldQueryRelatedReport) {
        ...PostFields
      }
    }
  }
  ${postFragment}
`

export { categories }
