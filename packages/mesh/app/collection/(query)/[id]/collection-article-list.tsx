'use client'

import { useCustomTranslation } from '@/hooks/use-custom-translation'

import type { CollectionPick } from '../_types/collection'
import ArticleCardList from './_components/article-card-list'

export default function CollectionArticleList({
  items,
  avatar,
}: {
  items: CollectionPick[]
  avatar: string
}) {
  const { t } = useCustomTranslation()

  return (
    <ArticleCardList
      items={items}
      emptyMessage={t(
        'Pages.Collection.ArticleCardList-empty-message',
        '從精選新聞或書籤中\n將數篇新聞打包成集錦'
      )}
      avatar={avatar}
    />
  )
}
