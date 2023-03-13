import gql from 'graphql-tag'

export const resizeImagesFragment = gql`
  fragment ResizedImagesField on ResizedImages {
    original
    w480
    w800
    w1200
    w1600
    w2400
  }
`
