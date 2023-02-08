import { ApolloClient, InMemoryCache } from '@apollo/client'

import { API_ENDPOINT } from '~/constants/config'
import { isServer } from '~/utils/common'

// make apollo client support for both client-side and server-side
const client = new ApolloClient({
  uri: isServer() ? API_ENDPOINT : `${window.location.origin}/api/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export default client
