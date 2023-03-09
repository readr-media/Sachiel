import gql from 'graphql-tag'

import { POST_STYLES, REPORT_STYLES } from '~/constants/constant'
import { authorFragment } from '~/graphql/fragments/author'
import { postFragment } from '~/graphql/fragments/post'
import {
  GenericAuthor,
  GenericCategory,
  GenericPhoto,
  GenericPost,
} from '~/types/common'
import { convertToStringList } from '~/utils/common'

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

const postStyles = [...POST_STYLES, ...REPORT_STYLES]

const latestPosts = gql`
  query ($first: Int! = 3) {
    latestPosts: posts(
      take: $first
      where: {
        state: { equals: "published" }
        style: {
          in: [${convertToStringList(postStyles)}]
        }
      }
      orderBy: { publishTime: desc }
    ) {
      ...PostFields
    }
  }
  ${postFragment}
`

export { latestPosts, post }
