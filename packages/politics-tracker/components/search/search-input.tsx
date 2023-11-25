import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormEvent } from 'react'
import styled from 'styled-components'

import SearchIcon from '~/public/icons/search.svg'

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

export default function SearchInput(): JSX.Element {
  const router = useRouter()
  const { q } = router.query
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.location.replace(`/search?q=${inputValue}`)
  }

  return (
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
  )
}
