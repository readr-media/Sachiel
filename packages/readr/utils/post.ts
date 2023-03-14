import dayjs from 'dayjs'

import type { Post } from '~/graphql/fragments/post'
import {
  keyOfResizedImages,
  ResizedImages,
  ValidPostStyle,
} from '~/types/common'

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

export function getImageSrc(
  imageObject?: ResizedImages | null,
  beginSize: keyOfResizedImages = 'w480'
): string {
  const imageList: keyOfResizedImages[] = [
    'w480',
    'w800',
    'w1200',
    'w1600',
    'w2400',
    'original',
  ]

  if (!imageObject) {
    return ''
  }

  let imageSrc = ''
  for (
    let index = imageList.indexOf(beginSize);
    index < imageList.length;
    index += 1
  ) {
    const size = imageList[index]
    imageSrc = imageObject[size] || imageSrc
  }

  return imageSrc
}

export function isReport(style: string = ''): boolean {
  const isReportStyleList = ['report', 'project3', 'embedded']
  return isReportStyleList.includes(style)
}

export function formatPostDate(datetime: dayjs.ConfigType): string {
  const formatStr = dayjs().isSame(dayjs(datetime), 'year')
    ? 'MM/DD'
    : 'YYYY/MM/DD'
  return dayjs(datetime).format(formatStr)
}

export function formatReadTime(readingTime = 0): string {
  return readingTime
    ? `閱讀時間 ${Number(readingTime)} 分鐘`
    : `閱讀時間 10 分鐘`
}
