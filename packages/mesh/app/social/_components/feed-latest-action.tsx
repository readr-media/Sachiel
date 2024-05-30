import { type LatestAction, avatarLayer, renderAvatar } from './feed'

export default function FeedLatestAction({
  actions,
}: {
  actions: LatestAction
}) {
  if (!actions) return null
  const { picksNum, commentsNum, picksData, commentsData } = actions

  if (picksNum === 0 && commentsNum === 1) {
    return (
      <div className="flex items-center gap-2">
        {renderAvatar(commentsData[0].member, 28)}
        <div className="body-3 text-primary-500">
          <span className="text-primary-700">
            {commentsData[0].member.name}
          </span>
          在這篇文章留言
        </div>
      </div>
    )
  }
  if (picksNum === 0 && commentsNum === 2) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1 overflow-hidden">
          {commentsData.map((data, index) => (
            <div key={data.member.id} className={`${avatarLayer[index]}`}>
              {renderAvatar(data.member, 28)}
            </div>
          ))}
        </div>
        <div className="body-3 flex flex-row text-primary-500">
          <span className="text-primary-700">
            {commentsData[0].member.name}
          </span>
          及
          <span className="text-primary-700">
            {commentsData[1].member.name}
          </span>
          在這篇文章留言
        </div>
      </div>
    )
  }
  if (picksNum === 0 && commentsNum > 2) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1 overflow-hidden">
          {renderAvatar(commentsData[0].member, 28)}
        </div>
        <div className="body-3 flex flex-row text-primary-500">
          <span className="text-primary-700">
            {commentsData[0].member.name}
          </span>
          及其他
          <span className="px-1 text-primary-700">{commentsNum - 1}</span>
          人在這篇文章留言
        </div>
      </div>
    )
  }

  if (picksNum === 1 && commentsNum >= 0) {
    return (
      <div className="flex items-center gap-2">
        {renderAvatar(picksData[0].member, 28)}
        <div className="body-3 text-primary-500">
          <span className="text-primary-700">{picksData[0].member.name}</span>
          精選了這篇
        </div>
      </div>
    )
  }
  if (picksNum === 2 && commentsNum >= 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1 overflow-hidden">
          {picksData.map((data, index) => (
            <div key={data.member.id} className={`${avatarLayer[index]}`}>
              {renderAvatar(data.member, 28)}
            </div>
          ))}
        </div>
        <div className="body-3 flex flex-row text-primary-500">
          <span className="text-primary-700">{picksData[0].member.name}</span>及
          <span className="text-primary-700">{picksData[1].member.name}</span>
          精選了這篇文章
        </div>
      </div>
    )
  }
  if (picksNum > 2 && commentsNum >= 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1 overflow-hidden">
          {renderAvatar(picksData[0].member, 28)}
        </div>
        <div className="body-3 flex flex-row text-primary-500">
          <span className="text-primary-700">{picksData[0].member.name}</span>
          及其他
          <span className="px-1 text-primary-700">{picksNum - 1}</span>
          人精選了這篇文章
        </div>
      </div>
    )
  }

  return null
}
