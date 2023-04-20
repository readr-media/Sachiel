import { createContext } from 'react'

import type { NavigationCategory } from '~/types/component'

const defaultValue: NavigationCategory[] = []
const CategoryListContext = createContext(defaultValue)

export default CategoryListContext
