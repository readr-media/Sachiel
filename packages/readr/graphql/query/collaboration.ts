import gql from 'graphql-tag'

import type {
  GenericCollaboration,
  Override,
  PhotoWithResizedOnly,
} from '~/types/common'

import {
  resizeImagesFragment,
  resizeWebpImagesFragment,
} from '../fragments/resized-images'

export type Collaboration = Override<
  Pick<
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
  >,
  { heroImage: PhotoWithResizedOnly | null }
>

export type FeaturedCollaboration = Override<
  Pick<
    GenericCollaboration,
    | 'id'
    | 'name'
    | 'collabLink'
    | 'ImageDesktop'
    | 'ImageTablet'
    | 'ImageMobile'
  >,
  {
    ImageDesktop: PhotoWithResizedOnly | null
    ImageTablet: PhotoWithResizedOnly | null
    ImageMobile: PhotoWithResizedOnly | null
  }
>

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

const featuredCollaborations = gql`
  query {
    collaborations(
      orderBy: [{ sortOrder: asc }, { publishTime: desc }]
      where: { state: { equals: "published" }, isFeatured: { equals: true } }
    ) {
      id
      name
      collabLink
      ImageDesktop {
        resized {
          ...ResizedImagesField
        }
        resizedWebp {
          ...ResizedWebPImagesField
        }
      }
      ImageTablet {
        resized {
          ...ResizedImagesField
        }
        resizedWebp {
          ...ResizedWebPImagesField
        }
      }
      ImageMobile {
        resized {
          ...ResizedImagesField
        }
        resizedWebp {
          ...ResizedWebPImagesField
        }
      }
    }
  }
  ${resizeImagesFragment}
  ${resizeWebpImagesFragment}
`

export { collaborations, featuredCollaborations }
