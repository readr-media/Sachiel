import dynamic from 'next/dynamic'
const AddPoliticForm = dynamic(() => import('./add-politic-form'), {
  ssr: false,
})
import { useState } from 'react'

import Plus from '~/components/icons/plus'
import { logGAEvent } from '~/utils/analytics'

import s from './add-politic-block.module.css'
import Button from './button'

export default function AddPoliticBlock(): JSX.Element {
  const [showEditArea, setShowEditArea] = useState(false)

  return (
    <div className={s['add-politic-block']}>
      {showEditArea ? (
        <AddPoliticForm closeForm={() => setShowEditArea(false)} />
      ) : (
        <span className="relative my-5">
          <span id="add-politic-anchor" className="absolute top-[-200px]" />
          <Button
            text="新增政見"
            icon={Plus()}
            onClick={() => {
              setShowEditArea(true)
              logGAEvent('click', '點擊「新增政見」')
            }}
          />
        </span>
      )}
    </div>
  )
}
