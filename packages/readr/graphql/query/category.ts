import gql from 'graphql-tag'

import { postFragment } from '~/graphql/fragments/post'
import { GenericCategory, GenericPost } from '~/types/common'

export type Post = Pick<
  GenericPost,
  | 'id'
  | 'slug'
  | 'style'
  | 'title'
  | 'heroImage'
  | 'ogImage'
  | 'publishTime'
  | 'readingTime'
>

export type Category = Pick<GenericCategory, 'id' | 'slug' | 'title'> & {
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
        ...PostFields
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
        ...PostFields
      }
    }
  }
  ${postFragment}
`

export { categories }
