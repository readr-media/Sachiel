// @ts-nocheck
import React from 'react' // eslint-disable-line
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 auto;
  padding-bottom: 10px;
  width: 100%;
  font-family: 'Noto Sans TC', sans-serif;
`

export default function Section(props) {
  return <Wrapper>{props.children}</Wrapper>
}
