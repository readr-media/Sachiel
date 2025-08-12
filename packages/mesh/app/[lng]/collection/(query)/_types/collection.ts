import type {
  GetCollectionQuery,
  GetCollectionStoriesQuery,
} from '@/graphql/__generated__/graphql'

export type CollectionPick = NonNullable<
  NonNullable<
    NonNullable<GetCollectionStoriesQuery['collections']>[number]
  >['collectionpicks']
>[number]

export type Collection = NonNullable<GetCollectionQuery['collections']>[number]
