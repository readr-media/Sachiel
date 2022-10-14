import { Fragment } from 'react'

import ListTitle from './list-title'
import EditButton from './edit-button'
import ListItem from './list-item'
export default function List() {
  return (
    <Fragment>
      <ListTitle title="個人資料">
        <EditButton />
      </ListTitle>
      <ListItem />
      <ListItem />
      <ListItem />
    </Fragment>
  )
}
