import gql from 'graphql-tag'

export type Award = {
  id: string
  name: string
  name_en: string
  report: string
  report_en: string
  url?: string
  desc?: string
  desc_en?: string
  awardTime: string
}

const awards = gql`
  query {
    awards(orderBy: { awardTime: desc }) {
      id
      name
      name_en
      report
      report_en
      url
      desc
      desc_en
      awardTime
    }
  }
`

export { awards }
