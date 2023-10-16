export type PoliticDetail = {
  content: string
  current_progress: string
  desc: string
  expertPoint: ExpertPoint[]
  id: string
  person: GenericPerson
  timeline: TimeLine[]
  source: string
  status: string
  updatedAt: string
  positionChange: PositionChange[]
  factCheck: FactCheck[]
  repeat: Repeat[]
  response: Response[]
  controversies: Controversy[]
}

//任期
export type PersonElectionTerm = {
  id: string
  start_date_day: string
  start_date_month: string
  start_date_year: string
  end_date_day: string
  end_date_month: string
  end_date_year: string
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
  title: string
}

//候選人回應
export type Response = {
  id: string
  content: string
  responseName: string
  responsePic: string
  responseTitle: string
  link: string
}

//相關進度
export type TimeLine = {
  content: string
  eventDate: string
  id: string
  link: string
}

//相關爭議
export type Controversy = {
  id: string
  link: string
  content: string
}

export type PoliticAmount = {
  waiting: number
  passed: number
}

export type FactCheckPartner = {
  id: string
  name: string
  slogo?: Logo //small logo for `politic-detail` page
}

export type Resized = {
  original: string
  w480: string
  w800: string
  w1200: string
  w1600: string
  w2400: string
}

export type Logo = {
  id: string
  resized: Resized
  resizedWebp: Resized
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
