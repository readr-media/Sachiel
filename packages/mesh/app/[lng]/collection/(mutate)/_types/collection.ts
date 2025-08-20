import type { Dispatch, SetStateAction } from 'react'

import type {
  GetCollectionToEditQuery,
  GetMemberPickAndBookmarkQuery,
} from '@/graphql/__generated__/graphql'

export type Collection = NonNullable<GetCollectionToEditQuery['collection']>
export type CollectionPick = NonNullable<Collection['collectionpicks']>[number]

export type PickOrBookmark = NonNullable<
  NonNullable<GetMemberPickAndBookmarkQuery['member']>['picks']
>[number]
export type CollectionPickStory = NonNullable<PickOrBookmark['story']>

export enum CollectionFormat {
  Folder = 'folder',
  Timeline = 'timeline',
}

type StoryCandidates = {
  list: PickOrBookmark[]
  maxCount: number
  usedAsFilter: boolean
}

export interface BaseMutateCollectionContextValue {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  summary: string
  setSummary: Dispatch<SetStateAction<string>>
  heroImage: File | string | null
  setHeroImage: Dispatch<SetStateAction<File | string | null>>
  pickCandidates: StoryCandidates
  setPickCandidates: Dispatch<SetStateAction<StoryCandidates>>
  bookmarkCandidates: StoryCandidates
  setBookmarkCandidates: Dispatch<SetStateAction<StoryCandidates>>
  collectionPickStories: CollectionPickStory[]
  setCollectionPickStories: Dispatch<SetStateAction<CollectionPickStory[]>>
}

export type UseCollection = () => BaseMutateCollectionContextValue
