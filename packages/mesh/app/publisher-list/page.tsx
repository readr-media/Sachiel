import { getAllPublishers } from '../actions/publisher'
import PublisherList from './_components/publisher-list'

export default async function Page() {
  const publishers = await getAllPublishers()

  return <PublisherList publishers={publishers} />
}
