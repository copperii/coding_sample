import React, { useState, useEffect } from 'react'
import {
  useQuery,
  useMutation,
  useApolloClient,
  useLazyQuery,
} from '@apollo/react-hooks'
import AddUserForm from '../components/users/addUserForm'
import EditUserForm from '../components/users/editUserForm'
import LoginForm from '../components/users/loginForm'
import Button from '../components/button'
import Heading from '../components/heading'
import Footer from '../components/footer'
import Notification from '../components/notification'
import {
  CREATE_USER,
  EDIT_USER,
  LOGIN,
  IS_LOGGED_IN,
  REFRESH_TOKEN,
  VERIFY_TOKEN,
  CURRENT_USER,
} from '../graphql/userQueries'
import parseJwt from '../utils/parsejwt'
import { ButtonRow } from './users.styles'
import { Section } from '../styles/globalStyle'
import { getCurrentUTC } from '../utils/times'

const Users = () => {
  const [token, setToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [createNew, setCreateNew] = useState(false)
  const [editAccount, setEditAccount] = useState(false)
  const [notification, setNotification] = useState({
    message: '',
    type: 'none',
    time: 0,
  })
  const client = useApolloClient()
  const { data } = useQuery(IS_LOGGED_IN)
  const [getCurrentUser, currentUserFound] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: 'no-cache',
  })

  const handleError = error => {
    if (error.graphQLErrors)
      error.graphQLErrors.map(({ message }) => {
        if (message === 'Signature has expired') {
          handleLoginRefresh()
          return null
        }
        if (message === 'Please, enter valid credentials') {
          setNotification({
            message: `Logon failed! ${message}`,
            type: 'error',
            time: 5,
          })
          return null
        }
        if (message === 'Authentication credentials were not provided') {
          setNotification({
            message: `Missing credentials! ${message}`,
            type: 'error',
            time: 5,
          })
          return null
        }
        if (message === 'Current password is incorrect') {
          setNotification({
            message: `Password change failed ${message}`,
            type: 'error',
            time: 5,
          })
          return null
        }

        return null
      })

    if (error.networkError) {
      // console.log(`[Network error]: ${error.networkError}`)
      return null
    }
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError,
    update(cache) {
      cache.writeData({ data: { isLoggedIn: true } })
    },
  })

  const [addUser] = useMutation(CREATE_USER, {
    onError: handleError,
  })

  const [editUser] = useMutation(EDIT_USER, {
    onError: handleError,
  })

  const [refreshLogin] = useMutation(REFRESH_TOKEN, {
    onError: handleError,
  })

  const [verifyToken] = useMutation(VERIFY_TOKEN, {
    onError: handleError,
  })

  const handleVerifyToken = async () => {
    if (token) {
      const result = await verifyToken({
        variables: { token },
      })
      if (result) {
        client.writeData({
          data: { loggedInUsername: result.data.verifyToken.payload.username },
        })
        const username = result.data.verifyToken.payload.username
        const expiration = result.data.verifyToken.payload.exp
        localStorage.setItem('username', username)
        localStorage.setItem('expiration', expiration)
      }
    }
  }

  const handleLoginRefresh = async () => {
    if (refreshToken) {
      const result = await refreshLogin({
        variables: { refreshToken },
      })
      if (result) {
        const token = result.data.refreshToken.token
        const refreshToken = result.data.refreshToken.refreshToken
        const username = result.data.refreshToken.payload.username
        const expiration = result.data.refreshToken.payload.exp
        client.writeData({
          data: { loggedInUsername: result.data.refreshToken.payload.username },
        })
        setToken(token)
        setRefreshToken(refreshToken)
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('username', username)
        localStorage.setItem('expiration', expiration)
      }
    }
  }

  useEffect(() => {
    if (data && data.isLoggedIn) {
      if (!token) {
        setToken(localStorage.getItem('token'))
      }
      if (!refreshToken) {
        setRefreshToken(localStorage.getItem('refreshToken'))
      }
      handleVerifyToken()
    }
    // eslint-disable-next-line
  }, [data, token, refreshToken])

  useEffect(() => {
    const currentToken = parseJwt(token)
    if (currentToken) {
      if (getCurrentUTC() > currentToken.exp * 1000) {
        localStorage.removeItem('token')
        setToken(null)
        if (refreshToken) {
          handleLoginRefresh()
        }
      }
    }
    // eslint-disable-next-line
  }, [token, refreshToken])

  const logout = () => {
    setToken(null)
    setRefreshToken(null)
    localStorage.clear()
    localStorage.removeItem('username')
    localStorage.removeItem('expiration')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('token')
    client.resetStore()
    client.writeData({ data: { isLoggedIn: false } })
    setNotification({
      message: 'User logged out',
      type: 'info',
      time: 2,
    })
  }

  const handleEditAccount = () => {
    getCurrentUser()
    setEditAccount(true)
  }

  if (createNew) {
    return (
      <>
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
        <AddUserForm
          handleError={handleError}
          setNotification={setNotification}
          addUser={addUser}
          setCreateNew={setCreateNew}
        />
      </>
    )
  }

  if (
    editAccount &&
    currentUserFound.data &&
    currentUserFound.data.currentUser
  ) {
    return (
      <>
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
        <EditUserForm
          handleError={handleError}
          setNotification={setNotification}
          editUser={editUser}
          setEditAccount={setEditAccount}
          userData={currentUserFound.data.currentUser}
        />
      </>
    )
  }

  if (!token) {
    return (
      <>
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
        <LoginForm
          login={login}
          setToken={token => setToken(token)}
          setRefreshToken={refreshToken => setRefreshToken(refreshToken)}
          setCreateNew={() => setCreateNew(true)}
          setNotification={setNotification}
        />
      </>
    )
  }

  return (
    <>
      <Section top='true'>
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
        <Heading h4>Account actions</Heading>
        <ButtonRow>
          <Button onClick={logout} label='Logout'></Button>
          <Button
            onClick={() => setCreateNew(true)}
            label='Create new account'
          ></Button>
          <Button onClick={handleEditAccount} label='Edit account'></Button>
        </ButtonRow>
      </Section>
      <Footer></Footer>
    </>
  )
}

export default Users
