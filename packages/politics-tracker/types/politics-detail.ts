export type PoliticDetail = {
  content: string
  current_progress: string
  desc: string
  dispute: string
  expertPoint: ExpertPoint[]
  id: string
  person: GenericPerson
  timeline: TimeLine[]
  source: string
  status: string
  positionChange: PositionChange[]
}

//立場改變
export type PositionChange = {
  content: string
  checkDate: string
  id: string
  link: string
  isChanged: boolean
  factcheckPartner: FactCheckPartner | null
}

//相似政見
export type Repeat = {
  id: string
  checkResultType: boolean
  content: string
  link: string
  contributer: string
  factcheckPartner: FactCheckPartner | null
}

//事實查核
export type FactCheck = {
  id: string
  checkResultType: 'correct' | 'incorrect' | 'partial'
  content: string
  link: string
  factcheckPartner: FactCheckPartner | null
}

//專家看點
export type ExpertPoint = {
  avatar: string
  content: string
  contributer: string
  expert: string
  id: string
  link: string
  reviewData: string
  title: string
}

//相關進度
export type TimeLine = {
  content: string
  eventData: string
  id: string
  link: string
}

export type PoliticAmount = {
  waiting: number
  passed: number
}

export type FactCheckPartner = {
  id: string
  name: string
  sLogo?: string //small logo for `politic-detail` page
}

export type GenericPerson = {
  id: string
  electoral_district: ElectoralDistrict
  party: Party
  election: Election
  person_id: PersonId
  votes_obtained_number: string
  votes_obtained_percentage: string
  elected: boolean
  incumbent: boolean
}

export type ElectoralDistrict = {
  id: string
  name: string
}

export type Party = {
  name: string
  image: string
}

export type Election = {
  name: string
  type: string
  level: string
  status: string
  election_year_year: string
  election_year_month: string
  election_year_day: string
}

export type PersonId = {
  id: string
  name: string
  image: string
}
