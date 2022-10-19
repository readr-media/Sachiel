import type { PersonElection } from './politics'

export type ElectionLink = Pick<
  PersonElection,
  'electionArea' | 'electionType' | 'name' | 'year' | 'month' | 'day'
>
