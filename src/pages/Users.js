import React, { useState } from 'react'
import * as Queries from '../graphql/Queries'
import { useApolloClient } from '@apollo/react-hooks'
import EditUserForm from '../components/EditUserForm'
import AddUserForm from '../components/AddUserForm'
import { Table } from 'react-bootstrap'
import '../styles/App.css'
import ChangePasswordForm from '../components/ChangePasswordForm'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { Redirect } from 'react-router-dom'

const Users = (props) => {
  const client = useApolloClient()
  const [user, setUser] = useState(null)
  const [editValues, setEditValues] = useState(null)
  const [showPage, setShowPage] = useState('All')
  const [allowEdit, setAllowEdit] = useState(false)
  props.setCurrentPage('/users')

  if (props.user === '') {
    return (
      <Redirect to='/authentication' />
    )
  }
  
  if (props.result.loading) {
    return <div> loading user data ...</div>
  }

  const showUser = async (username) => {
    const { data } = await client.query({
      query: Queries.FIND_USER,
      variables: { searchString: username }
    })
    setUser(data.findUser)
    if (props.user === username) {
      setAllowEdit(true)
    } 
  }

  const deleteUser = async (username) => {
    if (username === 'demouser') {
      props.setNotification('You are not allowed to delete the demouser', 'error', 4)
    } else {
      await props.deleteUser({
        variables: { username }
      })
      setUser(null)
    }
  }
  
  const handlePasswordChange = () => {
    if (props.user !== 'demouser') {
      setShowPage('Password')
    } else {
      props.setNotification('Demouser not allowed to change password', 'error', 4)
    }
  }

  const EditUserNow = () => {
    return (
      <div>
        <EditUserForm
          user={user}
          editUser={props.editUser}
          handlePasswordChange={handlePasswordChange}
          setPage={props.setPage}
          setAllowEdit={(allowEdit) => setAllowEdit(allowEdit)}
        />
      </div>
      )
  }
  
  const ShowUserDetails = () => {
    return (
      <div>
        <Table className="table w-auto">
          <thead>
            <tr>
              <th> Username </th>
              <th> First name </th>
              <th> Last name </th>
              <th> Email </th>
            </tr>
          </thead>
          <tbody>
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.realname.firstname}</td>
              <td>{user.realname.lastname}</td>
              <td>{user.email}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }

  const resetForm = () => {
    setUser(null)
    setEditValues(null)
    setAllowEdit(false)
    setShowPage('All')
  }

  if (showPage === 'Password') {
    return (
      <div>
        <table className="tableNoBorder w-auto">
          <tbody>
            <tr>
              <td> <button className="button" onClick={resetForm}>Show All Users</button></td>
            </tr>
          </tbody>
        </table>
        <ChangePasswordForm
          user={user}
          changePassword={props.changePassword}
        />
      </div>
    )
  }

  if (user && allowEdit) {
    return (
      <div className="topdiv">
        <table className="tableNoBorder w-auto">
          <tbody>
            <tr>
              <td className="tdAddRight"><h4 >{user.username}</h4></td>
              <td> <button className="button" onClick={resetForm}>Show All Users</button></td>
              {editValues ?
                <td></td>
                :
                <td><button className="button" onClick={() => setEditValues(true)}>Edit {user.username} </button></td>
              }
            </tr>
          </tbody>
        </table>
        {editValues ?
          <EditUserNow />
          :
          <ShowUserDetails />
        }
      </div>
    )
  }

  if (user) {
    return (
      <div className="topdiv">
        <table className="tableNoBorder w-auto">
          <tbody>
            <tr>
              <td className="tdAddRight"><h4 >{user.username}</h4></td>
              <td> <button className="button" onClick={resetForm}>Show All Users</button></td>
              {
                user.username === 'demouser'
                  ?
                  <td></td>
                  :
                  <td>
                    <button className="button" onClick={() => deleteUser(user.username)}>
                      Delete this user
                    </button>
                  </td>
              }
            </tr>
            <tr><td>
              This demo site allows you to add and delete other users.
              </td>
            </tr>
          </tbody>
        </table>
          <ShowUserDetails />
      </div>
    )
  }

  if (showPage === 'Add') {
    return (
      <div>
        <table className="tableNoBorder w-auto">
          <tbody>
          <tr>
            <td className="tdAddRight"><h4 >Add User</h4></td>
            <td> <button className="button" onClick={resetForm}>Show All Users</button></td>
            
            </tr>
            </tbody>
        </table>
        <AddUserForm
          addUser={props.addUser}
          setShowPage={(showPage) => setShowPage(showPage)}
          setPage={props.setPage}
        />
      </div>
    )
  }

  return (
    <div>
      <table className="tableNoBorder w-auto">
        <tbody>
        <tr>
          <td className="tdAddRight"><h4 >All Users</h4></td>
          <td> <button className="button" onClick={() => setShowPage('Add')}>Add User</button></td>
          </tr>
          </tbody>
      </table>
      <Table className="tableWithBorder w-auto">
        <thead>
          <tr>
            <th> Username </th>
            <th> First name </th>
            <th> Last name </th>
            <th> Details </th>
          </tr>
        </thead>
        <tbody>
      {
        props.result.data.allUsers.map(u =>
          <tr key={u.username}>
            <td>{u.username}</td>
            <td>{u.realname.firstname}</td>
            <td>{u.realname.lastname}</td>
            <td><button className="button" onClick={() => showUser(u.username)}>
              Show details
              </button></td>
            </tr>
        )
          }
        </tbody>
      </Table>
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
  clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)