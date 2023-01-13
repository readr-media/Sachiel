import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { addMocksToSchema } from '@graphql-tools/mock'

const startServer = async () => {
  const schema = await loadSchema('./mock-server/typeDefs/schema.graphql', {
    loaders: [new GraphQLFileLoader()],
  })

  const server = new ApolloServer({
    // addMocksToSchema accepts a schema instance and provides
    // mocked data for each field in the schema
    schema: addMocksToSchema({
      schema,
    }),
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })
  /* eslint-disable-next-line no-console */
  console.log(`🚀 Mock Server listening at: ${url}`)
}

startServer()
