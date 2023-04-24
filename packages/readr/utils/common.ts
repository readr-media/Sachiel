import type { IncomingMessage, ServerResponse } from 'http'

import { GLOBAL_CACHE_SETTING } from '~/constants/environment-variables'

function isServer(): boolean {
  return typeof window === 'undefined'
}

function convertToStringList(arr: any[]): string {
  return arr.map((element) => `"${element}"`).join(',')
}

function setCacheControl(res: ServerResponse<IncomingMessage>): void {
  res.setHeader('Cache-Control', GLOBAL_CACHE_SETTING)
}

export { convertToStringList, isServer, setCacheControl }
