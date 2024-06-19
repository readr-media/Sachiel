import 'server-only'

import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { GQL_ENDPOINT } from '@/constants/config'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.error(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({ uri: GQL_ENDPOINT })
// reference: https://www.apollographql.com/blog/how-to-use-apollo-client-with-next-js-13
// makes sure that we only instance the Apollo Client once per request,
// since Apollo Client’s cache is designed with a single user in mind, we recommend that your Next.js server instantiates a new cache for each SSR request, rather than reusing the same long-lived instance for multiple users’ data.
export const getClient = () => {
  // creat a new client if there's no existing one
  // or if we are running on the server.
  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  })
}
