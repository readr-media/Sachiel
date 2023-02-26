import gql from 'graphql-tag'

export const photoFragment = gql`
  fragment PhotoFields on Photo {
    resized {
      original
      w480
      w800
      w1200
      w1600
      w2400
    }
  }
`
