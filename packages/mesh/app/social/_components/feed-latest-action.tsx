import Link from 'next/link'

import Avatar from '@/components/story-card/avatar'
import { socialPageAvatarLayer } from '@/constants/z-index'

import { type LatestAction } from './feed'

export default function FeedLatestAction({
  actions,
}: {
  actions: LatestAction
}) {
  const { picksNum, commentsNum, picksData, commentsData } = actions
  const maxNameBytes = 9
  if (picksNum === 0) {
    if (commentsNum === 0) {
      return null
    } else if (commentsNum === 1 && commentsData.length) {
      return (
        <div className="flex items-center gap-2">
          <Avatar src={commentsData[0]?.member?.avatar} size="m" />
          <div className="body-3 text-primary-500">
            <span className="text-primary-700">
              <Link
                href={`profile/member/${commentsData[0].member.customId}`}
                className="hover-or-active:underline"
              >
                {truncateNameByBytes(
                  commentsData[0]?.member?.name,
                  maxNameBytes
                )}
              </Link>
            </span>
            在這篇文章留言
          </div>
        </div>
      )
    } else if (commentsNum === 2 && commentsData.length) {
      return (
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1 overflow-hidden">
            {commentsData.map((data, index) => (
              <div
                key={data.member?.id}
                style={{ zIndex: socialPageAvatarLayer[index] }}
              >
                <Avatar src={data.member?.avatar} size="m" />
              </div>
            ))}
          </div>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="text-primary-700">
              <Link
                href={`profile/member/${commentsData[0].member.customId}`}
                className="hover-or-active:underline"
              >
                {truncateNameByBytes(
                  commentsData[0]?.member?.name,
                  maxNameBytes
                )}
              </Link>
            </span>
            及
            <span className="text-primary-700">
              <Link
                href={`profile/member/${commentsData[1].member.customId}`}
                className="hover-or-active:underline"
              >
                {truncateNameByBytes(
                  commentsData[1]?.member?.name,
                  maxNameBytes
                )}
              </Link>
            </span>
            在這篇文章留言
          </div>
        </div>
      )
    } else if (commentsNum > 2 && commentsData.length) {
      return (
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1 overflow-hidden">
            <Avatar src={commentsData[0]?.member?.avatar} size="m" />
          </div>
          <div className="body-3 flex flex-row text-primary-500">
            <span className="text-primary-700">
              <Link
                href={`profile/member/${commentsData[0].member.customId}`}
                className="hover-or-active:underline"
              >
                {truncateNameByBytes(
                  commentsData[0]?.member?.name,
                  maxNameBytes
                )}
              </Link>
            </span>
            及其他
            <span className="px-1 text-primary-700">{commentsNum - 1}</span>
            人在這篇文章留言
          </div>
        </div>
      )
    }
  } else if (picksNum === 1 && picksData.length) {
    return (
      <div className="flex items-center gap-2">
        <Avatar src={picksData[0]?.member?.avatar} size="m" />
        <div className="body-3 text-primary-500">
          <span className="text-primary-700">
            <Link
              href={`profile/member/${picksData[0].member.customId}`}
              className="hover-or-active:underline"
            >
              {truncateNameByBytes(picksData[0]?.member?.name, maxNameBytes)}
            </Link>
          </span>
          精選了這篇
        </div>
      </div>
    )
  } else if (picksNum === 2 && picksData.length) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1 overflow-hidden">
          {picksData.map((data, index) => (
            <div
              key={data.member?.id}
              style={{ zIndex: socialPageAvatarLayer[index] }}
            >
              <Avatar src={data.member?.avatar} size="m" />
            </div>
          ))}
        </div>
        <div className="body-3 flex flex-row text-primary-500">
          <span className="text-primary-700">
            <Link
              href={`profile/member/${picksData[0].member.customId}`}
              className="hover-or-active:underline"
            >
              {truncateNameByBytes(picksData[0]?.member?.name, maxNameBytes)}
            </Link>
          </span>
          及
          <span className="text-primary-700">
            <Link
              href={`profile/member/${picksData[1].member.customId}`}
              className="hover-or-active:underline"
            >
              {truncateNameByBytes(picksData[1]?.member?.name, maxNameBytes)}
            </Link>
          </span>
          精選了這篇文章
        </div>
      </div>
    )
  } else if (picksNum > 2 && picksData.length) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1 overflow-hidden">
          <Avatar src={picksData[0]?.member?.avatar} size="m" />
        </div>
        <div className="body-3 flex flex-row text-primary-500">
          <span className="text-primary-700">
            <Link
              href={`profile/member/${picksData[0].member.customId}`}
              className="hover-or-active:underline"
            >
              {truncateNameByBytes(picksData[0]?.member?.name, maxNameBytes)}
            </Link>
          </span>
          及其他
          <span className="px-1 text-primary-700">{picksNum - 1}</span>
          人精選了這篇文章
        </div>
      </div>
    )
  }
  return null
}

function truncateNameByBytes(text: string, maxByte: number) {
  const encoder = new TextEncoder()
  const encodedText = encoder.encode(text)
  const byteLength = encodedText.length

  if (byteLength <= maxByte) {
    return text
  } else {
    const unit8 = encodedText.slice(0, maxByte)
    const shortText = new TextDecoder().decode(unit8).replace(/\uFFFD/g, '')
    return shortText + '...'
  }
}
