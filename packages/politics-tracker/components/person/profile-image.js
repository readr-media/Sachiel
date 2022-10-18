import styled from 'styled-components'

const ProfileImage = styled.img`
  border-radius: 50%;
  border-color: ${({ theme }) => theme.borderColor.white};
  border-width: 2px;
  width: 60px;
  height: 60px;
  object-fit: cover;
`
export default ProfileImage
