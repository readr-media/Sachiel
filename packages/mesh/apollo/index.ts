import 'server-only'

import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { cookies } from 'next/headers'

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

const authLink = setContext((_, { headers }) => {
  const idToken = cookies().get('token')?.value ?? ''

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${idToken}`,
    },
  }
})

// const httpLink = new HttpLink({ uri: GQL_ENDPOINT })
const uploadLink = createUploadLink({
  uri: GQL_ENDPOINT,
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
}) as unknown as ApolloLink

// reference: https://www.apollographql.com/blog/how-to-use-apollo-client-with-next-js-13
// makes sure that we only instance the Apollo Client once per request,
// since Apollo Client’s cache is designed with a single user in mind, we recommend that your Next.js server instantiates a new cache for each SSR request, rather than reusing the same long-lived instance for multiple users’ data.
export const getClient = () => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  return new ApolloClient({
    link: from([errorLink, authLink, uploadLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  })
}
