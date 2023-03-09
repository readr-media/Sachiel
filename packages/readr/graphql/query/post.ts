import gql from 'graphql-tag'

import {
  GenericAuthor,
  GenericCategory,
  GenericPhoto,
  GenericPost,
} from '~/types/common'

import { authorFragment } from '../fragments/author'
import { resizeImagesFragment } from '../fragments/resized-images'

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
  | 'heroCaption'
  | 'content'
  | 'publishTime'
  | 'readingTime'
> & {
  categories: Category[]
} & Record<'dataAnalysts' | 'writers' | 'designers', Author[]> & {
    heroImage: Photo
  }

const post = gql`
  query ($id: ID!) {
    post(where: { id: $id }) {
      id
      slug
      name
      heroCaption
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
      heroImage {
        id
        name
        urlOriginal
        imageFile {
          url
        }
        resized {
          ...ResizedImagesField
        }
      }
    }
  }
  ${resizeImagesFragment}
  ${authorFragment}
`

export { post }
