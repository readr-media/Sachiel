import gql from 'graphql-tag'

import type { GenericAuthor, Override } from '~/types/common'

export type Member = Override<
  GenericAuthor,
  {
    id: string
    isMember: boolean
  }
>

const members = gql`
  query {
    authors(where: { isMember: { equals: true } }) {
      id
      isMember
      name
      name_en
      title
      special_number
      number_desc
      number_desc_en
      projects {
        id
        name
      }
    }
  }
`

export { members }
