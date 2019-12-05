import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import '../App.css'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const ChangePasswordForm = (props) => {
  const [username, setUsername] = useState('')
  const [oldpassword, setOldpassword] = useState('')
  const [newpassword, setNewpassword] = useState('')
  const [newpassword2, setNewpassword2] = useState('')
  
  useEffect(() => {
    setUsername(props.user.username)
  }, [props.user])

  const changePassword = async (event) => {
    event.preventDefault()
    if (newpassword === newpassword2) {
      event.preventDefault()
      const result = await props.changePassword({
        variables: { username, oldpassword, newpassword }
      })
      if (result) {
        props.setNotification(`password changed for  '${result.data.changePassword.username}'`, 'success', 3)
      }
      setOldpassword('')
      setNewpassword('')
      setNewpassword2('')
    } else {
      props.setNotification(`New passwords do not match`, 'error', 5)
      setNewpassword('')
      setNewpassword2('')
    }
  }

  return (
    <div>
      <h4> Change password for: <i> {username} </i> </h4>
      <Form onSubmit={changePassword}>
        <Form.Group className="form-group w-50">
          <Form.Label>Old Password</Form.Label>
            <Form.Control
            type='Password'
            value={oldpassword}
            onChange={({ target }) => setOldpassword(target.value)}
          />
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='Password'
            value={newpassword}
            onChange={({ target }) => setNewpassword(target.value)}
          />
          <Form.Label>Retype the New Password</Form.Label>
          <Form.Control
            type='Password'
            value={newpassword2}
            onChange={({ target }) => setNewpassword2(target.value)}
          />
          <button className="button buttonLone" type='submit'>Change password</button>
          </Form.Group>
      </Form>
    </div>  
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setNotification,
  clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm)
