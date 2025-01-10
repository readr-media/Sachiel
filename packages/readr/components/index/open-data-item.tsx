// 開放資料庫項目

import SharedImage from '@readr-media/react-image'
import NextLink from 'next/link'
import styled from 'styled-components'

import type { DataSetItem } from '~/types/component'
import * as gtag from '~/utils/gtag'

const Container = styled.article`
  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const Title = styled(NextLink)`
  display: inline-block;
  margin-bottom: 18px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 0;
  }

  > * {
    font-weight: 700;
    letter-spacing: 2.5px;
    text-decoration: underline;
  }
`

const GalleryList = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${({ theme }) => theme.breakpoint.md} {
    flex: 0 0 auto;
  }

  span {
    margin-right: 10px;
    font-size: 13px;
    line-height: 1.4;
  }

  a {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;

    ${({ theme }) => theme.breakpoint.md} {
      width: 44px;
      height: 44px;
    }

    + a {
      margin-left: 6.5px;
      ${({ theme }) => theme.breakpoint.md} {
        margin-left: 18px;
      }
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

const Control = styled(NextLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebe3ff;
`

const IconPlus = styled.div`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;

  ${({ theme }) => theme.breakpoint.md} {
    width: 20px;
    height: 20px;
  }

  span {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000928;

    &:first-child {
      width: 100%;
      height: 4px;
    }
    &:last-child {
      width: 4px;
      height: 100%;
    }
  }
`

type OpenDataItemProps = Omit<DataSetItem, 'id'>

export default function OpenDataItem({
  href = '/',
  title,
  writerName,
  galleries,
}: OpenDataItemProps): JSX.Element {
  const galleryText = writerName ? `${writerName}這樣用` : '分享你怎麼用'
  const addDataLink = 'https://forms.gle/2JKrGUfherYagj3P6'

  const galleryItems = galleries.map((item) => (
    <NextLink
      key={item.id}
      href={item.href ?? '/'}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SharedImage
        images={item.images}
        alt={`使用${title}的案例`}
        defaultImage={'/icons/default/database.svg'}
      />
    </NextLink>
  ))

  return (
    <Container>
      <Title
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => gtag.sendEvent('hompage', 'click', `opendata-${title}`)}
      >
        <h3>{title}</h3>
      </Title>
      <GalleryList>
        <span>{galleryText}</span>
        {galleryItems}
        <Control
          href={addDataLink}
          target="_blank"
          rel="noopener noreferrer"
          title="READr 使用資料作品分享"
        >
          <IconPlus>
            <span />
            <span />
          </IconPlus>
        </Control>
      </GalleryList>
    </Container>
  )
}
