import type { GetCurrentUserMemberIdQuery } from '@/graphql/__generated__/graphql'

export type Media = NonNullable<
  NonNullable<GetCurrentUserMemberIdQuery['member']>['publishers']
>[number]
