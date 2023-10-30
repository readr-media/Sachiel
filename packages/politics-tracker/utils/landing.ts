function sortCategoriesByCount(categories: any) {
  return Object.keys(categories)
    .map((categoryName) => {
      const categoryInfo = categories[categoryName]
      return { name: categoryName, ...categoryInfo }
    })
    .sort((a, b) => b.count - a.count)
}

function getTopCategoryLists(categories: any) {
  const topCategories = categories.slice(0, 5)
  const otherTotalCount = categories
    .slice(5)
    .reduce((accumulator: any, item: any) => accumulator + item.count, 0)

  return [
    ...topCategories,
    {
      name: '其他',
      count: otherTotalCount || 0,
      displayColor: 'rgba(197, 203, 205, 1)',
    },
  ]
}

export { getTopCategoryLists, sortCategoriesByCount }
