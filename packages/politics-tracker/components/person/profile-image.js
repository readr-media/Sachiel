import styled from 'styled-components'
import Image from 'next/future/image'

const ProfileImage = styled.div`
  /* width: 60px;
  height: 60px;
  object-fit: cover; */
  border-radius: 50%;
  border-color: ${({ theme }) => theme.borderColor.white};
  border-width: 2px;
  overflow: hidden;
  position: relative;
`
export default ProfileImage
