import ButtonStyled from './Button.styled'

/**
 * @param {{ children: any; }} props
 */
function IconButton(props) {
  const { children } = props

  return <ButtonStyled>{children}</ButtonStyled>
}

export default ButtonStyled
