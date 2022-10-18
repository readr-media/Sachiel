import React, { Fragment, useState } from 'react'
import { EditContentItemTitle } from './edit-content-item'
import { stringToSources, getNewSource } from '~/utils/utils'
import SourceInput from '../politics/source-input'
import { InputWrapperNoLabel } from './edit-content-biography'
import AddInputButton from './add-input-button'
/**
 *
 * @param {Object} props
 * @param {string} [props.emails]
 * @param {string} [props.links]
 * @param {string} [props.contactDetails]
 * @returns {React.ReactElement}
 */
export default function EditContentContact({ emails, links, contactDetails }) {
  const [emailList, setEmailList] = useState(
    emails ? stringToSources(emails, '\n') : [getNewSource()]
  )
  const [linkList, setLinkList] = useState(
    links ? stringToSources(links, '\n') : [getNewSource()]
  )
  const [contactList, setContactList] = useState(
    contactDetails ? stringToSources(contactDetails, '\n') : [getNewSource()]
  )

  /**
   *
   * @param  {import('~/types/common').Source[]} list
   * @param {function} setList
   * @returns {()=>void}
   */
  function addList(list, setList) {
    return () => {
      const extended = [...list, getNewSource()]
      setList(extended)
    }
  }
  /**
   * @param  {import('~/types/common').Source[]} list
   * @param {Function} setList
   * @returns {() => void}
   */
  function updateList(list, setList) {
    return (/** @type {string} */ id, /** @type {string} */ value) => {
      const updated = list.map((item) => {
        if (id === item.id) {
          return { ...item, value }
        }
        return item
      })
      setList(updated)
    }
  }

  /**
   * @param  {import('~/types/common').Source[]} list
   * @param {Function} setList
   * @returns {() => void}
   */
  function deleteList(list, setList) {
    return (/** @type {string} */ id) => {
      const remain = list.filter((item) => id !== item.id)
      setList(remain)
    }
  }

  const updateEmail = updateList(emailList, setEmailList)
  const addEmail = addList(emailList, setEmailList)
  const deleteEmail = deleteList(emailList, setEmailList)
  const updateLink = updateList(linkList, setLinkList)
  const addLink = addList(linkList, setLinkList)
  const deleteLink = deleteList(linkList, setLinkList)
  const updateContact = updateList(contactList, setContactList)
  const addContact = addList(contactList, setContactList)
  const deleteContact = deleteList(contactList, setContactList)

  return (
    <Fragment>
      <EditContentItemTitle>電子信箱</EditContentItemTitle>

      {emailList?.map((item, index) => (
        //TODO: add error and show error
        <InputWrapperNoLabel key={item.id}>
          <SourceInput
            placeholder={'信箱'}
            id={item.id}
            no={index + 1}
            value={item.value}
            error={item.error}
            showError={false}
            removable={index !== 0}
            onChange={updateEmail}
            onDelete={deleteEmail}
          />
        </InputWrapperNoLabel>
      ))}
      <AddInputButton addTarget="電子信箱" onClick={addEmail}></AddInputButton>

      <EditContentItemTitle>電話/地址</EditContentItemTitle>
      {contactList?.map((item, index) => (
        //TODO: add error and show error
        <InputWrapperNoLabel key={item.id}>
          <SourceInput
            placeholder={'電話/地址'}
            id={item.id}
            no={index + 1}
            value={item.value}
            error={item.error}
            showError={false}
            removable={index !== 0}
            onChange={updateContact}
            onDelete={deleteContact}
          />
        </InputWrapperNoLabel>
      ))}
      <AddInputButton
        addTarget="電話/地址"
        onClick={addContact}
      ></AddInputButton>
      <EditContentItemTitle>網站</EditContentItemTitle>

      {linkList?.map((item, index) => (
        //TODO: add error and show error
        <InputWrapperNoLabel key={item.id}>
          <SourceInput
            placeholder={'網站'}
            id={item.id}
            no={index + 1}
            value={item.value}
            error={item.error}
            showError={false}
            removable={index !== 0}
            onChange={updateLink}
            onDelete={deleteLink}
          />
        </InputWrapperNoLabel>
      ))}
      <AddInputButton addTarget="網站" onClick={addLink}></AddInputButton>
    </Fragment>
  )
}
