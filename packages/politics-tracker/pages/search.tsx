// @ts-ignore: no definition
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormEvent } from 'react'
import styled from 'styled-components'

import DefaultLayout from '~/components/layout/default'
import useWindowDimensions from '~/hooks/use-window-dimensions'
import NextPageIcon from '~/public/icons/next-page-arrow.svg'
import PrevPageIcon from '~/public/icons/prev-page-arrow.svg'
import SearchIcon from '~/public/icons/search.svg'
import SkipToFirstIcon from '~/public/icons/skip-to-first-page-arrow.svg'
import SkipToLastIcon from '~/public/icons/skip-to-last-page-arrow.svg'
import { mediaSize } from '~/styles/theme/index'
import type {
  PaginationInfo,
  ProgrammableSearchResultItem,
} from '~/types/search'

import { searchAPI } from './api/programmable-search'

const Container = styled.div`
  min-height: 100dvh;
  background: ${({ theme }) => theme.backgroundColor.cornsilk};
  width: 100%;
  padding: 84px 16px 40px;
  font-family: 'Noto Sans TC';

  b {
    color: ${({ theme }) => theme.textColor.red};
  }

  a {
    display: block;
    width: 100%;
    margin-bottom: 32px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 124px 40px 40px;
    display: flex;
    align-items: flex-start;
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: 120px;
  }
`

const ResultList = styled.li`
  list-style: none;
  width: 100%;

  ${({ theme }) => theme.breakpoint.xl} {
    min-width: 640px;
  }
`

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor.yellow};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  margin-bottom: 8px;

  &:hover {
    text-decoration: underline 1.5px;
    text-underline-offset: 4px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 18px;
  }
`

const Snippet = styled.div`
  color: rgba(15, 45, 53, 0.66);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  overflow: hidden;

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 14px;
  }
`

const SearchResult = styled.div`
  width: 100%;
`

const Notion = styled.div`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textColor.black50};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;

  span {
    color: rgba(15, 45, 53, 0.66);
    line-height: 1.5;
    margin-top: 20px;
    display: inline-block;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 14px;
  }
`

const Pagination = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  list-style: none;
  cursor: pointer;

  color: ${({ theme }) => theme.textColor.black50};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;

  .active {
    background: ${({ theme }) => theme.backgroundColor.yellow};
    color: ${({ theme }) => theme.textColor.black};
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;

    &:hover {
      color: ${({ theme }) => theme.textColor.black};
    }
  }
`

const Wrapper = styled.form`
  width: 100%;
  position: relative;

  ${({ theme }) => theme.breakpoint.xl} {
    width: 360px;
    max-width: 360px;
  }

  input {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 8px 16px 8px 44px;
    color: #0f2d35;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.8;

    &::placeholder,
    &::-ms-input-placeholder {
      color: #afafaf;
    }

    &:focus {
      outline: none;
    }
  }

  svg {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 16px;
    top: calc(52%);
    cursor: pointer;
    transform: translate(0, -50%);

    path {
      opacity: 0.3;
    }
  }
`

