import type {
  CategoryOfJson,
  LegislatorCandidate,
  RegionLegislator,
} from '~/types/landing'

type RawCategories = {
  [key: string]: {
    id: string
    count: number
    displayColor: string
  }
}
function sortCategoriesByCount(categories: RawCategories) {
  return Object.keys(categories)
    .map((categoryName) => {
      const categoryInfo = categories[categoryName]
      return { name: categoryName, ...categoryInfo }
    })
    .sort((a, b) => b.count - a.count)
}

function getTopCategoryLists(categories: CategoryOfJson[]) {
  const topCategories = categories.slice(0, 5)
  const otherTotalCount = categories
    .slice(5)
    .reduce((accumulator, item) => accumulator + item.count, 0)

  return [
    ...topCategories,
    {
      name: '其他',
      count: otherTotalCount || 0,
      displayColor: 'rgba(197, 203, 205, 1)',
    },
  ]
}

function formattedCandidates(candidates: LegislatorCandidate[]) {
  const updatedCandidates: Record<
    'empty' | 'less' | 'numerous',
    LegislatorCandidate[]
  > = {
    empty: [],
    less: [],
    numerous: [],
  }

  candidates.forEach((candidate) => {
    if (candidate.done === 0) {
      updatedCandidates.empty.push(candidate)
    } else if (candidate.done > 0 && candidate.done < 20) {
      updatedCandidates.less.push(candidate)
    } else {
      updatedCandidates.numerous.push(candidate)
    }
  })

  return updatedCandidates
}

function sortLegislatorsByAmountRatio(array: RegionLegislator[]) {
  return array
    .map((region) => ({
      ...region,
      areas: region.areas.sort((a, b) => a.done / a.total - b.done / b.total),
    }))
    .sort((a, b) => a.amount / a.total - b.amount / b.total)
}

function formatButtonInfo(array: RegionLegislator[]) {
  return array.map((item) => ({
    name: item.name,
    ratio: `(${item.amount}/${item.total})`,
  }))
}

export {
  formatButtonInfo,
  formattedCandidates,
  getTopCategoryLists,
  sortCategoriesByCount,
  sortLegislatorsByAmountRatio,
}
