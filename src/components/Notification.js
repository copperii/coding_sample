import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const successStyle = {
    marginTop: 15,
    border: 'dotted',
    borderRadius: 7,
    color: 'green',
    padding: 10,
    borderWidth: 1,
    width: 500
  }
  const errorStyle = {
    marginTop: 15,
    border: 'solid',
    borderRadius: 7,
    color: 'red',
    padding: 10,
    borderWidth: 1,
    width: 500
  }
  const noStyle = {
    marginTop: 15,
    border: 'none',
    padding: 10,
    borderWidth: 0
  }

  const notification = props.notification
  
  if (props.notification.length === 0) {
    return null
  }

  if (notification.toString() === '') {
    return (
      <div style={noStyle}></div>
    )
  }

  switch (props.notification[0].type) {
    case 'success':
      return (< div style={successStyle} > {props.notification[0].message}</div >)
    case 'error':
      return (< div style={errorStyle} > {props.notification[0].message}</div >)
    default:
      return (< div style={noStyle} > {props.notification[0].message}</div >)
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    filter: state.filter
  }
}

export default connect(mapStateToProps)(Notification)