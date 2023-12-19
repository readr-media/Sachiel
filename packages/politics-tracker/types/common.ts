import type { Option } from '@readr-media/react-feedback/dist/typedef'
import type { LinkProps } from 'next/link'

import { POLITIC_PROGRESS } from '~/constants/common'

export type LinkHref = LinkProps['href']

/** generic type for GraphQL response */
export type GenericGQLData<T, U extends string> = {
  /** 資料 */
  data?: Record<U, T>
  /** 錯誤 */
  errors: any[]
}

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | Array<JSONValue>

export type StatusOptionsA = 'active' | 'deactive'

export type StatusOptionsB = 'verified' | 'notverified'

/** 來源 */
export type Source = {
  id: string
  /** 內容 */
  value: string
  /** 錯誤 */
  error: string
}

/** generic type for sort function */
export type OrderFunction<T> = (
  /* eslint-disable no-unused-vars */ datas: T[]
) => T[]

// prettier-ignore
/** This utility is for overwriting type without extending it */
export type Override<T, U extends Partial<Record<keyof T, unknown>>> = Omit<T, keyof U> & U

export type ExtendedOption = Option & { sortOrder: number }
export type FormConfig = Record<'formId' | 'fieldId', string>
export type FeedbackFormConfig = Record<'emoji' | 'text', FormConfig>

/** Make members of type to be nonullable */
export type NotNullableAllMemberOfType<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

//--- Following types should be related to data sources ---//

/** 各尺寸圖片 */
export type RawResizedImages = {
  /** 原圖網址 */
  original: string
}

/** 圖片 */
export type RawPhoto = {
  id: string
  /** 標題 */
  name: string
  resized: RawResizedImages
  urlOriginal: string
}

/** 標籤 */
export type RawTag = {
  id: string
  /** 標籤名稱 */
  name: string
  /** 前言 */
  brief: string
  /** FB分享標題 */
  ogTitle: string
  /** FB分享說明 */
  ogDescription: string
  /** 置頂 */
  isFeatured: boolean
}

/** 選區 */
export type RawElectionArea = {
  id: string
  /** 選舉區名稱 */
  name: string
  /** 城市 */
  city: string
  description: string
  status: StatusOptionsA
}

/** 選舉 */
export type RawElection = {
  id: string
  name: string
  description: string
  /** 選舉年 */
  election_year_year: number
  /** 選舉月 */
  election_year_month: number
  /** 選舉日 */
  election_year_day: number
  /** 選舉層級 */
  level: string
  /** 選舉目的（種類） */
  type: string
  /** 登記日期 */
  register_date: string
  /** 位置 */
  location: string
  electionArea: RawElectionArea[]
  status: StatusOptionsA
  /** 隱藏政見細節 */
  hidePoliticDetail: string
  /** 開放留言（心情） */
  addComments: boolean
  createdAt: string
  updatedAt: string
}

/** 人物 */
export type RawPerson = {
  id: string
  /** 姓名 */
  name: string
  /** 別名 */
  alternative: string | null
  /** 舊名 */
  other_names: string | null
  email: string | null
  gender: string
  /** 出生年 */
  birth_date_year: number | null
  /** 出生月 */
  birth_date_month: number | null
  /** 出生日 */
  birth_date_day: number | null
  /** 死亡年 */
  death_date_year: number | null
  /** 死亡月 */
  death_date_month: number | null
  /** 死亡日 */
  death_date_day: number | null
  /** 大頭照 */
  image: string | null
  /** 一句話描寫這個人 */
  summary: string | null
  /** 詳細生平 */
  biography: string | null
  national_identity: string | null
  contact_details: string | null
  links: string | null
  source: string | null
  status: StatusOptionsB
  /** 補充資料 */
  thread_parent: RawPerson | null
  /** 標籤 */
  tags: RawTag[]
  createdAt: string
  updatedAt: string
}

