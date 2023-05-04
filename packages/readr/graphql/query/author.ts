import gql from 'graphql-tag'

import type { GenericAuthor } from '~/types/common'

import { authorFragment } from '../fragments/author'

export type Author = Pick<GenericAuthor, 'id' | 'name'>

const author = gql`
  query ($id: ID) {
    author(where: { id: $id }) {
      ...AuthorFields
    }
  }
  ${authorFragment}
`
export { author }
