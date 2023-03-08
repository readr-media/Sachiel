import { useContext } from 'react'

import HeaderCategoriesAndRelatePostsContext from '~/contexts/header-categories-and-related-posts'

export const useHeaderCategoriesAndRelatePostsContext = () =>
  useContext(HeaderCategoriesAndRelatePostsContext)
