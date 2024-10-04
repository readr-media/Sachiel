'use server'

import { z } from 'zod'

import { RESTFUL_ENDPOINTS, STATIC_FILE_ENDPOINTS } from '@/constants/config'
import { fetchRestfulGet } from '@/utils/fetch-restful'
import fetchStatic from '@/utils/fetch-static'

const MongoDBResponseSchema = z.object({
  members: z.array(
    z.object({
      id: z.string(),
      followerCount: z.number(),
      name: z.string(),
      nickname: z.string(),
      customId: z.string(),
      avatar: z.string(),
      from: z.object({
        id: z.string(),
        name: z.string(),
        nickname: z.string(),
      }),
    })
  ),
  stories: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      publisher: z.object({
        id: z.string(),
        customId: z.string(),
        title: z.string(),
      }),
      published_date: z.string(),
      og_title: z.string(),
      og_image: z.string(),
      full_screen_ad: z.enum(['none', 'all', 'mobile', 'desktop']),
      isMember: z.boolean(),
      readCount: z.number(),
      commentCount: z.number(),
      following_actions: z.array(
        z.object({
          kind: z.enum(['read', 'comment']),
          member: z.object({
            id: z.string(),
            name: z.string(),
            nickname: z.string(),
            customId: z.string(),
            avatar: z.string(),
          }),
          createdAt: z.string().datetime(),
          content: z.string().optional(),
        })
      ),
    })
  ),
})

export type MongoDBResponse = z.infer<typeof MongoDBResponseSchema>

export async function getSocialPageData(memberId: string) {
  const url = RESTFUL_ENDPOINTS.socialPage + memberId
  const data = await fetchRestfulGet<MongoDBResponse>(url)
  const parseResult = MongoDBResponseSchema.safeParse(data)
  if (parseResult.success) {
    return parseResult.data
  } else {
    console.error('Validation error:', parseResult.error.errors)
    return null
  }
}

const mostFollowersMemberSchema = z.array(
  z.object({
    id: z.number().transform((id) => `${id}`),
    followerCount: z.number(),
    name: z.string(),
    nickname: z.string(),
    customId: z.string(),
    avatar: z.string().url().or(z.literal('')),
  })
)
export type MostFollowersMember = z.infer<
  typeof mostFollowersMemberSchema
>[number]

export async function getMostFollowersData() {
  const data = await fetchStatic<MostFollowersMember[]>(
    STATIC_FILE_ENDPOINTS.mostFollowers,
    {
      next: { revalidate: 10 },
    }
  )
  const parseResult = mostFollowersMemberSchema.safeParse(data)
  if (parseResult.success) {
    return parseResult.data
  } else {
    console.error('Validation error:', parseResult.error.errors)
    return null
  }
}
