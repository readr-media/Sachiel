import gql from 'graphql-tag'

import { POST_STYLES, REPORT_STYLES } from '~/constants/constant'
import { Post, postFragment } from '~/graphql/fragments/post'
import type {
  GenericAuthor,
  GenericCategory,
  GenericPost,
  GenericTag,
  Override,
  PhotoWithResizedOnly,
} from '~/types/common'
import { convertToStringList } from '~/utils/common'

import { authorFragment } from '../fragments/author'
import { resizeImagesFragment } from '../fragments/resized-images'

export type Category = Pick<GenericCategory, 'id' | 'title'>
export type Author = Pick<GenericAuthor, 'id' | 'name'>
export type Tag = Pick<GenericTag, 'id' | 'name'>

export type PostDetail = Override<
  Post &
    Pick<
      GenericPost,
      | 'heroCaption'
      | 'content'
      | 'summary'
      | 'actionList'
      | 'citation'
      | 'dataAnalysts'
      | 'writers'
      | 'designers'
      | 'relatedPosts'
      | 'categories'
      | 'tags'
    >,
  {
    heroImage: PhotoWithResizedOnly | null
    ogImage: PhotoWithResizedOnly | null
    dataAnalysts: Author[]
    writers: Author[]
    designers: Author[]
    relatedPosts: Post[]
    categories: Category[]
    tags: Tag[]
  }
>

const postStyles = [...POST_STYLES, ...REPORT_STYLES]

const post = gql`
  query ($id: ID!) {
    post(where: { id: $id }) {
      ...PostFields

      content
      summary
      actionList
      citation
      heroCaption
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
      tags {
        id
        name
      }
      relatedPosts (
        where: {
           state: { equals: "published" }
           style: {
             in: [${convertToStringList(postStyles)}]
           }
         },
        orderBy: { publishTime: desc }
      ) {
        ...PostFields
      }
    }
  }
  ${resizeImagesFragment}
  ${authorFragment}
  ${postFragment}
`

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
