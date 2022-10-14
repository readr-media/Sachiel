import React from 'react'
import styled from 'styled-components'
import theme from '~/styles/theme'

const TitleWrapper = styled.div`
  width: 100%;
`
const TitleTop = styled.div`
  display: flex;
`
const TitleInfo = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 20px 16px;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor.blue};
  ${({ theme }) => theme.breakpoint.md} {
    justify-content: center;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    border-color: ${({ theme }) => theme.borderColor.black};
    border-style: solid;
    border-width: 0 4px 4px;
  }
`

const Name = styled.h1`
  font-weight: 700;
  margin-left: 12px;
  color: ${({ theme }) => theme.textColor.white};
  ${({ theme }) => theme.fontSize['title-main']};
`

const TitleImage = styled.img`
  border-radius: 50%;
  border-color: ${({ theme }) => theme.borderColor.white};
  border-width: 2px;
  width: 60px;
  height: 60px;
  object-fit: cover;
`

const ColorBlock = styled.div`
  border-color: ${({ theme }) => theme.borderColor.black};
  background-color: ${({ color }) => color};
  border-style: solid;
`

const ColorBlockMobile = styled(ColorBlock)`
  flex-grow: 1;
  height: 24px;
  border-width: 4px 4px 4px 0;
  :last-of-type {
    border-width: 4px 0 4px;
  }
`

const ColorBlockDesktop = styled(ColorBlock)`
  width: 100%;
  height: 50%;
  border-width: 0 0 4px;
`

const TitleDecoration = styled.div``
const TitleDecorationMobile = styled.div`
  display: flex;
  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`

const TitleDecorationDesktop = styled(TitleDecoration)`
  display: none;
  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
    flex-direction: column;
    width: 256px;
  }
`

/**
 *
 * @param {Object} props
 * @param {Object} [props.titleData={}]
 * @param {null|string} [props.titleData.name]
 * @param {null|string} [props.titleData.image]
 * @returns {React.ReactElement}
 */
export default function Title({ titleData = {} }) {
  const { name, image } = titleData

  return (
    <TitleWrapper>
      <TitleTop>
        <TitleDecorationDesktop>
          <ColorBlockDesktop color={theme.backgroundColor.orange} />
          <ColorBlockDesktop color={theme.backgroundColor.yellow} />
        </TitleDecorationDesktop>
        <TitleInfo>
          <TitleImage src={image ? image : '/images/default-head-photo.png'} />
          <Name>{name}</Name>
        </TitleInfo>
        <TitleDecorationDesktop>
          <ColorBlockDesktop color={theme.backgroundColor.yellow} />
          <ColorBlockDesktop color={theme.backgroundColor.green} />
        </TitleDecorationDesktop>
      </TitleTop>

      <TitleDecorationMobile>
        <ColorBlockMobile color={theme.backgroundColor.orange} />
        <ColorBlockMobile color={theme.backgroundColor.yellow} />
        <ColorBlockMobile color={theme.backgroundColor.green} />
      </TitleDecorationMobile>
    </TitleWrapper>
  )
}
