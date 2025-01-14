import Link from 'next/link'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import Comment from '@/app/profile/_components/comment'
import CollectionPickButton from '@/components/collection-card/collection-pick-button'
import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { CommentProvider } from '@/context/comment'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import useUserPayload from '@/hooks/use-user-payload'
import { CommentObjective } from '@/types/objective'
import {
  type BookmarkItem,
  type CollectionItem,
  type CommentType,
  type PickListItem,
} from '@/types/profile'
import { logCollectionClick, logStoryClick } from '@/utils/event-logs'

type StoryDataTypes =
  | NonNullable<PickListItem>
  | NonNullable<BookmarkItem>
  | CollectionItem

type ArticleCardProps = {
  storyData: StoryDataTypes
  isLast: boolean
  memberId?: string
  avatar?: string
  name?: string
  shouldShowComment: boolean
}
function hasComment(
  storyData: StoryDataTypes
): storyData is NonNullable<PickListItem> {
  if (!storyData) return false
  return 'comment' in storyData
}
const isStory = (
  data: StoryDataTypes
): data is NonNullable<PickListItem> | NonNullable<BookmarkItem> =>
  data.__typename !== 'Collection'

const isCollection = (data: StoryDataTypes): data is CollectionItem =>
  data.__typename === 'Collection'
type GetterConfig<T> = {
  story: (data: NonNullable<PickListItem> | NonNullable<BookmarkItem>) => T
  collection: (data: CollectionItem) => T
  default: T
}
const createGetter = <T,>(config: GetterConfig<T>) => {
  return (data: StoryDataTypes): T => {
    if (isStory(data)) return config.story(data)
    if (isCollection(data)) return config.collection(data)
    return config.default
  }
}
const storyGetters = {
  image: createGetter<string>({
    story: (data) => data.og_image ?? '',
    collection: (data) => data.heroImage?.resized?.original ?? '',
    default: '',
  }),

  source: createGetter<string>({
    story: (data) => data.source?.title ?? '預設媒體',
    collection: () => '',
    default: '預設媒體',
  }),

  sourceId: createGetter<string>({
    story: (data) => data.source?.id ?? '',
    collection: () => '',
    default: '',
  }),

  publishedDate: createGetter<string>({
    story: (data) => data.published_date ?? '',
    collection: (data) => data.updatedAt ?? data.createdAt ?? '',
    default: '',
  }),

  paywall: createGetter<boolean>({
    story: (data) => data.paywall ?? false,
    collection: () => false,
    default: false,
  }),

  fullScreenAd: createGetter<string>({
    story: (data) => data.full_screen_ad ?? '',
    collection: () => '',
    default: '',
  }),

  pickCount: createGetter<number>({
    story: (data) => data.pickCount ?? 0,
    collection: (data) => data.picksCount ?? 0,
    default: 0,
  }),
  pick: createGetter<
    NonNullable<PickListItem>['pick'] | CollectionItem['picks']
  >({
    story: (data) => data.pick ?? [],
    collection: (data) => data.picks ?? [],
    default: [],
  }),
  redirectUrl: createGetter<string>({
    story: (data) => `/story/${data.id}`,
    collection: (data) => `/collection/${data.id}`,
    default: '',
  }),
} as const

