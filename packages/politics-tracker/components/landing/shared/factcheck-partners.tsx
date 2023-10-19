import CustomImage from '@readr-media/react-image'
import React from 'react'
import styled from 'styled-components'

import type { FactCheckPartner, Logo } from '~/types/politics-detail'

const Wrapper = styled.div`
  width: 100%;
  padding: 40px 16px;
  background: ${({ theme }) => theme.backgroundColor.black};
  color: ${({ theme }) => theme.backgroundColor.white};

  ${({ theme }) => theme.breakpoint.md} {
    padding: 40px;
  }
`

const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0px auto 20px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 40px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 28px;
  }
`

const PartnerGroup = styled.div`
  margin: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 1130px;

  ${({ theme }) => theme.breakpoint.md} {
    gap: 20px;
  }
`

const Item = styled.div`
  width: 140px;
  height: 83px;
  background: ${({ theme }) => theme.backgroundColor.white};
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 10px; */ //圖片內間距

  ${({ theme }) => theme.breakpoint.md} {
    width: 157px;
    height: 92px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 170px;
    height: 100px;
  }
`

// FIXME: modify type structure
type PartnerByType = {
  type: string
  partners: {
    id: string
    name: string
    logo: Object
  }[]
}
type FactCheckPartnersProps = {
  partners: FactCheckPartner[]
}
export default function FactCheckPartners({
  partners = [],
}: FactCheckPartnersProps): JSX.Element {
  function filterPartnersByType(partners: FactCheckPartner[]): PartnerByType[] {
    const transformedPartners: PartnerByType[] = partners.reduce(
      (result: PartnerByType[], item) => {
        const existingItem = result.find((el) => el.type === item.type)

        if (existingItem) {
          existingItem.partners.push({
            id: item.id,
            name: item.name,
            logo: item.logo || [],
          })
        } else {
          result.push({
            type: item.type,
            partners: [{ id: item.id, name: item.name, logo: item.logo || [] }],
          })
        }
        return result
      },
      []
    )

    return transformedPartners
  }

  const partnersByType = filterPartnersByType(partners)

  const mockImg01 = {
    original:
      'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c.webP',
    w480: 'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w480.webP',
    w800: 'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w800.webP',
    w1200: '',
    w1600:
      'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w1600.webP',
    w2400:
      'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w2400.webP',
  }

  const mockImg02 = {
    original:
      'https://v3-statics-dev.mirrormedia.mg/images/0c0d2b10-0e05-4a9b-9af3-c23e29ea0577.webP',
    w480: 'https://v3-statics-dev.mirrormedia.mg/images/0c0d2b10-0e05-4a9b-9af3-c23e29ea0577-w480.webP',
    w800: 'https://v3-statics-dev.mirrormedia.mg/images/0c0d2b10-0e05-4a9b-9af3-c23e29ea0577-w800.webP',
    w1200: '',
    w1600:
      'https://v3-statics-dev.mirrormedia.mg/images/0c0d2b10-0e05-4a9b-9af3-c23e29ea0577-w1600.webP',
    w2400:
      'https://v3-statics-dev.mirrormedia.mg/images/0c0d2b10-0e05-4a9b-9af3-c23e29ea0577-w2400.webP',
  }

  const mockImg03 = {
    original:
      'https://v3-statics-dev.mirrormedia.mg/images/67dc521a-0b45-4982-859c-34a705654d43.webP',
    w480: 'https://v3-statics-dev.mirrormedia.mg/images/67dc521a-0b45-4982-859c-34a705654d43-w480.webP',
    w800: 'https://v3-statics-dev.mirrormedia.mg/images/67dc521a-0b45-4982-859c-34a705654d43-w800.webP',
    w1200: '',
    w1600:
      'https://v3-statics-dev.mirrormedia.mg/images/67dc521a-0b45-4982-859c-34a705654d43-w1600.webP',
    w2400:
      'https://v3-statics-dev.mirrormedia.mg/images/67dc521a-0b45-4982-859c-34a705654d43-w2400.webP',
  }

  return (
    <>
      {partnersByType.map((item: any, index: number) => {
        return (
          <Wrapper key={index}>
            <Title>{item.type}</Title>
            <PartnerGroup>
              {/* {item.partners.map((partner: any) => (
                <Item key={partner.id}>
                  <CustomImage
                    images={partner.logo?.resized}
                    imagesWebP={partner.logo?.resizedWebp}
                    defaultImage=""
                    priority={true}
                    alt={partner.name}
                  />
                </Item>
              ))} */}

              <Item>
                <CustomImage
                  // width="80%"
                  images={{}}
                  imagesWebP={mockImg01}
                  priority={true}
                  alt="mockImg01"
                  objectFit="contain"
                />
              </Item>

              <Item>
                <CustomImage
                  images={{}}
                  imagesWebP={mockImg02}
                  priority={true}
                  alt="mockImg02"
                  objectFit="contain"
                />
              </Item>

              <Item>
                <CustomImage
                  images={{}}
                  imagesWebP={mockImg03}
                  priority={true}
                  alt="mockImg03"
                  objectFit="contain"
                />
              </Item>
            </PartnerGroup>
          </Wrapper>
        )
      })}
    </>
  )
}
