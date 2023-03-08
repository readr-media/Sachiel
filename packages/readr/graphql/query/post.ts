import gql from 'graphql-tag'

import { GenericPost } from '~/types/common'

export type Author = {
  id: number
  name: string
}

export type Category = {
  id: string
  title?: string
}

export type PostDetail = GenericPost & {
  writers?: Author[]
  designers?: Author[]
  dataAnalysts?: Author[]
  categories?: Category[]
}

const post = gql`
  query ($id: ID!) {
    post(where: { id: $id }) {
      id
      slug
      name
      publishTime
      readingTime
      categories {
        id
        title
      }
      writers {
        id
        name
      }
      designers {
        id
        name
      }
      heroImage {
        id
        name
        imageFile {
          url
        }
        urlOriginal
        resized {
          original
          w480
          w800
          w1200
          w1600
          w2400
        }
      }
      heroCaption
      content
    }
  }
`

export { post }
