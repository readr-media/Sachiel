import { createContext } from 'react'

import type { Category } from '~/graphql/query/category'

const defaultValue: Category[] = []
const CategoryListContext = createContext(defaultValue)

export default CategoryListContext
