'use server'

import type {
  CollectionPickCreateInput,
  CollectionPickUpdateArgs,
  CollectionPickWhereUniqueInput,
  CollectionUpdateInput,
} from '@/graphql/__generated__/graphql'
import {
  GetCollectionToEditDocument,
  GetMemberPickAndBookmarkDocument,
  UpdateCollectionDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL, { mutateGraphQL } from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export async function getMemberPickAndBookmark({
  memberId,
  pickTake,
  pickSkip,
  bookmarkTake,
  bookmarkSkip,
}: {
  memberId: string
  pickTake: number
  pickSkip: number
  bookmarkTake: number
  bookmarkSkip: number
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return await queryGraphQL(
    GetMemberPickAndBookmarkDocument,
    {
      memberId,
      pickTake,
      pickSkip,
      bookmarkTake,
      bookmarkSkip,
    },
    globalLogFields
  )
}

export async function getCollectionToEdit({
  collectionId,
}: {
  collectionId: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return await queryGraphQL(
    GetCollectionToEditDocument,
    {
      collectionId,
    },
    globalLogFields
  )
}

async function updateCollection({
  collectionId,
  updateCollectionData = {},
  createCollectionPicksData = [],
  updateCollectionPicksData = [],
  deleteCollectionPicksData = [],
}: {
  collectionId: string
  updateCollectionData?: CollectionUpdateInput
  createCollectionPicksData?: CollectionPickCreateInput[]
  updateCollectionPicksData?: CollectionPickUpdateArgs[]
  deleteCollectionPicksData?: CollectionPickWhereUniqueInput[]
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const isAllDefaults =
    !Object.keys(updateCollectionData).length &&
    !createCollectionPicksData.length &&
    !updateCollectionPicksData.length &&
    !deleteCollectionPicksData.length

  if (isAllDefaults) {
    logServerSideError(
      new Error('UpdateCollection server action called without params'),
      'Failed to updateCollection',
      globalLogFields
    )
    return null
  }

  return await mutateGraphQL(
    UpdateCollectionDocument,
    {
      collectionId,
      updateCollectionData,
      createCollectionPicksData,
      updateCollectionPicksData,
      deleteCollectionPicksData,
    },
    globalLogFields
  )
}

export async function updateCollectionTitle({
  collectionId,
  title,
  imageUpload,
}: {
  collectionId: string
  title: string
  imageUpload?: FormData
}) {
  const updateCollectionData: CollectionUpdateInput = {
    title,
  }
  if (imageUpload) {
    updateCollectionData.heroImage = {
      create: {
        name: `集錦首圖_${title}`,
        file: {
          upload: imageUpload.get('heroImage'),
        },
      },
    }
  }
  if (!Object.keys(updateCollectionData).length) return null
  return await updateCollection({
    collectionId,
    updateCollectionData,
  })
}

export async function updateCollectionSummary({
  collectionId,
  summary,
}: {
  collectionId: string
  summary: string
}) {
  return await updateCollection({
    collectionId,
    updateCollectionData: {
      summary,
    },
  })
}

export async function updateCollectionPicks({
  collectionId,
  createCollectionPicksData,
  updateCollectionPicksData,
  deleteCollectionPicksData,
}: {
  collectionId: string
  createCollectionPicksData: CollectionPickCreateInput[]
  updateCollectionPicksData: CollectionPickUpdateArgs[]
  deleteCollectionPicksData: CollectionPickWhereUniqueInput[]
}) {
  return await updateCollection({
    collectionId,
    createCollectionPicksData,
    updateCollectionPicksData,
    deleteCollectionPicksData,
  })
}

export async function updateWholeCollection({
  collectionId,
  title,
  imageUpload,
  summary,
  createCollectionPicksData,
  updateCollectionPicksData,
  deleteCollectionPicksData,
}: {
  collectionId: string
  title: string
  imageUpload?: FormData
  summary: string
  createCollectionPicksData: CollectionPickCreateInput[]
  updateCollectionPicksData: CollectionPickUpdateArgs[]
  deleteCollectionPicksData: CollectionPickWhereUniqueInput[]
}) {
  const updateCollectionData: CollectionUpdateInput = {
    title,
    summary,
  }

  if (imageUpload) {
    updateCollectionData.heroImage = {
      create: {
        name: `集錦首圖_${title}`,
        file: {
          upload: imageUpload.get('heroImage'),
        },
      },
    }
  }

  return await updateCollection({
    collectionId,
    updateCollectionData,
    createCollectionPicksData,
    updateCollectionPicksData,
    deleteCollectionPicksData,
  })
}
