import gql from 'graphql-tag'

import type {
  GenericCollaboration,
  Override,
  PhotoWithResizedOnly,
} from '~/types/common'

import { resizeImagesFragment } from '../fragments/resized-images'

type C = Pick<
  GenericCollaboration,
  | 'id'
  | 'title'
  | 'description'
  | 'progress'
  | 'heroImage'
  | 'achvLink'
  | 'collabLink'
  | 'requireTime'
  | 'endTime'
>

export type Collaboration = Override<C, { heroImage: PhotoWithResizedOnly }>

const collaborations = gql`
  query {
    collaborations(
      take: 10
      orderBy: { publishTime: desc }
      where: { state: { equals: "published" } }
    ) {
      id
      title: name
      description
      progress
      collabLink
      achvLink
      requireTime
      endTime
      heroImage {
        resized {
          ...ResizedImagesField
        }
      }
    }
  }
  ${resizeImagesFragment}
`

export { collaborations }
