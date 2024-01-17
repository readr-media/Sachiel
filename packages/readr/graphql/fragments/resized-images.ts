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

export const resizeWebpImagesFragment = gql`
  fragment ResizedWebPImagesField on ResizedWebPImages {
    original
    w480
    w800
    w1200
    w1600
    w2400
  }
`
