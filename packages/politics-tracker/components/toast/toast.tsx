import classNames from 'classnames'
import React from 'react'

import Cross from '~/components/icons/cross'
import Error from '~/components/icons/error'
import Success from '~/components/icons/success'
import type { CloseFuction, ToastData } from '~/types/toast'
import { useTimeout } from '~/utils/hooks'

import s from './style.module.css'
const LIFE_TIME = 5000
type ToastProps = { close: CloseFuction } & ToastData

export default function Toast(props: ToastProps): JSX.Element {
  useTimeout<CloseFuction>(props.close, LIFE_TIME)

  const style = classNames(
    s['toast'],
    props.status === 'success' ? s['success'] : s['fail']
  )

  return (
    <div className={style}>
      <i className={s['status']}>
        {props.status === 'success' ? <Success /> : <Error />}
      </i>
      <div className={s['text-group']}>
        <div className={s['title']}>{props.title}</div>
        <div className={s['desc']}>{props.desc}</div>
      </div>
      <button onClick={props.close} className={s['cross']}>
        <Cross />
      </button>
    </div>
  )
}
