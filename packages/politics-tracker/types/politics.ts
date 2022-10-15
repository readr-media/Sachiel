export type Politic = {
  id?: string
  desc: string
  source: string
  error?: string
}

export type PersonElection = {
  id: string
  party: string
  partyIcon: string
  name: string
  year: number
  month: number
  day: number
  politics: Politic[]
}
