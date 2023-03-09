import gql from 'graphql-tag'

import type { Post } from '~/graphql/fragments/post'
import { postFragment } from '~/graphql/fragments/post'
import type { GenericEditorChoice, PhotoWithResizedOnly } from '~/types/common'

import { resizeImagesFragment } from '../fragments/resized-images'

export type EditorChoice = Required<
  Pick<GenericEditorChoice, 'publishTime'> & {
    choices: Post | null
    heroImage: PhotoWithResizedOnly | null
  }
>

const editorChoices = gql`
  query {
    editorChoices(
      orderBy: [{ sortOrder: asc }, { publishTime: desc }]
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
      publishTime
    }
  }
  ${postFragment}
  ${resizeImagesFragment}
`

export { editorChoices }
