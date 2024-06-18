import { CodegenConfig } from '@graphql-codegen/cli'

import { API_ENDPOINT } from './constants/config'

const config: CodegenConfig = {
  schema: API_ENDPOINT,
  documents: ['./**/*.{gql,graphql}'],
  generates: {
    './graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
      hooks: { afterOneFileWrite: ['prettier --write'] },
    },
    'introspection.json': {
      plugins: ['introspection'],
      config: {
        minify: true,
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
