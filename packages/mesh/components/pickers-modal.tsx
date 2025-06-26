import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

import { getCollectionPickers } from '@/app/actions/collection'
import { getStoryPickers } from '@/app/actions/story'
import FollowButton from '@/app/social/_components/follow-button'
import { usePickersModal } from '@/context/pickers-modal'
import { type Picker } from '@/context/pickers-modal'
import { useUser } from '@/context/user'
import useInView from '@/hooks/use-in-view'
import { PickObjective } from '@/types/objective'

import Icon from './icon'
import Avatar from './story-card/avatar'

export default function PickersModal() {
  const { user } = useUser()
  const { pickObjective, objectiveId, closePickersModal } = usePickersModal()
  const { targetRef: scrollRef, isIntersecting: isInView } = useInView()
  const router = useRouter()
  const loadingRef = useRef(false)
  const pickersTake = 5
  const [page, setPage] = useState(0)
  const [pickersData, setPickersData] = useState<Picker[]>([])
  const isPicked = user.pickStoryIds.has(objectiveId)

  const getPickers = useMemo(() => {
    switch (pickObjective) {
      case PickObjective.Story:
        return getStoryPickers
      case PickObjective.Collection:
        return getCollectionPickers
      default:
        return () => {}
    }
  }, [pickObjective])

  useEffect(() => {
    if (objectiveId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [objectiveId])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePickersModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closePickersModal])

  useEffect(() => {
    const fetchMorePickers = async () => {
      if (isInView && !loadingRef.current) {
        loadingRef.current = true

        const startIndex = page * pickersTake
        const data = await getPickers(objectiveId, pickersTake, startIndex)

        if (!data || !data.picks) {
          loadingRef.current = false
          return
        }

        if (data.picks.length > 0) {
          const nextPickers = data.picks.map((p) => ({
            id: p.member?.id ?? '',
            name: p.member?.name ?? '',
            avatar: p.member?.avatar ?? '',
            customId:
              p.member && 'customId' in p.member ? p.member.customId : '',
          }))
          setPickersData((prevPickers) => [...prevPickers, ...nextPickers])
          setPage((prevPage) => prevPage + 1)
        }

        loadingRef.current = false
      }
    }

    fetchMorePickers()
  }, [isInView, page, objectiveId, getPickers])

  return (
    <div
      className="relative z-30"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 w-screen bg-black/35 transition-opacity"
        aria-hidden="true"
        aria-label="modal-overlay"
      >
        <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center">
          <div className="relative max-h-[600px] w-full max-w-[480px] rounded-md bg-white text-left shadow-xl transition-all">
            <div className="flex h-15 flex-row items-center justify-center rounded-t-md border-[0.5px] border-primary-200 bg-white">
              <div className="size-11"></div>
              <p className="list-title mx-auto text-primary-800">精選者</p>
              <button onClick={() => closePickersModal()}>
                <Icon iconName="icon-modal-close" size="2xl" />
              </button>
            </div>
            <div className="h-[540px] overflow-y-auto px-5">
              {isPicked && (
                <div className="mx-5 flex flex-row border-b-[0.5px] border-primary-200 py-5">
                  <Avatar size="l" src={user.avatar} extra="shrink-0" />
                  <div className="flex w-full flex-row items-center justify-between">
                    <div className="flex flex-col pl-2">
                      <p className="subtitle-1">{user.name}</p>
                      <p className="body-3 text-primary-500">{user.customId}</p>
                    </div>
                  </div>
                </div>
              )}
              {pickersData
                .filter((p) => p.id !== user.memberId)
                .map((p) => (
                  <div
                    key={p.id}
                    className="mx-5 flex flex-row border-b-[0.5px] border-primary-200 py-5"
                  >
                    <Avatar size="l" src={p.avatar} extra="shrink-0" />
                    <div className="flex w-full flex-row items-center justify-between">
                      <div className="flex flex-col pl-2">
                        <p
                          className="subtitle-1 hover:cursor-pointer hover-or-active:underline"
                          onClick={() => {
                            closePickersModal()
                            router.push(`/profile/member/${p.customId}`)
                          }}
                        >
                          {p.name}
                        </p>
                        <p className="body-3 text-primary-500">
                          {p.customId || p.id}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <FollowButton followingId={p.id} />
                      </div>
                    </div>
                  </div>
                ))}
              <div ref={scrollRef} className="h-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
