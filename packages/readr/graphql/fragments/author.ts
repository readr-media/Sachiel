import gql from 'graphql-tag'

export const authorFragment = gql`
  fragment AuthorFields on Author {
    id
    name
  }
`
