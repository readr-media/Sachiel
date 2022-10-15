import React, { useState, Fragment } from 'react'

import SectionToggle from './section-toggle'
import SectionBody from './section-body'

import styled from 'styled-components'
const SectionListWrapper = styled.div`
  max-width: 688px;
  margin: 0 auto;
  padding: 0 26px 0 16px;
`

/**
 * @param {Object} props
 * @param {import('../../types/person').Person} props.peopleData
 * @param {import('../../types/politics').PersonElection[]} props.personElectionsData
 * @returns {React.ReactElement}
 */
export default function SectionList({ peopleData, personElectionsData }) {
  const [activeId, setActiveId] = useState('')
  const elections = [
    {
      id: '1',
      name: '2014 臺北市議員選舉如果這行很長居然有一行以上會這樣排版',
      year: '2014',
      month: '08',
      day: '08',
      politics: [
        {
          id: '1',
          desc: '便捷交通：推動綠色軌道運輸，爭取東部快鐵、鐵路高架捷運化；打通南(蘇澳)、北(礁溪)交通瓶頸； 建構縣內四縱六橫交通骨幹，銜接烏石港、礁溪、宜蘭、羅東、蘇澳五大轉運站，串聯aaaaaaaaaaaaaaaaaaaaaaaaa縣內公共運輸；並規劃跨縣市太平洋藍色公路及旅遊系統，建置智慧交通管理系統（ITS）， 以建構速捷交通網絡，打造北宜便捷生活圈。',
          source:
            'https://wwww.google.com\r\n選舉公報\r\n測試\r\njavascript:void(0)\r\nhttp://javascript:void(0)\r\nhttps://plurk.com',
        },
        {
          id: '2',
          desc: '建構縣內四縱六橫交通骨幹，銜接烏石港、礁溪、宜蘭、羅東、蘇澳五大轉運站，串聯aaaaaaaaaaaaaaaaaaaaaaaaa縣內公共運輸；並規劃跨縣市太平洋藍色公路及旅遊系統，建置智慧交通管理系統（ITS）， 以建構速捷交通網絡，打造北宜便捷生活圈。',
          source:
            'https://wwww.google.com\r\n選舉公報\r\n測試\r\njavascript:void(0)\r\nhttp://javascript:void(0)\r\nhttps://plurk.com',
        },
        {
          id: '3',
          desc: '便捷交通：推動綠色軌道運輸，爭取東部快鐵、鐵路高架捷運化',
          source:
            'https://wwww.google.com\r\n測試\r\njavascript:void(0)https://plurk.com\r\nhttps://twitter.com',
        },
      ],
    },
    {
      id: '2',
      name: '2014 臺北市議員選舉',
      year: '2014',
      month: '08',
      day: '08',
      politics: [
        {
          id: '1',
          desc: '便捷交通：推動綠色軌道運輸，爭取東部快鐵、鐵路高架捷運化；打通南(蘇澳)、北(礁溪)交通瓶頸； 建構縣內四縱六橫交通骨幹，銜接烏石港、礁溪、宜蘭、羅東、蘇澳五大轉運站，串聯aaaaaaaaaaaaaaaaaaaaaaaaa縣內公共運輸；並規劃跨縣市太平洋藍色公路及旅遊系統，建置智慧交通管理系統（ITS）， 以建構速捷交通網絡，打造北宜便捷生活圈。',
          source:
            'https://wwww.google.com\r\n選舉公報\r\n測試\r\njavascript:void(0)\r\nhttp://javascript:void(0)\r\nhttps://plurk.com',
        },
        {
          id: '2',
          desc: '建構縣內四縱六橫交通骨幹，銜接烏石港、礁溪、宜蘭、羅東、蘇澳五大轉運站，串聯aaaaaaaaaaaaaaaaaaaaaaaaa縣內公共運輸；並規劃跨縣市太平洋藍色公路及旅遊系統，建置智慧交通管理系統（ITS）， 以建構速捷交通網絡，打造北宜便捷生活圈。',
          source:
            'https://wwww.google.com\r\n選舉公報\r\n測試\r\njavascript:void(0)\r\nhttp://javascript:void(0)\r\nhttps://plurk.com',
        },
        {
          id: '3',
          desc: '便捷交通：推動綠色軌道運輸，爭取東部快鐵、鐵路高架捷運化；打通南(蘇澳)、北(礁溪)交通瓶頸； 建構縣內四縱六橫交通骨幹，銜接烏石港、礁溪、宜蘭、羅東、蘇澳五大轉運站，串聯aaaaaaaaaaaaaaaaaaaaaaaaa縣內公共運輸；並規劃跨縣市太平洋藍色公路及旅遊系統，建置智慧交通管理系統（ITS）， 以建構速捷交通網絡，打造北宜便捷生活圈。',
          source:
            'https://wwww.google.com\r\n測試\r\njavascript:void(0)https://plurk.com\r\nhttps://twitter.com',
        },
      ],
    },
    {
      id: '3',
      name: '2014 臺北市議員選舉',
      year: '2014',
      month: '08',
      day: '08',
      politics: [],
    },
  ]
  const electionList = elections.map((e) => {
    return (
      <Fragment key={e.id}>
        <SectionToggle
          id={e.id}
          isActive={activeId === e.id}
          setActive={(
            /** @type {import("react").SetStateAction<string>} */ id
          ) => setActiveId(id)}
          color={'orange'}
        />
        <SectionBody isActive={activeId === e.id}></SectionBody>
      </Fragment>
    )
  })

  return <SectionListWrapper>{electionList}</SectionListWrapper>
}
