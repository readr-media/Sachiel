export type Politic = {
  id?: string
  desc: string
  source: string
  error?: string
}

export type PersonElection = {
  id: string
  name: string
  year: string
  month: string
  day: string
  politics: Politic[]
}
