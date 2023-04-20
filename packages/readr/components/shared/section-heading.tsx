// 報導清單區塊的標題

import NextLink from 'next/link'
import styled from 'styled-components'

import IconArrowRight from '~/public/icons/arrow-right.svg'

type StyledProps = {
  $highlightColor: string
}

const Container = styled.div<StyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 3px solid #000928;
  padding: 0 0 12px;
  > p {
    position: relative;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.05em;
    color: #000928;
    &::before {
      content: '';
      position: absolute;
      bottom: 7px;
      left: 0;
      right: 0;
      height: 10px;
      background-color: ${({ $highlightColor }) => $highlightColor};
      z-index: -1; // behind text
    }
  }
`

const ShowMoreControl = styled(NextLink)`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 16px 0 0;
  > span {
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.03em;
    color: #000928;
  }
  > .icon {
    position: absolute;
    bottom: 1px;
    right: 0;
    width: 10px;
    height: 13px;
    transition: all 0.35s ease;
  }
  &:hover,
  &:focus {
    > .icon {
      right: -5px;
    }
  }
`

type SectionHeadingProps = {
  title?: string
  showMoreText?: string
  categorySlug?: string
  highlightColor?: string
  headingLevel?: number
  clickOnMore?: () => void
}

export default function SectionHeading({
  title = '',
  showMoreText = '',
  categorySlug = '',
  highlightColor = '#fff',
  headingLevel = 2,
  clickOnMore,
}: SectionHeadingProps): JSX.Element {
  const shouldShowMoreControl = showMoreText && categorySlug

  return (
    <>
      {title && (
        <Container $highlightColor={highlightColor} className="section-heading">
          <p role="heading" aria-level={headingLevel}>
            {title}
          </p>
          {shouldShowMoreControl && (
            <ShowMoreControl
              href={{
                pathname: '/category/[slug]',
                query: {
                  slug: categorySlug,
                },
              }}
              title={showMoreText}
              onClick={clickOnMore}
            >
              <span>{showMoreText}</span>
              <IconArrowRight className="icon" />
            </ShowMoreControl>
          )}
        </Container>
      )}
    </>
  )
}
