import gql from 'graphql-tag'

import { POST_STYLES, REPORT_STYLES } from '~/constants/constant'
import { postFragment } from '~/graphql/fragments/post'
import type {
  GenericAuthor,
  GenericCategory,
  GenericPhoto,
  GenericPost,
} from '~/types/common'
import { convertToStringList } from '~/utils/common'

import { authorFragment } from '../fragments/author'
import { resizeImagesFragment } from '../fragments/resized-images'

export type Category = Pick<Required<GenericCategory>, 'id' | 'title'>
export type Author = Pick<Required<GenericAuthor>, 'id' | 'name'>

export type Photo = Pick<
  Required<GenericPhoto>,
  'id' | 'name' | 'imageFile' | 'resized'
>

export type RelatedPost = Pick<
  Required<GenericPost>,
  'id' | 'publishTime' | 'name' | 'readingTime'
> & {
  heroImage: Photo
}

export type PostDetail = Pick<
  Required<GenericPost>,
  | 'id'
  | 'slug'
  | 'name'
  | 'subtitle'
  | 'sortOrder'
  | 'manualOrderOfRelatedPosts'
  | 'heroCaption'
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
      slug
      name
      subtitle
      sortOrder
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
          imageFile {
            url
          }
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
