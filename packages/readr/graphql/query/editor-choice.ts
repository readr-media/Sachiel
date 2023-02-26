import gql from 'graphql-tag'

import { photoFragment } from '~/graphql/fragments/photo'
import type { Post } from '~/graphql/fragments/post'
import { postFragment } from '~/graphql/fragments/post'
import type { GenericPhoto } from '~/types/common'

export type EditorChoice = {
  heroImage: GenericPhoto
  publishTime: string
  choices: Post[]
}

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
