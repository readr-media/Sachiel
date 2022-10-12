import type { Politic } from '~/types/politics'
import PoliticForm from './politic-form'
import s from './add-politic-form.module.css'

type AddPoliticFormProps = {
  closeForm: () => void
}

export default function AddPoliticForm(
  props: AddPoliticFormProps
): JSX.Element {
  const politic: Politic = {
    desc: '',
    source: '',
  }

  return (
    <form className={s['form']} method="POST">
      <span className={s['title']}>新增政見</span>
      <PoliticForm
        politic={politic}
        closeForm={props.closeForm}
        submitForm={(data) => {}}
      />
    </form>
  )
}
