import React, { useState } from 'react'
import '../styles/App.css'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { setCurrentUser } from '../reducers/userReducer'
import { Redirect } from 'react-router-dom'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (props.user !== '') {
    return (
      <Redirect to='/logout' />
    )
  }

  const submit = async (event) => {
    event.preventDefault()
    try {
      const result = await props.login({
        variables: { username, password }
      })

      if (result) {
        const token = result.data.login.value
        props.setToken(token)
        props.changeCookie(token)
        props.setCurrentUser(username)
        props.setLoggingIn(true)
        // Not best security practice, but good enough for demo use.
        localStorage.setItem('cppr-user-token', token)
      }
    } catch (error) {
      props.setNotification(`Login failed '${error}'`, 'error', 10)
    }
  }

  return (
    <div>
      <Form onSubmit={submit}>
        <Form.Group className="form-group w-50">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='Text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button className="button buttonLone" type='submit'>Login</button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user,
  }
}

const mapDispatchToProps = {
  setNotification,
  clearNotification,
  setCurrentUser  
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)