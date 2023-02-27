import gql from 'graphql-tag'

import { photoFragment } from '~/graphql/fragments/photo'
import type { Post } from '~/graphql/fragments/post'
import { postFragment } from '~/graphql/fragments/post'
import type { GenericEditorChoice } from '~/types/common'

export type EditorChoice = Required<
  Pick<GenericEditorChoice, 'heroImage' | 'publishTime'> & { choices: Post[] }
>

const editorChoices = gql`
  query {
    editorChoices(
      orderBy: [{ sortOrder: asc }, { publishTime: desc }]
      take: 3
      where: { state: { equals: "published" } }
    ) {
      heroImage {
        ...PhotoFields
      }
      choices {
        ...PostFields
      }
      publishTime
    }
  }
  ${postFragment}
  ${photoFragment}
`

export { editorChoices }
