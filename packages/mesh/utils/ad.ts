import { ADSENSE_UNITS } from '@/constants/ad'

import { getTailwindConfig } from './tailwind'

const tailwindFullConfig = getTailwindConfig()
const breakpoints = tailwindFullConfig?.theme?.screens

function getDevice(width: number): 'PC' | 'MB' {
  const isDesktopWidth = width >= parseInt(breakpoints?.lg)
  return isDesktopWidth ? 'PC' : 'MB'
}

// Generate full key like 'PC_HD' if the component support dynamic device adKey like 'HD'
function getAdFullKey(device: 'PC' | 'MB', adKey: string): string {
  return adKey.includes('_') ? adKey : `${device}_${adKey}`
}

function getAdData(pageKey: string, adKey: string, width: number) {
  const device = getDevice(width)
  const adFullKey = getAdFullKey(device, adKey)
  const adData = ADSENSE_UNITS[pageKey]?.[adFullKey]
  if (!adData) {
    console.error(
      `Unable to find the AD data. Got the pageKey "${pageKey}" and adKey "${adFullKey}". Please provide a valid pageKey or adKey.`
    )
  }
  return adData
}

export function getAdParam(pageKey: string, adKey: string, width: number) {
  const adData = getAdData(pageKey, adKey, width)
  if (!adData) {
    return
  }
  const { adSlot, adSize, adUnit } = adData
  return { adSlot, adSize, adUnit }
}

export function getAdParamBySlot(adSlot: string) {
  for (const [, pageUnits] of Object.entries(ADSENSE_UNITS)) {
    for (const [, unit] of Object.entries(pageUnits)) {
      if (unit.adSlot === adSlot) {
        return { adUnit: unit.adUnit, adSize: unit.adSize, adSlot }
      }
    }
  }
  return null
}
