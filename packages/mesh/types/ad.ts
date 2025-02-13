type AdsenseParam = {
  adSlot: string
  adSize: [number, number]
  adUnit: string
}

type GptParam = {
  adSlot: string
  adSize: [number, number] | [number, number][]
  adUnit: string
}

export type AdsenseUnits = {
  [pageType: string]: {
    [unitName: string]: AdsenseParam
  }
}

export type GamUnits = {
  [pageType: string]: {
    [unitName: string]: GptParam
  }
}
