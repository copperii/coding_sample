import React, { useState } from 'react'
import * as Queries from '../graphql/Queries'
import { useApolloClient } from '@apollo/react-hooks'
import AddUserForm from '../components/UserForm'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const UserAdd = (props) => {

  return (
    <div>
      <AddUserForm
        addUser={props.addUser}
        setPage={props.setPage}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd)