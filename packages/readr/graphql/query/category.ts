import gql from 'graphql-tag'

import { POST_STYLES, REPORT_STYLES } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import { postFragment } from '~/graphql/fragments/post'
import type { GenericCategory, Override } from '~/types/common'
import { convertToStringList } from '~/utils/common'

export type Category = Override<
  Pick<GenericCategory, 'id' | 'slug' | 'title' | 'posts' | 'reports'>,
  {
    posts?: Post[]
    reports?: Post[]
  }
>

const categories = gql`
  query (
    $first: Int
    $slug: String
    $relatedPostFirst: Int = 4
    $relatedReportFirst: Int = 1
    $postSkip: Int
    $reportSkip: Int
    $shouldQueryRelatedPost: Boolean = false
    $shouldQueryRelatedReport: Boolean = false
    $relatedPostTypes: [String!] = [${convertToStringList(POST_STYLES)}]
    $relatedReportTypes: [String!] = [${convertToStringList(REPORT_STYLES)}]
  ) {
    categories(
      take: $first
      where: { 
        state: { equals: "true" } 
        slug: { equals: $slug }
      }
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
