'use client'

import { useTranslations } from 'next-intl'

import type { CollectionPick } from '../_types/collection'
import ArticleCardList from './_components/article-card-list'

export default function CollectionArticleList({
  items,
  avatar,
}: {
  items: CollectionPick[]
  avatar: string
}) {
  const t = useTranslations('Pages.Collection')
  return (
    <ArticleCardList
      items={items}
      emptyMessage={t('ArticleCardList-empty-message')}
      avatar={avatar}
    />
  )
}
