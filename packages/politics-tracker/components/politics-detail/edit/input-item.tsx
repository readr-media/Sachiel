import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & + * {
    margin-top: 8px;
  }

  svg {
    margin: 0px 8px;
  }
`

const Input = styled.input`
  width: 100%;
  color: #0f2d35;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8;
  padding: 8px 16px;
  outline: 1px solid rgba(0, 0, 0, 0.1);

  &:hover,
  &:focus {
    outline: 1px solid #000000;
  }

  &::placeholder {
    color: rgba(15, 45, 53, 0.3);
  }
`

type InputItemProps = {
  id: string
  value: string
  placeholder: string
  label: string
  icon: React.ReactNode
  // eslint-disable-next-line
  onChange: (id: string, label: string, value: string) => void // this is type definition
}

export default function InputItem({
  id = '',
  label = '',
  value = '',
  placeholder = '',
  icon,
  onChange,
}: InputItemProps): JSX.Element {
  return (
    <Wrapper>
      <label>{icon}</label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(id, label, e.target.value)}
      />
    </Wrapper>
  )
}
