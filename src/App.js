import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import { useCookies } from 'react-cookie'
import * as Queries from './graphql/Queries'
import Notification from './components/Notification'
import Home from './pages/Home'
import Links from './pages/Links'
import Users from './pages/Users'
import About from './pages/About'
import Authentication from './pages/Authentication'
import CoordsToMap from './pages/CoordsToMap'
import './styles/App.css'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { setCurrentUser, clearCurrentUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const App = (props) => {
  const [currentPage, setCurrentPage] = useState('/')
  const [token, setToken] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['cppr-app'])
  const client = useApolloClient()
  
  const allUsers = useQuery(Queries.ALL_USERS)
  const allLinks = useQuery(Queries.ALL_LINKS)
  const loggedInUser = useQuery(Queries.LOGGED_IN_USER)

  useEffect(() => {
    if (loggedInUser.data !== undefined) {
      if (loggedInUser.data.loggedInUser !== null) {
        const foundUser = loggedInUser.data.loggedInUser.username
          props.setCurrentUser(foundUser)
        }
      }
  }, [loggedInUser])
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
      updateCacheWith(response.data.addUser)
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
    props.clearCurrentUser()
    return (
      <Redirect to={currentPage} />
    )
  }

  return (
    <div className='container fix-jump'>
      <Notification />
      <Router>
        <div>
          <Navbar collapseOnSelect expand="md" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link className="link-padding" to="/"><img src='homeicon.png' alt='home' /></Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link className="link-padding" to="/mapping">Map coordinates</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {
                    props.user === ''
                      ?
                      <div></div>
                      :
                      <Link className="link-padding" to="/users">Users</Link>
                  }
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link className="link-padding" to="/links">Links</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link className="link-padding" to="/about">About</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                   {
                      props.user === ''
                      ?
                      <Link className="link-padding" to="/authentication">Login</Link>
                      :
                      <Link className="link-padding" to="/authentication">Logout</Link>
                    }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/" render={() =>
            <Home
              result={loggedInUser}
              currentPage={currentPage}
              setCurrentPage={(page) => setCurrentPage(page)}
            />
          } />
          <Route exact path="/mapping" render={() =>
            <CoordsToMap
              currentPage={currentPage}
              setCurrentPage={(page) => setCurrentPage(page)}
            />
          } />
          <Route exact path="/authentication" render={() =>
            <Authentication
              logout={logout}
              login={login}
              setToken={(token) => setToken(token)}
              changeCookie={(tokenValue) => changeCookie(tokenValue)}
              currentPage={currentPage}
              setCurrentPage={(page) => setCurrentPage(page)}
            />
          } />
          <Route exact path="/users" render={() =>
            <Users
              result={allUsers}
              editUser={editUser}
              addUser={addUser}
              deleteUser={deleteUser}
              changePassword={changePassword}
              currentPage={currentPage}
              setCurrentPage={(page) => setCurrentPage(page)}
              token={token}
            />
          } />
          <Route exact path="/links" render={() =>
            <Links
              result={allLinks}
              addLink={addLink}
              currentPage={currentPage}
              setCurrentPage={(page) => setCurrentPage(page)}
            />
          } />
          <Route exact path="/about" render={() =>
            <About
              result={loggedInUser}
              currentPage={currentPage}
              setCurrentPage={(page) => setCurrentPage(page)}
            />
          } />
        </div>
      </Router>
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