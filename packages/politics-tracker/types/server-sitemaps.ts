import {
  Override,
  RawElection,
  RawElectionArea,
  RawOrganization,
  RawPerson,
  RawPolitic,
} from '~/types/common'

type EA = Pick<RawElectionArea, 'city'>
export type Election = Override<
  Pick<
    RawElection,
    'type' | 'election_year_year' | 'createdAt' | 'updatedAt' | 'electionArea'
  >,
  { electionArea: EA[] | null }
>

export type Person = Pick<RawPerson, 'id' | 'createdAt' | 'updatedAt'>

export type Politic = Pick<RawPolitic, 'id' | 'createdAt' | 'updatedAt'>

export type Party = Pick<RawOrganization, 'id' | 'createdAt' | 'updatedAt'>
