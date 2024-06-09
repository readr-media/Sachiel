import type { OperationVariables } from '@apollo/client'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'

import { getClient } from '@/apollo'

export default async function fetchGraphQL<
  TResult,
  TVariables extends OperationVariables
>(
  query: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult | null> {
  try {
    const { data, errors: gqlErrors } = await getClient().query({
      query,
      variables,
    })

    if (gqlErrors && gqlErrors.length > 0) {
      throw new Error(`[GraphQL error]: ${gqlErrors[0].message}`)
    }
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        JSON.stringify({
          severity: 'ERROR',
          message: `fetchGraphQL failed: ${error.message}`,
          stack: error.stack || 'No stack available',
        })
      )
    } else {
      console.error(
        JSON.stringify({
          severity: 'ERROR',
          message: 'fetchGraphQL failed: Unknown error',
          stack: 'No stack available',
        })
      )
    }
    return null
  }
}
