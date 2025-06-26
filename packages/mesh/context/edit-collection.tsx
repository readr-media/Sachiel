'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import {
  updateCollectionPicks as sendUpdateCollectionPicks,
  updateCollectionSummary as sendUpdateCollectionSummary,
  updateCollectionTitle as sendUpdateCollectionTitle,
  updateWholeCollection as sendUpdateWholeCollection,
} from '@/app/actions/edit-collection'
import { maxSummaryLength } from '@/app/collection/(mutate)/_components/edit-summary'
import type {
  BaseMutateCollectionContextValue,
  Collection,
} from '@/app/collection/(mutate)/_types/collection'
import {
  type CollectionPickStory,
  type PickOrBookmark,
} from '@/app/collection/(mutate)/_types/collection'
import {
  prepareUpdateCollectionPicks,
  prepareUpdateCollectionTitle,
  prepareUpdateeCollectionSummary,
} from '@/app/collection/(mutate)/_utils/prepare-update-collection'
import {
  DesktopEditCollectionType,
  MobileEditCollectionType,
} from '@/app/collection/(mutate)/(edit)/_types/edit-collection'
import useWindowDimensions from '@/hooks/use-window-dimension'
import { setCrossPageToast } from '@/utils/cross-page-toast'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'

import { useUser } from './user'

type StoryCandidates = {
  list: PickOrBookmark[]
  maxCount: number
  usedAsFilter: boolean
}

export interface EditCollectionContextValue
  extends BaseMutateCollectionContextValue {
  mobileEditType: MobileEditCollectionType
  setMobileEditType: React.Dispatch<
    React.SetStateAction<MobileEditCollectionType>
  >
  desktopEditType: DesktopEditCollectionType
  setDesktopEditType: React.Dispatch<
    React.SetStateAction<DesktopEditCollectionType>
  >
  isMobileEditTypeFullfilled: boolean
  isDesktopEditTypeFullfilled: boolean
  mobileTitle: string
  desktopTitle: string
  updateCollectionTitleAndHeroImage: () => void
  updateCollectionSummary: () => void
  updateCollectionPicks: () => void
  updateWholeCollection: () => void
}

const EditCollectionContext = createContext<
  EditCollectionContextValue | undefined
>(undefined)

const initialStoryCandidate: StoryCandidates = {
  list: [],
  maxCount: 0,
  usedAsFilter: true,
}

