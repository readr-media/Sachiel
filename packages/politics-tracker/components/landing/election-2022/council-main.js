import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'

import CouncilList from '~/components/landing/election-2022/council-content'
import { logGAEvent } from '~/utils/analytics'

const CouncilContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  #councilorBlock {
    position: absolute;
    top: -64px;
    visibility: hidden;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    #councilorBlock {
      top: -80px;
    }
  }
`
const CouncilSideBar = styled.div`
  display: none;
  ${({ theme }) => theme.breakpoint.xxl} {
    display: block;
    width: 6vw;
    background: #f7ba31;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
    padding-top: 40px;

    h3 {
      display: block;
      font-weight: 900;
      /* FIXME: font-weight size */
      color: #f7ba31;
      font-size: 48px;
      transform: rotate(90deg);
    }
  }
`
const CouncilContentWrap = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.lightPurple};
  box-shadow: inset 0px -4px 0px #000000;
`
const TitleWrap = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
  div:nth-child(1) {
    width: 40px;
    height: 100%;
    background: #f7ba31;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
    padding-top: 40px;
  }
  ${({ theme }) => theme.breakpoint.xxl} {
    height: 64px;
    div:nth-child(1) {
      display: none;
    }
  }
`
const SubTitle = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.textColor.blue};
  box-shadow: inset 0px -4px 0px #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  /* TODO: 建檔成theme variable */
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor.white};
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 28px;
  }
  ${({ theme }) => theme.breakpoint.xxl} {
    width: 344px;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  }
`

const CouncilContent = styled.div`
  width: 100%;
  display: flex;
`

const ButtonWrap = styled.div`
  width: 100%;
  padding: 20px 15px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px 0px;
  }
`
const ButtonGroup = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.backgroundColor.landingPurple};
  max-width: 1230px;
  margin: auto;
  padding: 20px 15px 0px 15px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 10px 20px 0px 20px;
  }

  .listBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul {
    min-width: 260px;
    display: block;
    margin: auto;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${({ theme }) => theme.breakpoint.sm} {
      width: 430px;
    }
    ${({ theme }) => theme.breakpoint.md} {
      justify-content: center;
      width: 640px;
    }
    ${({ theme }) => theme.breakpoint.xl} {
      width: 1000px;
      max-width: 1230px;
    }
  }
  ul li div {
    text-decoration: none;
    background: ${({ theme }) => theme.backgroundColor.white};
    color: ${({ theme }) => theme.textColor.blue};
    padding: 8px 15px;
    font-weight: 500;
    font-size: 14px;
    padding: 8px 15px;
    border-radius: 32px;
    line-height: 1.3;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.textColor.blue};
    &:hover {
      cursor: pointer;
    }
    ${({ theme }) => theme.breakpoint.md} {
      font-size: 18px;
      padding: 8px 12px;
      min-width: 150px;
    }
  }

  ul li div:not(.press):hover {
    cursor: pointer;
    background: ${({ theme }) => theme.backgroundColor.lightPurple};
  }

  li {
    margin: 6px;
    ${({ theme }) => theme.breakpoint.md} {
      margin: 10px 5px;
    }
  }

  .press {
    font-weight: 500;
    font-size: 14px;
    padding: 8px 15px;
    border-radius: 32px;
    line-height: 1.3;
    border: 1px solid ${({ theme }) => theme.textColor.blue};
    color: ${({ theme }) => theme.textColor.white};
    background: ${({ theme }) => theme.textColor.blue};
    box-shadow: 0px 2px 20px rgba(131, 121, 248, 0.1),
      0px 2px 4px rgba(131, 121, 248, 0.5);
    ${({ theme }) => theme.breakpoint.md} {
      font-size: 18px;
      padding: 8px 12px;
      min-width: 150px;
    }
  }

  span {
    font-size: 14px;
    display: none;
    ${({ theme }) => theme.breakpoint.md} {
      display: inline-block;
    }
  }
`
const Content = styled.div`
  width: 100%;
  padding-bottom: 20px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px 40px 40px;
  }
`

const ToggleGroup = styled.div`
  padding: 4px;
  max-height: 100px;
  display: block;
  ${({ theme }) => theme.breakpoint.md} {
    max-height: 65px;
  }
