import { faker } from '@faker-js/faker'
import type { IMockStore, Ref } from '@graphql-tools/mock'
import type { IResolvers } from '@graphql-tools/utils'

/*eslint-disable-next-line no-unused-vars */
export const resolvers: (store: IMockStore) => Partial<IResolvers> = (
  store
) => ({
  // resolver for queries
  Query: {
    categories(_, { skip, take }) {
      if (take) {
        const list = store.get('Query', 'ROOT', 'categories') as Ref[]
        return list.slice(skip, skip + take)
      }
      return store.get('Query', 'ROOT', 'categories')
    },
    editorChoices(_, { skip, take }) {
      if (take) {
        const list = store.get('Query', 'ROOT', 'editorChoices') as Ref[]
        return list.slice(skip, skip + take)
      }
      return store.get('Query', 'ROOT', 'editorChoices')
    },
    posts(_, { take }) {
      if (take) {
        const list = store.get('Query', 'ROOT', 'posts') as Ref[]
        return faker.helpers.arrayElements(list, take)
      }
      return store.get('Query', 'ROOT', 'posts')
    },
    dataSets(_, { skip, take }) {
      if (take) {
        const list = store.get('Query', 'ROOT', 'dataSets') as Ref[]
        return list.slice(skip, skip + take)
      }
      return store.get('Query', 'ROOT', 'dataSets')
    },
  },
  // resolver for nested queries, ref: https://www.linkedin.com/pulse/resolving-nested-queries-graphql-using-apollo-server-saransh-kataria/
  Category: {
    relatedPost(_, { take }) {
      if (take) {
        const list = store.get('Category', 'ROOT', 'relatedPost') as Ref[]
        const length = Math.floor(faker.datatype.number({ min: 0, max: take }))

        return faker.helpers.arrayElements(list, length)
      }
      return store.get('Category', 'ROOT', 'relatedPost')
    },
  },
  DataSet: {
    gallery(_, { take }) {
      if (take) {
        const list = store.get('DataSet', 'ROOT', 'gallery') as Ref[]
        const length = Math.floor(faker.datatype.number({ min: 0, max: take }))

        return faker.helpers.arrayElements(list, length)
      }
      return store.get('DataSet', 'ROOT', 'gallery')
    },
  },
})
