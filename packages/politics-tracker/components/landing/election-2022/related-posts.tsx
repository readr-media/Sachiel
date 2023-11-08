import CustomImage from '@readr-media/react-image'
import styled from 'styled-components'

import ArrowTilt from '~/components/icons/arrow-tilt'

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
  height: 268px;
  margin: auto;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.textColor.cornsilk};
  }

  ${({ theme }) => theme.breakpoint.md} {
    margin: 0;
    height: 293px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 250px;
    height: 276px;
  }
`

const PostImage = styled.div`
  height: 30vw;
  width: 100%;
  min-height: 150px;
  max-height: 175px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      transition: all 0.3s ease;
    }
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-height: 130px;
    min-height: 0;
  }
`

const PostInfo = styled.div`
  padding: 12px;

  .title {
    height: 42px;
    overflow: hidden;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.3;
    margin-bottom: 5px;
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .date {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: rgba(15, 45, 53, 0.5);
  }

  ${({ theme }) => theme.breakpoint.xl} {
    .title {
      font-size: 18px;
      height: 69px;
      -webkit-line-clamp: 3;
    }

    .date {
      font-size: 14px;
    }
  }
`

const Button = styled.button`
  background: ${({ theme }) => theme.backgroundColor.landingYellow};
  border: 2px solid ${({ theme }) => theme.borderColor.black};
  border-radius: 24px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.8;
  color: ${({ theme }) => theme.textColor.black};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;

  svg {
    margin-left: 5px;
    color: ${({ theme }) => theme.textColor.white};

    path {
      fill: ${({ theme }) => theme.textColor.black};
    }
  }

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.textColor.yellow};
    color: ${({ theme }) => theme.textColor.white};

    path {
      fill: ${({ theme }) => theme.textColor.white};
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 8px 30px;
    font-size: 18px;
  }
`

type RelatedPostsProps = {
  posts: any
}

export default function RelatedPosts({
  posts = [],
}: RelatedPostsProps): JSX.Element {
  return (
    <Wrapper>
      <Title className="title">相關報導</Title>

      <PostContainer>
        {posts?.map((item: any) => {
          return (
            <PostList key={item.id}>
              <a
                href={`https://www.readr.tw/post/${item.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <PostImage>
                  <CustomImage
                    images={{ original: item?.heroImage?.urlOriginal }}
                    alt={item?.name}
                    defaultImage="/images/default-post-photo.svg"
                  />
                </PostImage>

                <PostInfo>
                  <p className="title">{item.name}</p>
                  <span className="date">
                    {item.publishTime || item.createdAt}
                  </span>
                </PostInfo>
              </a>
            </PostList>
          )
        })}
      </PostContainer>

      <Button>
        <a
          href="https://www.readr.tw/tag/%E9%81%B8%E8%88%89%E6%94%BF%E8%A6%8B%E8%BF%BD%E8%B9%A4"
          target="_blank"
          rel="noopener noreferrer"
        >
          更多相關報導
          <ArrowTilt />
        </a>
      </Button>
    </Wrapper>
  )
}
