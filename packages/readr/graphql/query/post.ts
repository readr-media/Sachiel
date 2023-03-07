import gql from 'graphql-tag'

import { ValidPostStyle } from '~/types/common'
import { convertToStringList } from '~/utils/common'

import { postFragment } from '../fragments/post'

const postStyles = [
  ValidPostStyle.NEWS,
  ValidPostStyle.REPORT,
  ValidPostStyle.EMBEDDED,
  ValidPostStyle.PROJECT3,
  ValidPostStyle.FRAME,
  ValidPostStyle.BLANK,
  ValidPostStyle.SCROLLABLE_VIDEO,
]

const latestPosts = gql`
  query ($first: Int! = 3) {
    latestPosts: posts(
      take: $first
      where: {
        state: { equals: "published" }
        style: {
          in: [${convertToStringList(postStyles)}]
        }
      }
      orderBy: { publishTime: desc }
    ) {
      ...PostFields
    }
  }
  ${postFragment}
`

export { latestPosts }