`
const ToggleButton = styled.div`
  box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 7px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.textColor.blue};
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 0px;
  }
  &:hover > div {
    background: rgba(15, 45, 53, 0.05);
  }
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 16px;
  }
`
/**
 *
 * @returns {React.ReactElement}
 */

// @ts-ignore
export default function CouncilMain({ propsData }) {
  const newPropsData = JSON.parse(JSON.stringify(propsData))
  const rawDatas = newPropsData['councilorAndPolitics']

  // @ts-ignore
  const lowToHigh = (datas) => {
    return [...datas].sort((a, b) => {
      return a?.amount / a?.total - b?.amount / b?.total
    })
  }

  const dataOrderByCompletePercent = lowToHigh(rawDatas)

  /**
   *
   * @param {Object[]} cityItems
   */
  const initState = (cityItems) => {
    const menuItems = []
    for (let i = 0; i < cityItems.length; i++) {
      menuItems.push({
        id: i + 1,
        infor: cityItems[i],
        active: false,
        // @ts-ignore
        name: cityItems[i].name,
        // @ts-ignore
        total: cityItems[i].total,
        // @ts-ignore
        amount: cityItems[i].amount,
      })
    }
    return menuItems
  }

  const defaultMenuItems = initState(dataOrderByCompletePercent)
  const firstRender = [...defaultMenuItems]
  firstRender[0].active = true
  const [menuItems, setMenuItems] = useState(firstRender)
  const [councilRegion, setCouncilRegion] = useState(0)

  const [toggle, setToggle] = useState(true)
  const toggleStatus = toggle
    ? { overflow: 'hidden' }
    : { overflow: 'visible', maxHeight: 'none' }
  const toggleNotion = toggle ? '展開所有縣市' : '收合部分縣市'

  return (
    <CouncilContainer>
      <span id="councilorBlock"></span>
      <CouncilSideBar>
        <h3>#Process</h3>
      </CouncilSideBar>
      <CouncilContentWrap>
        <TitleWrap>
          <div></div>
          <SubTitle>補坑進度：縣市議員政見</SubTitle>
        </TitleWrap>
        <CouncilContent>
          <Content>
            <ButtonWrap>
              <ButtonGroup>
                <ToggleGroup style={toggleStatus}>
                  <div className="listBox">
                    <ul>
                      {menuItems.map(
                        (
                          // @ts-ignore
                          v,
                          // @ts-ignore
                          i
                        ) => {
                          return (
                            <li
                              key={i}
                              onClick={() => {
                                firstRender[0].active = false
                                const newMenuItems = firstRender.map(
                                  (v, index) => {
                                    if (i === index)
                                      return { ...v, active: true }

                                    return v
                                  }
                                )

                                setMenuItems(newMenuItems)
                                setCouncilRegion(i)
                              }}
                            >
                              {v.active ? (
                                <div className="press">
                                  {v.name}
                                  <span>
                                    ( {v.amount} / {v.total} )
                                  </span>
                                </div>
                              ) : (
                                <div className="nopress">
                                  {v.name}
                                  <span>
                                    ( {v.amount} / {v.total})
                                  </span>
                                </div>
                              )}
                            </li>
                          )
                        }
                      )}
                    </ul>
                  </div>
                </ToggleGroup>
                <ToggleButton
                  onClick={() => {
                    setToggle(!toggle)
                  }}
                >
                  <div
                    onClick={() => {
                      logGAEvent('click', '點擊「展開所有縣市」')
                    }}
                  >
                    {toggleNotion}
                    {toggle ? (
                      <Image
                        alt="arrowPurple"
                        src="/icons/landing/arrow_down_purple.svg"
                        width="20"
                        height="20"
                        onClick={() => {}}
                      />
                    ) : (
                      <Image
                        alt="arrowPurple"
                        src="/icons/landing/arrow_up_purple.svg"
                        width="20"
                        height="20"
                        onClick={() => {}}
                      />
                    )}
                  </div>
                </ToggleButton>
              </ButtonGroup>
            </ButtonWrap>
            <CouncilList
              // @ts-ignore
              councilRegion={councilRegion}
              dataOrderByCompletePercent={dataOrderByCompletePercent}
            />
          </Content>
        </CouncilContent>
      </CouncilContentWrap>
    </CouncilContainer>
  )
}
