import { Fragment } from 'react'

import ContentTitle from './content-title'
import EditButton from './edit-button'
import ContentItem from './content-item'
export default function List() {
  return (
    <Fragment>
      <ContentTitle title="個人資料">
        <EditButton />
      </ContentTitle>
      <ContentItem />
      <ContentItem />
      <ContentItem />
    </Fragment>
  )
}