type SearchPageProps = {
  resultLists: ProgrammableSearchResultItem[]
  resultAmount: number
}
export default function Search({
  resultLists = [],
  resultAmount = 0,
}: SearchPageProps): JSX.Element {
  const { width } = useWindowDimensions()
  const isDesktopWidth = width ? width >= mediaSize.xl : false

  const router = useRouter()
  const { q } = router.query
  const searchTerm = (q && String(q)) || ''

  const [inputValue, setInputValue] = useState<string>(searchTerm) //搜尋關鍵字
  const [currentPage, setCurrentPage] = useState<number>(1) //目前頁籤數字

  //計算頁數
  const pageSize = Math.round(resultAmount / 10)

  const pagesData = Array.from({ length: pageSize }, (_, index) => {
    const pageIndex = index + 1
    const startIndex = index * 10 + 1
    return { startIndex, pageIndex }
  })
  const [pageList, setPageList] = useState<PaginationInfo[]>(
    pagesData.slice(0, 5)
  )

  const shouldShowNotion = resultAmount === 0 && q !== ''

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.location.replace(`/search?q=${inputValue}`)
  }

  return (
    <DefaultLayout>
      <Container>
        {isDesktopWidth && (
          <Wrapper onSubmit={(e) => handleSubmit(e)} className="search-input">
            <SearchIcon
              onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) =>
                handleSubmit(e)
              }
            />
            <input
              placeholder="搜尋"
              defaultValue={q}
              onChange={(e) => {
                const newInput = e.currentTarget.value
                setInputValue(newInput)
              }}
            />
          </Wrapper>
        )}

        <SearchResult>
          <Notion>
            <p>共找到 {resultAmount} 項結果</p>
            {shouldShowNotion && (
              <span>
                找不到包含<b> {q} </b>的結果，請換個關鍵字重試一次
              </span>
            )}
          </Notion>

          {resultLists.map((item, index) => {
            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer noopener"
              >
                <ResultList>
                  <Title> {item.title}</Title>
                  <Snippet>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.htmlSnippet }}
                    />
                  </Snippet>
                </ResultList>
              </a>
            )
          })}

          <Pagination>
            {currentPage !== 1 && (
              <Link passHref={true} href={`/search?q=${inputValue}&start=1`}>
                <li
                  onClick={() => {
                    setPageList(pagesData.slice(0, 5))
                    setCurrentPage(1)
                  }}
                >
                  <SkipToFirstIcon />
                </li>
              </Link>
            )}

            {currentPage !== 1 && (
              <Link
                passHref={true}
                href={`/search?q=${inputValue}&start=${
                  (currentPage - 2) * 10 + 1
                }`}
              >
                <li
                  onClick={() => {
                    if (currentPage < 4) {
                      setPageList(pagesData.slice(0, 5))
                    } else {
                      setPageList(
                        pagesData.slice(currentPage - 4, currentPage + 1)
                      )
                    }
                    setCurrentPage(currentPage - 1)
                  }}
                >
                  <PrevPageIcon />
                </li>
              </Link>
            )}

            {pageList.map((page, index) => (
              <Link
                key={index}
                passHref={true}
                href={`/search?q=${inputValue}&start=${page.startIndex}`}
              >
                <li
                  className={currentPage === page.pageIndex ? 'active' : ''}
                  onClick={() => {
                    setCurrentPage(page.pageIndex)
                  }}
                >
                  {page.pageIndex}
                </li>
              </Link>
            ))}

            {pageSize > 1 && currentPage !== pageSize && (
              <Link
                passHref={true}
                href={`/search?q=${inputValue}&start=${currentPage * 10 + 1}`}
              >
                <li
                  onClick={() => {
                    if (currentPage < 2) {
                      setPageList(pagesData.slice(0, 5))
                    } else {
                      setPageList(
                        pagesData.slice(currentPage - 2, currentPage + 3)
                      )
                    }
                    setCurrentPage(currentPage + 1)
                  }}
                >
                  <NextPageIcon />
                </li>
              </Link>
            )}

            {pageSize > 2 && currentPage !== pageSize && (
              <Link
                passHref={true}
                href={`/search?q=${inputValue}&start=${
                  (pageSize - 1) * 10 + 1
                }`}
              >
                <li>
                  <SkipToLastIcon
                    onClick={() => {
                      setPageList(pagesData.slice(pageSize - 5, pageSize))
                      setCurrentPage(pageSize)
                    }}
                  />
                </li>
              </Link>
            )}
          </Pagination>
        </SearchResult>
      </Container>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async ({
  res,
  query,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, max-age=600, stale-while-revalidate=60'
  )

  const startIndex = Number(query.start) || 1

  let resultLists: []
  let resultAmount: number

  try {
    {
      const inputValue = query.q || ''
      const response = await searchAPI(inputValue, startIndex)

      resultLists = response?.items || []
      resultAmount =
        Number(response?.searchInformation?.totalResults) > 100
          ? 100
          : Number(response?.searchInformation?.totalResults) || 0
    }
  } catch (err) {
    // All exceptions that include a stack trace will be
    // integrated with Error Reporting.
    // See https://cloud.google.com/run/docs/error-reporting
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          err,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
      })
    )
    return {
      notFound: true,
    }
  }

  return {
    props: {
      resultLists,
      resultAmount,
    },
  }
}
