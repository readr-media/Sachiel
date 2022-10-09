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
        borderWidth: props.borderWidth,
      }}
    >
      <div className={s.defaultIcon}>
        <svg viewBox="0 1 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.4541 14.8604H12.5459C12.9287 14.8604 13.2295 14.7738 13.4482 14.6006C13.667 14.432 13.7764 14.195 13.7764 13.8896C13.7764 13.4567 13.6419 12.9964 13.373 12.5088C13.1042 12.0212 12.7168 11.5677 12.2109 11.1484C11.7096 10.7246 11.1035 10.3805 10.3926 10.1162C9.68164 9.84733 8.88184 9.71289 7.99316 9.71289C7.10905 9.71289 6.31152 9.84733 5.60059 10.1162C4.88965 10.3805 4.28125 10.7246 3.77539 11.1484C3.27409 11.5677 2.889 12.0212 2.62012 12.5088C2.35579 12.9964 2.22363 13.4567 2.22363 13.8896C2.22363 14.195 2.33301 14.432 2.55176 14.6006C2.77051 14.7738 3.07129 14.8604 3.4541 14.8604ZM8 8.50293C8.49674 8.50293 8.95475 8.36849 9.37402 8.09961C9.79329 7.83073 10.1283 7.46842 10.3789 7.0127C10.6341 6.55241 10.7617 6.03516 10.7617 5.46094C10.7617 4.90495 10.6341 4.40365 10.3789 3.95703C10.1283 3.50586 9.79329 3.15039 9.37402 2.89062C8.95475 2.63086 8.49674 2.50098 8 2.50098C7.50781 2.50098 7.05208 2.63314 6.63281 2.89746C6.21354 3.16178 5.8763 3.51953 5.62109 3.9707C5.37044 4.41732 5.24512 4.91862 5.24512 5.47461C5.24512 6.04427 5.37044 6.55697 5.62109 7.0127C5.8763 7.46842 6.21126 7.83073 6.62598 8.09961C7.04525 8.36849 7.50326 8.50293 8 8.50293Z"
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
