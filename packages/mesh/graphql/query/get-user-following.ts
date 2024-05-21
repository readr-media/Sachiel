import { gql } from '@apollo/client'

export const GetUserFollowing = gql`
  query GetUserFollowing($memberId: ID!, $picksTake: Int!) {
    member(where: { id: $memberId }) {
      id
      customId
      name
      avatar
      follower {
        id
        name
      }
      followerCount
      following {
        id
        name
        avatar
        pick(orderBy: { createdAt: desc }, take: $picksTake) {
          id
          createdAt
          story {
            id
            url
            og_title
            og_image
            og_description
            source {
              customId
              createdAt
            }
            published_date
            pickCount
            pick {
              createdAt
              member {
                id
                customId
                name
                avatar
              }
            }
            commentCount
            comment {
              id
              content
              state
              published_date
              createdAt
              member {
                id
                customId
                name
                avatar
              }
            }
          }
        }
      }
      pick {
        id
        story {
          id
        }
      }
    }
  }
`
