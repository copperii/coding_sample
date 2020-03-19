import React, { useState } from 'react'
import Button from '../button'
import Heading from '../heading'
import Input from '../input'
import { Section, Form, Row, Label, ButtonRow } from './users.styles'
import { object, func } from 'prop-types'

const AddUserForm = props => {
  const { addUser, setNotification, notification, setCreateNew } = props
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [accountCreated, setAccountCreated] = useState(false)

  const handleAddUser = event => {
    event.preventDefault()

    if (password === password2) {
      addUser({ variables: { username, email, password, firstName, lastName } })
      if (notification && notification.type === 'none') {
        setNotification({
          message: 'User ' + username + ' was added',
          type: 'info',
          time: 2,
        })
      }
      setAccountCreated(true)
    } else {
      setNotification({
        message: 'Passwords do not match',
        type: 'error',
        time: 5,
      })
    }
  }

  if (accountCreated) {
    return (
      <Section>
        <Heading h5>You can now login with your credentials.</Heading>
        <Button
          onClick={() => setCreateNew(false)}
          label="Return to the login page"
        ></Button>
      </Section>
    )
  }

  return (
    <Section>
      <Heading h5>Create a new user </Heading>
      <Form onSubmit={handleAddUser}>
        <Row>
          <Label>
            Username <i>(at least 6 characters)</i>
          </Label>
          <Input
            data-testid="addUser-username-input"
            type="text"
            value={username}
            pattern=".{6,100}"
            title="Must be between 6 and 100 characters in length"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value.trim())}
            required
          />
        </Row>
        <Row>
          <Label>
            First name <i>(optional)</i>
          </Label>
          <Input
            data-testid="addUser-firstName-input"
            type="text"
            value={firstName}
            pattern=".{0,35}"
            title="First name"
            placeholder="First name"
            onChange={({ target }) => setFirstName(target.value)}
          />
        </Row>
        <Row>
          <Label>
            Last name <i>(optional)</i>
          </Label>
          <Input
            data-testid="addUser-lastName-input"
            type="text"
            value={lastName}
            pattern=".{0,35}"
            title="Last name"
            placeholder="Last name"
            onChange={({ target }) => setLastName(target.value)}
          />
        </Row>
        <Row>
          <Label>Email</Label>
          <Input
            data-testid="addUser-email-input"
            type="email"
            value={email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="Enter a valid email address"
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
            required
          />
        </Row>
        <Row>
          <Label>
            Password <i>(at least 8 characters)</i>
          </Label>
          <Input
            data-testid="addUser-password-input"
            type="password"
            value={password}
            pattern=".{8,20}"
            title="Must be between 8 and 20 characters in length"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </Row>
        <Row>
          <Label>Verify password</Label>
          <Input
            data-testid="addUser-password2-input"
            type="password"
            value={password2}
            pattern=".{8,20}"
            title="Verify the Password"
            placeholder="Retype the password"
            onChange={({ target }) => setPassword2(target.value)}
            required
          />
        </Row>
        <ButtonRow>
          <Button
            data-testid="addUser-button"
            type="submit"
            label="Create"
          ></Button>
          <Button
            data-testid="addUser-cancel-button"
            onClick={() => setCreateNew(false)}
            label="Return to users page"
          ></Button>
        </ButtonRow>
      </Form>
    </Section>
  )
}

AddUserForm.propTypes = {
  addUser: func,
  setNotification: func,
  notification: object,
  setCreateNew: func,
}
export default AddUserForm
