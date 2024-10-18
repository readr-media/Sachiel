import { useEffect, useRef, useState } from 'react'

import { getSocialPageData } from '@/app/actions/get-member-followings'
import { useUser } from '@/context/user'
import useInView from '@/hooks/use-in-view'
import { type MongoDBResponse } from '@/utils/data-schema'

import Feed from './feed'

export default function MoreFeed({ feedsNumber }: { feedsNumber: number }) {
  const { targetRef: scrollRef, isIntersecting: isInView } = useInView()
  const { user } = useUser()
  const [page, setPage] = useState(1)
  const [moreStories, setMoreStories] = useState<MongoDBResponse['stories']>([])
  const loadingRef = useRef(false)

  useEffect(() => {
    const fetchMoreStories = async () => {
      if (isInView && !loadingRef.current) {
        loadingRef.current = true
        const startIndex = page * feedsNumber

        const nextPageDataResponse = await getSocialPageData(
          user.memberId,
          startIndex,
          feedsNumber
        )

        if (!nextPageDataResponse) return
        const { stories: nextStories } = nextPageDataResponse

        if (nextStories.length > 0) {
          setMoreStories((prevStories) => [...prevStories, ...nextStories])
          setPage((prevPage) => prevPage + 1)
        }

        loadingRef.current = false
      }
    }
    fetchMoreStories()
  }, [feedsNumber, isInView, page, user.memberId])

  return (
    <>
      {moreStories.map((story) => (
        <Feed key={story.id} story={story} />
      ))}
      <div ref={scrollRef} className="h-0"></div>
    </>
  )
}
