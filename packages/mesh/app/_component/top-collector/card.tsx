import FollowButton from '@/app/social/_components/follow-button'
import Avatar from '@/components/story-card/avatar'
import type { Collector } from '@/types/homepage'

type Props = {
  person: Collector
  rank: number
}

export default function TopCollectorCard({ person, rank }: Props) {
  return (
    <div className="mb-3 flex items-center gap-y-3 border-b-[0.5px] pb-3 last:border-0 lg:flex-col lg:rounded-md lg:bg-[#FFF] lg:px-3 lg:pb-4 lg:pt-3 lg:shadow-card ">
      <span
        className={`rounded-md ${
          rank === 1 ? 'bg-brand' : 'bg-[#DADCE3]'
        } mr-3 px-2 py-[3px] lg:mr-0`}
      >
        {rank}
      </span>

      <div className="flex grow gap-x-3 lg:flex-col lg:items-center lg:gap-y-3">
        <div>
          <Avatar
            src={person.avatar}
            size="l"
            extra="shrink-0 lg:w-16 lg:h-16"
          />
        </div>

        <div className="flex flex-col gap-y-[2px] py-[3px] lg:items-center lg:gap-y-1 lg:py-0">
          <p className="subtitle-2 line-clamp-1 text-primary-700">
            {person.name}
          </p>
          <p className="caption-1 text-primary-500">
            本週已精選
            <span className="text-primary-700"> {person.pickCount} </span>
            篇文章
          </p>
        </div>
      </div>
      {/* TODO: modify styles and migrate */}
      <FollowButton followingId={String(person.id)} />
    </div>
  )
}
