import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import '../styles/App.css'
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
          <Form.Label>Username <i>(at least 6 characters)</i></Form.Label>
            <Form.Control
            type='text'
            value={username}
            pattern='.{6,20}'
            title='Must be between 6 and 20 characters in length'
            onChange={({ target }) => setUsername(target.value)}
            required
          />
          <Form.Label>Firstname</Form.Label>
            <Form.Control
            type='text'
            value={firstname}
            pattern='.{1,}'
            title='First name cannot be empty'
            onChange={({ target }) => setFirstname(target.value)}
            required
          />
          <Form.Label>Lastname</Form.Label>
            <Form.Control
            type='text'
            value={lastname}
            pattern='.{1,}'
            title='Last name cannot be empty'
            onChange={({ target }) => setLastname(target.value)}
            required
          />
          <Form.Label>Email</Form.Label>
            <Form.Control
            type='email'
            value={email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title='Enter a valid email address'
            onChange={({ target }) => setEmail(target.value)}
            required
          />
          <Form.Label>Password <i>(at least 8 characters)</i></Form.Label>
            <Form.Control
            type='password'
            value={password}
            pattern='.{8,20}'
            title='Must be between 8 and 20 characters in length'
            onChange={({ target }) => setPassword(target.value)}
            required
          />
          <button className="button buttonlone" type='submit'>Add this user</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm)