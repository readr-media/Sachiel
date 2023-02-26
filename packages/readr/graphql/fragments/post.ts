import gql from 'graphql-tag'

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
