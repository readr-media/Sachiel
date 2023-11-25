import { useState } from 'react'
import { FormEvent } from 'react'
import styled from 'styled-components'

import { Z_INDEX } from '~/constants'
import ArrowRight from '~/public/icons/arrow-right.svg'
import DeleteCross from '~/public/icons/close-cross.svg'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: ${Z_INDEX.top};
  background: ${({ theme }) => theme.backgroundColor.cornsilk};
  height: 100dvh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  .close {
    width: 40px;
    height: 40px;
    position: fixed;
    top: 12px;
    right: 16px;
    cursor: pointer;
    border-radius: 50%;

    &:hover {
      background: ${({ theme }) => theme.borderColor.black10};
      outline: 5px solid ${({ theme }) => theme.borderColor.black10};
    }

    ${({ theme }) => theme.breakpoint.md} {
      top: 20px;
      right: 24px;
    }
  }
`

const Content = styled.div`
  input {
    padding: 0px 8px 12px;
    margin-bottom: 40px;
    width: 100%;
    background: ${({ theme }) => theme.backgroundColor.cornsilk};
    color: ${({ theme }) => theme.textColor.black};
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 1.3;
    box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.1) inset;

    &:hover {
      box-shadow: 0px -1px 0px 0px ${({ theme }) => theme.borderColor.black} inset;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.textColor.black30};
      opacity: 1;
    }

    &::-ms-input-placeholder {
      color: ${({ theme }) => theme.textColor.black30};
    }

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 24px;
    }
  }
`

const SearchButton = styled.button`
  display: flex;
  padding: 8px 12px 8px 20px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 24px;
  border: 2px solid ${({ theme }) => theme.borderColor.black};
  background: ${({ theme }) => theme.backgroundColor.landingYellow};
  margin: auto;

  &:hover {
    color: ${({ theme }) => theme.textColor.white};
    background: ${({ theme }) => theme.textColor.yellow};

    svg {
      path {
        fill: ${({ theme }) => theme.textColor.white};
      }
    }
  }
`

type SearchLightBoxProps = {
  // eslint-disable-next-line no-unused-vars
  setIsSearchOpen: (value: boolean) => void
}

export default function SearchLightBox({
  setIsSearchOpen,
}: SearchLightBoxProps): JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [isSearchHasValue, setIsSearchHasValue] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.location.replace(`/search?q=${inputValue}`)
  }

  return (
    <Wrapper>
      <DeleteCross className="close" onClick={() => setIsSearchOpen(false)} />

      <Content>
        <input
          type="text"
          placeholder="請輸入關鍵字..."
          className={isSearchHasValue ? 'inputHasValue' : 'inputNoValue'}
          onChange={(e) => {
            const newInput = e.currentTarget.value
            setIsSearchHasValue(!!newInput.length)
            setInputValue(newInput)
          }}
        />

        <SearchButton onClick={handleSubmit}>
          搜尋
          <ArrowRight />
        </SearchButton>
      </Content>
    </Wrapper>
  )
}
