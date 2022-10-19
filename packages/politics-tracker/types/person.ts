export type Person = {
  id: string
  name: string
  alternative: string
  other_names: string
  image: string
  gender: string
  biography: string
  birth_date_year: any
  birth_date_month: number | null
  birth_date_day: number | null
  death_date_year: number | null
  death_date_month: number | null
  death_date_day: number | null
  national_identity: string
  email: string
  contact_details: string
  links: string
  source: string
  tags: Tag[] | []
}

type Tag = {
  id: string
  name: string
}
