import styled from 'styled-components'
import ContentTitle from './content-title'
import EditButton from './edit-button'
import ContentItem from './content-item'
import ProfileImage from './profile-image'
import SectionBody from './section-body'
import { useMemo } from 'react'
import moment from 'moment'
const SectionBodyContainer = styled.div`
  //adjust position for fitting place when section-toggle is pressed
  margin-left: 10px;
  transition: all 0.3s ease-in-out;
  width: 100%;
  max-height: ${
    /**
     * @param {Object} props
     * @param {boolean} props.shouldShowSectionBody
     */
    ({ shouldShowSectionBody }) => (shouldShowSectionBody ? 'unset' : '0px')
  };
  min-height: ${({ shouldShowSectionBody }) =>
    shouldShowSectionBody ? '200px' : '0px'};
  padding: ${({ shouldShowSectionBody }) =>
    shouldShowSectionBody ? '20px' : '0px'};

  border-color: ${({ theme }) => theme.borderColor.black};
  border-width: 0 4px 4px;
  background-color: ${({ theme }) => theme.backgroundColor.white};
  * {
    display: ${({ shouldShowSectionBody }) => !shouldShowSectionBody && 'none'};
  }
`

const ContentPersonImage = styled(ProfileImage)`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`

/**
 *
 * @param {Object} props
 * @param {boolean} [props.isActive]
 * @param {import('../../types/person').Person} props.peopleData
 * @returns {React.ReactElement}
 */
export default function SectionBodyPersonalFile({
  isActive = false,
  peopleData = {},
}) {
  const {
    name,
    image,
    alternative,
    other_names,
    birth_date_year,
    birth_date_month,
    birth_date_day,
    death_date_year,
    death_date_month,
    death_date_day,
    gender,
    national_identity,
  } = peopleData

  /**
   * check the date passed in, which will be checked with two rule:
   * 1. If the date is valid. For Instances, if date passed in is "2022-25-35" or "2022-25" or "25-35", which is not valid.
   * 2. If the date is in the past. For Instances, if current date is "2022-10-16" , the date passed in is "2023-1-1", even the date is valid, is not in the past.
   * If both passed, then return `true`, otherwise return `false`
   * @param {import('~/types/person').Person["birth_date_year"]} year
   * @param {import('~/types/person').Person["birth_date_month"]} month
   * @param {import('~/types/person').Person["birth_date_day"]} day
   * @returns {Boolean}
   */
  const validateDate = (year = null, month = null, day = null) => {
    if (year && month && day) {
      //e.g. 2022/12/31
      return (
        moment([year, month - 1, day]).isValid() &&
        moment([year, month - 1, day]).isBefore()
      )
    } else if (year && month && !day) {
      //no day info, e.g. 2022/12
      return (
        moment([year, month - 1]).isValid() &&
        moment([year, month - 1, moment().date()]).isBefore()
      )
    } else if (year && !month && !day) {
      //no month and day info, e.g. 2022
      return (
        moment([year, 0, 1]).isValid() &&
        moment([year, moment().month(), moment().date()]).isBefore()
      )
    } else if (!year && month && day) {
      //no year info, e.g. 12/31
      return (
        moment([2000, month - 1, day]).isValid() &&
        moment([moment().year(), month - 1, day]).isBefore()
      )
    } else return false
  }

  /**
   * combine year, month and day to certain date format
   * only accept four format: year/month/day, year/month, year, month/day
   * @param {import('~/types/person').Person["birth_date_year"]} year
   * @param {import('~/types/person').Person["birth_date_month"]} month
   * @param {import('~/types/person').Person["birth_date_day"]} day
   * @returns {String | null}
   */
  const formatDate = (year = null, month = null, day = null) => {
    if (!validateDate(year, month, day)) {
      return null
    } else if (year && month && !day) {
      return `${year}-${month}`
    } else if (year && !month && !day) return `${year}`
    else if (!year && month && day) {
      return `${month}-${day}`
    } else return `${year}-${month}-${day}`
  }
  //TODO: solve warning of useMemo
  const dateOfBirth = useMemo(
    () => formatDate(birth_date_year, birth_date_month, birth_date_day),
    [birth_date_year, birth_date_month, birth_date_day]
  )
  //TODO: solve warning of useMemo
  const dateOfDeath = useMemo(
    () => formatDate(death_date_year, death_date_month, death_date_day),
    [death_date_year, death_date_month, death_date_day]
  )
  const lifespan = useMemo(() => {
    if (
      birth_date_year &&
      death_date_year &&
      validateDate(birth_date_year) &&
      validateDate(death_date_year)
    ) {
      return `（${death_date_year - birth_date_year}歲）`
    } else return ''
  }, [birth_date_year, death_date_year])
  const age = useMemo(() => {
    if (birth_date_year && validateDate(birth_date_year) && !dateOfDeath) {
      return `（${moment().year() - birth_date_year}歲）`
    } else return ''
  }, [birth_date_year, dateOfDeath])
  /**
   * @param {import('~/types/person').Person["gender"]} gender
   * @returns {import('~/types/person').Person["gender"]}
   */
  const getDisplayedGender = (gender) => {
    if (gender === 'M' || gender === '男') {
      return '男'
    } else if (gender === 'F' || gender === '女') {
      return '女'
    } else return null
  }
  const displayedGender = useMemo(() => getDisplayedGender(gender), [gender])
  return (
    <SectionBody shouldShowSectionBody={isActive}>
      <ContentTitle title="基本資料">
        <EditButton />
      </ContentTitle>
      <ContentItem title="姓名" content={name}>
        <ContentPersonImage
          src={image ? image : '/images/default-head-photo.png'}
        />
      </ContentItem>
      <ContentItem title="別名" content={alternative} />
      <ContentItem title="舊名" content={other_names} />
      <ContentItem title="出生日期" content={`${dateOfBirth}${age}`} />
      <ContentItem title="死亡日期" content={`${dateOfDeath}${lifespan}`} />
      <ContentItem title="生理性別" content={displayedGender} />
      <ContentItem title="國籍" content={national_identity} />
    </SectionBody>
  )
}
