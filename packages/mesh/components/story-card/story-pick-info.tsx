import { socialPageAvatarLayer } from '@/constants/z-index'
import { UserActionStoryFragment } from '@/graphql/__generated__/graphql'

import Avatar from './avatar'

type Picks = UserActionStoryFragment['pick']

export default function StoryPickInfo({
  displayPicks,
  pickCount,
}: {
  displayPicks: Picks
  pickCount: number
}) {
  return (
    <div className="footnote flex items-center gap-2 text-primary-500">
      <div className="flex -space-x-1 overflow-hidden">
        {displayPicks?.map((data, index) => (
          <div
            key={data.member?.id ?? ''}
            style={{ zIndex: socialPageAvatarLayer[index] }}
          >
            <Avatar src={data.member?.avatar ?? ''} size="m" />
          </div>
        ))}
      </div>
      <div className="flex items-center">{renderTotalPicks(pickCount)}</div>
    </div>
  )
}

const renderTotalPicks = (picksCount: number) => {
  if (picksCount < 10000) {
    return (
      <>
        <span className="pr-1 text-primary-700">{picksCount}</span>
        <span>人精選</span>
      </>
    )
  } else {
    const convertedPickCount = (Math.floor(picksCount / 1000) / 10).toFixed(1)
    return (
      <>
        <span className="pr-1 text-primary-700">{convertedPickCount}</span>
        <span>萬人精選</span>
      </>
    )
  }
}
