import { CodegenConfig } from '@graphql-codegen/cli'

import { API_ENDPOINT } from './constants/config'

const config: CodegenConfig = {
  schema: API_ENDPOINT,
  documents: ['packages/mesh/**/*.tsx'],
  generates: {
    './apollo/types/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
