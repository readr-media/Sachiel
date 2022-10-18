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
  ${({ theme }) => theme.breakpoint.xl} {
    justify-content: flex-start;

    &:hover {
      cursor: inherit;
    }
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
    color: ${({ theme }) => theme.textColor.blue};
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
  div {
    color: ${({ theme }) => theme.textColor.blue};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 10px;
    border-right: 1px solid rgba(15, 45, 53, 0.3);
  }
`

const ItemWrap = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.lightPurple};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
`
const FilterBar = styled.div`
  width: 100%;
  box-shadow: inset 0px -2px 0px #000000;
  background: ${({ theme }) => theme.backgroundColor.lightPurple};
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
  //TODO:
  font-size: 14px;
  padding: 4px 8px;
  min-width: 86px;
  border-radius: 32px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.backgroundColor.highlightRed};
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

//FIXME: areaPersonData正確用法應該是要{}
export default function CouncilContent() {
  //TODO: 這邊放暫時的資料
  const district = [
    '第01選舉區',
    '第02選舉區',
    '第03選舉區',
    '第04選舉區',
    '第05選舉區',
  ]

  // @ts-ignore
  function toggle(e) {
    console.log(e.currentTarget.children[1].style.transform)
    if (e.currentTarget.nextElementSibling.style.display === 'none') {
      e.currentTarget.nextElementSibling.style.display = 'block'
    } else {
      e.currentTarget.nextElementSibling.style.display = 'none'
    }
  }

  return (
    <CouncilWrap>
      <FilterBar>
        <div>
          <h5>地區</h5>
        </div>
        <div>
          <h5>進度</h5>
          <Image
            alt="arrowPurple"
            src="/landingpage/arrow_purple_down.svg"
            width="20"
            height="20"
          />
        </div>
        <h4>補坑狀況</h4>
      </FilterBar>
      {district.map((district) => {
        return (
          <ItemWrap key={district}>
            <DistrictTitle onClick={toggle}>
              <Title>
                <h4>{district}</h4>
                <TitleImg>
                  <Image
                    alt="arrowDownPurple"
                    src="/landingpage/arrow_down_purple.svg"
                    width="20"
                    height="20"
                  />
                </TitleImg>
              </Title>
              <h5>0/4</h5>

              <DistrictContentDesk>
                <DeskList>
                  <SubtitleButtonDesk color={'highlightRed'}>
                    還沒有政見
                  </SubtitleButtonDesk>
                  <ListWrapDesk>
                    <div>張家豪</div>
                    <div>張家豪</div>
                    <div>張家豪</div>
                  </ListWrapDesk>
                </DeskList>
                <DeskList>
                  <SubtitleButtonDesk color={'orange'}>
                    政見還很少
                  </SubtitleButtonDesk>
                  <ListWrapDesk>
                    <div>
                      <Link href="#">
                        <span>張家豪</span>
                      </Link>
                    </div>
                    <div>
                      <Link href="#">
                        <span>張家豪</span>
                      </Link>
                    </div>
                    <div>
                      <Link href="#">
                        <span>張家豪</span>
                      </Link>
                    </div>
                  </ListWrapDesk>
                </DeskList>
                <DeskList>
                  <SubtitleButtonDesk color={'green'}>
                    超過20條政見
                  </SubtitleButtonDesk>
                  <ListWrapDesk>
                    <div>
                      <Link href="#">
                        <span>張家豪</span>
                      </Link>
                    </div>
                    <div>
                      <Link href="#">
                        <span>張家豪</span>
                      </Link>
                    </div>
                    <div>
                      <Link href="#">
                        <span>張家豪</span>
                      </Link>
                    </div>
                  </ListWrapDesk>
                </DeskList>
              </DistrictContentDesk>
            </DistrictTitle>
            <DistrictContent style={{ display: 'none' }}>
              <SubtitleButton color={'highlightRed'}>還沒有政見</SubtitleButton>
              <ListWrap>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <span>蔡依靜 Lamen. Panay</span>
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <span>何進雄 Kin Cian.Ri Pun</span>
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
              </ListWrap>

              <SubtitleButton color={'orange'}>政見還很少</SubtitleButton>
              <ListWrap>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
              </ListWrap>

              <SubtitleButton color={'green'}>超過20條政見</SubtitleButton>
              <ListWrap>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <span>張家豪</span>
                  </Link>
                </div>
              </ListWrap>
            </DistrictContent>
          </ItemWrap>
        )
      })}
    </CouncilWrap>
  )
}
