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
    | 'bannerDesktop'
    | 'bannerTablet'
    | 'bannerMobile'
  >,
  {
    bannerDesktop: PhotoWithResizedOnly | null
    bannerTablet: PhotoWithResizedOnly | null
    bannerMobile: PhotoWithResizedOnly | null
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
        resizedWebp {
          ...ResizedWebPImagesField
        }
      }
    }
  }
  ${resizeImagesFragment}
  ${resizeWebpImagesFragment}
`

const featuredCollaborations = gql`
  query {
    collaborations(
      orderBy: [{ sortOrder: asc }, { publishTime: desc }]
      where: { state: { equals: "published" }, isBanner: { equals: true } }
    ) {
      id
      name
      collabLink
      bannerDesktop {
        resized {
          ...ResizedImagesField
        }
        resizedWebp {
          ...ResizedWebPImagesField
        }
      }
      bannerTablet {
        resized {
          ...ResizedImagesField
        }
        resizedWebp {
          ...ResizedWebPImagesField
        }
      }
      bannerMobile {
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
