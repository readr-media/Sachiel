export type Language = 'ch' | 'en'

export type Award = {
  id: string
  name: string
  name_en: string
  report: string
  report_en: string
  url?: string
  desc?: string
  desc_en?: string
  awardTime: string
}

export type RenderedAward = {
  id: string
  name: string
  report: string
  url?: string
  desc?: string
  awardTime: string
}
