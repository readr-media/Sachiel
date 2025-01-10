'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import {
  addStoryToCollection as updateCollectionWithStory,
  getMemberCollections,
} from '@/app/actions/collection'
import type { CollectionPickStory } from '@/app/collection/(mutate)/_types/collection'
import { ImageCategory } from '@/constants/fallback-src'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import type { GetMemberCollectionsQuery } from '@/graphql/__generated__/graphql'
import useBlockBodyScroll from '@/hooks/use-block-body-scroll'
import useUserPayload from '@/hooks/use-user-payload'
import { setCrossPageCollectionPickStory } from '@/utils/cross-page-create-collection'
import { getCurrentTimeInISOFormat } from '@/utils/date'
import { logStoryAddedToCollection } from '@/utils/event-logs'
import { debounce } from '@/utils/performance'

import Button from './button'
import Icon from './icon'
import Spinner from './spinner'

type Collection = NonNullable<GetMemberCollectionsQuery['collections']>[number]

export default function AddStoryToCollection({
  story,
  onClose,
}: {
  story: CollectionPickStory
  onClose: () => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])
  const [addedCollections, setAddedCollections] = useState<Collection[]>([])
  const router = useRouter()
  const { user } = useUser()
  useBlockBodyScroll(true)
  const { addToast } = useToast()
  const userPayload = useUserPayload()

  const addStoryToCollection = async (collection: Collection) => {
    if (!collection.collectionpicks) return
    const lastCollectionPick =
      collection.collectionpicks[collection.collectionpicks.length - 1]
    const response = await updateCollectionWithStory({
      collectionId: collection.id,
      storyId: story.id,
      sortOrder: (lastCollectionPick.sort_order ?? 0) + 1,
      memberId: user.memberId,
      pickDate: getCurrentTimeInISOFormat(),
    })
    if (response) {
      addToast({ status: 'success', text: '成功加入集錦' })
      logStoryAddedToCollection(userPayload, story.id)
    } else {
      addToast({ status: 'fail', text: '加入集錦失敗，請重新嘗試' })
    }
    onClose()
  }

  const createCollection = () => {
    setCrossPageCollectionPickStory(story)
    router.push('/collection/new')
  }

  useEffect(() => {
    const fetchMemberCollections = async () => {
      setIsLoading(true)
      const response = await getMemberCollections({
        memberId: user.memberId,
      })
      const collections = response?.collections ?? []
      const intialProcessedCollectionObj: {
        newCollections: Collection[]
        addedCollections: Collection[]
      } = { newCollections: [], addedCollections: [] }
      const { newCollections, addedCollections } = collections.reduce(
        (processedObj, collection) => {
          const collectionStorySet = new Set(
            collection.collectionpicks?.map(
              (collectionPick) => collectionPick.story?.id ?? ''
            )
          )
          collectionStorySet.has(story.id)
            ? processedObj.addedCollections.push(collection)
            : processedObj.newCollections.push(collection)
          return processedObj
        },
        intialProcessedCollectionObj
      )
      setCollections(newCollections)
      setAddedCollections(addedCollections)
      setIsLoading(false)
    }
    fetchMemberCollections()
  }, [story.id, user.memberId])

  const getHintJsx = () => {
    if (!collections.length && !addedCollections.length)
      return (
        <div className="body-3 p-5 pb-0 text-primary-500">
          你目前還沒有任何集錦...
        </div>
      )
    if (!collections.length)
      return (
        <div className="body-3 p-5 pb-0 text-primary-500">
          你之前已將這篇新聞加入你所有的集錦囉
        </div>
      )
    if (!addedCollections.length) return null
    const endingText =
      addedCollections.length > 1
        ? `等${addedCollections.length}個集錦囉`
        : '集錦囉'

    return (
      <div className="body-3 p-5 pb-0 text-primary-500">
        你之前已將這篇新聞加入
        {addedCollections.map((collection, i) => (
          <React.Fragment key={i}>
            「
            <Link
              href={`/collection/${collection.id}`}
              className="hover-or-active:underline"
            >
              <span className="text-primary-700">{collection.title ?? ''}</span>
            </Link>
            」{i !== addedCollections.length - 1 ? '、' : ''}
          </React.Fragment>
        ))}
        {endingText}
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-lightbox-light"
      onClick={(evt) => {
        evt.stopPropagation()
        onClose()
      }}
    >
      <div
        className="relative flex size-full flex-col bg-white sm:h-[560px] sm:w-[480px] sm:rounded-md sm:shadow-light-box"
        onClick={(evt) => evt.stopPropagation()}
      >
        {/* header */}
        <div className="flex h-15 shrink-0 items-center justify-between border-b px-2">
          <div
            className="flex size-11 cursor-pointer items-center justify-center sm:pointer-events-none"
            onClick={onClose}
          >
            <Icon className="sm:hidden" iconName="icon-chevron-left" size="m" />
          </div>
          <div className="list-title text-primary-800">加入集錦</div>
          <div
            className="group pointer-events-none relative flex size-11 items-center justify-center sm:pointer-events-auto sm:cursor-pointer"
            onClick={onClose}
          >
            <Icon
              className="absolute hidden opacity-100 group-hover:opacity-0 sm:block"
              iconName="icon-close"
              size="l"
            />
            <Icon
              className="absolute size-full opacity-0 group-hover:opacity-100"
              iconName="icon-close-with-background-gray"
              size="l"
            />
          </div>
        </div>
        {/* collection list */}
        <div className="flex grow flex-col overflow-auto px-5">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {getHintJsx()}
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="group cursor-pointer border-b py-5 last:border-0"
                  onClick={debounce(
                    addStoryToCollection.bind(null, collection)
                  )}
                >
                  <div className="flex gap-3">
                    <div className="relative aspect-[2/1] w-24 shrink-0">
                      <ImageWithFallback
                        src={collection.heroImage?.resized?.original ?? ''}
                        fallbackCategory={ImageCategory.STORY}
                        alt={collection.title ?? ''}
                        fill
                      />
                    </div>
                    <div className="flex items-center">
                      <div className="subtitle-1 line-clamp-2 text-primary-700 group-hover:underline">
                        {collection.title ?? ''}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {/* main action */}
        <div className="border-t px-5 py-3 sm:py-5">
          <Button
            size="lg"
            text="建立新集錦"
            color="white"
            onClick={createCollection}
          />
        </div>
      </div>
    </div>
  )
}
