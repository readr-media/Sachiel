// @ts-nocheck
import React from 'react' // eslint-disable-line
import styled from 'styled-components'
import QACard from './qa-card'

const List = styled.div`
  max-width: 100%;
`

const ListTitle = styled.h3`
  font-family: 'Noto Serif TC', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  color: #000928;
  margin: 0 0 12px 0;
  @media (min-width: 768px) {
    /* margin-bottom: 24px; */
  }
`

export default function QuestionsList({ title, questions }) {
  return (
    <List>
      <ListTitle>{title}</ListTitle>
      {questions.map((ques) => {
        return <QACard questionItem={ques} key={ques.id} />
      })}
    </List>
  )
}
