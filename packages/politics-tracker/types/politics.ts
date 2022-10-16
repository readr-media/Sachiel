export type PersonOverview = {
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
  error?: string
}

export type PersonElection = {
  electionId: string
  id: string
  party: string
  partyIcon: string
  name: string
  year: number
  month: number
  day: number
  politics: Politic[]
}
