'use client'

import { useTranslations } from 'next-intl'

import CollectionPickButton from '@/components/collection-card/collection-pick-button'
import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import ShareButton from '@/components/navigation/share-button'
import { useComment } from '@/context/comment'
// import { BookmarkObjective } from '@/types/objective'
import { useUser } from '@/context/user'
import type { GetCollectionQuery } from '@/graphql/__generated__/graphql'
import { PickObjective } from '@/types/objective'
// import AddBookMarkButton from '@/components/navigation/add-bookmark-button'
import { getCollectionUrl } from '@/utils/get-url'

import CollectionMoreActionButton from './collection-more-action-button'
import Loading from './loading'
type Collection = NonNullable<GetCollectionQuery['collections']>[number]

export default function ClientLayout({
  collection,
  children,
}: {
  collection: Collection
  children: React.ReactNode
}) {
  const t = useTranslations('Pages.Collection')
  const { user } = useUser()
  const isSinglePickByCurrentUser =
    collection.picks?.length === 1 &&
    collection.picks[0].member?.id === user.memberId
  const { state: comment } = useComment()
  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-multi-layer-light',
        footer: 'hidden sm:block',
        nav: 'hidden sm:block',
      }}
      mobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: t('ClientLayout-title'),
        rightButtons: [
          // TODO: for now bookmark pub/sub only support add story to bookmark, unlock the comment when pub/sub update
          // <AddBookMarkButton
          //   key={0}
          //   bookmarkObjective={BookmarkObjective.Collection}
          //   targetId={collection.id}
          // />,
          <ShareButton key={1} url={getCollectionUrl(collection.id)} />,
          <div className="flex size-11 items-center justify-center" key={0}>
            <CollectionMoreActionButton collection={collection} />
          </div>,
        ],
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: t('ClientLayout-title'),
        rightButtons: [
          <CollectionMoreActionButton key={2} collection={collection} />,
        ],
      }}
      mobileActionBar={{
        pickObjective: PickObjective.Collection,
        objectiveId: collection.id,
        picksCount: collection.picksCount ?? 0,
        commentsCount: comment.commentsCount ?? 0,
        actions: [
          <CollectionPickButton
            key={0}
            collectionId={collection.id}
            collectionTitle={collection?.title ?? ''}
          />,
        ],
        isSinglePickByCurrentUser,
      }}
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
