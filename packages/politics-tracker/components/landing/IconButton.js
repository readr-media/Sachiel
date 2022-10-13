import IconButtonStyled from './IconButton.styled'
import Image from 'next/image'

/**
 * @param {{ children: any; }} props
 */
function IconButton(props) {
  const { children } = props

  return (
    <IconButtonStyled>
      <Image
        alt="arrowDown"
        src="/landingpage/button_arrow.svg"
        width="20"
        height="20"
      />
      {children}
    </IconButtonStyled>
  )
}

export default IconButton
