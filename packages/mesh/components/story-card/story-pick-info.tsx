import { socialPageAvatarLayer } from '@/constants/z-index'
import { Story } from '@/graphql/query/member'

import Avatar from './avatar'

type Picks = Story['pick']

type Props =
  | {
      picks: Picks
      followingMemberIds: Set<string>
    }
  | { sortedPicks: Picks; pickCount: number }

export default function StoryPickInfo(props: Props) {
  let displayPicks: Picks = []
  let picksLength = 0
  if ('sortedPicks' in props) {
    displayPicks = props.sortedPicks
    picksLength = props.pickCount
  } else {
    const { picks, followingMemberIds } = props
    const picksFromFollowingMember: Picks = []
    const picksFromStranger: Picks = []

    picks.forEach((pick) =>
      followingMemberIds.has(pick.member.id)
        ? picksFromFollowingMember.push(pick)
        : picksFromStranger.push(pick)
    )

    displayPicks = [...picksFromFollowingMember, ...picksFromStranger].slice(
      0,
      4
    )
    picksLength = picks.length
  }

  return (
    <div className="footnote flex items-center gap-2 text-primary-500">
      <div className="flex -space-x-1 overflow-hidden">
        {displayPicks.map((data, index) => (
          <div
            key={data.member.id}
            style={{ zIndex: socialPageAvatarLayer[index] }}
          >
            <Avatar src={data.member.avatar} size="m" />
          </div>
        ))}
      </div>
      <div className="flex items-center">{renderTotalPicks(picksLength)}</div>
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
