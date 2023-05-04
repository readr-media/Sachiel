import gql from 'graphql-tag'

import { authorFragment } from '~/graphql/fragments/author'

const author = gql`
  query ($id: ID) {
    author(where: { id: $id }) {
      ...AuthorFields
    }
  }
  ${authorFragment}
`
export { author }
