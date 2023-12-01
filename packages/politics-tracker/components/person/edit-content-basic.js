import { print } from 'graphql'
import { Fragment, useMemo, useState } from 'react'

import CreatePerson from '~/graphql/mutation/person/create-person.graphql'
import { logGAEvent } from '~/utils/analytics'
import { takeArrayKeyName } from '~/utils/person'
import {
  getNewSource,
  stringToSources,
  typedHasOwnProperty,
} from '~/utils/utils'
import { fireGqlRequest } from '~/utils/utils'

import { useToast } from '../toast/use-toast'
import EditContentItem from './edit-content-item'
import EditSendOrCancel from './edit-send-or-cancel'
import EditSource from './edit-source'

/**
 * @typedef {import('~/types/person').PersonData} PersonData
 */

/**
 * @param {Object} props
 * @param {string} [props.sources]
 * @param {PersonData} props.personData
 * @param {(value: boolean) => void} props.setShouldShowEditMode
 * @returns {React.ReactElement}
 */
export default function EditContentBasic({
  sources,
  setShouldShowEditMode,
  personData,
}) {
  const toast = useToast()
  const [sourceList, setSourceList] = useState(
    sources ? stringToSources(sources, '\n') : [getNewSource()]
  )
  const [personInfo, setPersonInfo] = useState(Object.assign({}, personData))

  /**
   * If  property `value` of element in `sourceList` are all empty strings,
   * or personInfo.name is empty string, then should disable submit button.
   */

  /** @type {PersonData} */
  const cloneObj = { ...personInfo }
  /** @type {PersonData} */
  const personInfoValueCheck = { ...personInfo }

  // check whether source-list value has ('')
  // if have (''), return true
  /** @template {import('~/types/common').Source} T */
  const SourceValueCheck = takeArrayKeyName(sourceList, 'value')?.some(
    (source) => source === ''
  )

  // if user edit basic-form, return false, then source-error-message hidden
  // send BasicFormEditCheck as a prop to edit-source.js
  const BasicFormEditCheck =
    JSON.stringify(mapEmptyValueToNull(cloneObj)) ===
    JSON.stringify(mapEmptyValueToNull(Object.assign({}, personData)))

  const shouldDisableSubmit = useMemo(
    () =>
      Boolean(
        (JSON.stringify(mapEmptyValueToNull(cloneObj)) ===
          JSON.stringify(mapEmptyValueToNull(Object.assign({}, personData))) &&
          JSON.stringify(takeArrayKeyName(sourceList, 'value')) ===
            JSON.stringify(
              takeArrayKeyName(stringToSources(sources, '\n'), 'value')
            )) ||
          !personInfo.name ||
          sourceList.filter((i) => i.value).length === 0 ||
          SourceValueCheck
      ),
    [personInfo.name, sourceList, personInfo]
  )

  /**
   * @param {Record<string, unknown>} object
   * @returns {Record<string, unknown>} object
   */
  function mapEmptyValueToNull(object) {
    Object.keys(object).forEach((key) => {
      /**
       * @param {String} [key]
       */
      if (object[key] === '') {
        object[key] = null
      }
      if (object[key] === undefined) {
        object[key] = null
      }
    })
    return object
  }

  /**
   * @param {string} name
   */
  function updateList(name) {
    return (/** @type {string | undefined} */ value) => {
      if (typedHasOwnProperty(cloneObj, name)) {
        cloneObj[name] = value
      }
      setPersonInfo(cloneObj)
    }
  }
  /**
   * gender need to transform to certain string: "男" to "M", "女" to "F"
   * @param {string} value
   */
  function updateGender(value) {
    let newValue = ''
    if (value === 'M') {
      setPersonInfo({ ...personInfo, gender: 'M' })
    } else if (value === 'F') {
      setPersonInfo({ ...personInfo, gender: 'F' })
    } else return
  }
  /**
   *
   * @param {string} str
   * @returns {number[]}
   */
  function stringToDate(str) {
    const separateDate = str.trim().split(/[.\-,/_?:\s]/)
    //filter if item can't transform to number, then transform it
    const numberDate = separateDate
      .filter((i) => i && Number(i))
      .map((i) => Number(i))
    // TODO: check dateArray=[undefined,undefined,undefined] to CMS
    return numberDate
  }

  /**
   * @param {string} value
   */
  function updateBirthDate(value) {
    const dateArray = stringToDate(value)
    setPersonInfo({
      ...personInfo,
      birth_date_year: dateArray[0],
      birth_date_month: dateArray[1],
      birth_date_day: dateArray[2],
    })
  }

  /**
   * @param {string} value
   */
  function updateDeadDate(value) {
    const dateArray = stringToDate(value)
    setPersonInfo({
      ...personInfo,
      death_date_year: dateArray[0],
      death_date_month: dateArray[1],
      death_date_day: dateArray[2],
    })
  }

  //client side only
  /**
   * @typedef {Pick<
   *    PersonData,
   *    'name'| 'image'| 'alternative'| 'other_names'|
   *    'birth_date_year'| 'birth_date_month'| 'birth_date_day'|
   *    'death_date_year'| 'death_date_month'| 'death_date_day'|
   *    'gender'| 'national_identity'
   * >} PersonDataForCreation
   *
   * @param {PersonDataForCreation} data
   */
  async function createPerson(data) {
    const cmsApiUrl = `${window.location.origin}/api/data`

    try {
      const variables = {
        data: {
          thread_parent: {
            connect: { id: personData.id },
          },
          ...data,
        },
      }
      const result = await fireGqlRequest(
        print(CreatePerson),
        variables,
        cmsApiUrl
      )
      console.log(result)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  async function submitHandler() {
    const isSuccess = await createPerson({
      name: personInfo.name,
      image: personInfo.image,
      alternative: personInfo.alternative,
      other_names: personInfo.other_names,
      birth_date_year: personInfo.birth_date_year,
      birth_date_month: personInfo.birth_date_month,
      birth_date_day: personInfo.birth_date_day,
      death_date_year: personInfo.death_date_year,
      death_date_month: personInfo.death_date_month,
      death_date_day: personInfo.death_date_day,
      gender: personInfo.gender,
      national_identity: personInfo.national_identity,
    })
    if (isSuccess) {
      toast.open({
        status: 'success',
        title: '送出成功',
        desc: '通過志工審核後，您新增的資料就會出現在這裡',
      })
      setShouldShowEditMode(false)
    } else {
      toast.open({
        status: 'fail',
        title: '出了點問題...',
        desc: '送出失敗，請重試一次',
      })
    }
  }

  /** @typedef {Omit<import('./edit-content-item').Props, 'personInfo'>} EditContentBlockConfig */
  /** @type {EditContentBlockConfig[]} */
  const editBasicInfo = [
    {
      name: 'name',
      title: '姓名',
      description:
        '若名字有分隔點，請用全形分隔點「・」\n原住民中文名與羅馬拼音之間需要空格\n若名字之間有空格，請用半形空格',
      type: 'input',
      placeholder: '請輸入姓名',
      isRequired: true,
      value: personInfo.name,
      onChange: updateList('name'),
      errormessage: '姓名為必填',
    },
    {
      name: 'image',
      title: '大頭照',
      description: '請輸入照片網址',
      type: 'input',
      placeholder: '請輸入照片網址',
      isRequired: false,
      value: personInfo.image,
      onChange: updateList('image'),
    },
    {
      name: 'alternative',
      title: '別名',
      description: '請輸入別名',
      type: 'input',
      placeholder: '請輸入別名',
      isRequired: false,
      value: personInfo.alternative,
      onChange: updateList('alternative'),
    },
    {
      name: 'other_names',
      title: '舊名',
      description: '請輸入舊名',
      type: 'input',
      placeholder: '請輸入舊名',
      isRequired: false,
      value: personInfo.other_names,
      onChange: updateList('other_names'),
    },
    {
      name: 'bath-date',
      title: '出生日期',
      description: '時間格式：yyyy-mm-dd ，若只知道年份可以只填年份',
      type: 'input-date',
      placeholder: '1900-01-01',
      isRequired: false,
      value: [
        personInfo.birth_date_year,
        personInfo.birth_date_month,
        personInfo.birth_date_day,
      ],
      onChange: updateBirthDate,
      errormessage: '請輸入正確的時間格式',
    },
    {
      name: 'death-date',
      title: '死亡日期',
      description: '時間格式：yyyy-mm-dd ，若只知道年份可以只填年份',
      type: 'input-date',
      placeholder: '1900-01-01',
      isRequired: false,
      value: [
        personInfo.death_date_year,
        personInfo.death_date_month,
        personInfo.death_date_day,
      ],
      onChange: updateDeadDate,
      errormessage: '請輸入正確的時間格式',
    },
    {
      name: 'gender',
      title: '生理性別',
      description: '',
      type: 'radio',
      options: ['F', 'M'],
      isRequired: false,
      value: personInfo.gender,
      onChange: updateGender,
    },
    {
      name: 'national_identity',
      title: '國籍',
      description: '',
      type: 'input',
      placeholder: '請輸入國籍',
      isRequired: false,
      value: personInfo.national_identity,
      onChange: updateList('national_identity'),
    },
  ]

  return (
    <Fragment>
      {editBasicInfo.map(
        ({
          name,
          title,
          description,
          placeholder,
          isRequired,
          type,
          options,
          value,
          onChange,
          errormessage,
        }) => (
          <EditContentItem
            key={name}
            title={title}
            name={name}
            description={description}
            placeholder={placeholder}
            isRequired={isRequired}
            type={type}
            options={options}
            value={value}
            onChange={onChange}
            errormessage={errormessage}
          ></EditContentItem>
        )
      )}
      <EditSource
        sourceList={sourceList}
        setSourceList={setSourceList}
        inputStatusCheck={[personInfoValueCheck]}
        BasicFormEditCheck={BasicFormEditCheck}
      />
      <EditSendOrCancel
        isDisable={shouldDisableSubmit}
        onClick={() => setShouldShowEditMode(false)}
        submitHandler={() => submitHandler()}
        GAClick={() => {
          logGAEvent('click', '點擊「基本資料」區塊的「送出審核」')
        }}
      />
    </Fragment>
  )
}
