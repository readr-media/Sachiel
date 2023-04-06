import dayjs from 'dayjs'

import { REPORT_STYLES } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type {
  GenericPhoto,
  GenericPost,
  keyOfResizedImages,
  ResizedImages,
} from '~/types/common'
import { ValidPostStyle } from '~/types/common'
import type { ArticleCard } from '~/types/component'

export function getHref({
  style,
  id,
  slug,
}: Partial<Pick<GenericPost, 'style' | 'id' | 'slug'>>): string {
  switch (style) {
    case ValidPostStyle.NEWS:
    case ValidPostStyle.EMBEDDED:
    case ValidPostStyle.FRAME:
    case ValidPostStyle.SCROLLABLE_VIDEO:
    case ValidPostStyle.BLANK:
      return `/post/${id}`
    case ValidPostStyle.REPORT:
      return `/project/${slug}`
    case ValidPostStyle.PROJECT3:
      return `/project/3/${slug}`
    default:
      // undefined value can't be serialized, so set default value to '/'
      return '/'
  }
}

export function getUid({
  style,
  id,
  slug,
}: Partial<Pick<GenericPost, 'style' | 'id' | 'slug'>>): string {
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
  return REPORT_STYLES.includes(style)
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

export function getImageOfArticle({
  images,
  beginSize,
}: {
  images: (GenericPhoto | null | undefined)[]
  beginSize?: keyOfResizedImages
}): string {
  return images.reduce((image, curr) => {
    if (image) return image
    else return getImageSrc(curr?.resized, beginSize)
  }, '')
}

export function convertPostToArticleCard(
  post: Post | null,
  images?: ResizedImages
): ArticleCard {
  const {
    id = 'no-id',
    title = '',
    slug = '',
    readingTime = 0,
    style,
    publishTime = '',
  } = post ?? {}

  return {
    id: getUid({ style, id, slug }),
    title,
    href: getHref({ style, id, slug }),
    date: formatPostDate(publishTime),
    readTimeText: formatReadTime(readingTime),
    isReport: isReport(style),
    images: images ?? {},
  }
}

export const postConvertFunc = (post: Post): ArticleCard => {
  const { heroImage, ogImage } = post
  const images = ogImage?.resized ?? heroImage?.resized ?? {}
  return convertPostToArticleCard(post, images)
}
