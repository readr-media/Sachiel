import type {
  Override,
  RawElection,
  RawElectionArea,
  RawPerson,
  RawPersonElection,
  RawTag,
} from './common'

/** type for GetPersonBasicInfo query */
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
  { tags: Pick<RawTag, 'id' | 'name'>[] }
>

/** type for GetPersonElections query */
export type PersonElectionData = Override<
  Pick<
    RawPersonElection,
    'id' | 'person_id' | 'election' | 'electoral_district'
  >,
  {
    person_id: Pick<RawPerson, 'id' | 'name'> | null
    election: Pick<
      RawElection,
      'id' | 'name' | 'election_year_year' | 'type'
    > | null
    electoral_district: Pick<RawElectionArea, 'id' | 'name' | 'city'> | null
  }
>
