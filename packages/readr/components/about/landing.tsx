import { useEffect, useMemo } from 'react'
import styled from 'styled-components'

import type { Language } from '~/types/about'

type StyleProps = {
  $isActive: boolean
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const MainContainer = styled.div`
  position: relative;
  margin: 40px 20px;
  width: 100%;
  position: relative;
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      margin: 160px 48px;
      display: flex;
      justify-content: space-between;
      // max-width = calc(theme.mediaSize.md - 48px * 2);
      max-width: 672px;
    }
  `}
  ${({ theme }) => `
  ${theme.breakpoint.xl} {
    margin: 160px 52px;
    max-width: 1096px;
  }
`}
`

const LandingTitle = styled.h2`
  color: rgba(255, 255, 255, 0.87);
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  letter-spacing: 0.03em;
  min-width: 211px;
  z-index: 1;
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      font-size: 36px;
    }
  `}
`

const LandingContent = styled.div`
  color: rgba(255, 255, 255, 0.66);
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  letter-spacing: 0.03em;
  margin-top: 20px;
  position: relative;
  .decode-text {
    z-index: 2;
    position: relative;
  }
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      margin-top: 0;
      position: static;
    }
    ${theme.breakpoint.xl} {
      font-size: 36px;
      max-width: 724px;
    }
  `}

  .text-animation-wrapper {
    display: inline-block;
  }

  .text-animation {
    min-width: 10px;
    display: inline-block;
    position: relative;
    color: transparent;
    &:before {
      content: '';
      color: #eee500;
      position: absolute;
      top: 50%;
      left: 50%;
      background: #eee500;
      width: 0;
      height: 1.2em;
      -webkit-transform: translate(-50%, -55%);
      -ms-transform: translate(-50%, -55%);
      transform: translate(-50%, -55%);
    }

    &.state-1 {
      &:before {
        width: 1px;
      }
    }
    &.state-2 {
      &:before {
        width: 0.9em;
      }
    }
    &.state-3 {
      color: #eee500;
      &:before {
        width: 0;
      }
    }
  }
`

const MainBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 0;
  background: -webkit-repeating-linear-gradient(
    270deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 34px,
    #fff 35px,
    #fff 36px
  );
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      background: -webkit-repeating-linear-gradient(
        270deg,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0) 53px,
        #fff 53px,
        #fff 54px
      );
    }
  `}
`

const LanguageSwitchContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.66);
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      top: 80px;
      right: 48px;
      right: calc((100vw - 672px)/2);
    }
    ${theme.breakpoint.xl} {
      right: 52px;
      font-size: 18px;
      right: calc((100vw - 1096px)/2);
    }
  `}
`

const LanguageChoice = styled.button<StyleProps>`
  margin: 0 20px;
  :first-child {
    margin-left: 0;
  }
  :last-child {
    margin-right: 0;
  }
  &:hover {
    color: #ffffff;
  }

  ${({ $isActive }) => $isActive && `color: #EEE500;`}
`

export default function Landing({
  language,
  setLanguage,
  title,
  content,
}: {
  language: Language
  setLanguage: (language: Language) => void
  title: string
  content: string
}): JSX.Element {
  const thirdStages = (child: Element) => {
    if (child.classList.contains('state-2')) {
      child.classList.add('state-3')
    }
  }

  const secondStages = (child: Element) => {
    if (child.classList.contains('state-1')) {
      child.classList.add('state-2')
      setTimeout(thirdStages.bind(null, child), 100)
    } else if (!child.classList.contains('state-1')) {
      child.classList.add('state-1')
    }
  }

  const firstStages = (child: Element) => {
    if (child.classList.contains('state-2')) {
      child.classList.add('state-3')
    } else if (child.classList.contains('state-1')) {
      child.classList.add('state-2')
    } else if (!child.classList.contains('state-1')) {
      child.classList.add('state-1')
      setTimeout(secondStages.bind(null, child), 100)
    }
  }

  const decodeText = () => {
    const text = document
      .getElementsByClassName('decode-text')[0]
      .querySelectorAll('.text-animation')

    // assign the placeholder array its places
    const state: number[] = []
    for (let i = 0, j = text.length; i < j; i++) {
      text[i].classList.remove('state-1', 'state-2', 'state-3')
      state[i] = i
    }

    // shuffle the array to get new sequences each time
    const shuffled = shuffle(state)

    for (let i = 0, j = shuffled.length; i < j; i++) {
      const child = text[shuffled[i]] as Element
      const classes = child.classList

      // fire the first one at random times
      const state1Time = Math.round(Math.random() * (2000 - 300)) + 50
      if (classes.contains('text-animation')) {
        setTimeout(firstStages.bind(null, child), state1Time)
      }
    }
  }

  function shuffle(array: number[]) {
    let currentIndex = array.length
    let temporaryValue, randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  const parsedContent = useMemo(() => {
    const parts = content?.split(/(<b>.*?<\/b>)/g)
    const returnArr = parts.map((part) => {
      if (part.startsWith('<b>') && part.endsWith('</b>')) {
        const text = part.substring(3, part.length - 4)
        const array = Array.from(text)
        const spanElements = array.map(
          (char, i) => `<span class="text-animation" key='${i}'>${char}</span>`
        )
        if (language === 'en') {
          return `<div class="text-animation-wrapper">${spanElements.join(
            ''
          )}</div>`
        } else {
          return spanElements.join('')
        }
      } else {
        return part
      }
    })

    return returnArr.join('')
  }, [content, language])

  // do decodeText after content is parsed
  useEffect(() => {
    decodeText()
  }, [parsedContent])

  return (
    <Container>
      <LanguageSwitchContainer>
        <LanguageChoice
          $isActive={language === 'ch'}
          onClick={() => setLanguage('ch')}
        >
          中文
        </LanguageChoice>
        |
        <LanguageChoice
          $isActive={language === 'en'}
          onClick={() => setLanguage('en')}
        >
          EN
        </LanguageChoice>
      </LanguageSwitchContainer>
      <MainContainer>
        <LandingTitle>{title}</LandingTitle>
        <LandingContent>
          <MainBackground />
          <div
            className="decode-text"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        </LandingContent>
      </MainContainer>
    </Container>
  )
}
