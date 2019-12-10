import React, { useState } from 'react'
import '../styles/App.css'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

const Authentication = (props) => {
  const [loggingIn, setLoggingIn] = useState('false')

  const logout = async (event) => {
    event.preventDefault()
    props.logout()
    return (
      <Redirect to={props.currentPage} />
    )
  }

  if (props.user !== '') {
    if (loggingIn === true) {
      return (
        <Redirect to={props.currentPage} />
      )
    }
    return (
      <div>
        <h3 className="heading">You are currently logged in as <i>{props.user} </i></h3>
        <Form onSubmit={logout}>
          <Form.Group className="form-group w-50">
            <button className="button buttonLone" type='submit'>Logout</button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  return (
    <div>
      <h4 className="heading">Authentication</h4>
      <div className="text"> On this demo site you can log in with username <b> demouser</b> and password <b>userdemo</b>.
        </div>
      <LoginForm
        login={props.login}
        setToken={props.setToken}
        changeCookie={props.changeCookie}
        setLoggingIn={(value) => setLoggingIn(value)}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    filter: state.filter,
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)