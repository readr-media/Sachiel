'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { GetAnnouncementsDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'
import {
  type NotificationResponse,
  notificationResponseSchema,
} from '@/utils/notification-schema'

export type NotificationData = Awaited<ReturnType<typeof getNotification>>
export async function getNotification({
  member_id,
  index,
  take,
}: {
  member_id: string
  index: number
  take: number
}) {
  const data = await fetchRestfulPost<NotificationResponse>(
    RESTFUL_ENDPOINTS.notifications,
    {
      member_id,
      index,
      take,
    },
    {
      cache: 'no-cache',
    }
  )

  const result = notificationResponseSchema.safeParse(data)

  if (result.success) {
    return result.data
  } else {
    logServerSideError(
      result.error.errors,
      'validate search result raw data errors'
    )
    return null
  }
}

export type AnnouncementData = Awaited<ReturnType<typeof getAnnouncement>>
export async function getAnnouncement() {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const data = await queryGraphQL(
    GetAnnouncementsDocument,
    undefined,
    globalLogFields
  )

  return data?.announcements
}

export async function readNotification(memberId: string) {
  const payload = {
    action: 'read_notify',
    memberId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to sent read_notify via pub/sub'
  )
}

export async function clickNotification({
  memberId,
  uuid,
}: {
  memberId: string
  uuid: string
}) {
  const payload = {
    action: 'click_notify',
    memberId,
    uuid,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to sent click_notify via pub/sub'
  )
}
