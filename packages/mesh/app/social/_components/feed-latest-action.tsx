'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import Avatar from '@/components/story-card/avatar'
import { socialPageAvatarLayer } from '@/constants/z-index'
import { type MongoDBResponse } from '@/utils/data-schema'

import { type LatestAction } from './feed'

export default function FeedLatestAction({
  actions,
  storyType,
}: {
  actions: LatestAction
  storyType: MongoDBResponse['stories'][number]['story_type']
}) {
  const t = useTranslations('Pages.Social')
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
                className="GTM-soc_click_user hover-or-active:underline"
              >
                {truncateNameByBytes(
                  commentsData[0]?.member?.name,
                  maxNameBytes
                )}
              </Link>
            </span>
            {t('FeedLatestAction-single-comment')}
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
                className="GTM-soc_click_user hover-or-active:underline"
              >
                {truncateNameByBytes(
                  commentsData[0]?.member?.name,
                  maxNameBytes
                )}
              </Link>
            </span>
            {commentsData[1] ? (
              <div>
                {t('FeedLatestAction-two-comments-1')}
                <span className="text-primary-700">
                  <Link
                    href={`profile/member/${commentsData[1].member.customId}`}
                    className="GTM-soc_click_user hover-or-active:underline"
                  >
                    {truncateNameByBytes(
                      commentsData[1]?.member?.name,
                      maxNameBytes
                    )}
                  </Link>
                </span>
              </div>
            ) : null}
            {t('FeedLatestAction-two-comments-2')}
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
                className="GTM-soc_click_user hover-or-active:underline"
              >
                {truncateNameByBytes(
                  commentsData[0]?.member?.name,
                  maxNameBytes
                )}
              </Link>
            </span>
            {t('FeedLatestAction-three-comments-1')}
            <span className="px-1 text-primary-700">{commentsNum - 1}</span>
            {t('FeedLatestAction-three-comments-2')}
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
              className="GTM-soc_click_user hover-or-active:underline"
            >
              {truncateNameByBytes(picksData[0]?.member?.name, maxNameBytes)}
            </Link>
          </span>
          {storyType === 'story'
            ? t('FeedLatestAction-single-pick-story')
            : t('FeedLatestAction-single-pick-podcast')}
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
              className="GTM-soc_click_user hover-or-active:underline"
            >
              {truncateNameByBytes(picksData[0]?.member?.name, maxNameBytes)}
            </Link>
          </span>
          {t('FeedLatestAction-two-picks-1')}
          <span className="text-primary-700">
            <Link
              href={`profile/member/${picksData[1].member.customId}`}
              className="GTM-soc_click_user hover-or-active:underline"
            >
              {truncateNameByBytes(picksData[1]?.member?.name, maxNameBytes)}
            </Link>
          </span>
          {storyType === 'story'
            ? t('FeedLatestAction-two-picks-2-story')
            : t('FeedLatestAction-two-picks-2-podcast')}
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
              className="GTM-soc_click_user hover-or-active:underline"
            >
              {truncateNameByBytes(picksData[0]?.member?.name, maxNameBytes)}
            </Link>
          </span>
          {t('FeedLatestAction-three-picks-1')}
          <span className="px-1 text-primary-700">{picksNum - 1}</span>人
          {storyType === 'story'
            ? t('FeedLatestAction-three-picks-2-story')
            : t('FeedLatestAction-three-picks-2-podcast')}
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
