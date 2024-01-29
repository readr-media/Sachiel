// 這裡管理固定數值

import { ValidPostStyle } from '~/types/common'
import type { NavigationCategory } from '~/types/component'

const SITE_TITLE = 'READr 讀+'
const DEFAULT_POST_IMAGE_PATH = '/icons/default/post.svg'
const DEFAULT_CATEGORY: NavigationCategory = {
  id: 'all',
  title: '不分類',
  slug: 'all',
}

const CATEGORY_SLUGS = {
  breakingnews: 'breakingnews',
  education: 'education',
  politics: 'politics',
  humanrights: 'humanrights',
  environment: 'environment',
  omt: 'omt',
  data: 'data',
  note: 'note',
  covid19: 'covid19',
  culture: 'culture',
  international: 'international',
  traffic: 'traffic',
}

const POST_STYLES: string[] = [
  ValidPostStyle.NEWS,
  ValidPostStyle.FRAME,
  ValidPostStyle.BLANK,
  ValidPostStyle.SCROLLABLE_VIDEO,
]
const REPORT_STYLES: string[] = [
  ValidPostStyle.EMBEDDED,
  ValidPostStyle.PROJECT3,
  ValidPostStyle.REPORT,
]

const DEFAULT_HEADER_CATEGORY_LIST = [
  {
    id: '1',
    slug: 'breakingnews',
    title: '時事',
    posts: [],
    ogDescription: '',
    ogImage: null,
    sortOrder: null,
    updatedAt: null,
    createdAt: null,
  },
  {
    id: '2',
    slug: 'education',
    title: '教育',
    posts: [],
    ogDescription: '',
    ogImage: null,
    sortOrder: null,
    updatedAt: null,
    createdAt: null,
  },
  {
    id: '3',
    slug: 'politics',
    title: '政治',
    posts: [],
    ogDescription: '',
    ogImage: null,
    sortOrder: null,
    updatedAt: null,
    createdAt: null,
  },
  {
    id: '4',
    slug: 'humanrights',
    title: '人權',
    posts: [],
    ogDescription: '',
    ogImage: null,
    sortOrder: null,
    updatedAt: null,
    createdAt: null,
  },
  {
    id: '5',
    slug: 'environment',
    title: '環境',
    posts: [],
    ogDescription: '',
    ogImage: null,
    sortOrder: null,
    updatedAt: null,
    createdAt: null,
  },
  {
    id: '6',
    slug: 'omt',
    title: '新鮮事',
    posts: [],
    ogDescription: '',
    ogImage: null,
    sortOrder: null,
    updatedAt: null,
    createdAt: null,
  },
]

export {
  CATEGORY_SLUGS,
  DEFAULT_CATEGORY,
  DEFAULT_HEADER_CATEGORY_LIST,
  DEFAULT_POST_IMAGE_PATH,
  POST_STYLES,
  REPORT_STYLES,
  SITE_TITLE,
}
