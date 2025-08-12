import { getAllPublishers } from '../../actions/publisher'
import PublisherList from './_components/publisher-list'

export default async function Page({
  params: _params,
}: {
  params: { lng: string }
}) {
  const publishers = await getAllPublishers()

  return <PublisherList publishers={publishers} />
}

export function generateStaticParams() {
  return [{ lng: 'zh-TW' }, { lng: 'en-US' }]
}
