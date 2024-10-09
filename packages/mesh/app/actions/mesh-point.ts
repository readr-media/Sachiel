'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { fetchRestfulGet } from '@/utils/fetch-restful'

export async function getMeshPointBalance(address: string) {
  const url = RESTFUL_ENDPOINTS.paymentBalance + address
  return await fetchRestfulGet<{ balance: number }>(url)
}
