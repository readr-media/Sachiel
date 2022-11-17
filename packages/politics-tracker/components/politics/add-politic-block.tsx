import dynamic from 'next/dynamic'
const AddPoliticForm = dynamic(() => import('./add-politic-form'), {
  ssr: false,
})
import Button from './button'
import Plus from '~/components/icons/plus'
import { useState } from 'react'
import s from './add-politic-block.module.css'
import ReactGA from 'react-ga'

//GA click
const handleAddNewPolitic = () => {
  ReactGA.event({
    category: 'Projects_PoliticsTracker',
    action: 'click',
    label: '點擊「新增政見」',
  })
}

export default function AddPoliticBlock(): JSX.Element {
  const [showEditArea, setShowEditArea] = useState(false)

  return (
    <div className={s['add-politic-block']}>
      {showEditArea ? (
        <AddPoliticForm closeForm={() => setShowEditArea(false)} />
      ) : (
        <span className="my-5">
          <Button
            text="新增政見"
            icon={Plus()}
            onClick={() => {
              handleAddNewPolitic()
              setShowEditArea(true)
            }}
          />
        </span>
      )}
    </div>
  )
}
