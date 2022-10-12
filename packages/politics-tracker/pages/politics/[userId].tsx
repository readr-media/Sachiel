import type { NextPage } from 'next'
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

  return (
    <DefaultLayout>
      <main className="flex w-screen flex-col items-center bg-politics">
        <Title {...person} />
        <SectionList />
        <Nav />
      </main>
    </DefaultLayout>
  )
}

export default Politics