/** 組織 */
export type RawOrganization = {
  id: string
  /** 組織名稱 */
  name: string
  /** 組織別名 */
  alternative: string | null
  /** 組織舊名 */
  other_names: string | null
  /** 統一編號 */
  identifiers: string | null
  /** 組織類型 */
  classification: string
  /** 一句話描述該組織 */
  abstract: string | null
  /** 組織詳細介紹 */
  description: string | null
  /** 組織成立年 */
  founding_date_year: number | null
  /** 組織成立月 */
  founding_date_month: number | null
  /** 組織成立日 */
  founding_date_day: number | null
  /** 組織解散年 */
  dissolution_date_year: number | null
  /** 組織解散月 */
  dissolution_date_month: number | null
  /** 組織解散日 */
  dissolution_date_day: number | null
  /** 圖像 */
  image: string | null
  contact_details: string | null
  links: string | null
  /** 組織稅籍登記地址 */
  address: string | null
  source: string | null
  status: StatusOptionsB
  /** 標籤 */
  tags: RawTag[]
  reviewed: boolean
  createdAt: string
  updatedAt: string
}

/** 人物 - 選舉關係 */
export type RawPersonElection = {
  id: string
  name: string
  /** 人物 */
  person_id: RawPerson | null
  /** 選舉 */
  election: RawElection | null
  /** 搭配主要候選人 */
  mainCandidate: RawPersonElection | null
  /** 推薦政黨 */
  party: RawOrganization | null
  /** 不分區立委排序 */
  legislatoratlarge_number: number | null
  /** 號次 */
  number: string
  /** 選區 */
  electoral_district: RawElectionArea | null
  /** 得票數 */
  votes_obtained_number: string
  /** 得票率 */
  votes_obtained_percentage: string
  elected: boolean
  /** 是否現任 */
  incumbent: boolean
  /** 資料來源 */
  source: string
  /** 政見資料來源 */
  politicSource: string
}

/** 組織 - 選舉關係 */
export type RawOrganizationElection = {
  id: string
  /** 組織名稱 */
  organization_id: RawOrganization | null
  /** 選舉 */
  elections: RawElection | null
  /** 號次 */
  number: string
  /** 得票數 */
  votes_obtained_number: string
  source: string
  /** 選舉年 */
  election_year_year: number
  /** 選舉月 */
  election_year_month: number
  /** 選舉日 */
  election_year_day: number
  /** 分配席次 */
  seats: string
  /** 政見 */
  politics: RawPolitic[]
}

/** 政見 */
export type RawPolitic = {
  id: string
  /** 候選人 - 選舉關係 */
  person: RawPersonElection | null
  /** 政黨 - 選舉關係 */
  organization: RawOrganizationElection | null
  /** 政見 */
  desc: string
  /** 政策補充說明 */
  content: string
  source: string
  /** 資料提供 */
  contributer: string
  /** 政見進度 */
  current_progress: `${POLITIC_PROGRESS}`
  status: StatusOptionsB
  checked: boolean
  reviewed: Boolean
  /** 修改備註 */
  thread_parent: RawPolitic | null
  /** 類別 */
  politicCategory: RawPoliticCategory | null
  /** 修改備註 */
  changeLog: string
  /** 立場變化 */
  positionChange: RawPoliticPositionChange[]
  /** 事實查核 */
  factCheck: RawFactCheck[]
  /** 重複政見 */
  repeat: RawPoliticRepeat[]
  /** 爭議內容 */
  controversies: RawPoliticControversy[]
  /** 專家觀點 */
  expertPoint: RawExpertPoint[]
  /** 政見回應 */
  response: RawPoliticResponse[]
  /** 時間軸 */
  timeline: RawPoliticTimeline[]
  createdAt: string
  updatedAt: string
}

