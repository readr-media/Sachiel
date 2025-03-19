'use server'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import {
  type GetPublisherPodcastQuery,
  GetPublisherPodcastDocument,
  GetPublisherPodcastListDocument,
} from '@/graphql/__generated__/graphql'
import {
  type MostSponsorPublisher,
  mostSponsorPublishersSchema,
} from '@/utils/data-schema'
import queryGraphQL from '@/utils/fetch-graphql'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

type PublisherPodcastQueryResponse = NonNullable<
  GetPublisherPodcastQuery['stories']
>
export type PublisherStories = Omit<
  PublisherPodcastQueryResponse[number],
  'source'
>
type PublisherPodcastData = {
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

  let responseData: MostSponsorPublisher[] | PublisherPodcastData[] = []

  try {
    if (slug === 'podcast') {
      //TODO: fetch JSON
      const publisherPodcastList = await queryGraphQL(
        GetPublisherPodcastListDocument
      )
      const publisherIds = publisherPodcastList?.publishers?.map((p) => p.id)

      const res = await queryGraphQL(GetPublisherPodcastDocument, {
        publisherIds,
      })

      const convertData = res?.stories?.reduce((acc, curr) => {
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
            stories: [{ ...rest }],
          })
        }
        entry?.stories.push({
          ...rest,
        })

        return acc
      }, [] as PublisherPodcastData[])

      responseData = convertData ?? []
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
