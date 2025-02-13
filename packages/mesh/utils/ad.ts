import { ADSENSE_UNITS } from '@/constants/ad'

import { getTailwindConfig } from './tailwind'

const tailwindFullConfig = getTailwindConfig()
const breakpoints = tailwindFullConfig?.theme?.screens

function getDevice(width: number): 'PC' | 'MB' {
  const isDesktopWidth = width >= parseInt(breakpoints?.lg)
  return isDesktopWidth ? 'PC' : 'MB'
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

export function getMinSize(input: number[] | number[][]): number[] {
  if (Array.isArray(input[0])) {
    return (input as number[][]).reduce((smallest, current) => {
      const [smallestWidth, smallestHeight] = smallest
      const [currentWidth, currentHeight] = current
      return currentWidth * currentHeight < smallestWidth * smallestHeight
        ? current
        : smallest
    })
  }
  return input as number[]
}
