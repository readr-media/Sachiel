import gql from 'graphql-tag'

const author = gql`
  query ($id: ID) {
    author(where: { id: $id }) {
      id
      name
    }
  }
`
export { author }
