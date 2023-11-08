import CustomImage from '@readr-media/react-image'
import React, { useState } from 'react'
import styled from 'styled-components'

import ArrowDown from '~/public/icons/arrow-down-yellow.svg'
import type { RelatedPost } from '~/types/landing'
import type { FactCheckPartner } from '~/types/politics-detail'
import { getFormattedDate } from '~/utils/utils'

const Wrapper = styled.div`
  width: 100%;
  padding: 40px 16px;
  background: ${({ theme }) => theme.backgroundColor.cornsilk};
  color: ${({ theme }) => theme.textColor.black};
  box-shadow: inset 0px -4px 0px ${({ theme }) => theme.borderColor.black};
`

const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 20px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 40px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 28px;
  }
`

const PostContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;

  ${({ theme }) => theme.breakpoint.md} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 40px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    gap: 40px;
    max-width: 1130px;
    margin: 0 auto 40px;
  }
`

const PostList = styled.li`
  border: 2px solid ${({ theme }) => theme.borderColor.black};
  background: ${({ theme }) => theme.backgroundColor.white};
  list-style: none;
  width: 100%;
  max-width: 338px;
  min-height: 265px;
  margin: auto;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.textColor.cornsilk};

    .readr-media-react-image {
      transform: scale(1.1);
      transition: all 0.3s ease;
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    margin: 0;
    min-height: 290px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 250px;
    min-height: 276px;
  }
`

const PostImage = styled.div`
  width: 100%;
  aspect-ratio: 2 / 1;
  overflow: hidden;

  .readr-media-react-image {
    transition: all 0.3s ease;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-height: 130px;
    min-height: 0;
  }
`

const PostInfo = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;

  .partners {
    line-height: 1.3;
    color: ${({ theme }) => theme.textColor.yellow};
  }

  .date {
    color: rgba(15, 45, 53, 0.5);
  }

  .title {
    height: 42px;
    overflow: hidden;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.3;
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 14px;
    line-height: 16px;

    .title {
      font-size: 18px;
      height: 69px;
      -webkit-line-clamp: 3;
    }
  }
`

const Button = styled.button`
  border-radius: 24px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  cursor: pointer;

  border: 2px solid ${({ theme }) => theme.borderColor.yellow};
  color: ${({ theme }) => theme.textColor.yellow};

  svg {
    margin-left: 5px;
  }

  &:hover {
    background: ${({ theme }) => theme.backgroundColor.white};
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 8px 30px;
    font-size: 18px;
  }
`

type RelatedPostsProps = {
  posts: RelatedPost[]
}
export default function RelatedPosts({
  posts = [],
}: RelatedPostsProps): JSX.Element | null {
  const [renderPosts, setRenderPosts] = useState<RelatedPost[]>(
    posts.slice(0, 4)
  )

  if (!posts.length) {
    return null
  }

  function jointPartnerName(partners: Pick<FactCheckPartner, 'id' | 'name'>[]) {
    const names = partners.map((partner) => partner.name)
    return names.join('、')
  }

  const postLists = renderPosts.map((item) => {
    const { id, url, name, ogIMage, createdAt, partner } = item
    const partnerStr = jointPartnerName(partner)

    return (
      <PostList key={id}>
        <a href={url ? url : '/'} target="_blank" rel="noopener noreferrer">
          <PostImage>
            <CustomImage
              images={{ original: ogIMage }}
              alt={item?.name}
              defaultImage="/images/default-post-photo.svg"
            />
          </PostImage>

          <PostInfo>
            {partnerStr && <span className="partners">{partnerStr}</span>}
            <p className="title">{name}</p>
            <span className="date">{getFormattedDate(createdAt)}</span>
          </PostInfo>
        </a>
      </PostList>
    )
  })

  const handleExpand = () => {
    const nextPosts = posts.slice(renderPosts.length, renderPosts.length + 8)
    setRenderPosts((prevPosts) => [...prevPosts, ...nextPosts])
  }

  const shouldShowExpandButton = renderPosts.length < posts.length

  return (
    <Wrapper>
      <Title>相關報導</Title>
      <PostContainer>{postLists}</PostContainer>

      {shouldShowExpandButton && (
        <Button onClick={handleExpand}>
          展開更多
          <ArrowDown />
        </Button>
      )}
    </Wrapper>
  )
}
