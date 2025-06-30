/**
 * Source mappings configuration for product ID to source information conversion
 */

export interface SourceInfo {
  id: string
  customId: string
  title: string
  is_active: boolean
}

export const SOURCE_MAPPINGS: Record<string, SourceInfo> = {
  mirrormedia: {
    id: 'mirrormedia',
    customId: 'mirrormedia',
    title: '鏡週刊 Mirror Media',
    is_active: true,
  },
  mnews: {
    id: 'mnews',
    customId: 'mnews',
    title: '鏡新聞',
    is_active: true,
  },
  mirrordaily: {
    id: 'mirrordaily',
    customId: 'mirrordaily',
    title: '鏡報',
    is_active: true,
  },
} as const

export const DEFAULT_SOURCE: SourceInfo = {
  id: 'readr',
  customId: 'readr',
  title: 'READr Mesh 讀選',
  is_active: true,
}

/**
 * Extract source information from product ID
 */
export const getSourceFromProductId = (productId: string): SourceInfo => {
  const sourceKey = productId.split('_').at(0)
  return (
    SOURCE_MAPPINGS[sourceKey as keyof typeof SOURCE_MAPPINGS] || DEFAULT_SOURCE
  )
}
