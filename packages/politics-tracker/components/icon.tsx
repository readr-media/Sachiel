import Image from 'next/future/image'
import { useState } from 'react'
import classNames from 'classnames'
import s from './icon.module.css'

type IconProps = {
  src: string
  alt?: string
  width: number
  height: number
  borderWidth: number
}

export default function Icon(props: IconProps): JSX.Element {
  const [failed, setFailed] = useState<boolean>(false)

  const iconStyle = classNames(s.icon, { hidden: failed })

  return (
    <div
      className={s.container}
      style={{
        width: props.width,
        height: props.height,
        borderWidth: failed ? 0 : props.borderWidth,
      }}
    >
      <div className={s['default-icon']}>
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="30"
            cy="30"
            r="29"
            fill="#838383"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M18.3105 46.498H41.6895C42.6738 46.498 43.4473 46.2754 44.0098 45.8301C44.5723 45.3965 44.8535 44.7871 44.8535 44.002C44.8535 42.8887 44.5078 41.7051 43.8164 40.4512C43.125 39.1973 42.1289 38.0312 40.8281 36.9531C39.5391 35.8633 37.9805 34.9785 36.1523 34.2988C34.3242 33.6074 32.2676 33.2617 29.9824 33.2617C27.709 33.2617 25.6582 33.6074 23.8301 34.2988C22.002 34.9785 20.4375 35.8633 19.1367 36.9531C17.8477 38.0312 16.8574 39.1973 16.166 40.4512C15.4863 41.7051 15.1465 42.8887 15.1465 44.002C15.1465 44.7871 15.4277 45.3965 15.9902 45.8301C16.5527 46.2754 17.3262 46.498 18.3105 46.498ZM30 30.1504C31.2773 30.1504 32.4551 29.8047 33.5332 29.1133C34.6113 28.4219 35.4727 27.4902 36.1172 26.3184C36.7734 25.1348 37.1016 23.8047 37.1016 22.3281C37.1016 20.8984 36.7734 19.6094 36.1172 18.4609C35.4727 17.3008 34.6113 16.3867 33.5332 15.7188C32.4551 15.0508 31.2773 14.7168 30 14.7168C28.7344 14.7168 27.5625 15.0566 26.4844 15.7363C25.4062 16.416 24.5391 17.3359 23.8828 18.4961C23.2383 19.6445 22.916 20.9336 22.916 22.3633C22.916 23.8281 23.2383 25.1465 23.8828 26.3184C24.5391 27.4902 25.4004 28.4219 26.4668 29.1133C27.5449 29.8047 28.7227 30.1504 30 30.1504Z"
            fill="white"
          />
        </svg>
      </div>

      <Image
        src={props.src}
        alt={props.alt ?? ''}
        className={iconStyle}
        width={props.width}
        height={props.height}
        onError={() => {
          setFailed(() => true)
        }}
      />
    </div>
  )
}
