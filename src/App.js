import React, { useState } from 'react'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import { useCookies } from 'react-cookie'
import * as Queries from './components/Queries'
import Notification from './components/Notification'
import Home from './pages/Home'
import Links from './pages/Links'
import Users from './pages/Users'
import Authentication from './pages/Authentication'
import CoordsToMap from './pages/CoordsToMap'
import './App.css'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { setCurrentUser, clearCurrentUser } from './reducers/userReducer'

const App = (props) => {
  const [page, setPage] = useState('Home')
  const [token, setToken] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['cppr-app'])
  const client = useApolloClient()
  
  const allUsers = useQuery(Queries.ALL_USERS)
  const allLinks = useQuery(Queries.ALL_LINKS)
  const loggedInUser = useQuery(Queries.LOGGED_IN_USER)

  const handleError = (error) => {
    if (error.graphQLErrors)
      error.graphQLErrors.map(({ message, locations, path }) => {
        
        props.setNotification(`Server error '${message}'`, 'error', 6)
        return null
      })

    if (error.networkError) console.log(`[Network error]: ${error.networkError}`)
  }

  const changeCookie = (tokenValue) => {
    if (cookies===1223) {
      // to eliminate unused error
      console.log(cookies)
    }
    const date = new Date()
    const minutes = 60
    date.setTime(date.getTime() + (minutes * 60 * 1000))
    setCookie('cppr-app', 'token=' + tokenValue, { path: "/", expires: date } )

  }

  const [addUser] = useMutation(Queries.ADD_USER, {
    onError:  handleError,
    update: (store, response) => {
      const storeData = store.readQuery({ query: Queries.ALL_USERS })
      storeData.allUsers.push(response.data.addUser)
      store.writeQuery({
        query: Queries.ALL_USERS,
        data: storeData
      })
    }
  })

  const [addLink] = useMutation(Queries.ADD_LINK, {
    onError: handleError,
    update: (store, response) => {
      const storeData = store.readQuery({ query: Queries.ALL_LINKS })
      storeData.allLinks.push(response.data.addLink)
      store.writeQuery({
        query: Queries.ALL_LINKS,
        data: storeData
      })
    }
  })

  const [editUser] = useMutation(Queries.EDIT_USER, {
    onError: handleError,
    refetchQueries: [{ query: Queries.ALL_USERS }]
  })

  const [changePassword] = useMutation(Queries.CHANGE_PASSWORD, {
    onError: handleError,
    refetchQueries: [{ query: Queries.ALL_USERS }]
  })

  const [deleteUser] = useMutation(Queries.DELETE_USER, {
    onError: handleError,
    refetchQueries: [{ query: Queries.ALL_USERS }]
  })

  const [login] = useMutation(Queries.LOGIN, {
    onError: handleError,
    refetchQueries: [{ query: Queries.ALL_USERS }]
  })

  const updateCacheWith = (addedUser) => {
    const includedIn = (set, object) =>
      set.map(u => u.id).includes(object.id)

    const dataInStore = client.readQuery({ query: Queries.ALL_USERS })
    if (!includedIn(dataInStore.allUsers, addedUser)) {
      dataInStore.allUsers.push(addedUser)
      client.writeQuery({
        query: Queries.ALL_USERS,
        data: dataInStore
      })
    }
  }

  useSubscription(Queries.USER_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const userAdded = subscriptionData.data.userAdded
      props.setNotification(`${userAdded.username} added`, 'info', 3)
      updateCacheWith(userAdded)
    }
  })
  
  const logout = () => {
    setToken(null)
    removeCookie('cppr-app')
    localStorage.clear()
    client.resetStore()
    setPage('Home')
    props.clearCurrentUser()
  }

  return (
    <div className='container'>
      <div>
        <button className="button buttonOnTop" onClick={() => setPage('Home')}>Home</button>
        <button className="button buttonOnTop" onClick={() => setPage('Map')}>Map coordinates</button>
        <button className="button buttonOnTop" onClick={() => setPage('Links')}>Links</button>
        {
          props.user === ''
            ?
            <button className="button buttonOnTop" onClick={() => setPage('Authentication')}>Login</button>
            :
            <React.Fragment>
              <button className="button buttonOnTop" onClick={() => setPage('Users')}>Users</button>
              <button className="button buttonOnTop" onClick={logout}>Logout</button>
            </React.Fragment>
        }
      </div>
     
      <Notification />

      <Home
        show={page === 'Home'}
        result={loggedInUser}
        setPage={(page) => setPage(page)}
      />

      <CoordsToMap
        show={page === 'Map'}
        setPage={(page) => setPage(page)}
      />

      <Links
        show={page === 'Links'}
        result={allLinks}
        setPage={(page) => setPage(page)}
        addLink={addLink}
        handleError={handleError}
      />

      <Users
        show={page === 'Users'}
        result={allUsers}
        editUser={editUser}
        addUser={addUser}
        deleteUser={deleteUser}
        changePassword={changePassword}
        setPage={(page) => setPage(page)}
        token={token}
       
      />
      <Authentication
        show={page === 'Authentication'}
        login={login}
        setToken={(token) => setToken(token)}
        changeCookie={(tokenValue) => changeCookie(tokenValue)}
        setPage={(page) => setPage(page)}
      />
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
  setCurrentUser,
  clearCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)