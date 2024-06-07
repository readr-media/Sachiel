import { gql } from '@apollo/client'

const STORY_FRAGMENT = gql`
  fragment StoryFragment on Story {
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
        name
        avatar
      }
    }
  }
`

export const GET_USER_FOLLOWING = gql`
  query GetUserFollowing($memberId: ID!, $takes: Int!) {
    member(where: { id: $memberId }) {
      id
      name
      avatar
      following {
        id
        name
        avatar
        following(
          where: { verified: { equals: false } }
          orderBy: { id: asc }
          take: 10000
        ) {
          id
          name
          avatar
          followerCount
        }
        pick(orderBy: { createdAt: desc }, take: $takes) {
          id
          createdAt
          story {
            ...StoryFragment
          }
        }
        comment(orderBy: { createdAt: desc }, take: $takes) {
          id
          createdAt
          story {
            ...StoryFragment
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
  ${STORY_FRAGMENT}
`

export type Member = {
  id: string
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
  following: {
    id: string
    name: string
    avatar: string
    followerCount: number
  }[]
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
  takes: number
}

export type GetUserFollowingResponse = {
  member: {
    id: string
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
