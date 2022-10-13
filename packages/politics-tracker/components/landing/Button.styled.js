import styled from 'styled-components'

const Button = styled.button`
  font-size: 20px;
  padding: 8px 20px;
  background-color: ${(props) => (props.color ? props.color : 'white')};
  border-radius: 24px;
  border: 2px solid #000000;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: auto;
  margin-bottom: 20px;
`
export default Button
