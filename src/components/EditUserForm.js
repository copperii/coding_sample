import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import '../App.css'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const EditUserForm = (props) => {
  const [username, setUsername] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')

  const handleEmailChange = (em) => {
    setEmail(em)
  }

  useEffect(() => {
    setUsername(props.user.username)
    setFirstname(props.user.realname.firstname)
    setLastname(props.user.realname.lastname)
    handleEmailChange(props.user.email)
  }, [props.user])

  const editUser = async (event) => {
    event.preventDefault()
    props.setNotification(`Applying changes`, 'info', 3)
    const result = await props.editUser({
      variables: {
        username,
        firstname: firstname.length>0 ? firstname : null,
        lastname: lastname.length>0 ? lastname: null,
        email
      }
    })

    if (result) {
      //props.setNotification(`Edit user result '${result}'`, 'info', 3)
    }
  }

  return (
    <div>
      <Form onSubmit={editUser}>
        <Form.Group className="form-group w-50">
          <Form.Label>Firstname</Form.Label>
            <Form.Control
            type='text'
            value={firstname}
            onChange={({ target }) => setFirstname(target.value)}
          />
          <Form.Label>Lastname</Form.Label>
            <Form.Control
            type='text'
            value={lastname}
            onChange={({ target }) => setLastname(target.value)}
          />
          <Form.Label>Email</Form.Label>
            <Form.Control
            type='email'
            value={email}
            onChange={({ target }) => handleEmailChange(target.value)}
          />
          <button className="button buttonLone" type='submit'>Update values</button>
          <button className="button buttonLone" type='reset' onClick={props.handlePasswordChange} >Reset password</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm)
