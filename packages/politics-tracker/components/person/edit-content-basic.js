import { Fragment, useState } from 'react'
import EditContentItem from './edit-content-item'
import EditSendOrCancel from './edit-send-or-cancel'
import EditSource from './edit-source'
import {
  stringToSources,
  getNewSource,
  typedHasOwnProperty,
} from '~/utils/utils'

/** TODO: refactor jsDoc, make it more clear
 * @typedef {Object} EditContentBasic - Basic information of edit field
 * @property {string} name - name , must be unique
 * @property {string} title - title of field
 * @property {string} description -  description of field, tell user what to be noticed when editing
 * @property {string} type - what kind of edit field, currently have two kind of type: input(enter text) and radio(choose 1 option)
 * @property {string[]} [options] - radio options list, only exist if type is "radio"
 * @property {string} [placeholder] - input placeholder content, only exist if type is "type"
 * @property {boolean} isRequired - if field must write when editing
 * @property {string|(number | null)[]}  value - value of content
 * @property {function}  onChange - value of content
 * @property {import('~/types/person').Person}  personInfo - value of content
 */

/**
 *
 * @param {Object} props
 * @param {string} [props.sources]
 * @param {import('~/types/person').Person} props.personData
 * @param {function} props.setShouldShowEditMode
 * @returns
 */
export default function EditContentBasic({
  sources,
  setShouldShowEditMode,
  personData,
}) {
  const [sourceList, setSourceList] = useState(
    sources ? stringToSources(sources, '\n') : [getNewSource()]
  )
  const [personInfo, setPersonInfo] = useState(Object.assign({}, personData))
  /**
   *
   * @param {string} name
   */
  function updateList(name) {
    return (/** @type {string | undefined} */ value) => {
      const cloneObj = { ...personInfo }
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
    if (value === '男') {
      setPersonInfo({ ...personInfo, gender: 'M' })
    } else if (value === '女') {
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
    return numberDate
  }
  /**
   * @param {string} value
   */
  function updateBirthDate(value) {
    const dateArray = stringToDate(value)
    if (dateArray[0]) {
      setPersonInfo({
        ...personInfo,
        birth_date_year: dateArray[0],
      })
    }
    if (dateArray[1]) {
      setPersonInfo({
        ...personInfo,
        birth_date_month: dateArray[1],
      })
    }
    if (dateArray[2]) {
      setPersonInfo({
        ...personInfo,
        birth_date_day: dateArray[2],
      })
    }
  }
  /**
   * @param {string} value
   */
  function updateDeadDate(value) {
    const dateArray = stringToDate(value)
    if (dateArray[0]) {
      setPersonInfo({
        ...personInfo,
        death_date_year: dateArray[0],
      })
    }
    if (dateArray[1]) {
      setPersonInfo({
        ...personInfo,
        death_date_month: dateArray[1],
      })
    }
    if (dateArray[2]) {
      setPersonInfo({
        ...personInfo,
        death_date_day: dateArray[2],
      })
    }
  }

  const EDIT_CONTENT_BASIC = [
    {
      name: 'name',
      title: '姓名',
      description:
        '若名字有分隔點，請用全形分隔點「・」\n原住民中文名與羅馬拼音之間需要空格\n若名字之間有空格，請用半形空格',
      type: 'input',
      placeholder: '請輸入姓名',
      isRequired: true,
      value: personInfo.name,
      update: updateList('name'),
    },
    {
      name: 'image',
      title: '大頭照',
      description: '請輸入照片網址',
      type: 'input',
      placeholder: '請輸入照片網址',
      isRequired: false,
      value: personInfo.image,
      update: updateList('image'),
    },
    {
      name: 'alternative',
      title: '別名',
      description: '請輸入別名',
      type: 'input',
      placeholder: '請輸入別名',
      isRequired: false,
      value: personInfo.alternative,
      update: updateList('alternative'),
    },
    {
      name: 'other_names',
      title: '舊名',
      description: '請輸入舊名',
      type: 'input',
      placeholder: '請輸入舊名',
      isRequired: false,
      value: personInfo.other_names,
      update: updateList('other_names'),
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
      update: updateBirthDate,
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
      update: updateDeadDate,
    },
    {
      name: 'gender',
      title: '生理性別',
      description: '',
      type: 'radio',
      options: ['F', 'M'],
      isRequired: false,
      value: personInfo.gender,
      update: updateGender,
    },
    {
      name: 'national_identity',
      title: '國籍',
      description: '',
      type: 'input',
      placeholder: '請輸入國籍',
      isRequired: false,
      value: personInfo.national_identity,
      update: updateList('national_identity'),
    },
  ]

  return (
    <Fragment>
      {EDIT_CONTENT_BASIC.map(
        ({
          name,
          title,
          description,
          placeholder,
          isRequired,
          type,
          options,
          value,
          update,
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
            onChange={update}
            personInfo={personInfo}
          ></EditContentItem>
        )
      )}
      <EditSource sourceList={sourceList} setSourceList={setSourceList} />
      <EditSendOrCancel
        onClick={() => setShouldShowEditMode(false)}
        submitHandler={() => {}}
      />
    </Fragment>
  )
}
