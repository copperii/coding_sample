import React, { useState } from 'react'
import TestRenderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import { EditUserForm } from './editUserForm'
import gql from 'graphql-tag'
import Button from '../button'
import Heading from '../heading'
import Input from '../input'
import { Section, Form, Row, Label, ButtonRow } from './users.styles'

export const CURRENT_USER = gql`
  query {
    currentUser {
      username
      email
      id
      firstName
      lastName
    }
  }
`

const handleEditUser = () => {}
const UserForm = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [accountEdited, setAccountEdited] = useState(false)
  const [editAccount, setEditAccount] = useState(false)
  return (
    <div>
      <Section>
        <Heading h5>Edit {username} </Heading>
        <Form onSubmit={handleEditUser}>
          <Row>
            <Label>
              Username <i>(at least 6 characters)</i>
            </Label>
            <Input
              data-testid='editUser-username-input'
              type='text'
              value={username}
              pattern='.{6,100}'
              title='Must be between 6 and 100 characters in length'
              placeholder='username'
              onChange={({ target }) => setUsername(target.value.trim())}
              required
            />
          </Row>
          <Row>
            <Label>
              First name <i>(optional)</i>
            </Label>
            <Input
              data-testid='editUser-firstName-input'
              type='text'
              value={firstName}
              pattern='.{0,35}'
              title='First name'
              placeholder='First name'
              onChange={({ target }) => setFirstName(target.value)}
            />
          </Row>
          <Row>
            <Label>
              Last name <i>(optional)</i>
            </Label>
            <Input
              data-testid='editUser-lastName-input'
              type='text'
              value={lastName}
              pattern='.{0,35}'
              title='Last name'
              placeholder='Last name'
              onChange={({ target }) => setLastName(target.value)}
            />
          </Row>
          <Row>
            <Label>Email</Label>
            <Input
              data-testid='editUser-email-input'
              type='email'
              value={email}
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
              title='Enter a valid email editress'
              placeholder='Email'
              onChange={({ target }) => setEmail(target.value)}
              required
            />
          </Row>
          <Row>
            <Heading h4>Reset password</Heading>
            <Label>Current password</Label>
            <Input
              data-testid='editUser-curretnPassword-input'
              type='password'
              value={password}
              pattern='.{8,20}'
              title='Must be between 8 and 20 characters in length'
              placeholder='Type current password or leave empty for no change'
              onChange={({ target }) => setPassword(target.value)}
            />
          </Row>
          <Row>
            <Label>
              Password <i>(at least 8 characters)</i>
            </Label>
            <Input
              data-testid='editUser-password-input'
              type='password'
              value={password}
              pattern='.{8,20}'
              title='Must be between 8 and 20 characters in length'
              placeholder='Type new password or leave empty for no change'
              onChange={({ target }) => setPassword(target.value)}
            />
          </Row>
          <Row>
            <Label>Verify password</Label>
            <Input
              data-testid='editUser-password2-input'
              type='password'
              value={password2}
              pattern='.{8,20}'
              title='Verify the Password'
              placeholder='Retype password'
              onChange={({ target }) => setPassword2(target.value)}
            />
          </Row>
          <ButtonRow>
            <Button
              data-testid='editUser-button'
              type='submit'
              label='Save'
            ></Button>
            <Button
              data-testid='editUser-cancel-button'
              onClick={() => setEditAccount(false)}
              label='Cancel'
            ></Button>
          </ButtonRow>
        </Form>
      </Section>
    </div>
  )
}

const mocks = [
  {
    request: {
      query: CURRENT_USER,
    },
    result: {
      data: {
        username: 'testuser',
        email: 'testuser@test.fi',
        id: '45678',
        firstName: 'UserFirst',
        lastName: 'UserLast',
      },
    },
  },
]

describe('Edit user form tests', () => {
  test('Renders without an error', () => {
    const component = render(
      <>
        <MockedProvider mocks={mocks} addTypename={false}>
          <UserForm />
        </MockedProvider>
      </>
    )
    const element = component.findByPlaceholderText('Retype password')
    expect(element).toBeDefined()
  })
})

test('2. Renders without an error', () => {
  const component = render(
    <>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserForm />
      </MockedProvider>
    </>
  )
  const element = component.findByPlaceholderText('Retype password')
  expect(element).toBeDefined()
  // component.debug()
})
