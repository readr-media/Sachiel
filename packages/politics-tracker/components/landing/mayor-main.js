import React, { useState } from 'react'
import styled from 'styled-components'
import MayorList from '~/components/landing/mayor-content'

const CouncilContainer = styled.div`
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
const CouncilContentWrap = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.landingGreen};
  box-shadow: inset 0px -4px 0px #000000;
`
const TitleWrap = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.breakpoint.xl} {
    height: 64px;
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

const SideBar = styled.div`
  padding: 16px 8px 20px;
  box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  width: 40px;
  height: 100%;
  background: ${({ theme }) => theme.backgroundColor.landingYellow};
  h3 {
    font-weight: 900;
    color: ${({ theme }) => theme.textColor.pink};
    /* TODO: 建檔成theme variable */
    font-size: 48px;
    transform: rotate(90deg);
    display: none;
  }
  ${({ theme }) => theme.breakpoint.xxl} {
    width: 6vw;
    box-shadow: inset -4px 0px 0px #000000;
    h3 {
      display: block;
    }
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
    max-width: 1100px;
    width: 100%;
    margin: auto;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${({ theme }) => theme.breakpoint.md} {
      justify-content: center;
    }
  }
  ul li a {
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
    margin: 15px 6px;
    ${({ theme }) => theme.breakpoint.md} {
      margin: 20px 5px;
    }
    ${({ theme }) => theme.breakpoint.xl} {
      margin: 20px 5px;
    }
  }

  ul li a:not(.press):hover {
    cursor: pointer;
    background: ${({ theme }) => theme.backgroundColor.landingGreen};
  }

  ul li a.active {
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
const ContentSide = styled.div`
  background: ${({ theme }) => theme.backgroundColor.landingYellow};
  display: none;
  ${({ theme }) => theme.breakpoint.xxl} {
    min-width: 86.5px;
    display: block;
    width: 6vw;
    box-shadow: inset -4px 0px 0px #000000;
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
  //直接先生一筆lowtohigh的資料群再去map
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
  // 一開始沒有被按的項目, active全為false
  const firstRender = [...defaultMenuItems]
  firstRender[0].active = true
  const [menuItems, setMenuItems] = useState(firstRender)
  const [mayorRegion, setMayorRegion] = useState(0)

  return (
    <CouncilContainer>
      <span id="mayor"></span>
      <CouncilContentWrap>
        <TitleWrap>
          <SideBar>
            <h3>#Process</h3>
          </SideBar>
          <SubTitle>補坑進度：縣市長政見</SubTitle>
        </TitleWrap>
        <CouncilContent>
          <ContentSide />
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
                            <a href="#/" className="press">
                              {v.name}
                              <span>
                                ( {v.amount} / {v.total} )
                              </span>
                            </a>
                          ) : (
                            <a href="#/" className="nopress">
                              {v.name}
                              <span>
                                ( {v.amount} / {v.total} )
                              </span>
                            </a>
                          )}
                        </li>
                      )
                    }
                  )}
                </ul>
              </ButtonGroup>
            </ButtonWrap>
            <MayorList
              mayorRegion={mayorRegion}
              dataOrderByCompletePercent={dataOrderByCompletePercent}
            />
          </Content>
        </CouncilContent>
      </CouncilContentWrap>
    </CouncilContainer>
  )
}
