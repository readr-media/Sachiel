type PersonType = {
  id: string
  name: string
  alternative?: string
  other_names?: string
  image: string | null
  gender: string | null
  biography: string
  birth_date_year: number | null
  birth_date_month: number | null
  birth_date_day: number | null
  death_date_year: number | null
  death_date_month: number | null
  death_date_day: number | null
  national_identity: string | null
  email: string | null
  contact_details: string | null
  links?: string
  source: string
}

export const Person: PersonType | Record<string, never> = {}
