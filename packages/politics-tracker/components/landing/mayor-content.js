import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

const DistrictTitle = styled.div`
  width: 100%;
  padding: 10px 15px;
  color: ${({ theme }) => theme.textColor.black};
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  display: flex;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }

  p {
    color: ${({ theme }) => theme.backgroundColor.highlightRed};
  }
  h5 {
    color: ${({ theme }) => theme.textColor.black};
  }

  ${({ theme }) => theme.breakpoint.xl} {
    justify-content: flex-start;

    &:hover {
      cursor: inherit;
    }
    p,
    h5 {
      width: 10%;
      text-align: center;
    }
  }
`
const Title = styled.div`
  display: flex;
  ${({ theme }) => theme.breakpoint.xl} {
    width: 12%;
  }
`
const TitleImg = styled.div`
  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`
const DistrictContent = styled.span`
  padding: 10px 15px;
  ${({ theme }) => theme.breakpoint.xl} {
    display: none !important;
  }
`
const ListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  div {
    border-right: 1px solid rgba(15, 45, 53, 0.3);
    margin-bottom: 15px;
  }
  span {
    color: ${({ theme }) => theme.textColor.green};
    font-size: 16px;
    margin: 0px 10px;
    cursor: pointer;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    span {
      font-size: 18px;
    }
  }
`
const ListWrapDesk = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  font-size: 18px;
  max-width: 814px;
  padding: 0px;
  font-size: 18px;
  flex-wrap: wrap;
  div {
    color: ${({ theme }) => theme.textColor.green};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 10px;
    border-right: 1px solid rgba(15, 45, 53, 0.3);
    margin: 5px 0px;
  }
  div:hover {
    cursor: pointer;
  }
`

const ItemWrap = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.greenLake};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
`
const FilterBar = styled.div`
  width: 100%;
  box-shadow: inset 0px -2px 0px #000000;
  background: ${({ theme }) => theme.backgroundColor.greenLake};
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
      width: 12%;
    }
    h4 {
      display: block;
    }
    span {
      display: none;
    }
  }
`
const SubtitleButton = styled.button`
  padding: 4px 10px;
  background-color: ${({ theme }) => theme.backgroundColor.highlightRed};
  border-radius: 32px;
  color: ${({ theme }) => theme.backgroundColor.white};
  font-weight: 500;
  //TODO:
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`
const SubtitleButtonDesk = styled.div`
  color: ${({ theme }) => theme.backgroundColor.white};
  font-weight: 500;
  max-height: 24px;
  //TODO:
  font-size: 14px;
  padding: 4px 8px;
  min-width: 86px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.backgroundColor.highlightRed};
  margin: 5px 10px 0px 0px;
`

const DistrictContentDesk = styled.div`
  width: 100%;
  display: none;
  padding-left: 50px;
  ${({ theme }) => theme.breakpoint.xl} {
    display: block;
  }
`
const DeskList = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 15px;
`
const CouncilWrap = styled.div`
  max-width: 1230px;
  margin: auto;
`
/**
 *
 * @returns {React.ReactElement}
 */

// @ts-ignore
export default function MayorContent({ propsData, mayorRegion }) {
  // @ts-ignore
  function toggle(e) {
    if (e.currentTarget.nextElementSibling.style.display === 'none') {
      e.currentTarget.nextElementSibling.style.display = 'block'
    } else {
      e.currentTarget.nextElementSibling.style.display = 'none'
    }
  }

  const newPropsData = JSON.parse(JSON.stringify(propsData))
  const rawDatas = newPropsData['mayorAndPolitics'][mayorRegion].areas

  const [sortWay, setSortWay] = useState(true)

  // @ts-ignore
  const lowToHigh = (datas) => {
    return [...datas].sort((a, b) => {
      return b?.done / b?.total - a?.done / a?.total
    })
  }
  // @ts-ignore
  const HighToLow = (datas) => {
    return [...datas].sort((a, b) => {
      return a?.done / a?.total - b?.done / b?.total
    })
  }

  const sortDatas = sortWay ? lowToHigh(rawDatas) : HighToLow(rawDatas)

  return (
    <CouncilWrap>
      <FilterBar>
        <div>
          <h5>縣市名</h5>
        </div>
        <div>
          <h5>進度</h5>
          <Image
            alt="arrowGreen"
            src="/landingpage/arrow_green_down.svg"
            width="20"
            height="20"
            onClick={() => {
              setSortWay(!sortWay)
            }}
          />
        </div>
        <h4>補坑狀況</h4>
      </FilterBar>
      {sortDatas.map((v, i) => {
        return (
          <ItemWrap key={v.name}>
            {/* FIXME: toggle effect*/}
            {/* <DistrictTitle onClick={toggle}> */}
            <DistrictTitle>
              <Title>
                <h4>{v.name}</h4>
                <TitleImg onClick={() => {}}>
                  <Image
                    alt="arrowDownGreen"
                    src="/landingpage/arrow_down_green.svg"
                    width="20"
                    height="20"
                  />
                </TitleImg>
              </Title>
              {/* FIXME: 尚未處理政見all的顏色變化 */}
              {v.done === 0 ? (
                <p>
                  {v.done}/{v.total}
                </p>
              ) : (
                <h5>
                  {v.done}/{v.total}
                </h5>
              )}

              <DistrictContentDesk>
                {v.candidates
                  // @ts-ignore
                  .filter(
                    // @ts-ignore
                    (candidate) => candidate.done === 0
                  ).length !== 0 ? (
                  <DeskList>
                    <SubtitleButtonDesk color={'orange'}>
                      還沒有政見
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
                    <SubtitleButtonDesk color={'orange'}>
                      政見還很少
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
                    <SubtitleButtonDesk color={'orange'}>
                      超過20條政見
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
            </DistrictTitle>

            {/* <DistrictContent style={{ display: 'none' }}>
              <SubtitleButton>還沒有政見</SubtitleButton>
              <ListWrap>
                <div>
                  <Link href="#">
                    <span>蔡依靜 Lamen. Panay</span>
                  </Link>
                </div>
              </ListWrap>

              <SubtitleButton>政見還很少</SubtitleButton>
              <ListWrap>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
              </ListWrap>

              <SubtitleButton>超過20條政見</SubtitleButton>
              <ListWrap>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
              </ListWrap>
            </DistrictContent> */}
          </ItemWrap>
        )
      })}
    </CouncilWrap>
  )
}
