import type {
  GetCollectionQuery,
  GetStoryInteractionsQuery,
  GetStoryQuery,
} from '@/graphql/__generated__/graphql'

type Story = NonNullable<NonNullable<GetStoryQuery>['story']>
export type StoryInteractions = NonNullable<
  NonNullable<GetStoryInteractionsQuery>['story']
>
type Collection = NonNullable<
  NonNullable<GetCollectionQuery>['collections']
>[number]

export type CommentObjectiveData = Pick<Story, 'title' | 'source' | 'id'> &
  Pick<StoryInteractions, 'picks' | 'picksCount'> &
  Pick<Collection, 'title' | 'creator' | 'picks' | 'picksCount' | 'id'>
