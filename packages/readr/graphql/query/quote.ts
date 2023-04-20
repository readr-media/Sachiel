import gql from 'graphql-tag'

import type { GenericQuote } from '~/types/common'

export type Quote = Pick<GenericQuote, 'id' | 'title' | 'byline'>

const quotes = gql`
  query {
    quotes(
      take: 10
      where: { state: { equals: "published" } }
      orderBy: { publishTime: desc }
    ) {
      id
      title: name
      byline
    }
  }
`

export { quotes }
