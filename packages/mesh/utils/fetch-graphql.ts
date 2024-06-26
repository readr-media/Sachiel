import type { OperationVariables } from '@apollo/client'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

import { getClient } from '@/apollo'

import { type TraceObject, logServerSideError } from './log'

export default async function fetchGraphQL<
  TResult,
  TVariables extends OperationVariables
>(
  query: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  traceObject?: TraceObject,
  errorMessage?: string
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
    const fallbackErrorMessage =
      'Fetch GraphQL failed, info: ' + JSON.stringify({ query, variables })

    logServerSideError(error, errorMessage || fallbackErrorMessage, traceObject)
    return null
  }
}
