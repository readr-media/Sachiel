import Image from 'next/future/image'
import React, { useState } from 'react'
import styled from 'styled-components'

import theme from '~/styles/theme'

import ProfileImage from './profile-image'

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

const TitleProfileImage = styled(ProfileImage)`
  min-width: 60px;
  min-height: 60px;
  img {
    object-fit: cover;
  }
  ${({ theme }) => theme.breakpoint.md} {
    min-width: 80px;
    min-height: 80px;
  }
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
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.image
 * @returns {React.ReactElement}
 */
export default function Title({ name, image }) {
  const [showImage, setShowImage] = useState(true)

  return (
    <TitleWrapper>
      <TitleTop>
        <TitleDecorationDesktop>
          <ColorBlockDesktop color={theme.backgroundColor.orange} />
          <ColorBlockDesktop color={theme.backgroundColor.yellow} />
        </TitleDecorationDesktop>
        <TitleInfo>
          {image && showImage ? (
            <TitleProfileImage>
              <Image
                alt=""
                src={image}
                fill
                // layout="fill"
                // obejectFit="cover"
                onError={() => {
                  setShowImage(false)
                }}
              />
            </TitleProfileImage>
          ) : (
            <TitleProfileImage>
              <Image alt="" src="/images/default-head-photo.png" fill />
            </TitleProfileImage>
          )}
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
