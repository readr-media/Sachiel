import { gql } from '@apollo/client'

export type Publisher = {
  id: string
  title: string
}

export type Publishers = {
  publishers: Publisher[]
}

export const GET_PUBLISHERS = gql`
  query GetPublihers($take: Int) {
    publishers(take: $take) {
      id
      title
    }
  }
`
