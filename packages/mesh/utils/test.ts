'use server'
import { z } from 'zod'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import type { DailyStory } from '@/types/homepage'

import { rawDailyHighlightSchema } from './data-schema'

async function fetchDailyHighlightGroupClient(): Promise<DailyStory[] | null> {
  const schema = z.array(rawDailyHighlightSchema)

  try {
    const response = await fetch(STATIC_FILE_ENDPOINTS.dailyHighlightGroup)
    const result = schema.parse(response)
    return result
  } catch (err) {
    console.error('Error fetching daily highlight group:', err)
    return null
  }
}

export { fetchDailyHighlightGroupClient }
