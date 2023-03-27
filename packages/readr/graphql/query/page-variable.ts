import gql from 'graphql-tag'

import type { GenericPhoto } from '~/types/common'

import { resizeImagesFragment } from '../fragments/resized-images'

export type Photo = Pick<Required<GenericPhoto>, 'id' | 'resized'>

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
      name
      relatedImage {
        id
        resized {
          ...ResizedImagesField
        }
      }
      value
      url
    }
  }
  ${resizeImagesFragment}
`

export { pageVariablesByPage }
