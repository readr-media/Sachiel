import gql from 'graphql-tag'

import type { GenericPhoto } from '~/types/common'

export type Photo = Pick<
  Required<GenericPhoto>,
  'id' | 'name' | 'imageFile' | 'resized'
>

export type PageVariable = {
  id: string
  name: string
  url?: string
  relatedImage?: Photo
  value?: unknown // it is hard to describe JSON type
}

const pageVariablesByPage = gql`
  query ($page: String) {
    pageVariables(
      where: { page: { equals: $page } }
      orderBy: { createdAt: desc }
    ) {
      id
      page
      name
      relatedImage {
        id
        resized {
          original
          w480
          w800
          w1200
        }
      }
      value
      url
    }
  }
`

export { pageVariablesByPage }
