import gql from 'graphql-tag'

import { POST_STYLES, REPORT_STYLES } from '~/constants/constant'
import { postFragment } from '~/graphql/fragments/post'
import type {
  GenericAuthor,
  GenericCategory,
  GenericPhoto,
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
export type Photo = Pick<GenericPhoto, 'name' | 'resized'>
export type Tag = Pick<GenericTag, 'id' | 'name'>

export type RelatedPost = Override<
  Pick<
    GenericPost,
    | 'id'
    | 'slug'
    | 'style'
    | 'name'
    | 'publishTime'
    | 'readingTime'
    | 'heroImage'
  >,
  { heroImage: PhotoWithResizedOnly | null }
>

export type PostDetail = Override<
  Pick<
    GenericPost,
    | 'id'
    | 'slug'
    | 'name'
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
    | 'tags'
    | 'ogImage'
  >,
  {
    dataAnalysts: Author[]
    writers: Author[]
    designers: Author[]
    heroImage: Photo | null
    relatedPosts: RelatedPost[]
    categories: Category[]
    ogImage: PhotoWithResizedOnly | null
    tags: Tag[]
  }
>

const postStyles = [...POST_STYLES, ...REPORT_STYLES]

const post = gql`
  query ($id: ID!) {
    post(where: { id: $id }) {
      id
      slug
      name
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
      content
      summary
      actionList
      citation
      heroCaption
      heroImage {
        name
        resized {
          ...ResizedImagesField
        }
      }
      ogImage {
        resized {
          ...ResizedImagesField
        }
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
        id
        slug
        style
        name
        publishTime
        readingTime
        heroImage {
          resized {
            ...ResizedImagesField
          }
        }
      }
      tags {
        id
        name
      }
    }
  }
  ${resizeImagesFragment}
  ${authorFragment}
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
