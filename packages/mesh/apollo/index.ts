import 'server-only'

import type { ApolloLink } from '@apollo/client'
import { ApolloClient, from, InMemoryCache, split } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { cache } from 'react'
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

const uploadLink = createUploadLink({
  uri: GQL_ENDPOINT,
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
}) as unknown as ApolloLink

const batchLink = new BatchHttpLink({
  uri: GQL_ENDPOINT,
  batchMax: 10,
  batchInterval: 10, // ms
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
}) as unknown as ApolloLink

// reference: https://www.apollographql.com/blog/how-to-use-apollo-client-with-next-js-13
// makes sure that we only instance the Apollo Client once per request,
// since Apollo Client’s cache is designed with a single user in mind, we recommend that your Next.js server instantiates a new cache for each SSR request, rather than reusing the same long-lived instance for multiple users’ data.
export const getClient = cache(() => {
  // create a new client once per request with React cache
  const uploadOperationNames = new Set(['CreatePhoto'])

  const link = from([
    errorLink,
    authLink,
    // 依據是否為檔案上傳分流：上傳走 uploadLink，否則走批次連結
    split(
      (operation) => uploadOperationNames.has(operation.operationName || ''),
      uploadLink,
      batchLink
    ),
  ])

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    },
  })
})
