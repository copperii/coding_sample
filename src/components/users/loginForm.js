import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { func } from 'prop-types'
import Button from '../button'
import Heading from '../heading'
import Input from '../input'
import Footer from '../footer'
import { Label, Row, Text, Form, ButtonRow } from './users.styles'
import { Section } from '../../styles/globalStyle'

const LoginForm = props => {
  const {
    setNotification,
    login,
    setToken,
    setCreateNew,
    setRefreshToken,
  } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const client = useApolloClient()

  const handleLogin = async event => {
    event.preventDefault()

    const result = await login({
      variables: { username, password },
    })

    if (result) {
      const token = result.data.tokenAuth.token
      const refreshToken = result.data.tokenAuth.refreshToken
      setToken(token)
      setRefreshToken(refreshToken)
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      client.writeData({ data: { loggedInUsername: username } })
      setNotification({
        message: 'User ' + username + ' logged in',
        type: 'info',
        time: 2,
      })
    }
  }
  const registerUser = event => {
    event.preventDefault()
    setCreateNew()
  }

  return (
    <>
      <Section top="true">
        <Heading h5>Login </Heading>

        <Form onSubmit={handleLogin}>
          <Row>
            <Label>Username</Label>
            <Input
              data-testid="login-username-input"
              type="text"
              placeholder="Enter the username"
              value={username}
              pattern=".{6,100}"
              title="Must be between 6 and 100 characters in length"
              onChange={({ target }) => setUsername(target.value.trim())}
              required
            />
          </Row>

          <Row>
            <Label>Password</Label>
            <Input
              data-testid="login-password-input"
              type="password"
              placeholder="Enter the password"
              value={password}
              pattern=".{8,20}"
              title="Must be between 8 and 20 characters in length"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Row>

          <ButtonRow>
            <Button
              data-testid="login-button"
              type="submit"
              label="Login"
              addTopMargin="true"
            ></Button>
            <Text>Do not have an account?{'  '}</Text>
            <Button
              data-testid="login-createnew-button"
              onClick={registerUser}
              label="Create new user"
              addTopMargin="true"
              addLeftMargin="true"
            ></Button>
          </ButtonRow>
        </Form>
      </Section>
      <Footer></Footer>
    </>
  )
}

LoginForm.propTypes = {
  login: func,
  setToken: func,
  setRefreshToken: func,
  setCreateNew: func,
  setNotification: func,
}

export default LoginForm
