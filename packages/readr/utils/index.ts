import type { Category } from '~/graphql/query/category'

export function sortByTimeStamp(categories: Category[]) {
  return categories.sort((a, b) => {
    // sort by `sortOrder`
    if (a.sortOrder !== b.sortOrder) {
      const orderA = a.sortOrder || Number.MAX_SAFE_INTEGER
      const orderB = b.sortOrder || Number.MAX_SAFE_INTEGER
      return orderA - orderB
    }

    // if `sortOrder` is the same, then sort by `updatedAt` & `createdAt`.
    const dateA = new Date(a.updatedAt || a.createdAt || 0)
    const dateB = new Date(b.updatedAt || b.createdAt || 0)

    return Number(dateB) - Number(dateA)
  })
}
