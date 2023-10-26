import React, { useState } from 'react'
import styled from 'styled-components'

import MayorContent from '~/components/landing/election-2022/mayor-content'

const MayorContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;

  #mayor {
    position: absolute;
    top: -64px;
    visibility: hidden;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    #mayor {
      top: -80px;
    }
  }
`
const MayorSideBar = styled.div`
  display: none;
  ${({ theme }) => theme.breakpoint.xxl} {
    display: block;
    width: 6vw;
    background: #f7ba31;
    box-shadow: inset -4px 0px 0px #000000;
    padding-top: 40px;

    h3 {
      display: block;
      font-weight: 900;
      color: #fff1e8;
      font-size: 48px;
      transform: rotate(90deg);
    }
  }
`
const MayorContentWrap = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.landingGreen};
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
  background: ${({ theme }) => theme.textColor.green};
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
  max-width: 1230px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 0px 15px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px 10px;
  }

  ul {
    min-width: 250px;
    max-width: 270px;
    width: 100%;
    margin: auto;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${({ theme }) => theme.breakpoint.md} {
      justify-content: center;
      max-width: 1100px;
    }
  }
  ul li button {
    text-decoration: none;
    background: ${({ theme }) => theme.backgroundColor.white};
    color: ${({ theme }) => theme.textColor.green};
    padding: 10px 20px;
    font-weight: 500;
    font-size: 14px;
    padding: 8px 15px;
    border-radius: 32px;
    line-height: 1.3;
    border: 1px solid ${({ theme }) => theme.textColor.green};
    ${({ theme }) => theme.breakpoint.md} {
      font-size: 18px;
      padding: 8px 12px;
    }
  }
  li {
    margin: 20px 6px 0px 6px;
    ${({ theme }) => theme.breakpoint.md} {
      margin: 20px 5px;
    }
    ${({ theme }) => theme.breakpoint.xl} {
      margin: 20px 5px;
    }
  }

  ul li button:not(.press):hover {
    cursor: pointer;
    background: ${({ theme }) => theme.backgroundColor.landingGreen};
  }

  ul li button.active {
    cursor: pointer;
    color: ${({ theme }) => theme.textColor.white};
    background: ${({ theme }) => theme.textColor.green};
    box-shadow: 0px 2px 20px rgba(131, 121, 248, 0.1),
      0px 2px 4px rgba(131, 121, 248, 0.5);
  }

  .press {
    cursor: pointer;
    color: ${({ theme }) => theme.textColor.white};
    background: ${({ theme }) => theme.textColor.green};
    box-shadow: 0px 2px 20px rgba(131, 121, 248, 0.1),
      0px 2px 4px rgba(131, 121, 248, 0.5);
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
/**
 *
 * @returns {React.ReactElement}
 */

// @ts-ignore
export default function MayorMain({ propsData }) {
  const newPropsData = JSON.parse(JSON.stringify(propsData))
  const rawDatas = newPropsData['mayorAndPolitics']

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
  const [mayorRegion, setMayorRegion] = useState(0)

  return (
    <MayorContainer>
      <span id="mayor"></span>
      <MayorSideBar>
        <h3>#Process</h3>
      </MayorSideBar>
      <MayorContentWrap>
        <TitleWrap>
          <div></div>
          <SubTitle>補坑進度：縣市長政見</SubTitle>
        </TitleWrap>
        <CouncilContent>
          <Content>
            <ButtonWrap>
              <ButtonGroup>
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
                            const newMenuItems = firstRender.map((v, index) => {
                              if (i === 0) {
                                v = { ...v, active: false }
                              }
                              if (i === index) return { ...v, active: true }
                              return v
                            })

                            setMenuItems(newMenuItems)
                            setMayorRegion(i)
                          }}
                        >
                          {v.active ? (
                            <button className="press">
                              {v.name}
                              <span>
                                ( {v.amount} / {v.total} )
                              </span>
                            </button>
                          ) : (
                            <button className="nopress">
                              {v.name}
                              <span>
                                ( {v.amount} / {v.total} )
                              </span>
                            </button>
                          )}
                        </li>
                      )
                    }
                  )}
                </ul>
              </ButtonGroup>
            </ButtonWrap>
            <MayorContent
              mayorRegion={mayorRegion}
              dataOrderByCompletePercent={dataOrderByCompletePercent}
            />
          </Content>
        </CouncilContent>
      </MayorContentWrap>
    </MayorContainer>
  )
}
