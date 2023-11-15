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

  .gsc-control-cse {
    background: ${({ theme }) => theme.backgroundColor.cornsilk};
  }

  .gsc-search-box,
  .gsc-orderby {
    display: none;
  }

  .gsc-above-wrapper-area {
    border-bottom: none;
  }

  .gs-title {
    color: #b2800d !important;
    margin-bottom: 8px;

    > * {
      color: #b2800d !important;
    }
  }

  .gs-visibleUrl {
    display: none;
  }

  .gs-image-box {
    display: none;
  }

  .gs-snippet {
    > * {
      color: #c0374f;
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
        {/* <Result className="gcse-searchresults-only"></Result> */}
        <div className="gcse-search"></div>

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
