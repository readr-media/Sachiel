import gql from 'graphql-tag'

import type { GenericPost } from '~/types/common'

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

import { photoFragment } from './photo'
export const postFragment = gql`
  fragment PostFields on Post {
    id
    slug
    style
    title: name
    heroImage {
      ...PhotoFields
    }
    ogImage {
      ...PhotoFields
    }
    publishTime
    readingTime
  }
  ${photoFragment}
`
