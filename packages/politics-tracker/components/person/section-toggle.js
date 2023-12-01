import React from 'react'
import styled from 'styled-components'

import ArrowDown from '~/components/icons/arrow-down'
import ArrowUp from '~/components/icons/arrow-up'
import { typedHasOwnProperty } from '~/utils/utils'

const ToggleWrapper = styled.div`
  padding: 40px 0 0;
  width: 100%;
`
const ToggleButton = styled.button`
  transition: all 0.3s ease-in-out;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ color, theme }) =>
    color && typedHasOwnProperty(theme.backgroundColor, color)
      ? theme.backgroundColor[color]
      : theme.backgroundColor.blue};
  font-weight: 700;
  padding: 20px;
  border-color: ${({ theme }) => theme.borderColor.black};
  border-style: solid;
  border-width: 4px;
  position: relative;

  &::before,
  &::after {
    position: absolute;
    content: '';
    transition: all 0.3s ease-in-out;
    background-color: ${({ color, theme }) =>
      color && typedHasOwnProperty(theme.textColor, color)
        ? theme.textColor[color]
        : theme.textColor.blue};
  }
  &::before {
    bottom: -14px;
    height: 10px;
    width: calc(100% + 8px);
    left: 0.8px;
    transform: skewX(45deg);
    box-shadow: inset 0px -4px 0px #000000, inset 4px 0px 0px #000000,
      inset -4px 0px 0px #000000;
  }
  &::after {
    right: -14px;
    height: calc(100% + 8px);
    width: 10px;
    top: 1.2px;
    transform: skewY(45deg);
    box-shadow: inset 0px 4px 0px #000000, inset -4px 0px 0px #000000;
  }

  &:active {
    margin-left: 10px;
    margin-top: 10px;
    &::before {
      bottom: -5px;
      height: 0px;
      left: 3px;
    }

    &::after {
      right: -5px;
      width: 0px;
      bottom: -3px;
    }
  }
  ${
    /**
     *
     * @param {Object} props
     * @param {boolean} props.isActive
     */
    ({ isActive }) =>
      isActive &&
      `  
    margin-left: 10px;
    margin-top: 10px;
    &::before {
      bottom: -5px;
      height: 0px;
      left: 3px;
    }
    &::after {
      right: -5px;
      width: 0px;
      bottom: -3px;
    }
    `
  }
`

const ToggleText = styled.div`
  font-size: 28px;
  line-height: 1.3;
  color: ${({ color, theme }) =>
    color === 'disable' ? theme.textColor.black30 : theme.textColor.white};
`
const ToggleIcon = styled.span`
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  path {
    fill: ${({ color, theme }) =>
      color === 'disable'
        ? theme.textColor.black30
        : theme.backgroundColor.white};
  }
`

/**
 * @param {Object} props
 * @param {string} props.color
 * @param {string} props.title
 * @param {() => void} [props.GAClick]
 * @param {boolean} props.isActive
 * @param {string|null} props.id
 * @param {string[]} props.activeId
 * @param {(value: string[]) => void} props.setActiveId
 * @returns {React.ReactElement}
 */
export default function SectionToggle({
  color,
  isActive,
  activeId,
  setActiveId,
  id,
  title,
  GAClick = () => {},
}) {
  // FIXME: jsDocs
  /**
   * @param {string | null} id
   */
  function toggleActiveID(id) {
    if (id === null) {
      return
    } else if (activeId.includes(id)) {
      const newActiveId = activeId.filter(function (value) {
        return value !== id
      })
      setActiveId(newActiveId)
    } else {
      const newActiveId = [...activeId, id]
      setActiveId(newActiveId)
    }
  }

  return (
    <ToggleWrapper>
      <ToggleButton
        color={color}
        isActive={isActive}
        onClick={() => {
          toggleActiveID(id)
          GAClick()
        }}
      >
        <ToggleText color={color}>{title}</ToggleText>
        <ToggleIcon color={color}>
          {isActive ? <ArrowUp /> : <ArrowDown />}
        </ToggleIcon>
      </ToggleButton>
    </ToggleWrapper>
  )
}
