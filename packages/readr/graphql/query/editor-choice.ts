import gql from 'graphql-tag'

import type { Post } from '~/graphql/fragments/post'
import { postFragment } from '~/graphql/fragments/post'
import type {
  GenericEditorChoice,
  Override,
  PhotoWithResizedOnly,
} from '~/types/common'

import { resizeImagesFragment } from '../fragments/resized-images'

export type EditorChoice = Override<
  Pick<GenericEditorChoice, 'choices' | 'heroImage'>,
  {
    choices: Post | null
    heroImage: PhotoWithResizedOnly | null
  }
>

const editorChoices = gql`
  query {
    editorChoices(
      orderBy: [{ sortOrder: asc }, { createdAt: desc }]
      take: 3
      where: { state: { equals: "published" } }
    ) {
      heroImage {
        resized {
          ...ResizedImagesField
        }
      }
      choices {
        ...PostFields
      }
    }
  }
  ${postFragment}
  ${resizeImagesFragment}
`

export { editorChoices }
