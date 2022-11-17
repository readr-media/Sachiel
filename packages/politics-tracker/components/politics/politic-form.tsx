import type { Politic } from '~/types/politics'
import type { Source } from '~/types/common'
import { useWindowSize } from '~/utils/hooks'
import {
  getTailwindConfig,
  getNewSource,
  stringToSources,
  sourcesToString,
} from '~/utils/utils'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import SourceInput from './source-input'
import Button from './button'
import Plus from '~/components/icons/plus'
import ArrowRight from '~/components/icons/arrow-right'
import s from './politic-form.module.css'
import ReactGA from 'react-ga'

const handleSendButtonClick = () => {
  ReactGA.event({
    category: 'Projects_PoliticsTracker',
    action: 'click',
    label: '點擊「送出審核」',
  })
}

const fullConfig = getTailwindConfig()

type PoliticFormProps = {
  politic: Politic
  closeForm: () => void
  // this is type definition
  // eslint-disable-next-line
  submitForm: (politic: Politic) => Promise<boolean>
}

export default function PoliticForm(props: PoliticFormProps): JSX.Element {
  const windowSize = useWindowSize()

  function isMobile() {
    const screenConfig = fullConfig?.theme?.screens
    // @ts-ignore: next line
    const boundary = Number(screenConfig?.md?.split('px')[0])

    return windowSize.width <= boundary
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
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

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

  function checkModified(politic: Politic, sources: Source[]) {
    return !(
      politic.desc === props.politic.desc &&
      sourcesToString(sources) === props.politic.source
    )
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
  const isModified = useMemo(
    () => checkModified(politic, sources),
    [JSON.stringify(politic), JSON.stringify(sources)]
  )

  useEffect(() => {
    setIsValid(isModified && isPoliticValid && isSourcesValid)
  }, [isPoliticValid, isSourcesValid, isModified])

  async function submitHandler() {
    if (!isValid || isProcessing) return
    setIsProcessing(true)
    setShowError(true)

    await props.submitForm({
      ...politic,
      source: sourcesToString(sources),
    })

    setIsProcessing(false)
  }

  return (
    <>
      <section className={s['politic']}>
        <label className={classNames(s['section-label'], s['required'])}>
          政見
        </label>
        <span className={s['section-description']}>
          以「能檢驗是否實踐」為一條政見！例如候選人說了：「我承諾當上市長以後要蓋輕軌、拓展高速公路路線，解決ＯＯ區交通。」那撰寫上要拆成兩條政見：「蓋輕軌，解決ＯＯ區交通。」＆「拓展高速公路路線，解決ＯＯ區交通。」
        </span>
        <textarea
          rows={isMobile() ? 6 : 3}
          className={s['politic-input']}
          placeholder="請輸入候選人政見..."
          value={politic.desc}
          onChange={(e) => {
            setPolitic({ ...politic, desc: e.target.value })
          }}
          required
        />
        {politic.error && showError && (
          <span className={s['error-text']}>{politic.error}</span>
        )}
      </section>
      <section className={s['detail']}>
        <label className={classNames(s['section-label'])}>政見補充說明</label>
        <textarea
          rows={6}
          className={s['politic-input']}
          placeholder="請輸入政見補充說明..."
          value={politic.content}
          onChange={(e) => {
            setPolitic({ ...politic, content: e.target.value })
          }}
        />
      </section>
      <section className={s['source']}>
        <label className={classNames(s['section-label'], s['required'])}>
          來源
        </label>
        <span className={s['section-description']}>
          附上清楚資料來源有助志工快速審核資訊。
        </span>
        {sourceList}
        <div className={s['btn-add-source']} onClick={addSource}>
          <span>新增來源</span>
          <span className={s['icon-add-source']}>
            <Plus />
          </span>
        </div>
      </section>
      <section className={s['control-group']}>
        <span onClick={props.closeForm} className={s['cancel']}>
          取消
        </span>
        <Button
          text="送出審核"
          icon={ArrowRight()}
          disable={!isValid}
          loading={isProcessing}
          onClick={() => {
            handleSendButtonClick()
            submitHandler()
          }}
        />
      </section>
    </>
  )
}
