import React from 'react'
import '../App.css'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Authentication = (props) => {

  if (!props.show) {
    return null
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
        setPage={props.setPage}
        setErrorMessage={props.setErrorMessage}
        setCurrentUser={props.setCurrentUser}
        setMessage={props.setMessage}
        setVariant={props.setVariant}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
