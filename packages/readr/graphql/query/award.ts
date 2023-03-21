import gql from 'graphql-tag'

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
