export type PoliticDetail = {
  id: string
  person: Person
  desc: string
  content: string
  source: string
  status: string
  progress: Array<Object>
  timeline: Array<Object>
  expertPoint: Array<Object>
  dispute: string
}

export type Person = {
  id: string
  electoral_district: ElectoralDistrict
  party: Party
  election: Election
  person_id: PersonId
  votes_obtained_number: string
  elected: Boolean
  incumbent: Boolean
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
}

export type PersonId = {
  id: string
  name: string
  image: string
}
