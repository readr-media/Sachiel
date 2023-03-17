import gql from 'graphql-tag'

import { authorFragment } from '~/graphql/fragments/author'
import { resizeImagesFragment } from '~/graphql/fragments/resized-images'
import type {
  GenericAuthor,
  GenericCategory,
  GenericPhoto,
  GenericPost,
} from '~/types/common'

export type RelatedPost = Pick<
  Required<GenericPost>,
  'id' | 'publishTime' | 'name' | 'readingTime' | 'heroImage'
>
export type Category = Pick<Required<GenericCategory>, 'id' | 'title'>
export type Author = Pick<Required<GenericAuthor>, 'id' | 'name'>
export type Photo = Pick<
  Required<GenericPhoto>,
  'id' | 'name' | 'urlOriginal' | 'imageFile' | 'resized'
>

export type PostDetail = Pick<
  Required<GenericPost>,
  | 'id'
  | 'slug'
  | 'name'
  | 'subtitle'
  | 'sortOrder'
  | 'manualOrderOfRelatedPosts'
  | 'heroCaption'
  | 'heroImage'
  | 'content'
  | 'publishTime'
  | 'readingTime'
> & {
  categories: Category[]
} & Record<'dataAnalysts' | 'writers' | 'designers', Author[]> & {
    heroImage: Photo
    relatedPosts: RelatedPost[]
  }

const post = gql`
  query ($id: ID!) {
    post(where: { id: $id }) {
      id
      sortOrder
      slug
      name
      subtitle
      content
      publishTime
      readingTime
      categories {
        id
        title
      }
      dataAnalysts {
        ...AuthorFields
      }
      writers {
        ...AuthorFields
      }
      designers {
        ...AuthorFields
      }
      heroCaption
      heroImage {
        id
        name
        imageFile {
          url
        }
        resized {
          ...ResizedImagesField
        }
      }
      manualOrderOfRelatedPosts
      relatedPosts {
        id
        name
        publishTime
        readingTime
        heroImage {
          id
          name
          resized {
            ...ResizedImagesField
          }
        }
      }
    }
  }
  ${resizeImagesFragment}
  ${authorFragment}
`

export { post }
