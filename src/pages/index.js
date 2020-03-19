import React, { useState, useEffect } from 'react'
import NavigationBar from '../components/navigationBar'
import GlobalStyle from '../styles/globalStyle'
import Routes from '../routes'
import { useQuery } from '@apollo/react-hooks'
import { LOGGED_IN_USERNAME, REFRESH_TOKEN } from '../graphql/userQueries'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { getCurrentUTC } from '../utils/times'

const Pages = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const initialRefreshToken = localStorage.getItem('refreshToken')
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken)
  const [cycleNumber, setCycleNumber] = useState('0')
  const [refreshLogin] = useMutation(REFRESH_TOKEN, {})
  const { data } = useQuery(LOGGED_IN_USERNAME)
  const client = useApolloClient()

  useEffect(() => {
    const getNewToken = async () => {
      const result = await refreshLogin({
        variables: { refreshToken },
      })
      if (result) {
        const newToken = result.data.refreshToken.token
        const newRefreshToken = result.data.refreshToken.refreshToken
        const username = result.data.refreshToken.payload.username
        const expiration = result.data.refreshToken.payload.exp
        setRefreshToken(newRefreshToken)
        localStorage.setItem('token', newToken)
        localStorage.setItem('refreshToken', newRefreshToken)
        localStorage.setItem('username', username)
        localStorage.setItem('expiration', expiration)
        client.writeData({
          data: { loggedInUsername: result.data.refreshToken.payload.username },
        })
      }
    }
    if (refreshToken) {
      getNewToken()
    }
    // eslint-disable-next-line
  }, [cycleNumber])

  const refreshPeriod = 30000
  useEffect(() => {
    const refreshCycle = setInterval(() => {
      const testToken = localStorage.getItem('refreshToken')

      if (testToken === null) {
        setRefreshToken(null)
        // logout has occurred or no initial data.
      } else {
        setRefreshToken(testToken)
      }
      const expirationUTC = localStorage.getItem('expiration') * 1000

      if (expirationUTC) {
        const currentUTC = getCurrentUTC()

        if (expirationUTC - currentUTC < refreshPeriod + 2000) {
          setCycleNumber(currentUTC)
        }
      }
    }, refreshPeriod)
    return () => clearInterval(refreshCycle)
  }, [])

  return (
    <>
      <GlobalStyle />
      <NavigationBar
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        loggedInUsername={data && data.loggedInUsername}
      />
      <Routes loggedInUsername={data && data.loggedInUsername} />
    </>
  )
}

export default Pages
