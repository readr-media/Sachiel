import type { PersonElection } from '~/types/politics'
import DefaultLayout from '~/components/layout/default'
import Title from '~/components/politics/title'
import SectionList from '~/components/politics/section-list'
import Nav from '~/components/politics/nav'

const Politics: NextPage = () => {
  const person = {
    name: '高潞．以用．巴魕剌 Kawlo．Iyun．Pacidal',
    // avatar: '',
    avatar:
      'https://museum.acgn-stock.com/assets/images/455f612657f3d2decf2b.webp',
    party: '歡樂無法黨歡樂無法黨歡樂無法黨歡樂無法黨歡樂無法黨',
    // partyIcon: '',
    partyIcon:
      'https://upload.wikimedia.org/wikipedia/zh/thumb/c/c1/Emblem_of_Democratic_Progressive_Party_%28new%29.svg/1200px-Emblem_of_Democratic_Progressive_Party_%28new%29.svg.png',
    campaign: '台東縣太麻里鄉鄉民代表之類的很長很長很長很長很長很長很長職位',
    // campaign: '台東縣太麻里鄉鄉民',
    // campaign: '台東縣太麻里',
    completed: 100000000000000,
    waiting: 0,
  }

  const elections: PersonElection[] = [
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

  const sections = elections.map((e, index) => (
    <SectionList key={e.id} order={index} {...e} />
  ))

  return (
    <DefaultLayout>
      <main className="flex w-screen flex-col items-center bg-politics">
        <Title {...person} />
        {sections}
        <Nav />
      </main>
    </DefaultLayout>
  )
}

export default Politics
