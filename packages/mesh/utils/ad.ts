import { ADSENSE_UNITS, GPT_AD_NETWORK } from '@/constants/ad'

import { getTailwindConfig } from './tailwind'

const tailwindFullConfig = getTailwindConfig()
const breakpoints = tailwindFullConfig?.theme?.screens

function getDevice(width: number): 'PC' | 'MB' {
  const isDesktopWidth = width >= parseInt(breakpoints?.lg)
  return isDesktopWidth ? 'PC' : 'MB'
}

export function getAdUnitPath(adUnit: string): string {
  return `/${GPT_AD_NETWORK}/${adUnit}`
}

export function getAdWidth(adSize: [number, number][]): string {
  const widthMax = adSize?.reduce((acc, curr) => Math.max(curr[0], acc), 0)
  return widthMax ? `${widthMax}px` : '0px'
}

// Generate full key like 'PC_HD' if the component support dynamic device adKey like 'HD'
export function getAdFullKey(adKey: string, width: number): string {
  const device = getDevice(width)
  return adKey.includes('_') ? adKey : `${device}_${adKey}`
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
