import type { withKeyObject } from './common'

export type Candidate = {
  id?: string
  name: string
  year: number
  done: number
}

export type PersonData = Candidate & {
  type: string
  areaId: string
  areaName: string
  areaCity: string
}

export type AreaOfCouncilorElection = {
  id?: string
  order: number
  city: string
  name: string
  done: number
  total: number
  candidates: Candidate[]
}

export type CityOfCouncilorElection = {
  id?: string
  name: string
  amount: number
  total: number
  areas: AreaOfCouncilorElection[]
}

export type AreaOfMayorElection = Pick<
  AreaOfCouncilorElection,
  'id' | 'city' | 'name' | 'done' | 'total' | 'candidates'
>

export type CityOfMayorElection = Pick<
  CityOfCouncilorElection,
  'id' | 'name' | 'amount' | 'total'
> & { areas: AreaOfMayorElection[] }

export type DistrinctOfMayorElection = {
  key: string
  name: string
  amount: number
  total: number
  areas: AreaOfMayorElection[]
}

export type PropsData = {
  totalCandidatesOfMayor: number
  totalCandidatesOfcouncilor: number
  mayorAndPolitics: DistrinctOfMayorElection[]
  councilorAndPolitics: CityOfCouncilorElection[]
}

// following should be removed if all .js is tranferred into .ts

export type withKeyPersonData = withKeyObject<PersonData>

export type withKeyAreaOfCouncilorElection =
  withKeyObject<AreaOfCouncilorElection>

export type withKeyCityOfCouncilorElection =
  withKeyObject<CityOfCouncilorElection>

export type witKeyAreaOfMayorElection = withKeyObject<AreaOfMayorElection>

export type withKeyDistrinctOfMayorElection =
  withKeyObject<DistrinctOfMayorElection>

export type withNumber = withKeyObject<number>
export type withString = withKeyObject<string>
