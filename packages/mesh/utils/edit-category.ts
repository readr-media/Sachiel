export function getAddedCategoryIds<T extends { id: string }>(
  oldCategories: T[],
  newCategories: T[]
) {
  const oldCategoryIds = new Set(oldCategories.map((category) => category.id))
  return new Set(
    newCategories
      .filter((newCategory) => !oldCategoryIds.has(newCategory.id))
      .map((category) => category.id)
  )
}

export function getDeletedCategoryIds<T extends { id: string }>(
  oldCategories: T[],
  newCategories: T[]
) {
  const newCategoryIds = new Set(newCategories.map((category) => category.id))
  return new Set(
    oldCategories
      .filter((oldCategory) => !newCategoryIds.has(oldCategory.id))
      .map((category) => category.id)
  )
}

export function undoDeleteCategroies<T extends { id: string }>(
  newCategories: T[],
  deletedCategorIds: Set<string>,
  allCategories: T[]
) {
  const addedCategories = allCategories.filter((category) =>
    deletedCategorIds.has(category.id)
  )
  return (
    newCategories
      .concat(addedCategories)
      // TODO: sort categories through new order field
      .sort((a, b) => parseInt(a.id) - parseInt(b.id))
  )
}

export function undoAddCategories<T extends { id: string }>(
  newCategories: T[],
  addedCategorIds: Set<string>
) {
  return newCategories.filter(
    (newCategory) => !addedCategorIds.has(newCategory.id)
  )
}
