import React from 'react'
import { Success, Error, Modal, Info } from './styles'
import { object, func } from 'prop-types'

const Notification = props => {
  const { notification, setNotification } = props

  if (notification.type === 'none') {
    return null
  }

  if (notification.message === '') {
    return null
  }
  const clearMessage = () => {
    setTimeout(() => {
      setNotification({ message: '', type: 'none', time: 0 })
    }, notification.time * 1000)
  }

  clearMessage()

  switch (notification.type) {
    case 'success':
      return (
        <>
          <Modal>
            <Success> {notification.message}</Success>
          </Modal>
        </>
      )

    case 'error':
      return (
        <>
          <Modal>
            <Error> {notification.message}</Error>
          </Modal>
        </>
      )

    default:
      return (
        <>
          <Modal>
            <Info> {notification.message}</Info>
          </Modal>
        </>
      )
  }
}

Notification.propTypes = {
  notification: object,
  setNotification: func,
}
export default Notification
