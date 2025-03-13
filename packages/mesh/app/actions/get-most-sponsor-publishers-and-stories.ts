'use server'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import {
  type GetPublisherAndPodcastQuery,
  GetPublisherAndPodcastDocument,
  GetPublisherPodcastListDocument,
} from '@/graphql/__generated__/graphql'
import {
  type MostSponsorPublisher,
  mostSponsorPublishersSchema,
} from '@/utils/data-schema'
import queryGraphQL from '@/utils/fetch-graphql'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

type PublisherAndPodcastQueryResponse = NonNullable<
  GetPublisherAndPodcastQuery['stories']
>
export type PublisherStories = Omit<
  PublisherAndPodcastQueryResponse[number],
  'source'
>
type PublisherAndPodcastData = {
  publisher: {
    id: string
    customId: string
    title: string
    logo: string
    sponsorCount: number
  }
  stories: PublisherStories[]
}
export default async function getMostSponsorPublishersAndStories({
  slug,
  displayPublisherCount,
  displayPublisherStoriesCount,
}: {
  slug: string
  displayPublisherCount: number
  displayPublisherStoriesCount: number
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  let responseData: MostSponsorPublisher[] | PublisherAndPodcastData[] = []

  try {
    if (slug === 'podcast') {
      const publisherList = await queryGraphQL(GetPublisherPodcastListDocument)
      const publisherIds = publisherList?.publishers?.map((p) => p.id)
      const res = await queryGraphQL(GetPublisherAndPodcastDocument, {
        publisherId: publisherIds,
      })
      const temp = res?.stories?.reduce((acc, curr) => {
        const { source, ...rest } = curr
        if (!source) return acc
        const entry = acc.find((e) => e.publisher.id === source.id)
        if (!entry) {
          acc.push({
            publisher: {
              id: source.id,
              customId: source.customId ?? '',
              title: source.title ?? '',
              logo: source.logo ?? '',
              sponsorCount: source.sponsoredCount ?? 0,
            },
            stories: [],
          })
        }
        entry?.stories.push({
          ...rest,
        })

        return acc
      }, [] as PublisherAndPodcastData[])
      responseData = temp ?? []
    } else {
      const response = await fetchStatic<MostSponsorPublisher[]>(
        STATIC_FILE_ENDPOINTS.mostSponsorPublishers,
        {
          next: { revalidate: 10 },
        },
        globalLogFields
      )
      const parsed = mostSponsorPublishersSchema.parse(response)
      responseData = parsed
    }
    const slicedData = responseData
      .slice(0, displayPublisherCount)
      .map((data) => ({
        publisher: data.publisher,
        stories: data.stories.slice(0, displayPublisherStoriesCount),
      }))

    return slicedData
  } catch (error) {
    logServerSideError(
      error,
      'Error on validate most_recommend_sponsors.json',
      globalLogFields
    )
    return null
  }
}
