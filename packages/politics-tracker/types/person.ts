import type {
  Override,
  RawElection,
  RawElectionArea,
  RawPerson,
  RawPersonElection,
  RawTag,
} from './common'

type PDT = Pick<RawTag, 'id' | 'name'>
export type PersonData = Override<
  Pick<
    RawPerson,
    | 'id'
    | 'name'
    | 'image'
    | 'alternative'
    | 'other_names'
    | 'biography'
    | 'birth_date_year'
    | 'birth_date_month'
    | 'birth_date_day'
    | 'death_date_year'
    | 'death_date_month'
    | 'death_date_day'
    | 'gender'
    | 'national_identity'
    | 'email'
    | 'contact_details'
    | 'links'
    | 'source'
    | 'status'
    | 'tags'
  >,
  { tags: PDT[] }
>

type PEDP = Pick<RawPerson, 'id' | 'name'>
type PEDE = Pick<RawElection, 'id' | 'name' | 'election_year_year' | 'type'>
type PEDEA = Pick<RawElectionArea, 'id' | 'name' | 'city'>
export type PersonElectionData = Override<
  Pick<
    RawPersonElection,
    'id' | 'person_id' | 'election' | 'electoral_district'
  >,
  {
    person_id: PEDP | null
    election: PEDE | null
    electoral_district: PEDEA | null
  }
>

export type PageProps = {
  personData: PersonData
  personElectionsData: PersonElectionData[]
}
