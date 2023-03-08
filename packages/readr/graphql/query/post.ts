import gql from 'graphql-tag'

import { POST_STYLES, REPORT_STYLES } from '~/constants/constant'
import { convertToStringList } from '~/utils/common'

import { postFragment } from '../fragments/post'

const postStyles = [...POST_STYLES, ...REPORT_STYLES]

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
