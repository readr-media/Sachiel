import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import CustomSelect from '~/components/landing/election-2024/fact-check-group/president-factcheck/custom-select'
import FactCheckItem from '~/components/landing/election-2024/fact-check-group/president-factcheck/factcheck-item'
import { FactCheckPresident } from '~/components/landing/react-context/landing-2024-context'
import { prefixOfJSONForLanding2024 } from '~/constants/config'
import { checkboxLabels } from '~/constants/landing'
import { defaultFactCheckJSON } from '~/constants/landing'
import type { PoliticCategory } from '~/types/politics-detail'

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.cornsilk};
  box-shadow: inset 0px -4px 0px #000000;
`
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;

  ${({ theme }) => theme.breakpoint.xxl} {
    width: 344px;
  }
`

const Title = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.yellow};
  text-align: center;
  padding: 16px 8px 20px;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 700;
  box-shadow: 0px 4px 0px 0px #000 inset, 0px -4px 0px 0px #000 inset;
  color: ${({ theme }) => theme.textColor.black};

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 28px;
    box-shadow: 0px -4px 0px 0px #000 inset;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    box-shadow: 0px -4px 0px 0px #000 inset, -4px 0px 0px 0px #000 inset;
  }
`

const Sidebar = styled.div`
  min-width: 40px;
  width: 40px;
  box-shadow: 0px 4px 0px 0px #000 inset, 0px -4px 0px 0px #000 inset,
    -4px 0px 0px 0px #000 inset;
  background-color: ${({ theme }) => theme.backgroundColor.highlightRed};

  ${({ theme }) => theme.breakpoint.xl} {
    box-shadow: 0px -4px 0px 0px #000 inset, -4px 0px 0px 0px #000 inset;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    display: none;
  }
`

const Content = styled.div`
  width: 100%;
  padding: 20px 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px 40px 40px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 40px;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    padding: 20px 60px 60px;
  }
`

const FilterPanel = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.skinColor};
  padding: 20px;

  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const FilterCategory = styled.div`
  .subtitle {
    margin-bottom: 20px;
    color: rgba(15, 45, 53, 0.5);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.3;
    width: fit-content;

    ${({ theme }) => theme.breakpoint.md} {
      margin: 0;
      min-width: 64px;
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  ${({ theme }) => theme.breakpoint.xl} {
    border-top: none;
    padding: 0px;
  }
`

const CheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;

  ${({ theme }) => theme.breakpoint.md} {
    gap: 8px 12px;
  }

  .checkbox {
    padding: 7px 0px 7px 7px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    width: fit-content;
    color: #0f2d35;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.3;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;

    > input {
      display: none;

      &:checked ~ .checkmark {
        background: #b2800d;
        outline: 1px solid #b2800d;
      }

      &:checked ~ .checkmark::after {
        opacity: 1;
        transition: all 0.2s ease;
      }
    }

    //勾選框
    > .checkmark {
      position: relative;
      display: block;
      top: 0;
      left: 0;
      width: 24px;
      height: 24px;
      background: #ffffff;
      border-radius: 5px;
      outline: 1px solid #b2800d;
      transition: all 0.2s ease;

      //打勾
      &::after {
        position: absolute;
        display: block;
        content: '';
        left: 50%;
        top: 40%;
        width: 7px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg);
        -webkit-transform: translate(-50%, -50%) rotate(45deg);
        -moz-transform: translate(-50%, -50%) rotate(45deg);
        -ms-transform: translate(-50%, -50%) rotate(45deg);
        opacity: 0;
        transition: all 0.2s ease;
      }
    }
  }
`

const CandidatesWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 60px;

  ${({ theme }) => theme.breakpoint.md} {
    gap: 60px 12px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 760px;
    margin: 0px auto;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: none;
    flex-wrap: nowrap;
    gap: 12px;
    margin: 0px;
  }
`
type PresidentFactCheckProps = {
  categories: PoliticCategory[]
  factCheckJSON: any
}
export default function PresidentFactCheck({
  categories = [],
  factCheckJSON = [],
}: PresidentFactCheckProps): JSX.Element {
  //類別篩選預設：政見數最多的類別  --------------------
  const defaultCategory = categories[0] || {
    id: '2',
    name: '交通',
    politicsCount: 0,
  }
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory)

  // 取得類別 id 各自對應的 JSON --------------------
  const [updatedJSON, setUpdatesJSON] = useState(factCheckJSON)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getUpdateJSON = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `${prefixOfJSONForLanding2024}/landing_factcheck_${selectedCategory.id}.json`
        )

        const { personElections } = response.data
        setUpdatesJSON(personElections || [])

        console.log(
          'Successs:prefix-client-side',
          `${prefixOfJSONForLanding2024}/landing_factcheck_${selectedCategory.id}.json`
        )
      } catch (error) {
        setUpdatesJSON(defaultFactCheckJSON)

        console.log(
          'Error:prefix-client-side',
          `${prefixOfJSONForLanding2024}/landing_factcheck_${selectedCategory.id}.json`
        )

        console.error(
          'CLientSide - JSON errors: Landing2024 President FactCheck Error',
          error
        )
      } finally {
        setIsLoading(false)
      }
    }

    getUpdateJSON()
  }, [selectedCategory])

  // 有被勾選的 checkbox 標籤 --------------------
  const [filterLabels, setFilterLabels] = useState<string[]>([])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilterLabels([...filterLabels, event.target.value])
    } else {
      setFilterLabels(
        filterLabels.filter((label) => label !== event.target.value)
      )
    }
  }

  return (
    // FIXME: useContext refactor
    <FactCheckPresident.Provider
      value={{ categories, updatedJSON, setUpdatesJSON }}
    >
      <Container>
        <TitleWrapper>
          <Sidebar />
          <Title>總統政見：事實查核</Title>
        </TitleWrapper>
        <Content>
          <FilterPanel>
            <CustomSelect
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <FilterCategory>
              <p className="subtitle">查核類別</p>
              <CheckboxWrapper>
                {checkboxLabels.map((label) => (
                  <label className="checkbox" key={label.title}>
                    <input
                      type="checkbox"
                      name="filter-item"
                      value={label.value}
                      id={label.value}
                      onChange={(event) => handleCheckboxChange(event)}
                    />
                    <span className="checkmark" />
                    {label.title}
                  </label>
                ))}
              </CheckboxWrapper>
            </FilterCategory>
          </FilterPanel>
          <CandidatesWrapper>
            {updatedJSON.map((item: any) => (
              <FactCheckItem
                candidate={item}
                key={item.id}
                selectedCategory={selectedCategory}
                filterLabels={filterLabels}
                isLoading={isLoading}
              />
            ))}
          </CandidatesWrapper>
        </Content>
      </Container>
    </FactCheckPresident.Provider>
  )
}
