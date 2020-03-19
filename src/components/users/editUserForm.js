import React, { useState, useEffect } from 'react'
import Button from '../button'
import Heading from '../heading'
import Input from '../input'
import { Section, Form, Row, Label, ButtonRow } from './users.styles'
import { object, func } from 'prop-types'

const EditUserForm = props => {
  const {
    editUser,
    setNotification,
    notification,
    setEditAccount,
    userData,
  } = props
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const userId = userData.id

  useEffect(() => {
    setUsername(userData.username)
    setEmail(userData.email)
    setFirstName(userData.firstName)
    setLastName(userData.lastName)
  }, [userData])

  const handlePasswordChange = event => {
    event.preventDefault()

    if (password !== '' && newPassword === newPasswordAgain) {
      editUser({
        variables: {
          userId,
          password,
          newPassword,
        },
      })
      if (notification === undefined) {
        setNotification({
          message: 'Password for ' + username + ' was changed',
          type: 'info',
          time: 2,
        })
        setEditAccount(false)
      }
    } else {
      setNotification({
        message: 'New passwords do not match',
        type: 'error',
        time: 5,
      })
    }
  }

  const handleEditUser = event => {
    event.preventDefault()
    editUser({
      variables: {
        userId,
        username,
        email,
        firstName,
        lastName,
      },
    })
    if (notification === undefined) {
      setNotification({
        message: 'User ' + username + ' was edited',
        type: 'info',
        time: 2,
      })
    }
    setEditAccount(false)
  }

  return (
    <Section>
      <Heading h4>Edit {username} </Heading>
      <Form onSubmit={handleEditUser}>
        <Row>
          <Label>
            Username <i>(at least 6 characters)</i>
          </Label>
          <Input
            data-testid="editUser-username-input"
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
            data-testid="editUser-firstName-input"
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
            data-testid="editUser-lastName-input"
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
            data-testid="editUser-email-input"
            type="email"
            value={email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="Enter a valid email editress"
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
            required
          />
        </Row>
        <ButtonRow>
          <Button
            data-testid="editUser-button"
            type="submit"
            label="Save"
          ></Button>
          <Button
            data-testid="editUser-cancel-button"
            onClick={() => setEditAccount(false)}
            label="Return to users page"
          ></Button>
        </ButtonRow>
      </Form>
      <Form onSubmit={handlePasswordChange}>
        <Row>
          <Heading h4>Reset password</Heading>
          <Label>Current password</Label>
          <Input
            data-testid="editUser-curretnPassword-input"
            type="password"
            value={password}
            pattern=".{8,20}"
            title="Must be between 8 and 20 characters in length"
            placeholder="Type current password or leave empty for no change"
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </Row>
        <Row>
          <Label>
            New password <i>(at least 8 characters)</i>
          </Label>
          <Input
            data-testid="editUser-newPassword-input"
            type="password"
            value={newPassword}
            pattern=".{8,20}"
            title="Must be between 8 and 20 characters in length"
            placeholder="Type new password or leave empty for no change"
            onChange={({ target }) => setNewPassword(target.value)}
            required
          />
        </Row>
        <Row>
          <Label>Verify new password</Label>
          <Input
            data-testid="editUser-newPasswordAgain-input"
            type="password"
            value={newPasswordAgain}
            pattern=".{8,20}"
            title="Verify the new password"
            placeholder="Retype new password"
            onChange={({ target }) => setNewPasswordAgain(target.value)}
            required
          />
        </Row>
        <ButtonRow>
          <Button
            data-testid="editUser-button"
            type="submit"
            label="Save"
          ></Button>
          <Button
            data-testid="editUser-cancel-button"
            onClick={() => setEditAccount(false)}
            label="Return to users page"
          ></Button>
        </ButtonRow>
      </Form>
    </Section>
  )
}

EditUserForm.propTypes = {
  editUser: func,
  setNotification: func,
  notification: object,
  setEditAccount: func,
  userData: object.isRequired,
}

export default EditUserForm
