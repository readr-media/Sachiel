import { gql } from '@apollo/client'

import { getClient } from '@/apollo'

export const revalidate = 60

const fetchTest = gql`
  query fetchCategoryBySlug {
    allCategories(where: { slug: "nini_test_0410" }) {
      name
      slug
      ogDescription
    }
  }
`

export default async function Home() {
  const client = getClient()
  const data = await client.query({
    query: fetchTest,
    context: {
      fetchOptions: {
        next: { revalidate: 0 },
      },
    },
  })

  const title = data.data.allCategories[0].name
  return (
    <main className="text-wrap mt-4 text-3xl font-bold">
      Hello Mesh Title: {title}
    </main>
  )
}
