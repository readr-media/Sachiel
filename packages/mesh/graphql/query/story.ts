import { gql } from '@apollo/client'

export type Story = {
  id: string
  title: string
  summary: string
  source: {
    title: string
  }
  og_image: string
}

export type LatestStories = {
  stories: Story[]
}

export type MostPickedStory = {
  story: Story
}

const story = gql`
  fragment story on Story {
    id
    title
    summary
    og_image
    source {
      title
    }
  }
`

export const GET_LATEST_STORIES = gql`
  ${story}
  query GetLatestStories {
    stories(take: 20, orderBy: { published_date: desc }) {
      ...story
    }
  }
`

export const GET_MOST_PICKED_STORY = gql`
  ${story}
  query GetMostPickedStory {
    story(where: { id: "1175202" }) {
      ...story
    }
  }
`
