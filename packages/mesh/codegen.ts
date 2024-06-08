import { CodegenConfig } from '@graphql-codegen/cli'

import { API_ENDPOINT } from './constants/config'

const config: CodegenConfig = {
  schema: API_ENDPOINT,
  documents: ['./**/*.{ts,tsx}'],
  generates: {
    './apollo/types/': {
      preset: 'client',
      hooks: { afterOneFileWrite: ['prettier --write'] },
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
