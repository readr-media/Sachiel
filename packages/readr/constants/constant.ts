// 這裡管理固定數值

import type { GenericCategory } from '~/types/common'
import { ValidPostStyle } from '~/types/common'

const SITE_TITLE = 'READr 讀+'
const DEFAULT_POST_IMAGE_PATH = '/icons/default/post.svg'
const DEFAULT_CATEGORY: GenericCategory = {
  id: 'all',
  title: '不分類',
  slug: 'all',
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
  DEFAULT_CATEGORY,
  DEFAULT_POST_IMAGE_PATH,
  POST_STYLES,
  REPORT_STYLES,
  SITE_TITLE,
}
