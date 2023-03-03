// 這裡管理固定數值

import type { GenericCategory } from '~/types/common'

const SITE_TITLE = 'READr 讀+'
const DEFAULT_POST_IMAGE_PATH = '/icons/default/post.svg'
const DEFAULT_CATEGORY: GenericCategory = {
  id: 'all',
  title: '不分類',
  slug: 'all',
}

export { DEFAULT_CATEGORY, DEFAULT_POST_IMAGE_PATH, SITE_TITLE }
