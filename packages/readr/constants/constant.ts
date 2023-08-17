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

export {
  CATEGORY_SLUGS,
  DEFAULT_CATEGORY,
  DEFAULT_POST_IMAGE_PATH,
  POST_STYLES,
  REPORT_STYLES,
  SITE_TITLE,
}
