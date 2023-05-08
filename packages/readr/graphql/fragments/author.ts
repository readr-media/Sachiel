import gql from 'graphql-tag'

import type { GenericAuthor } from '~/types/common'

export type Author = Pick<GenericAuthor, 'id' | 'name'>

export const authorFragment = gql`
  fragment AuthorFields on Author {
    id
    name
  }
`