export default function EditCollectionProvider({
  children,
  initialDesktopEditType,
  initialMobileEditType,
  initialCollection,
}: {
  children: React.ReactNode
  initialDesktopEditType?: DesktopEditCollectionType
  initialMobileEditType?: MobileEditCollectionType
  initialCollection: Collection
}) {
  const [desktopEditType, setDesktopEditType] = useState(
    initialDesktopEditType ?? DesktopEditCollectionType.EditAll
  )
  const [mobileEditType, setMobileEditType] = useState(
    initialMobileEditType ?? MobileEditCollectionType.EditTitle
  )
  const [title, setTitle] = useState(initialCollection.title ?? '')
  const [summary, setSummary] = useState(initialCollection.summary ?? '')
  const [heroImage, setHeroImage] = useState<File | string | null>(
    initialCollection.heroImage?.resized?.original ?? null
  )
  const [pickCandidates, setPickCandidates] = useState<StoryCandidates>(
    initialStoryCandidate
  )
  const [bookmarkCandidates, setBookmarkCandidates] = useState<StoryCandidates>(
    initialStoryCandidate
  )

  const [collectionPickStories, setCollectionPickStories] = useState<
    CollectionPickStory[]
  >(
    initialCollection.collectionpicks?.reduce(
      (acc: CollectionPickStory[], curr) => {
        if (curr && curr.story) {
          acc.push(curr.story)
        }
        return acc
      },
      []
    ) ?? []
  )

  const router = useRouter()
  const { user } = useUser()
  const { width } = useWindowDimensions()

  const isMobileEditTypeFullfilled = useMemo(() => {
    switch (mobileEditType) {
      case MobileEditCollectionType.EditTitle:
        return Boolean(title) && Boolean(heroImage)
      case MobileEditCollectionType.EditSummary:
        return !summary || summary.length <= maxSummaryLength
      case MobileEditCollectionType.EditStories:
        return Boolean(collectionPickStories.length)
      case MobileEditCollectionType.AddStories:
        return Boolean(collectionPickStories.length)
      default:
        return false
    }
  }, [collectionPickStories.length, heroImage, mobileEditType, summary, title])

  const isDesktopEditTypeFullfilled = useMemo(() => {
    switch (desktopEditType) {
      case DesktopEditCollectionType.EditAll:
        return (
          Boolean(title) &&
          Boolean(heroImage) &&
          (!summary || summary.length <= maxSummaryLength) &&
          Boolean(collectionPickStories.length)
        )
      case DesktopEditCollectionType.AddStories:
        return Boolean(collectionPickStories.length)
      default:
        return false
    }
  }, [collectionPickStories.length, desktopEditType, heroImage, summary, title])

  const mobileTitle = useMemo(() => {
    switch (mobileEditType) {
      case MobileEditCollectionType.EditTitle:
        return '修改標題'
      case MobileEditCollectionType.EditSummary:
        return '修改敘述'
      case MobileEditCollectionType.EditStories:
        return '編輯排序'
      case MobileEditCollectionType.AddStories:
        return '加入新文章'
      default:
        return ''
    }
  }, [mobileEditType])

  const desktopTitle = useMemo(() => {
    switch (desktopEditType) {
      case DesktopEditCollectionType.EditAll:
        return '編輯集錦'
      case DesktopEditCollectionType.AddStories:
        return '加入新文章'
      default:
        return ''
    }
  }, [desktopEditType])

  const hintUserUpdateCollectionError = () => {
    setCrossPageToast({ status: 'fail', text: '編輯集錦失敗，請重新嘗試' })
  }

  const redirectAfterUpdateCollection = () => {
    router.push(`/collection/${initialCollection.id}`)
  }

  const updateCollectionTitleAndHeroImage = async () => {
    const collectionId = initialCollection.id
    const { isTitleUpdated, newTitle, isHeroImageUpdated, imageUpload } =
      prepareUpdateCollectionTitle({
        newTitle: title,
        oldTitle: initialCollection.title ?? '',
        heroImage,
      })

    if (isTitleUpdated || isHeroImageUpdated) {
      const response = await sendUpdateCollectionTitle({
        collectionId,
        title: newTitle,
        imageUpload,
      })
      if (!response) {
        hintUserUpdateCollectionError()
      }
    }
    redirectAfterUpdateCollection()
  }

  const updateCollectionSummary = async () => {
    const collectionId = initialCollection.id
    const { isSummaryUpdated, newSummary } = prepareUpdateeCollectionSummary({
      newSummary: summary,
      oldSummary: initialCollection.summary ?? '',
    })

    if (isSummaryUpdated) {
      const response = await sendUpdateCollectionSummary({
        collectionId,
        summary: newSummary,
      })
      if (!response) {
        hintUserUpdateCollectionError()
      }
    }
    redirectAfterUpdateCollection()
  }

  const updateCollectionPicks = async () => {
    const collectionId = initialCollection.id

    const {
      isCollectionPicksUpdated,
      createCollectionPicksData,
      updateCollectionPicksData,
      deleteCollectionPicksData,
    } = prepareUpdateCollectionPicks({
      newCollectionPickStories: collectionPickStories,
      oldCollectionPicks: initialCollection.collectionpicks ?? [],
      memberId: user.memberId,
    })

    if (isCollectionPicksUpdated) {
      const response = await sendUpdateCollectionPicks({
        collectionId,
        createCollectionPicksData,
        updateCollectionPicksData,
        deleteCollectionPicksData,
      })
      if (!response) {
        hintUserUpdateCollectionError()
      }
    }
    redirectAfterUpdateCollection()
  }

  const updateWholeCollection = async () => {
    const collectionId = initialCollection.id
    const { isTitleUpdated, newTitle, isHeroImageUpdated, imageUpload } =
      prepareUpdateCollectionTitle({
        newTitle: title,
        oldTitle: initialCollection.title ?? '',
        heroImage,
      })
    const { isSummaryUpdated, newSummary } = prepareUpdateeCollectionSummary({
      newSummary: summary,
      oldSummary: initialCollection.summary ?? '',
    })
    const {
      isCollectionPicksUpdated,
      createCollectionPicksData,
      updateCollectionPicksData,
      deleteCollectionPicksData,
    } = prepareUpdateCollectionPicks({
      newCollectionPickStories: collectionPickStories,
      oldCollectionPicks: initialCollection.collectionpicks ?? [],
      memberId: user.memberId,
    })

    const isCollectionUpdated =
      isTitleUpdated ||
      isHeroImageUpdated ||
      isSummaryUpdated ||
      isCollectionPicksUpdated

    if (isCollectionUpdated) {
      const response = await sendUpdateWholeCollection({
        collectionId,
        title: newTitle,
        imageUpload,
        summary: newSummary,
        createCollectionPicksData,
        updateCollectionPicksData,
        deleteCollectionPicksData,
      })
      if (!response) {
        hintUserUpdateCollectionError()
      }
    }
    redirectAfterUpdateCollection()
  }

  // go back to collection page when mobile page render in desktop and vice versa change
  useEffect(() => {
    if (width) {
      const desktopBreakpoint = getTailwindConfigBreakpointNumber('lg')
      const isPageRenderedInWrongDimension =
        (initialDesktopEditType && width < desktopBreakpoint) ||
        (initialMobileEditType && width >= desktopBreakpoint)
      if (isPageRenderedInWrongDimension) {
        router.back()
      }
    }
  }, [initialDesktopEditType, initialMobileEditType, router, width])

  return (
    <EditCollectionContext.Provider
      value={{
        mobileEditType,
        setMobileEditType,
        desktopEditType,
        setDesktopEditType,
        title,
        setTitle,
        summary,
        setSummary,
        heroImage,
        setHeroImage,
        pickCandidates,
        setPickCandidates,
        bookmarkCandidates,
        setBookmarkCandidates,
        collectionPickStories,
        setCollectionPickStories,
        isMobileEditTypeFullfilled,
        isDesktopEditTypeFullfilled,
        mobileTitle,
        desktopTitle,
        updateCollectionTitleAndHeroImage,
        updateCollectionSummary,
        updateCollectionPicks,
        updateWholeCollection,
      }}
    >
      {children}
    </EditCollectionContext.Provider>
  )
}

export const useEditCollection = () => {
  const context = useContext(EditCollectionContext)
  if (!context) {
    throw new Error(
      'useEditCollection must be used within a EditCollectionProvider'
    )
  }
  return context
}
