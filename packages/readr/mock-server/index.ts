import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { loadSchema } from '@graphql-tools/load'
import { addMocksToSchema } from '@graphql-tools/mock'
import { UrlLoader } from '@graphql-tools/url-loader'

import { MOCK_API_SERVER_PORT } from '../constants/config'
import { mocks } from './mocks'
import { resolvers } from './resolver'

const GQL_SCHEMA_URL =
  'https://raw.githubusercontent.com/mirror-media/Lilith/main/packages/readr/schema.graphql'

const startServer = async () => {
  const schema = await loadSchema(GQL_SCHEMA_URL, {
    loaders: [new UrlLoader()],
  })

  const server = new ApolloServer({
    // addMocksToSchema accepts a schema instance and provides
    // mocked data for each field in the schema
    schema: addMocksToSchema({
      schema,
      // This is an example to write mock data.
      // In this example, query has field with `ResizedImages` type (e.g., photo), the field will return with mock data.
      // For more detail, please read: https://www.apollographql.com/docs/apollo-server/testing/mocking/#using-lists-in-mocks
      // mocks: {
      //   ResizedImages: () => ({
      //     original: 'this is original image',
      //     w480: 'this is w480 image',
      //     w800: 'this is w800 image',
      //     w1200: 'this is w1200 image',
      //     w1600: 'this is w1600 image',
      //     w2400: 'this is w2400 image',
      //   }),
      // },
      mocks,
      resolvers,
    }),
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: MOCK_API_SERVER_PORT },
  })
  /* eslint-disable-next-line no-console */
  console.log(`🚀 Mock Server listening at: ${url}`)
}

startServer()
