import { Fragment } from 'react'
import EditContentItem from './edit-content-item'
import SourceInput from '../politics/source-input'
import EditSendOrCancel from './edit-send-or-cancel'
import EditSource from './edit-source'

/**
 * @typedef {Object} EditContentBasic - Basic information of edit field
 * @property {string} name - name , must be unique
 * @property {string} title - title of field
 * @property {string} description -  description of field, tell user what to be noticed when editing
 * @property {string} type - what kind of edit field, currently have two kind of type: input(enter text) and radio(choose 1 option)
 * @property {string[]} [options] - radio options list, only exist if type is "radio"
 * @property {string} [placeholder] - input placeholder content, only exist if type is "type"
 * @property {boolean} isRequired - if field must write when editing
 */

const EDIT_CONTENT_BASIC = [
  {
    name: 'name',
    title: '姓名',
    description:
      '若名字有分隔點，請用全形分隔點「・」\n原住民中文名與羅馬拼音之間需要空格\n若名字之間有空格，請用半形空格',
    type: 'input',
    placeholder: '請輸入姓名',
    isRequired: true,
  },
  {
    name: 'image',
    title: '大頭照',
    description: '請輸入照片網址',
    type: 'input',
    placeholder: '請輸入照片網址',
    isRequired: false,
  },
  {
    name: 'alternative',
    title: '別名',
    description: '請輸入別名',
    type: 'input',
    placeholder: '請輸入別名',
    isRequired: false,
  },
  {
    name: 'other_names',
    title: '舊名',
    description: '請輸入別名',
    type: 'input',
    placeholder: '請輸入別名',
    isRequired: false,
  },
  {
    name: 'bath-date',
    title: '出生日期',
    description: '時間格式：yyyy-mm-dd ，若只知道年份可以只填年份',
    type: 'input',
    placeholder: '1900-01-01',
    isRequired: false,
  },
  {
    name: 'death-date',
    title: '死亡日期',
    description: '時間格式：yyyy-mm-dd ，若只知道年份可以只填年份',
    type: 'input',
    placeholder: '1900-01-01',
    isRequired: false,
  },
  {
    name: 'gender',
    title: '生理性別',
    description: '',
    type: 'radio',
    options: ['女', '男'],
    isRequired: false,
  },
  {
    name: 'national_identity',
    title: '國籍',
    description: '',
    type: 'input',
    placeholder: '請輸入國籍',
    isRequired: false,
  },
]

/**
 *
 * @param {Object} props
 * @param {string} props.sources
 * @param {function} props.setShouldShowEditMode
 * @returns
 */
export default function EditContentBasic({ sources, setShouldShowEditMode }) {
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
          ></EditContentItem>
        )
      )}
      <EditSource sources={sources}></EditSource>
      <EditSendOrCancel
        onClick={() => setShouldShowEditMode(false)}
        submitHandler={() => {}}
      />
    </Fragment>
  )
}
