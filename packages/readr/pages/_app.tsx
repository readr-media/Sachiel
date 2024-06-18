import { ApolloProvider } from '@apollo/client'
import axios from 'axios'
import type { NextPage } from 'next'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import type { ReactElement, ReactNode } from 'react'
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import { getGqlClient } from '~/apollo-client'
import ComScoreScript from '~/components/comscore-script'
import Footer from '~/components/layout/footer'
import GDPRControl from '~/components/layout/gdpr-control'
import { NormalizeStyles } from '~/components/layout/normalize-styles'
import { ReadrStyles } from '~/components/layout/readr-styles'
import { DEFAULT_HEADER_CATEGORY_LIST } from '~/constants/constant'
import { HEADER_JSON_URL } from '~/constants/environment-variables'
import { LATEST_POSTS_IN_CATEGORIES_URL } from '~/constants/environment-variables'
import CategoryListContext from '~/contexts/category-list'
import HeaderCategoriesAndRelatePostsContext from '~/contexts/header-categories-and-related-posts'
import type { Category } from '~/graphql/query/category'
import theme from '~/styles/theme'
import type { NavigationCategory } from '~/types/component'
import * as gtag from '~/utils/gtag'
import { sortByTimeStamp } from '~/utils/index'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (
    /* eslint-disable-line no-unused-vars */ page: ReactElement
  ) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
} & {
  props: {
    categoriesAndRelatedPosts: Category[]
    categoryList: NavigationCategory[]
  }
}

const MyApp = ({ Component, pageProps, props }: AppPropsWithLayout) => {
  const client = getGqlClient()
  const router = useRouter()

  useEffect(() => {
    gtag.init()
  }, [])

  useEffect(() => {
    const path =
      window.location.pathname + window.location.search + window.location.hash
    gtag.sendPageview(path)
  }, [router.pathname])

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <NormalizeStyles />
      <ReadrStyles />
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <HeaderCategoriesAndRelatePostsContext.Provider
            value={props.categoriesAndRelatedPosts}
          >
            <CategoryListContext.Provider value={props.categoryList}>
              {getLayout(<Component {...pageProps} />)}
            </CategoryListContext.Provider>
            <Footer />
            <GDPRControl />
          </HeaderCategoriesAndRelatePostsContext.Provider>
        </ThemeProvider>
      </ApolloProvider>
      {/* use react script rather than next/Script to let the script show on the source of the html (view-source:) */}
      <ComScoreScript />
    </>
  )
}

// getInitialProps runs on both server-side and client-side
MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context)
  const categoriesAndRelatedPosts: Category[] = []
  const categoryList: NavigationCategory[] = []

  try {
    {
      // Fetch header data from the JSON file
      const { data: jsonCategories } = await axios.get(HEADER_JSON_URL)

      const slicedCategories = jsonCategories.categories
        .slice(0, 6)
        .map((category: Category) => {
          return {
            ...category,
            posts: [...(category.posts || []).slice(0, 5)],
          }
        })

      // Use `slicedCategories` if defined, otherwise use `DEFAULT_HEADER_CATEGORY_LIST`
      slicedCategories
        ? categoriesAndRelatedPosts.push(...slicedCategories)
        : categoriesAndRelatedPosts.push(...DEFAULT_HEADER_CATEGORY_LIST)
    }

    {
      // Fetch all categories
      let data: { categories: Category[] }
      const response = await axios.get<{ categories: Category[] }>(
        LATEST_POSTS_IN_CATEGORIES_URL
      )
      data = response.data

      const sortCategories =
        sortByTimeStamp(data.categories) || data.categories || []

      categoryList.push(...sortCategories)
    }
  } catch (error) {
    const err = error as Error
    console.error(JSON.stringify({ severity: 'ERROR', message: err.stack }))
  }

  return {
    ...ctx,
    props: {
      categoriesAndRelatedPosts,
      categoryList,
    },
  }
}
export default MyApp