const ArticleCard = ({
  storyData,
  isLast,
  memberId,
  avatar = '',
  name,
  shouldShowComment,
}: ArticleCardProps) => {
  /**
   * 此處的gql方法主要有三個：
   * GetMemberProfile 只會取用最新並且是作者的留言（一個）
   * GetVisitorProfile 只會取用最新並且是作者的留言（一個）
   * GetPublisherProfile 不會取用留言，因為Publisher不會顯示留言
   */
  const commentList = (hasComment(storyData) && storyData.comment) || []
  const authorComment =
    commentList.length !== 0
      ? commentList[0]
      : {
          __typename: 'Comment',
          id: '',
          content: '',
          createdAt: '',
          likeCount: 0,
          member: {
            __typename: 'Member',
            id: memberId,
            name,
            avatar,
          },
        }

  const { displayPicks, displayPicksCount } = useDisplayPicks({
    id: storyData.id,
    picks: storyGetters.pick(storyData),
    picksCount: storyGetters.pickCount(storyData),
  })
  const userPayload = useUserPayload()
  const shouldShowSource = !isCollection(storyData)
  const redirectLink = () => {
    if (isCollection(storyData)) return `/collection/${storyData.id}`
    return `/story/${storyData?.id}`
  }
  return (
    <>
      <CommentProvider
        initialComments={storyData?.comment || []}
        commentsCount={storyData?.commentCount ?? 0}
        commentObjective={CommentObjective.Story}
        commentObjectiveData={storyData}
      >
        <Link
          className={`md:flex md:w-full ${
            isCollection(storyData) ? 'GTM-collection_tab_click' : ''
          }`}
          href={redirectLink()}
          onClick={() =>
            isCollection(storyData)
              ? logCollectionClick(userPayload, storyData.title ?? '')
              : logStoryClick(
                  userPayload,
                  storyData.id,
                  storyData?.title ?? '',
                  storyGetters.source(storyData)
                )
          }
        >
          <section className="relative hidden md:block md:aspect-[2/1] md:w-full md:overflow-hidden md:rounded-t-md">
            <ImageWithFallback
              fallbackCategory={ImageCategory.STORY}
              src={storyGetters.image(storyData)}
              alt={`${storyData?.title}'s story cover image`}
              fill
              className="size-full object-cover"
            />
          </section>
        </Link>
        <div
          className={`flex grow flex-col after:absolute after:bottom-1 after:h-px after:w-[calc(100%-40px)] after:bg-primary-200 md:line-clamp-3 md:flex md:flex-col md:pt-[12px] md:after:hidden ${
            isLast ? 'after:hidden' : ''
          } ${
            isCollection(storyData)
              ? 'p-5 py-[10px] after:hidden sm:p-0 md:justify-between'
              : 'p-5'
          }`}
        >
          <Link
            className={`flex grow flex-col ${
              isCollection(storyData) ? 'GTM-collection_tab_click' : ''
            }`}
            href={redirectLink()}
            onClick={() =>
              isCollection(storyData)
                ? logCollectionClick(userPayload, storyData.title ?? '')
                : logStoryClick(
                    userPayload,
                    storyData.id,
                    storyData?.title ?? '',
                    storyGetters.source(storyData)
                  )
            }
          >
            {shouldShowSource && (
              <section className="mb-1 flex items-center justify-between">
                <>
                  <p className="caption-1 text-primary-500">
                    {storyGetters.source(storyData)}
                  </p>
                  <StoryMoreActionButton
                    story={storyData}
                    publisherId={storyGetters.sourceId(storyData)}
                  />
                </>
              </section>
            )}
            <section
              className={`flex ${
                isCollection(storyData)
                  ? 'size-full grow flex-col-reverse justify-end rounded-t border border-b-0 border-primary-200 md:border-0'
                  : 'mb-2 items-start justify-between sm:gap-10'
              }`}
            >
              <div
                className={`flex h-fit flex-col justify-between ${
                  isCollection(storyData) ? 'px-3' : ''
                }`}
              >
                <p className="body-2 mb-2 w-full sm:mb-1 sm:line-clamp-2 lg:line-clamp-3 lg:min-h-[72px]">
                  {storyData?.title || '預設標題'}
                </p>
                <span className="*:caption-1 *:text-primary-500">
                  <StoryMeta
                    storyId={storyData.id}
                    commentCount={storyData?.commentCount || 0}
                    publishDate={storyGetters.publishedDate(storyData)}
                    paywall={storyGetters.paywall(storyData)}
                    fullScreenAd={storyGetters.fullScreenAd(storyData)}
                  />
                </span>
              </div>
              <div
                className={`relative aspect-[2/1] min-w-24 overflow-hidden sm:min-w-40 md:hidden ${
                  isCollection(storyData)
                    ? 'mb-3 rounded-t'
                    : 'ml-3 rounded border-[0.5px] border-primary-200 sm:w-40 md:border-0'
                }`}
              >
                <ImageWithFallback
                  fallbackCategory={ImageCategory.STORY}
                  src={storyGetters.image(storyData)}
                  alt={`${storyData?.title}'s story cover image`}
                  fill
                  className="object-cover"
                />
              </div>
            </section>
          </Link>
          <section
            className={`
                flex justify-between
                ${
                  isCollection(storyData)
                    ? `rounded-b border border-t-0 border-primary-200 px-3 py-4 md:border-0`
                    : ` pt-4`
                }
              `}
          >
            <ObjectivePickInfo
              displayPicks={displayPicks}
              pickCount={displayPicksCount}
              maxCount={4}
              objectiveId={storyData.id}
            />
            {isCollection(storyData) ? (
              <CollectionPickButton
                collectionId={storyData.id}
                gtmClassName="GTM-collection_tab_pick"
              />
            ) : (
              <StoryPickButton storyId={storyData?.id} />
            )}
          </section>

          {shouldShowComment && (
            <Comment
              data={authorComment as CommentType}
              avatar={avatar}
              clampLineCount={3}
              canToggle={false}
              redirectUrl={
                // NOTE: 目前只有story有留言，因此沒有條件
                storyGetters.redirectUrl(storyData) +
                `#${(authorComment as CommentType).id}`
              }
            />
          )}
        </div>
      </CommentProvider>
    </>
  )
}

export default ArticleCard
