import React, { useState, Fragment, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

const DistrictInforBox = styled.div`
  width: 100%;
  padding: 10px 20px 10px 15px;
  color: ${({ theme }) => theme.textColor.black};
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  &:hover {
    cursor: pointer;
  }

  p {
    color: ${({ theme }) => theme.backgroundColor.highlightRed};
  }
  h5 {
    color: ${({ theme }) => theme.textColor.black};
  }
  h3 {
    color: ${({ theme }) => theme.textColor.green};
  }

  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
    justify-content: flex-start;

    &:hover {
      cursor: inherit;
    }
    p,
    h5,
    h3 {
      width: 10%;
      text-align: center;
    }
  }
`
const Title = styled.div`
  display: flex;

  h4 {
    font-weight: 500;
    margin-right: 5px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    h4 {
      min-width: 130px;
    }
  }
`
const ListWrapDesk = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  font-size: 16px;
  max-width: 814px;
  padding: 0px;
  flex-wrap: wrap;
  div {
    color: ${({ theme }) => theme.textColor.green};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 10px 0px 0px;
    border-right: 1px solid rgba(15, 45, 53, 0.3);
    margin: 5px 10px 5px 0px;
  }

  div:hover {
    cursor: pointer;
    text-decoration-line: underline;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: none;
  }
`

const ItemWrap = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.landingGreen};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
`
const FilterBar = styled.div`
  width: 100%;
  box-shadow: inset 0px -2px 0px #000000;
  background: ${({ theme }) => theme.backgroundColor.landingGreen};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 5px 15px;
  h5 {
    margin: 0px 3px 2px 0px;
  }
  div {
    display: flex;
    align-items: center;

    span {
      margin-top: 15px;
      display: block;
    }
  }
  h4 {
    display: none;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    justify-content: flex-start;
    div {
      width: 130px;
      margin-right: 5px;
    }
    h4 {
      display: block;
    }
    span {
      display: none;
    }
  }
`
const HoverWrap = styled.div`
  max-width: 58px;
  padding-left: 3px;
  user-select: none;
  -webkit-user-drag: none;
  &:hover {
    cursor: pointer;
    background-color: rgba(15, 45, 53, 0.05);
  }
`
const SubtitleButtonDesk = styled.div`
  font-weight: 500;
  //TODO:
  font-size: 12px;
  padding: 4px 8px 4px 0px;
  display: flex;
  align-items: center;
  p {
    color: ${({ theme }) => theme.backgroundColor.white};
    padding: 4px 8px;
    border-radius: 32px;
    margin: 5px 10px 5px 0px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    padding: 0px;
    margin-right: 15px;
    display: block;

    p {
      min-width: 86px;
      width: 100%;
      padding: 4px 6px;
      max-height: 29px;
    }
  }
`

const DistrictContentDesk = styled.div`
  width: 100%;
  ${({ theme }) => theme.breakpoint.xl} {
    padding-left: 30px;
    display: block !important;
  }
`
const DeskList = styled.div`
  width: 100%;
  padding-top: 10px;
  margin-bottom: 5px;
  ${({ theme }) => theme.breakpoint.xl} {
    padding: 0px;
    display: flex;
  }
`
const MayorWrap = styled.div`
  max-width: 1230px;
  margin: auto;
`

const SubtitleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  p,
  h3,
  h5 {
    margin-left: 10px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 25%;
    justify-content: flex-start;
    padding-top: 5px;
  }
`

const ItemGroup = styled.div`
  > div:nth-child(odd) {
    background: ${({ theme }) => theme.backgroundColor.landingGreen};
  }
  > div:nth-child(even) {
    background: ${({ theme }) => theme.backgroundColor.greenLake};
  }
`
const TitleImg = styled.div`
  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`
// @ts-ignore
export default function MayorContent({
  // @ts-ignore
  dataOrderByCompletePercent,
  // @ts-ignore
  mayorRegion,
}) {
  const newDataOrderByCompletePercent = JSON.parse(
    JSON.stringify(dataOrderByCompletePercent)
  )
  const rawDatas = newDataOrderByCompletePercent[mayorRegion].areas

  const [sortWay, setSortWay] = useState(true)
  const [arrowToggle, setArrowToggle] = useState(true)

  // @ts-ignore
  const HighToLow = (datas) => {
    return [...datas].sort((a, b) => {
      return b?.done / b?.total - a?.done / a?.total
    })
  }
  // @ts-ignore
  const lowToHigh = (datas) => {
    return [...datas].sort((a, b) => {
      return a?.done / a?.total - b?.done / b?.total
    })
  }

  const sortDatas = sortWay ? lowToHigh(rawDatas) : HighToLow(rawDatas)
  const sortDataWithActive = sortDatas.map((data) => ({
    ...data,
    active: false,
  }))

  const [activeData, setActiveData] = useState(sortDataWithActive)

  useEffect(() => {
    setActiveData(sortDataWithActive)
  }, [mayorRegion, sortWay])

  // @ts-ignore
  function clickChangeIcon(id) {
    setActiveData((pre) => {
      return pre.map((data) => {
        if (window.innerWidth >= 1200) {
          return { ...data, active: true }
        } else if (data.id === id) {
          return { ...data, active: !data.active }
        } else {
          return data
        }
      })
    })
  }

  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    // @ts-ignore
    setIsDesktop(window.innerWidth >= 1200)
    function resizeChangeIcon() {
      // @ts-ignore
      setIsDesktop((pre) => {
        if (window.innerWidth >= 1200) {
          return true
        } else {
          return false
        }
      })
    }
    window.addEventListener('resize', resizeChangeIcon)
    return () => {
      window.removeEventListener('resize', resizeChangeIcon)
    }
  }, [])

  return (
    <MayorWrap>
      <FilterBar>
        <div>
          <h5>縣市名</h5>
        </div>
        <div
          onClick={() => {
            setSortWay(!sortWay)
            setArrowToggle(!arrowToggle)
          }}
        >
          <HoverWrap>
            <h5>進度</h5>
            {arrowToggle ? (
              <Image
                alt="arrowGreen"
                src="/landingpage/arrow_green_down.svg"
                width="20"
                height="20"
                onClick={() => {}}
              />
            ) : (
              <Image
                alt="arrowGreen"
                src="/landingpage/arrow_green_up.svg"
                width="20"
                height="20"
                onClick={() => {}}
              />
            )}
          </HoverWrap>
        </div>
        <h4>補坑狀況</h4>
      </FilterBar>
      <ItemGroup>
        {activeData.map((v, i) => {
          return (
            <ItemWrap key={v.name}>
              <DistrictInforBox>
                <SubtitleWrap
                  key={v.id}
                  id={v.name}
                  onClick={() => {
                    clickChangeIcon(v.id)
                  }}
                >
                  <Title>
                    <h4>{v.name}</h4>
                    <TitleImg onClick={() => {}}>
                      {v.active ? (
                        <Image
                          alt="arrowDownPurple"
                          src="/landingpage/arrow_up_green.svg"
                          width="20"
                          height="20"
                        />
                      ) : (
                        <Image
                          alt="arrowDownPurple"
                          src="/landingpage/arrow_down_green.svg"
                          width="20"
                          height="20"
                        />
                      )}
                    </TitleImg>
                  </Title>

                  {v.done === 0 ? (
                    <p>
                      {v.done}/{v.total}
                    </p>
                  ) : v.done === v.total ? (
                    <h3>
                      {v.done}/{v.total}
                    </h3>
                  ) : (
                    <h5>
                      {v.done}/{v.total}
                    </h5>
                  )}
                </SubtitleWrap>

                {isDesktop ? (
                  <DistrictContentDesk style={{ display: 'block' }}>
                    {v.candidates
                      // @ts-ignore
                      .filter(
                        // @ts-ignore
                        (candidate) => candidate.done === 0
                      ).length !== 0 ? (
                      <DeskList>
                        <SubtitleButtonDesk>
                          <p style={{ backgroundColor: '#DB4C65' }}>
                            還沒有政見
                          </p>
                        </SubtitleButtonDesk>
                        <ListWrapDesk>
                          {v.candidates
                            .filter(
                              // @ts-ignore
                              (candidate) => candidate.done === 0
                            )
                            // @ts-ignore
                            .map((value) => {
                              return (
                                <Link
                                  href={{
                                    pathname: `politics/[personId]`,
                                  }}
                                  as={`/politics/${value.id}`}
                                  key={value.name}
                                >
                                  <div>{value.name}</div>
                                </Link>
                              )
                            })}
                        </ListWrapDesk>
                      </DeskList>
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {v.candidates
                      // @ts-ignore
                      .filter(
                        // @ts-ignore
                        (candidate) => candidate.done < 20 && candidate.done > 0
                      ).length !== 0 ? (
                      <DeskList>
                        <SubtitleButtonDesk>
                          <p style={{ backgroundColor: '#F58439' }}>
                            政見還很少
                          </p>
                        </SubtitleButtonDesk>
                        <ListWrapDesk>
                          {v.candidates
                            .filter(
                              // @ts-ignore
                              (candidate) =>
                                candidate.done < 20 && candidate.done > 0
                            )
                            // @ts-ignore
                            .map((value) => {
                              return (
                                <Link
                                  href={{
                                    pathname: `politics/[personId]`,
                                  }}
                                  as={`/politics/${value.id}`}
                                  key={value.name}
                                >
                                  <div>{value.name}</div>
                                </Link>
                              )
                            })}
                        </ListWrapDesk>
                      </DeskList>
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {v.candidates
                      // @ts-ignore
                      .filter(
                        // @ts-ignore
                        (candidate) => candidate.done > 20
                      ).length !== 0 ? (
                      <DeskList>
                        <SubtitleButtonDesk>
                          <p style={{ backgroundColor: '#2FB7BF' }}>
                            超過20條政見
                          </p>
                        </SubtitleButtonDesk>
                        <ListWrapDesk>
                          {v.candidates
                            .filter(
                              // @ts-ignore
                              (candidate) => candidate.done > 20
                            )
                            // @ts-ignore
                            .map((value) => {
                              return (
                                <Link
                                  href={{
                                    pathname: `politics/[personId]`,
                                  }}
                                  as={`/politics/${value.id}`}
                                  key={value.name}
                                >
                                  <div>{value.name}</div>
                                </Link>
                              )
                            })}
                        </ListWrapDesk>
                      </DeskList>
                    ) : (
                      <Fragment></Fragment>
                    )}
                  </DistrictContentDesk>
                ) : v.active ? (
                  <DistrictContentDesk style={{ display: 'block' }}>
                    {v.candidates
                      // @ts-ignore
                      .filter(
                        // @ts-ignore
                        (candidate) => candidate.done === 0
                      ).length !== 0 ? (
                      <DeskList>
                        <SubtitleButtonDesk>
                          <p style={{ backgroundColor: '#DB4C65' }}>
                            還沒有政見
                          </p>
                        </SubtitleButtonDesk>
                        <ListWrapDesk>
                          {v.candidates
                            .filter(
                              // @ts-ignore
                              (candidate) => candidate.done === 0
                            )
                            // @ts-ignore
                            .map((value) => {
                              return (
                                <Link
                                  href={{
                                    pathname: `politics/[personId]`,
                                  }}
                                  as={`/politics/${value.id}`}
                                  key={value.name}
                                >
                                  <div>{value.name}</div>
                                </Link>
                              )
                            })}
                        </ListWrapDesk>
                      </DeskList>
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {v.candidates
                      // @ts-ignore
                      .filter(
                        // @ts-ignore
                        (candidate) => candidate.done < 20 && candidate.done > 0
                      ).length !== 0 ? (
                      <DeskList>
                        <SubtitleButtonDesk>
                          <p style={{ backgroundColor: '#F58439' }}>
                            政見還很少
                          </p>
                        </SubtitleButtonDesk>
                        <ListWrapDesk>
                          {v.candidates
                            .filter(
                              // @ts-ignore
                              (candidate) =>
                                candidate.done < 20 && candidate.done > 0
                            )
                            // @ts-ignore
                            .map((value) => {
                              return (
                                <Link
                                  href={{
                                    pathname: `politics/[personId]`,
                                  }}
                                  as={`/politics/${value.id}`}
                                  key={value.name}
                                >
                                  <div>{value.name}</div>
                                </Link>
                              )
                            })}
                        </ListWrapDesk>
                      </DeskList>
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {v.candidates
                      // @ts-ignore
                      .filter(
                        // @ts-ignore
                        (candidate) => candidate.done > 20
                      ).length !== 0 ? (
                      <DeskList>
                        <SubtitleButtonDesk>
                          <p style={{ backgroundColor: '#2FB7BF' }}>
                            超過20條政見
                          </p>
                        </SubtitleButtonDesk>
                        <ListWrapDesk>
                          {v.candidates
                            .filter(
                              // @ts-ignore
                              (candidate) => candidate.done > 20
                            )
                            // @ts-ignore
                            .map((value) => {
                              return (
                                <Link
                                  href={{
                                    pathname: `politics/[personId]`,
                                  }}
                                  as={`/politics/${value.id}`}
                                  key={value.name}
                                >
                                  <div>{value.name}</div>
                                </Link>
                              )
                            })}
                        </ListWrapDesk>
                      </DeskList>
                    ) : (
                      <Fragment></Fragment>
                    )}
                  </DistrictContentDesk>
                ) : (
                  <DistrictContentDesk
                    style={{ display: 'none' }}
                  ></DistrictContentDesk>
                )}
              </DistrictInforBox>
            </ItemWrap>
          )
        })}
      </ItemGroup>
    </MayorWrap>
  )
}
