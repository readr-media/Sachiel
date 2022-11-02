export type PersonOverview = {
  id: string
  name: string
  avatar: string
  party: string
  partyIcon: string
  campaign: string
  completed: number
  waiting: number
}

export type PoliticAmount = Pick<PersonOverview, 'waiting' | 'completed'>

export type Politic = {
  id?: string
  desc: string
  source: string
  content: string
  tagId: string | null
  tagName: string | null
  createdAt: string | null
  updatedAt: string | null
  error?: string
}

export type PersonElection = {
  electionArea: string
  electionType: string
  id: string
  party: string
  partyIcon: string
  name: string
  year: number
  month: number
  day: number
  source: string | null
  lastUpdate: string | null
  politics: Politic[]
  waitingPolitics: Politic[]
}
