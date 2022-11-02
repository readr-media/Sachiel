import React, { Fragment } from 'react'
import styled from 'styled-components'

import { ContentItemContainer, ContentItemTitle } from './content-item'

const EditContentItemContainer = styled(ContentItemContainer)`
  margin-bottom: 32px;
  ${({ theme }) => theme.breakpoint.md} {
    flex-direction: column;
  }
`
const EditContentItemTitle = styled(ContentItemTitle)`
  margin-bottom: 8px;
  .required {
    color: ${({ theme }) => theme.textColor.red};
  }
`
const EditContentItemDescription = styled.p`
  font-size: 14px;
  line-height: 150%;
  color: ${({ theme }) => theme.textColor.gray};
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 16px;
  }
`
const EditContentItemInput = styled.input`
  font-size: 18px;
  padding: 8px 16px;
  margin-top: 8px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  user-select: none;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.textColor.black30};
  }
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.backgroundColor.black};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.backgroundColor.black};
  }
`

const EditContentItemRadioContainer = styled.div`
  display: flex;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 2px;
  margin-right: 20px;
`
const RadioButtonLabel = styled.label`
  position: absolute;
  top: 0;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 2px solid rgba(15, 45, 53, 0.3);
`
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: ${({ theme }) => theme.backgroundColor.white};

    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      margin: 2px;
      background: ${({ theme }) => theme.backgroundColor.blue};
    }
  }
  &:checked + ${RadioButtonLabel} {
    background: ${({ theme }) => theme.backgroundColor.white};
    border: 2px solid black;

    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      margin: 2px;
      background: ${({ theme }) => theme.backgroundColor.blue};
    }
  }
`

const ErrorMessage = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #c0374f;
  margin: 5px 0px;
`

export { EditContentItemTitle }

/**
 * @param {object[]} dateValue
 */
//date-rule-regex-check
// FIXME: date validation (ex: early than now)
function dateCheck(dateValue) {
  const dateRules = /^\d{4}\-(0?[1-9]|1[012])?\-(0?|[1-9]|[12][0-9]|3[01])?$/
  // const dateRules = /^\d{4}\-(0[1-9]|1[012])?\-(0[1-9]|[12][0-9]|3[01])?$/
  if (dateValue.join('') === '') {
    return true
  } else {
    return dateRules.test(dateValue.join('-'))
  }
}

/**
 * @param {import('./edit-content-basic').EditContentBasic} props
 * @returns {React.ReactElement}
 */
export default function EditContentItem({
  name,
  title,
  isRequired,
  description,
  placeholder,
  type,
  options,
  value,
  onChange,
  // @ts-ignore
  errormessage,
}) {
  return (
    <EditContentItemContainer>
      <EditContentItemTitle as="label" htmlFor={name}>
        {title}
        {isRequired && <span className="required">（必填）</span>}
      </EditContentItemTitle>
      {description?.split('\n').map((item, index) => (
        <EditContentItemDescription key={index}>
          {item}
        </EditContentItemDescription>
      ))}
      {type === 'input' && (
        <EditContentItemInput
          id={name}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          defaultValue={value ? `${value}` : ''}
        ></EditContentItemInput>
      )}
      {type === 'input' && !value ? (
        <ErrorMessage>{errormessage}</ErrorMessage>
      ) : (
        <></>
      )}
      {type === 'input-date' && (
        <EditContentItemInput
          id={name}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          defaultValue={
            value
              ? `${value[0] ? value[0] : '0000'}-${
                  value[1] ? value[1] : '00'
                }-${value[2] ? value[2] : '00'}`
              : ''
          }
        ></EditContentItemInput>
      )}
      {type === 'input-date' &&
      // @ts-ignore
      !dateCheck(value) ? (
        <ErrorMessage>{errormessage}</ErrorMessage>
      ) : (
        <></>
      )}
      {type === 'radio' && options && (
        <EditContentItemRadioContainer>
          {options.map((item, index) => (
            <Item key={index}>
              <RadioButton
                type="radio"
                name="radio"
                value={item}
                defaultChecked={item === value}
                // @ts-ignore
                onClick={(e) => onChange(e.target.value)}
              />
              <RadioButtonLabel />
              <div>{item === 'F' ? '女' : '男'}</div>
            </Item>
          ))}
        </EditContentItemRadioContainer>
      )}
    </EditContentItemContainer>
  )
}
