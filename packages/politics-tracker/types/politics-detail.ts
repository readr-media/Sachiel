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

export type PoliticAmount = {
  waiting: number
  passed: number
}

export type FactCheckPartner = {
  id: string
  name: string
}

export type PositionChange = {
  content: string
  checkDate: string
  id: string
  link: string
  isChanged: boolean
  factcheckPartner: FactCheckPartner
}

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

export type TimeLine = {
  content: string
  eventData: string
  id: string
  link: string
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
