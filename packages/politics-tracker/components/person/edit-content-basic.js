import { Fragment, useState, useMemo } from 'react'
import EditContentItem from './edit-content-item'
import EditSendOrCancel from './edit-send-or-cancel'
import EditSource from './edit-source'
import {
  stringToSources,
  sourcesToString,
  getNewSource,
  typedHasOwnProperty,
} from '~/utils/utils'
import { print } from 'graphql'
import CreatePerson from '~/graphql/mutation/person/create-person.graphql'
import { fireGqlRequest } from '~/utils/utils'
import { useToast } from '../toast/use-toast'
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
  const toast = useToast()
  const [sourceList, setSourceList] = useState(
    sources ? stringToSources(sources, '\n') : [getNewSource()]
  )
  const [personInfo, setPersonInfo] = useState(Object.assign({}, personData))

  /**
   * If  property `value` of element in `sourceList` are all empty strings,
   * or personInfo.name is empty string, then should disable submit button.
   */

  const cloneObj = { ...personInfo }

  const shouldDisableSubmit = useMemo(
    () =>
      (JSON.stringify(mapEmptyValueToNull(cloneObj)) ===
        JSON.stringify(mapEmptyValueToNull(Object.assign({}, personData))) &&
        JSON.stringify(takeArrayKeyName(sourceList, 'value')) ===
          JSON.stringify(
            // @ts-ignore
            takeArrayKeyName(stringToSources(sources, '\n'), 'value')
          )) ||
      !personInfo.name ||
      sourceList.filter((i) => i.value).length === 0,
    [personInfo.name, sourceList, personInfo]
  )
  // @ts-ignore
  function mapEmptyValueToNull(object) {
    Object.keys(object).forEach((key) => {
      if (object[key] === '') {
        object[key] = null
      }
      if (object[key] === undefined) {
        object[key] = null
      }
    })
    return object
  }
  // @ts-ignore
  function takeArrayKeyName(array, key) {
    // @ts-ignore
    return array.map(function (item) {
      return item[key]
    })
  }

  /**
   *
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
    return numberDate
  }
  /**
   * @param {string} value
   */
  // TODO: check dateArray=[undefined,undefined,undefined] to CMS
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
  // TODO: check dateArray=[undefined,undefined,undefined] to CMS
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
  //TODO: use type Person in person.ts rather than {Object}
  /** @param {Object} data */
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
      update: updateList('name'),
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
      update: updateDeadDate,
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
          update,
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
            onChange={update}
            personInfo={personInfo}
            // @ts-ignore
            errormessage={errormessage}
          ></EditContentItem>
        )
      )}
      <EditSource sourceList={sourceList} setSourceList={setSourceList} />
      <EditSendOrCancel
        isDisable={shouldDisableSubmit}
        onClick={() => setShouldShowEditMode(false)}
        submitHandler={() => submitHandler()}
      />
    </Fragment>
  )
}
