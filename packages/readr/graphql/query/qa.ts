import gql from 'graphql-tag'

type QaListItem = {
  id: string
  title: string
  content: unknown // it is hard to describe JSON type
}

export type QaList = {
  id: string
  name: string
  items: QaListItem[]
}

const qALists = gql`
  query ($id1: ID!, $id2: ID!) {
    qALists(
      where: { OR: [{ id: { equals: $id1 } }, { id: { equals: $id2 } }] }
      orderBy: { id: asc }
    ) {
      id
      name
      items {
        id
        title
        content
      }
    }
  }
`

export { qALists }
