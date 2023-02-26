import type { Post } from '~/graphql/fragments/post'
import { ValidPostStyle } from '~/types/common'

export function getHref({
  style,
  id,
  slug,
}: Pick<Post, 'style' | 'id' | 'slug'>): string | undefined {
  switch (style) {
    case ValidPostStyle.NEWS:
    case ValidPostStyle.EMBEDDED:
    case ValidPostStyle.FRAME:
    case ValidPostStyle.BLANK:
      return `/post/${id}`
    case ValidPostStyle.REPORT:
      return `/project/${slug}`
    case ValidPostStyle.PROJECT3:
      return `/project/3/${slug}`
    default:
      return undefined
  }
}

export function getUid({
  style,
  id,
  slug,
}: Pick<Post, 'style' | 'id' | 'slug'>): string {
  switch (style) {
    case ValidPostStyle.NEWS:
    case ValidPostStyle.EMBEDDED:
    case ValidPostStyle.FRAME:
    case ValidPostStyle.BLANK:
      return `post-${id}`
    case ValidPostStyle.REPORT:
      return `project-${slug}`
    case ValidPostStyle.PROJECT3:
      return `project-3-${slug}`
    default:
      return `default-uid-${style}-${slug}-${id}`
  }
}

export function isReport(style: string = ''): boolean {
  const isReportStyleList = ['report', 'project3', 'embedded']
  return isReportStyleList.includes(style)
}
