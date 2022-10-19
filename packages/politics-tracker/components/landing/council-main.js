import React, { useState } from 'react'
import styled from 'styled-components'
import CouncilList from '~/components/landing/council-content'

const CouncilContainer = styled.div`
  width: 100%;
  display: flex;
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
  ${({ theme }) => theme.breakpoint.xl} {
    height: 64px;
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

const SideBar = styled.div`
  padding: 16px 8px 20px;
  box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  width: 40px;
  height: 100%;
  background: ${({ theme }) => theme.backgroundColor.landingYellow};
  ${({ theme }) => theme.breakpoint.xxl} {
    width: 6vw;
    box-shadow: inset -4px 0px 0px #000000;
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 20px 15px;
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
    color: ${({ theme }) => theme.textColor.blue};
    padding: 10px 20px;
    font-weight: 500;
    font-size: 14px;
    padding: 8px 15px;
    border-radius: 32px;
    line-height: 1.3;
    border: 1px solid ${({ theme }) => theme.textColor.blue};
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
      margin: 20px 3px;
    }
  }

  ul li a:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.textColor.blue};
    background: ${({ theme }) => theme.backgroundColor.lightPurple};
  }

  .active {
    cursor: pointer;
    color: ${({ theme }) => theme.textColor.white};
    background: ${({ theme }) => theme.textColor.blue};
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
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  }
`
const Content = styled.div`
  width: 100%;
  padding-bottom: 20px;
`
/**
 *
 * @returns {React.ReactElement}
 */

// @ts-ignore
export default function CouncilMain({ propsData }) {
  /**
   *
   * @param {Object[]} cityItems
   */
  const initState = (cityItems) => {
    const menuItems = []
    for (let i = 0; i < cityItems.length; i++) {
      menuItems.push({
        id: i + 1,
        name: cityItems[i],
        active: false,
      })
    }
    return menuItems
  }

  const defaultCouncilPolitics = initState(propsData['councilorAndPolitics'])
  // 一開始沒有被按的項目, active全為false
  const [menuItems, setMenuItems] = useState(defaultCouncilPolitics)
  const [councilRegion, setCouncilRegion] = useState(0)

  return (
    <CouncilContainer id="councilTitle">
      <CouncilContentWrap>
        <TitleWrap>
          <SideBar />
          <SubTitle>補坑進度：縣市議員政見</SubTitle>
        </TitleWrap>
        <CouncilContent>
          <ContentSide />
          <Content>
            <ButtonWrap>
              <ButtonGroup>
                <ul>
                  {propsData['councilorAndPolitics'].map(
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
                            const newMenuItems = defaultCouncilPolitics.map(
                              (v, index) => {
                                if (i === index) return { ...v, active: true }

                                return v
                              }
                            )

                            setMenuItems(newMenuItems)
                            setCouncilRegion(i)
                          }}
                        >
                          <a href="#/" className={v.active ? 'active' : ''}>
                            {v.name}{' '}
                            <span>
                              ( {v.amount} / {v.total} )
                            </span>
                          </a>
                        </li>
                      )
                    }
                  )}
                </ul>
              </ButtonGroup>
            </ButtonWrap>
            <CouncilList
              // @ts-ignore
              councilRegion={councilRegion}
              propsData={propsData}
            />
          </Content>
        </CouncilContent>
      </CouncilContentWrap>
    </CouncilContainer>
  )
}