/** 政見類別 */
export type RawPoliticCategory = {
  id: string
  politics: RawPolitic[]
  /** 標籤名稱 */
  name: string
  /** 前言 */
  brief: string
  /** 頁面色碼 */
  displayColor: string
  /** FB 分享標題 */
  ogTitle: string
  /** FB 分享說明 */
  ogDescription: string
  /** 置頂 */
  isFeatured: boolean
}

/** 政見立場變化 */
export type RawPoliticPositionChange = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic[]
  /** 立場變化（摘要） */
  positionChangeSummary: string
  /** 立場改變 */
  isChanged: string
  /** 查核內容 */
  content: string
  checkDate: string
  /** 相關連結 */
  link: string
  /** 查核單位 */
  factcheckPartner: RawFactCheckPartner | null
}

/** 政見事實查核 */
export type RawFactCheck = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic[]
  /** 事實查核（摘要） */
  factCheckSummary: string
  /** 查核結果 */
  checkResultType: string
  /** 查核結果（其他） */
  checkResultOther: string
  /** 查核內容 */
  content: string
  /** 相關連結 */
  link: string
  /** 查核單位 */
  factcheckPartner: RawFactCheckPartner | null
}

/** 重複政見 */
export type RawPoliticRepeat = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic[]
  /** 重複政見（摘要） */
  repeatSummary: string
  /** 重複內容 */
  content: string
  /** 相關連結 */
  link: string
  /** 資料提供 */
  contributer: string
  /** 查核單位 */
  factcheckPartner: RawFactCheckPartner | null
}

/** 政見爭議內容 */
export type RawPoliticControversy = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic[]
  /** 爭議內容 */
  content: string
  /** 相關連結 */
  link: string
  /** 查核單位 */
  factcheckPartner: RawFactCheckPartner | null
}

/** 查核單位 */
export type RawFactCheckPartner = {
  id: string
  /** 組織名稱 */
  name: string
  /** 合作形式 */
  type: string
  /** 網站網址 */
  webUrl: string
  /** 大 Logo 網址（for landing page） */
  logo: RawPhoto | null
  /** 小 Logo 網址（for politic page） */
  slogo: RawPhoto | null
  /** 年份 */
  year: string
  positionChange: RawPoliticPositionChange[]
  factCheck: RawFactCheck[]
  repeat: RawPoliticRepeat[]
}

/** 專家觀點 */
export type RawExpertPoint = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic
  /** 專家觀點（摘要） */
  expertPointSummary: string
  /** 專家姓名 */
  expert: string
  /** 頭像連結 */
  avatar: string
  /** 意見內容 */
  content: string
  /** 連結 */
  link: string
  /** 職稱 */
  title: string
  /** 資料提供 */
  contributer: string
}

/** 候選人回應 */
export type RawPoliticResponse = {
  id: string
  /** 政見 */
  politic: RawPolitic[]
  editingPolitic: RawPolitic[]
  /** 回應者姓名 */
  responseName: string
  /** 回應者頭像 */
  responsePic: string
  /** 回應者身分 */
  responseTitle: string
  /** 回應內容 */
  content: string
  /** 相關連結 */
  link: string
}

/** 政見進度 */
export type RawPoliticTimeline = {
  id: string
  politic: RawPolitic[]
  editingPolitic: RawPolitic[]
  /** 日期 */
  eventDate: string
  /** 排序 */
  sortOrder: number
  /** 文字 */
  content: string
  /** 連結 */
  link: string
  /** 資料提供 */
  contributer: string
}

/** 人物 - 組織關係 */
export type RawPersonOrganization = {
  id: string
  /** 姓名 */
  person_id: RawPerson | null
  /** 開始年 */
  start_date_day: number | null
  /** 開始月 */
  start_date_month: number | null
  /** 開始日 */
  start_date_year: number | null
  /** 結束年 */
  end_date_day: number | null
  /** 結束月 */
  end_date_month: number | null
  /** 結束日 */
  end_date_year: number | null
  /** 組織名稱 */
  organization_id: RawOrganization | null
}
