import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { CreateCollectionParams } from '@/app/actions/collection'
import { createCollection as sendCreateCollection } from '@/app/actions/collection'
import { maxSummaryLength } from '@/app/collection/(mutate)/_components/edit-summary'
import type { BaseMutateCollectionContextValue } from '@/app/collection/(mutate)/_types/collection'
import {
  type CollectionPickStory,
  type PickOrBookmark,
  CollectionFormat,
} from '@/app/collection/(mutate)/_types/collection'
import {
  DesktopCreateCollectionStep,
  MobileCreateCollectionStep,
} from '@/app/collection/(mutate)/new/_types/create-collection'
import { collectionCreateParamName } from '@/constants/search-param-names'
import useUserPayload from '@/hooks/use-user-payload'
import useWindowDimensions from '@/hooks/use-window-dimension'
import { clearCreateCollectionStoryLS } from '@/utils/cross-page-create-collection'
import { setCrossPageToast } from '@/utils/cross-page-toast'
import {
  generateUniqueTimestamp,
  getCurrentTimeInISOFormat,
} from '@/utils/date'
import { logStoryInteractionEvent } from '@/utils/event-logs'

import { useUser } from './user'

const mobileStepNames = [
  MobileCreateCollectionStep.Step1SelectStories,
  MobileCreateCollectionStep.Step2SetTitle,
  MobileCreateCollectionStep.Step3SetSummary,
  MobileCreateCollectionStep.Step4SortStories,
]

const desktopStepNames = [
  DesktopCreateCollectionStep.Step1EditAll,
  DesktopCreateCollectionStep.Step2SortStories,
]

type StoryCandidates = {
  list: PickOrBookmark[]
  maxCount: number
  usedAsFilter: boolean
}

export interface CreateCollectionContextValue
  extends BaseMutateCollectionContextValue {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  isMobileStepFullfilled: boolean
  isDesktopStepFullfilled: boolean
  mobileTitle: string
  desktopTitle: string
  mobileStepName: MobileCreateCollectionStep
  desktopStepName: DesktopCreateCollectionStep
  createCollection: () => void
}

const CreateCollectionContext = createContext<
  CreateCollectionContextValue | undefined
>(undefined)

const initialStoryCandidate: StoryCandidates = {
  list: [],
  maxCount: 0,
  usedAsFilter: true,
}

export default function CreateCollectionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [heroImage, setHeroImage] = useState<File | string | null>(null)
  const [pickCandidates, setPickCandidates] = useState<StoryCandidates>(
    initialStoryCandidate
  )
  const [bookmarkCandidates, setBookmarkCandidates] = useState<StoryCandidates>(
    initialStoryCandidate
  )
  const [collectionPickStories, setCollectionPickStories] = useState<
    CollectionPickStory[]
  >([])
  const router = useRouter()
  const { user } = useUser()
  const { width } = useWindowDimensions()
  const mobileStepName = mobileStepNames[step]
  const desktopStepName = desktopStepNames[step]
  const userPayload = useUserPayload()
  const searchParams = useSearchParams()

  const isMobileStepFullfilled = useMemo(() => {
    switch (mobileStepName) {
      case MobileCreateCollectionStep.Step1SelectStories:
        return Boolean(collectionPickStories.length)
      case MobileCreateCollectionStep.Step2SetTitle:
        return Boolean(title) && Boolean(heroImage)
      case MobileCreateCollectionStep.Step3SetSummary:
        return !summary || summary.length <= maxSummaryLength
      case MobileCreateCollectionStep.Step4SortStories:
        return true
      default:
        return false
    }
  }, [collectionPickStories.length, heroImage, mobileStepName, summary, title])

  const isDesktopStepFullfilled = useMemo(() => {
    switch (desktopStepName) {
      case DesktopCreateCollectionStep.Step1EditAll:
        return (
          Boolean(title) &&
          Boolean(heroImage) &&
          (!summary || summary.length <= maxSummaryLength) &&
          Boolean(collectionPickStories.length)
        )
      case DesktopCreateCollectionStep.Step2SortStories:
        return Boolean(collectionPickStories.length)
      default:
        return false
    }
  }, [collectionPickStories.length, desktopStepName, heroImage, summary, title])

  const mobileTitle = useMemo(() => {
    switch (mobileStepName) {
      case MobileCreateCollectionStep.Step1SelectStories: {
        const pickedStoryCount = collectionPickStories.length
        return pickedStoryCount ? `已選${pickedStoryCount}篇` : '選擇文章'
      }
      case MobileCreateCollectionStep.Step2SetTitle:
        return '標題'
      case MobileCreateCollectionStep.Step3SetSummary:
        return '敘述'
      case MobileCreateCollectionStep.Step4SortStories:
        return '排序'
      default:
        return '建立集錦'
    }
  }, [collectionPickStories.length, mobileStepName])

  const desktopTitle = useMemo(() => {
    switch (desktopStepName) {
      case DesktopCreateCollectionStep.Step1EditAll:
        return '建立集錦'
      case DesktopCreateCollectionStep.Step2SortStories:
        return '排序'
      default:
        return '建立集錦'
    }
  }, [desktopStepName])

  const createCollection = async () => {
    const formData = new FormData()
    if (heroImage) {
      formData.append('heroImage', heroImage)
    }
    localStorage.setItem('testHeroImage', JSON.stringify(formData))
    const newCollectionData: CreateCollectionParams = {
      title,
      slug: generateUniqueTimestamp(),
      summary,
      format: CollectionFormat.Folder,
      imageName: `集錦首圖_${title}`,
      imageUpload: formData,
      collectionpicks: collectionPickStories.map((story, i) => ({
        story: {
          connect: {
            id: story.id,
          },
        },
        sort_order: i,
        creator: {
          connect: {
            id: user.memberId,
          },
        },
        picked_date: getCurrentTimeInISOFormat(),
      })),
      memberId: user.memberId,
    }

    const response = await sendCreateCollection(newCollectionData)
    if (response) {
      // clear localstorage data once collection created
      clearCreateCollectionStoryLS()
      const collectionId = response.createCollection?.id
      const collectionTitle = response.createCollection?.title
      collectionPickStories.forEach((story) => {
        logStoryInteractionEvent(userPayload, {
          type: 'collection',
          storyId: story.id,
          storyTitle: story?.title ?? '',
          source: searchParams.get(collectionCreateParamName) ?? '',
          complementary: {
            target: 'collection',
            targetId: collectionId ?? '',
            targetName: collectionTitle ?? '',
          },
        })
      })
      router.push(`/collection/${collectionId}`)
    } else {
      setCrossPageToast({ status: 'fail', text: '建立集錦失敗，請重新嘗試' })
      router.push(`/profile/member/${user.customId}`)
    }
  }

  // reset steps when window width change
  useEffect(() => {
    if (width) {
      setStep(0)
    }
  }, [width])

  return (
    <CreateCollectionContext.Provider
      value={{
        step,
        setStep,
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
        createCollection,
        isMobileStepFullfilled,
        isDesktopStepFullfilled,
        mobileTitle,
        desktopTitle,
        mobileStepName,
        desktopStepName,
      }}
    >
      {children}
    </CreateCollectionContext.Provider>
  )
}

export const useCreateCollection = () => {
  const context = useContext(CreateCollectionContext)
  if (!context) {
    throw new Error(
      'useCreateCollection must be used within a CreateCollectionProvider'
    )
  }
  return context
}
