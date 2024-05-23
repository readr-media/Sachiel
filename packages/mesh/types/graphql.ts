export type Member = {
  id: string
  customId: string
  name: string
  avatar: string
  pick: {
    id: string
    createdAt: string
    story: Story
    __typename: 'Pick'
  }[]
  __typename: 'Member'
}

export type Comment = {
  id: string
  createdAt: string
  content: string
  state: string
  published_date: string
  member: Member
  __typename: 'Comment'
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
    __typeName: 'Publisher'
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
  comment: Comment[]
  __typename: 'Story'
}

export type User = {
  id: string
  customId: string
  name: string
  avatar: string
  follower: Member[]
  followerCount: number
  following: Member[]
  pick: {
    id: string
    story: Story
    __typename: 'Pick'
  }[]
  __typename: 'Member'
}
