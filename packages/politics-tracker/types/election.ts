import type {
  Override,
  RawElection,
  RawElectionArea,
  RawPersonElection,
} from '~/types/common'

/** 選舉歷史資訊 */
export type ElectionLink = {
  /** 選區 */
  electionArea: string
  /** 選舉目的 */
  electionType: string
  /** 選舉名稱 */
  name: string
  /** 選舉年 */
  year: number
  /** 選舉月 */
  month: number
  /** 選舉日 */
  day: number
}

/** type for GetElection query */
export type ElectionData = Pick<
  RawElection,
  | 'id'
  | 'name'
  | 'type'
  | 'election_year_year'
  | 'election_year_month'
  | 'election_year_day'
>
