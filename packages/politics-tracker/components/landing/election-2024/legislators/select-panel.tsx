import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import ArrowDown from '~/public/icons/landing/toggle-arrow-down.svg'

const Wrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.purpleMedium};
  padding: 28px 20px 0px;
  color: ${({ theme }) => theme.textColor.blue};
  margin: auto;
`

const ExpandButton = styled.div<{ isOpen: boolean }>`
  width: 100%;
  padding: 10px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 4px 0px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;

  button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 4px;
  }

  svg {
    margin-left: 4px;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};

    path {
      fill: ${({ theme }) => theme.backgroundColor.purpleDark};
    }
  }

  &:hover button {
    background: red;
    background: ${({ theme }) => theme.backgroundColor.black5};
  }

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 16px;
  }
`

const ToggleGroup = styled.div<{ isOpen: boolean }>`
  padding: 1px 16px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
  max-height: ${({ isOpen }) => (isOpen ? 'none' : '97px')};
  overflow: ${({ isOpen }) => (isOpen ? 'auto' : 'hidden')};

  ${({ theme }) => theme.breakpoint.md} {
    padding: 1px 20px 20px;
    gap: 20px 8px;
    max-height: ${({ isOpen }) => (isOpen ? 'auto' : '50px')};
  }
`

const ToggleButton = styled.button<{ isActive: boolean }>`
  padding: 8px 12px;
  outline: 1px solid #544ac9;
  background: ${({ theme, isActive }) =>
    isActive ? theme.backgroundColor.purpleDark : theme.backgroundColor.white};
  border-radius: 32px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.textColor.white : theme.textColor.purpleDark};

  box-shadow: ${({ isActive }) =>
    isActive
      ? '0px 2px 4px 0px rgba(131, 121, 248, 0.5), 0px 2px 20px 0px rgba(131, 121, 248, 0.1)'
      : 'none'};

  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;

  ${({ theme }) => theme.breakpoint.md} {
    line-height: 16px;
  }
`

const TypeLists = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(15, 45, 53, 0.3);
  gap: 32px;
  margin-bottom: 28px;

  ${({ theme }) => theme.breakpoint.md} {
    gap: 80px;
  }
`

const Type = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  position: relative;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.3;
  color: ${({ theme, isActive }) =>
    isActive ? theme.textColor.purpleDark : 'rgba(15, 45, 53, 0.3)'};

  &:hover {
    color: ${({ theme }) => theme.textColor.purpleDark};
  }

  & + li::before {
    content: '';
    width: 2px;
    height: 21px;
    background: ${({ theme }) => theme.backgroundColor.black};
    position: absolute;
    top: 0px;
    left: -16px;

    ${({ theme }) => theme.breakpoint.md} {
      height: 20px;
      left: -40px;
      top: 7.5px;
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 24px;
  }
`

export default function TogglePanel(): JSX.Element {
  const areaButtons = [
    '台北市 (999/999)',
    '台北市 (999/999)',
    '台北市 (999/999)',
    '台北市 (999/999)',
    '台北市 (999/999)',
    '台北市 (999/999)',
    '台北市 (999/999)',
    '台北市 (999/999)',
    '台北市 (999/999)',
    '台北市 (999/999)',
    '台北市 (999/999)',
    '台北市 (999/999)',
  ]

  const aboriginalButtons = ['平地原住民 (0/0)', '山地原住民 (0/0)']

  const [isOpen, setIsOpen] = useState(false)
  const [buttonLists, setButtonLists] = useState(areaButtons)
  const [activeType, setActiveType] = useState('區域立委')
  const [activeButton, setActiveButton] = useState(0)

  useEffect(() => {
    setActiveButton(0)
  }, [activeType])

  const handleTypeClick = (type: string) => {
    setActiveType(type)
    switch (type) {
      case '區域立委':
        setButtonLists(areaButtons)
        break
      case '原住民':
        setButtonLists(aboriginalButtons)
        break
      case '不分區立委':
        setButtonLists([])
        break
      default:
        setButtonLists([])
    }
  }

  return (
    <Wrapper>
      <TypeLists>
        <Type
          onClick={() => handleTypeClick('區域立委')}
          isActive={activeType === '區域立委'}
        >
          區域立委
        </Type>
        <Type
          onClick={() => handleTypeClick('原住民')}
          isActive={activeType === '原住民'}
        >
          原住民
        </Type>
        <Type
          onClick={() => handleTypeClick('不分區立委')}
          isActive={activeType === '不分區立委'}
        >
          不分區立委
        </Type>
      </TypeLists>

      {buttonLists.length > 0 && (
        <ToggleGroup isOpen={isOpen}>
          {buttonLists.map((button, index) => (
            <ToggleButton
              key={index}
              isActive={activeButton === index}
              onClick={() => setActiveButton(index)}
            >
              {button}
            </ToggleButton>
          ))}
        </ToggleGroup>
      )}

      {buttonLists.length > 2 && (
        <ExpandButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
          <button>
            {isOpen ? '收合部分縣市' : '展開所有縣市'}
            <ArrowDown />
          </button>
        </ExpandButton>
      )}
    </Wrapper>
  )
}
