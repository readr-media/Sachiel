import { SITE_URL } from '~/constants/environment-variables'
import type { Post } from '~/graphql/query/category'

export function getHref({
  style,
  id,
  slug,
}: Pick<Post, 'style' | 'id' | 'slug'>): string | undefined {
  switch (style) {
    case 'news':
    case 'embedded':
    case 'frame':
    case 'blank':
      return `/post/${id}`
    case 'report':
      return `${SITE_URL}/project/${slug}`
    case 'project3':
      return `${SITE_URL}/project/3/${slug}`
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
    case 'news':
    case 'embedded':
    case 'frame':
    case 'blank':
      return `post-${id}`
    case 'report':
      return `project-${slug}`
    case 'project3':
      return `project-3-${slug}`
    default:
      throw new Error('')
  }
}

export function isReport(style: string = ''): boolean {
  const isReportStyleList = ['report', 'project3', 'embedded']
  return isReportStyleList.includes(style)
}
