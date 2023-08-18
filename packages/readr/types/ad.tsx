export type AdsenseParam = {
  adSlot: string
  adSize: number[]
  adUnit: string
}
export type AdsenseUnits = {
  [key: string]: {
    [key: string]: AdsenseParam
  }
}
