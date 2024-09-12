import gql from 'graphql-tag'

import type { GenericAuthor, Override } from '~/types/common'

export type Member = Override<
  Pick<
    GenericAuthor,
    | 'id'
    | 'isMember'
    | 'name'
    | 'name_en'
    | 'title'
    | 'special_number'
    | 'number_desc'
    | 'number_desc_en'
    | 'postsCount'
  >,
  {
    id: string
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
      postsCount
    }
  }
`

export { members }
