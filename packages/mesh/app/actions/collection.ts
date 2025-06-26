'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import type { CollectionPickCreateInput } from '@/graphql/__generated__/graphql'
import {
  AddStoryToCollectionDocument,
  CreateCollectionDocument,
  GetCollectionDocument,
  GetCollectionPickersDocument,
  GetCollectionsDocument,
  GetCollectionStoriesDocument,
  GetMemberCollectionsDocument,
  RemoveCollectionDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL, { mutateGraphQL } from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import type { CollectionFormat } from '../collection/(mutate)/_types/collection'

export async function getCollection({
  collectionId,
}: {
  collectionId: string
}) {
  const picksTake = 5
  const commentsTake = 30

  const globalLogFields = getLogTraceObjectFromHeaders()
  return await queryGraphQL(
    GetCollectionDocument,
    {
      collectionId,
      picksTake,
      commentsTake,
    },
    globalLogFields
  )
}

export async function getCollections({
  collectionIds,
}: {
  collectionIds: string[]
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return await queryGraphQL(
    GetCollectionsDocument,
    {
      collectionIds,
    },
    globalLogFields
  )
}

export async function getCollectionStories({
  collectionId,
  creatorCustomId,
}: {
  collectionId: string
  creatorCustomId: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return await queryGraphQL(
    GetCollectionStoriesDocument,
    {
      collectionId,
      creatorCustomId,
    },
    globalLogFields
  )
}

export async function getMemberCollections({ memberId }: { memberId: string }) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return await queryGraphQL(
    GetMemberCollectionsDocument,
    {
      creatorId: memberId,
    },
    globalLogFields
  )
}

export type CreateCollectionParams = {
  title: string
  slug: string
  summary: string
  format: CollectionFormat
  imageName: string
  imageUpload: FormData
  collectionpicks: CollectionPickCreateInput[]
  memberId: string
}
export async function createCollection({
  title,
  slug,
  summary,
  format,
  imageName,
  imageUpload,
  collectionpicks,
  memberId,
}: CreateCollectionParams) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await mutateGraphQL(
    CreateCollectionDocument,
    {
      title,
      slug,
      summary,
      status: 'publish',
      public: 'public',
      format,
      imageName,
      imageUpload: imageUpload.get('heroImage'),
      collectionpicks,
      memberId,
    },
    globalLogFields
  )
  if (response?.createCollection?.id)
    await updateCollectinInMeilisearch(response.createCollection.id, memberId)
  return response
}

export async function addStoryToCollection({
  collectionId,
  storyId,
  sortOrder,
  memberId,
  pickDate,
}: {
  collectionId: string
  storyId: string
  sortOrder: number
  memberId: string
  pickDate: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const response = await mutateGraphQL(
    AddStoryToCollectionDocument,
    {
      id: collectionId,
      storyId,
      sortOrder,
      memberId,
      pickDate,
    },
    globalLogFields
  )
  if (response) await updateCollectinInMeilisearch(collectionId, memberId)
  return response
}

export async function removeCollection({
  collectionId,
  heroImageId,
  memberId,
}: {
  collectionId: string
  heroImageId: string
  memberId: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const response = await mutateGraphQL(
    RemoveCollectionDocument,
    {
      collectionId,
      heroImageId,
    },
    globalLogFields
  )
  if (response) await deleteCollectionInMeilisearch(collectionId, memberId)
  return response
}

async function updateCollectinInMeilisearch(
  collectionId: string,
  memberId: string
) {
  return await fetchRestfulPost(RESTFUL_ENDPOINTS.pubsub, {
    action: 'add_collection',
    collectionId,
    memberId,
  })
}

async function deleteCollectionInMeilisearch(
  collectionId: string,
  memberId: string
) {
  return await fetchRestfulPost(RESTFUL_ENDPOINTS.pubsub, {
    action: 'remove_collection',
    collectionId,
    memberId,
  })
}

export async function getCollectionPickers(
  collectionId: string,
  picksTake: number,
  picksSkip: number
) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const getCollectionPickersResponse = await queryGraphQL(
    GetCollectionPickersDocument,
    { collectionId, picksTake, picksSkip },
    globalLogFields,
    'Failed to getStoryPickers'
  )
  return getCollectionPickersResponse?.collection
}
