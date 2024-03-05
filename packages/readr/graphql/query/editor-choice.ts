import gql from 'graphql-tag'

import type { Post } from '~/graphql/fragments/post'
import { postFragment } from '~/graphql/fragments/post'
import type {
  GenericEditorChoice,
  Override,
  PhotoWithResizedOnly,
} from '~/types/common'
import type { ArticleCard } from '~/types/component'

import {
  resizeImagesFragment,
  resizeWebpImagesFragment,
} from '../fragments/resized-images'

export type EditorChoice = Override<
  Pick<GenericEditorChoice, 'choices' | 'heroImage' | 'link' | 'name' | 'id'>,
  {
    choices: Post | null
    heroImage: PhotoWithResizedOnly | null
  }
>

export type EditorCard = ArticleCard & {
  shouldHideBottomInfos: boolean
}

const editorChoices = gql`
  query {
    editorChoices(
      orderBy: [{ sortOrder: asc }, { createdAt: desc }]
      take: 3
      where: { state: { equals: "published" } }
    ) {
      id
      name
      link
      heroImage {
        resized {
          ...ResizedImagesField
        }
        resizedWebp {
          ...ResizedWebPImagesField
        }
      }
      choices {
        ...PostFields
      }
    }
  }
  ${postFragment}
  ${resizeImagesFragment}
  ${resizeWebpImagesFragment}
`

export { editorChoices }
