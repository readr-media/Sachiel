import gql from 'graphql-tag'

import { POST_STYLES, REPORT_STYLES } from '~/constants/constant'
import { postFragment } from '~/graphql/fragments/post'
import type {
  GenericAuthor,
  GenericCategory,
  GenericPhoto,
  GenericPost,
  Override,
} from '~/types/common'
import { convertToStringList } from '~/utils/common'

import { authorFragment } from '../fragments/author'
import { resizeImagesFragment } from '../fragments/resized-images'

export type Category = Pick<GenericCategory, 'id' | 'title'>
export type Author = Pick<GenericAuthor, 'id' | 'name'>

export type Photo = Pick<GenericPhoto, 'id' | 'name' | 'imageFile' | 'resized'>

export type RelatedPost = Override<
  Pick<
    GenericPost,
    'id' | 'publishTime' | 'name' | 'readingTime' | 'heroImage'
  >,
  { heroImage: Photo | null }
>

export type PostDetail = Override<
  Pick<
    GenericPost,
    | 'id'
    | 'slug'
    | 'name'
    | 'subtitle'
    | 'sortOrder'
    | 'manualOrderOfRelatedPosts'
    | 'heroCaption'
    | 'heroImage'
    | 'content'
    | 'summary'
    | 'actionList'
    | 'citation'
    | 'dataAnalysts'
    | 'writers'
    | 'designers'
    | 'relatedPosts'
    | 'publishTime'
    | 'readingTime'
    | 'categories'
  >,
  {
    dataAnalysts: Author[]
    writers: Author[]
    designers: Author[]
    heroImage: Photo | null
    relatedPosts: RelatedPost[]
    categories: Category[]
  }
>

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
      summary
      actionList
      citation
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
