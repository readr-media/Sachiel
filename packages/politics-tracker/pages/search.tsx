import { useRouter } from 'next/router'
import Script from 'next/script'
import { useState } from 'react'
import styled from 'styled-components'

import DefaultLayout from '~/components/layout/default'
import { PROGRAMMABLE_SEARCH_ID } from '~/constants/index'
import SearchIcon from '~/public/icons/search.svg'

const Container = styled.div`
  min-height: 100dvh;
  background: ${({ theme }) => theme.backgroundColor.cornsilk};
  width: 100%;
  padding: 84px 16px 40px;
  font-family: 'Noto Sans TC';

  //隱藏「贊助商廣告」功能
  .gsc-adBlock {
    display: none;
  }

  //隱藏「你是不是要查...」 FIXME
  .gs-spelling {
    display: none;
  }

  //共找到 0 項結果
  .gs-no-results-result {
    outline: 1px solid red;
  }

  .gsc-above-wrapper-area {
    border-bottom: none;
    padding: 0px;

    //「約有幾筆搜尋結果」文字樣式
    .gsc-result-info {
      color: rgba(15, 45, 53, 0.5);
      font-family: 'Noto Sans TC';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;

      ${({ theme }) => theme.breakpoint.md} {
        font-size: 14px;
        line-height: 16px;
      }
    }
  }

  //單筆搜尋結果項目
  .gsc-webResult.gsc-result {
    padding: 16px 0;

    //標題
    .gs-title {
      margin-bottom: 8px;
      font-family: 'Noto Sans TC';
      font-style: normal;
      font-weight: 700;
      line-height: 1.3;

      &:hover {
        text-decoration: underline 1px;
        text-underline-offset: 2px;
      }
    }

    //隱藏「搜尋結果網址」
    .gs-visibleUrl {
      display: none;
    }

    //「搜尋結果片段」
    .gs-snippet {
      color: rgba(15, 45, 53, 0.66) !important;
      font-family: 'Noto Sans TC';
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5;

      > b {
        color: #c0374f;
      }
    }
  }

  //隱藏「透過 google 搜尋...」
  .gcsc-find-more-on-google {
    display: none;
  }

  //頁籤
  .gsc-results {
    .gsc-cursor-box {
      text-align: center;
      margin: 24px auto 0px;
    }

    .gsc-cursor {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: 'Noto Sans TC';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;

      .gsc-cursor-page {
        margin: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        color: rgba(15, 45, 53, 0.5);

        &:hover {
          color: rgba(15, 45, 53, 1);
          text-decoration: none;
        }
      }

      .gsc-cursor-current-page {
        background: rgba(246, 186, 49, 1);
        color: rgba(15, 45, 53, 1);
        font-weight: 500;
      }
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    padding: 120px 40px 40px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 120px;

    .gsc-control-cse {
      width: 640px;
    }
  }
`

const SearchInput = styled.form`
  padding-top: 1em;
  position: relative;

  input {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 8px 16px 8px 44px;

    color: #0f2d35;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.8;

    &::placeholder {
      color: #afafaf;
    }

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
    top: calc(40% + 1em);
    cursor: pointer;
    transform: translate(0, -50%);

    path {
      opacity: 0.3;
    }
  }
`

export default function GcseSearch(): JSX.Element {
  const router = useRouter()
  const { q } = router.query
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    window.location.replace(`/search?q=${inputValue}`)
  }

  return (
    <DefaultLayout>
      <Container>
        <div className="gcse-searchresults-only"></div>

        <SearchInput onSubmit={handleSubmit}>
          <SearchIcon onClick={handleSubmit} />
          <input
            placeholder="搜尋"
            defaultValue={q}
            onChange={(e) => {
              const newInput = e.currentTarget.value
              setInputValue(newInput)
            }}
          />
        </SearchInput>
      </Container>

      <Script
        src={`https://cse.google.com/cse.js?cx=${PROGRAMMABLE_SEARCH_ID}`}
        async={true}
      />
    </DefaultLayout>
  )
}
