type Member = { id: string; name: string; avatar: string }

type Source = { id: string; title: string; customId: string }

export type Story = {
  id: string
  url: string
  title: string
  published_date: string
  summary: string
  og_title: string
  og_image: string
  og_description: string
  full_content: boolean
  commentCount: number
  paywall: boolean
  full_screen_ad: string
  isMember: boolean
  pickCount: number
  picks: {
    createdAt?: string
    member: Member | null
  }[]
}

export type MostPickedStory = Story & { source: Source }

export type ReadrStory = Source & {
  stories: Story[]
}

export type DailyStory = Omit<
  Story,
  'isMember' | 'full_screen_ad' | 'summary'
> & {
  source: Source
  category?: {
    slug: string
  }
}

export type SponsoredStory = Source & {
  stories: Omit<Story, 'picks' | 'pickCount'>[]
  sponsoredCount: number
}
// TODO: null story
export type Comment = {
  member: Member
  id: string
  content: string
  likeCount: number
  story: {
    id: string
    title: string
    published_date: string
    source: Source
  } | null
}

export type Collector = {
  id: number
  name: string
  avatar: string
  nickname: string
  email: string
  pickCount: number
}

export type CategoryStory = Omit<Story, 'isMember' | 'pickCount'> & {
  picksCount: number
  category: {
    id: string
    slug: string
  }
  source: Omit<Source, 'customId'>
}
