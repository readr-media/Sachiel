import styled from 'styled-components'
import Image from 'next/future/image'

const ProfileImage = styled.div`
  border-radius: 50%;
  border-color: ${({ theme }) => theme.borderColor.white};
  border-width: 2px;
  overflow: hidden;
  position: relative;
`
export default ProfileImage
