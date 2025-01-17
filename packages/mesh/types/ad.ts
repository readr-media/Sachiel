type AdsenseParam = {
  adSlot: string
  adSize: [number, number]
  adUnit: string
}

export type AdsenseUnits = {
  [pageType: string]: {
    [unitName: string]: AdsenseParam
  }
}
