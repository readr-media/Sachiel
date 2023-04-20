import { useContext } from 'react'

import CategoryListContext from '~/contexts/category-list'
import HeaderCategoriesAndRelatePostsContext from '~/contexts/header-categories-and-related-posts'

export const useHeaderCategoriesAndRelatePostsContext = () =>
  useContext(HeaderCategoriesAndRelatePostsContext)

export const useCategoryListContext = () => useContext(CategoryListContext)
