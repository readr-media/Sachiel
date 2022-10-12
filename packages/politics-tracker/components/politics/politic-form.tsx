import type { Politic } from '~/types/politics'
import { useWindowSize } from '~/utils/hooks'
import { getTailwindConfig } from '~/utils/utils'
import { useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SOURCE_DELIMITER } from '~/constants/politics'
import SourceInput from './source-input'
import Button from './button'
import Plus from '~/components/icons/plus'
import ArrowRight from '~/components/icons/arrow-right'
import s from './politic-form.module.css'

const fullConfig = getTailwindConfig()

type PoliticFormProps = {
  politic: Politic
  closeForm: () => void
  submitForm: (politic: Politic) => void
}

type Source = {
  id: string
  value: string
  error: string
}

export default function PoliticForm(props: PoliticFormProps): JSX.Element {
  const windowSize = useWindowSize()

  function isMobile() {
    const screenConfig = fullConfig?.theme?.screens
    // @ts-ignore: next line
    const boundary = Number(screenConfig?.md?.split('px')[0])

    return windowSize.width <= boundary
  }

  function stringToSources(str: string): Source[] {
    return str.split(SOURCE_DELIMITER).map((s) => ({
      id: uuidv4(),
      value: s,
      error: '',
    }))
  }

  function sourcesToString(sources: Source[]): string {
    return sources.map((s) => s.value).join(SOURCE_DELIMITER)
  }

  const [politic, setPolitic] = useState<Politic>({
    ...props.politic,
    error: '',
  })
  const [sources, setSources] = useState<Source[]>(
    stringToSources(props.politic.source)
  )
  const [isValid, setIsValid] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)

  function getNewSource(): Source {
    return {
      id: uuidv4(),
      value: '',
      error: '',
    }
  }

  function updateSource(id: string, value: string) {
    const updated = sources.map((source) => {
      if (id === source.id) {
        return { ...source, value }
      }
      return source
    })
    setSources(updated)
  }

  function deleteSource(id: string) {
    const remain = sources.filter((source) => id !== source.id)
    setSources(remain)
  }

  function addSource() {
    const extended = [...sources, getNewSource()]
    setSources(extended)
  }

  const sourceList = sources.map((source, index) => (
    <SourceInput
      key={source.id}
      {...source}
      no={index + 1}
      showError={showError}
      removable={index !== 0}
      onChange={updateSource}
      onDelete={deleteSource}
    />
  ))

  function checkPolitic(politic: Politic) {
    if (!politic.desc || !politic.desc.trim()) {
      if (!politic.error) {
        setPolitic({
          ...politic,
          error: '請輸入政見',
        })
      }
      return false
    } else {
      if (politic.error) {
        setPolitic({
          ...politic,
          error: '',
        })
      }
    }
    return true
  }

  function checkSources(sources: Source[]) {
    let isValid: boolean = true
    if (sources.length === 0) {
      setSources([
        {
          ...getNewSource(),
          error: '請至少填寫一個來源',
        },
      ])
      isValid = false
    } else {
      const checked: Source[] = sources.map((source) => {
        if (!source.value || !source.value.trim()) {
          isValid = false
          if (!source.error) {
            return {
              ...source,
              error: '來源不能為空',
            }
          }
        } else {
          if (source.error) {
            return {
              ...source,
              error: '',
            }
          }
        }

        return source
      })

      setSources(checked)
    }
    return isValid
  }

  // use JSON.stringify to compare objects
  const isPoliticValid = useMemo(
    () => checkPolitic(politic),
    [JSON.stringify(politic)]
  )
  const isSourcesValid = useMemo(
    () => checkSources(sources),
    [JSON.stringify(sources)]
  )

  useEffect(() => {
    setIsValid(isPoliticValid && isSourcesValid)
  }, [isPoliticValid, isSourcesValid])

  function submitHandler() {
    if (!isValid) return
    setShowError(true)

    props.submitForm({
      ...politic,
      source: sourcesToString(sources),
    })
  }

  return (
    <>
      <section className={s['politic']}>
        <textarea
          rows={isMobile() ? 6 : 3}
          className={s['politic-input']}
          placeholder="請輸入候選人政見..."
          value={politic.desc}
          onChange={(e) => {
            setPolitic({ ...politic, desc: e.target.value })
          }}
        />
        {politic.error && showError && (
          <span className={s['error-text']}>{politic.error}</span>
        )}
      </section>
      {sourceList}
      <div className={s['btn-add-source']} onClick={addSource}>
        <span>新增來源</span>
        <span className={s['icon-add-source']}>
          <Plus />
        </span>
      </div>
      <div className={s['reminder']}>附上清楚資料來源有助志工快速審核資訊</div>
      <section className={s['control-group']}>
        <span onClick={props.closeForm} className={s['cancel']}>
          取消
        </span>
        <Button
          text="送出審核"
          icon={ArrowRight()}
          disable={!isValid}
          onClick={submitHandler}
        />
      </section>
    </>
  )
}
