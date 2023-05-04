import gql from 'graphql-tag'

import { POST_STYLES, REPORT_STYLES } from '~/constants/constant'
import { Author, authorFragment } from '~/graphql/fragments/author'
import { Post, postFragment } from '~/graphql/fragments/post'
import { resizeImagesFragment } from '~/graphql/fragments/resized-images'
import type {
  GenericCategory,
  GenericPost,
  GenericTag,
  Override,
  PhotoWithResizedOnly,
} from '~/types/common'
import { convertToStringList } from '~/utils/common'

export type Category = Pick<GenericCategory, 'id' | 'title' | 'slug'>

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
      | 'manualOrderOfWriters'
      | 'manualOrderOfPhotographers'
      | 'manualOrderOfCameraOperators'
      | 'manualOrderOfDesigners'
      | 'manualOrderOfEngineers'
      | 'manualOrderOfDataAnalysts'
      | 'writers'
      | 'photographers'
      | 'cameraOperators'
      | 'designers'
      | 'engineers'
      | 'dataAnalysts'
      | 'otherByline'
      | 'relatedPosts'
      | 'categories'
      | 'tags'
      | 'state'
      | 'ogDescription'
      | 'leadingEmbeddedCode'
    >,
  {
    heroImage: PhotoWithResizedOnly | null
    ogImage: PhotoWithResizedOnly | null
    manualOrderOfWriters: Author[]
    manualOrderOfPhotographers: Author[]
    manualOrderOfCameraOperators: Author[]
    manualOrderOfDesigners: Author[]
    manualOrderOfEngineers: Author[]
    manualOrderOfDataAnalysts: Author[]
    writers: Author[]
    photographers: Author[]
    cameraOperators: Author[]
    designers: Author[]
    engineers: Author[]
    dataAnalysts: Author[]
    relatedPosts: Post[]
    categories: Category[]
    tags: Tag[]
  }
>

export const postStyles = [...POST_STYLES, ...REPORT_STYLES]

const post = gql`
  query ($id: ID!) {
    posts ( where: {
      state: { equals: "published" }
      id: { equals: $id }  
      style: {
        in: [${convertToStringList(postStyles)}]
      }       
      })  {
      ...PostFields
      
      state
      content
      summary
      actionList
      citation
      heroCaption
      ogDescription
      categories {
        id
        title
        slug
      }
      manualOrderOfWriters
      manualOrderOfPhotographers
      manualOrderOfCameraOperators 
      manualOrderOfDesigners 
      manualOrderOfEngineers 
      manualOrderOfDataAnalysts 
      writers {
        ...AuthorFields
      }
      photographers {
        ...AuthorFields
      }
      cameraOperators  {
        ...AuthorFields
      }
      designers {
        ...AuthorFields
      }
      engineers {
        ...AuthorFields
      }
      dataAnalysts {
        ...AuthorFields
      }

      leadingEmbeddedCode
      otherByline
      tags ( 
        where: { 
          state: { equals: "active" } 
        } 
      ) {
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
  query  (
    $first: Int! = 3, 
    $skip: Int! = 0
    $skipId: ID
  ) {
    latestPosts: posts(
      take: $first
      skip: $skip
      where: {
        id: { not: { equals: $skipId } }
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

const authorPosts = gql`
  query ($authorId: ID, $first: Int! = 12, $skip: Int! = 0) {
    authorPosts: posts(
      take: $first
      skip: $skip
      where: {
        OR: [
          { writers: { some: { id: { equals: $authorId } } } }
          { photographers: { some: { id: { equals: $authorId } } } }
          { cameraOperators: { some: { id: { equals: $authorId } } } }
          { designers: { some: { id: { equals: $authorId } } } }
          { engineers: { some: { id: { equals: $authorId } } } }
          { dataAnalysts: { some: { id: { equals: $authorId } } } }
        ]
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

export { authorPosts, latestPosts, post }
