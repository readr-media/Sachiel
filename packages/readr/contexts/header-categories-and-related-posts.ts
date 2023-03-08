import { createContext } from 'react'

import type { Category } from '~/graphql/query/category'

const defaultValue: Category[] = []
const HeaderCategoriesAndRelatePostsContext = createContext(defaultValue)

export default HeaderCategoriesAndRelatePostsContext
