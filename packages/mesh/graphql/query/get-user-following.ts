import { gql } from '@apollo/client'

export const GetUserFollowing = gql`
  query GetUserFollowing($memberId: ID!, $picksTake: Int!) {
    member(where: { id: $memberId }) {
      id
      customId
      name
      avatar
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
            title
            og_image
            og_description
            source {
              title
              createdAt
            }
            published_date
            paywall
            full_screen_ad
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
        comment(orderBy: { createdAt: desc }, take: $picksTake) {
          id
          createdAt
          story {
            id
            url
            title
            og_image
            og_description
            source {
              customId
              createdAt
            }
            published_date
            paywall
            full_screen_ad
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

export type Member = {
  id: string
  customId: string
  name: string
  avatar: string
}

export type Story = {
  id: string
  url: string
  title: string
  og_image: string
  og_description: string
  source: {
    title: string
    createdAt: string
  }
  published_date: string
  paywall: boolean
  full_screen_ad: string
  pickCount: number
  pick: {
    createdAt: string
    member: Member
    __typename: 'Pick'
  }[]
  commentCount: number
  comment: {
    id: string
    content: string
    state: string
    published_date: string
    createdAt: string
    member: Member
    __typename: 'Comment'
  }[]
}

export type Following = {
  id: string
  name: string
  avatar: string
  pick: {
    id: string
    createdAt: string
    story: Story
  }[]
  comment: {
    id: string
    createdAt: string
    story: Story
  }[]
}

export type GetUserFollowingRequest = {
  memberId: string
  picksTake: number
}

export type GetUserFollowingResponse = {
  member: {
    id: string
    customId: string
    name: string
    avatar: string
    following: Following[]
    pick: {
      id: string
      story: {
        id: string
      }
    }[]
  }
}
