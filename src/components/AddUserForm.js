import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import '../App.css'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AddUserForm = (props) => {
  const [username, setUsername] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const addUser = async (event) => {
    event.preventDefault()
    try {
      await props.addUser({
        variables: { username, firstname, lastname, email, password }
      })
      setUsername('')
      setFirstname('')
      setLastname('')
      setEmail('')
      setPassword('')
      props.setShowPage('All')
    } catch (err) {
      props.setNotification(`User addition failed`, 'error', 10)
    }
  }

  return (
    <div>
      <Form onSubmit={addUser}>
        <Form.Group className="form-group w-50">
          <Form.Label>Username</Form.Label>
            <Form.Control
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
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
            onChange={({ target }) => setEmail(target.value)}
          />
          <Form.Label>Password</Form.Label>
            <Form.Control
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <div>
            &nbsp;
          </div>
          <button className="button buttonlone" type='submit'>Add this user</button>
          </Form.Group>
      </Form>
    </div>  
  )
}

const mapStateToProps = (state) => {
  return {
    //coordinates: state.coordinates,
    notification: state.notification,
    //user: state.user,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setNotification,
  clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm)
