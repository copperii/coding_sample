import React, { useEffect } from 'react'
import '../styles/App.css'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { setCurrentUser } from '../reducers/userReducer'

const Home = (props) => {
  props.setCurrentPage('/')

  useEffect(() => {
    if (props.result.data !== undefined) {
      if (props.result.data.loggedInUser !== null) {
        const foundUser = props.result.data.loggedInUser.username
        props.setCurrentUser(foundUser)
      }
    }
  }, [props.result.data])
  
  return (
    <div>
      <h4 className="heading">Copperi demo site</h4>
      <div className="text">
        Welcome 
        {props.user !== '' ?
          <i> {props.user} </i> 
          :
            <div className="text"> On this demo site you can log in with username <b> demouser</b> and password <b>userdemo</b>.
        </div>} 
      </div>
      <div className="text">
        Since this is a demo site, you can add and delete users after login.
      </div>     
      <div className="text">
        Demouser cannot change password. You can login as another user and then use change password functionality.
      </div>
      <div className="text">
        <b>Note</b> Links page has some missing funtionality not implemented as of yet.
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setNotification,
  clearNotification,
  setCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)