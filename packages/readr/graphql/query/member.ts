import gql from 'graphql-tag'

export type Member = {
  id: string
  isMember: boolean
  name: string
  name_en?: string
  title?: string
  special_number?: string
  number_desc?: string
  number_desc_en?: string
  projects?: Project[]
}

export type Project = {
  id: string
  name: string
}

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
