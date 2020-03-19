import gql from 'graphql-tag'

const USER_DETAILS = gql`
  fragment UserDetails on user {
    username
    email
    id
    firstName
    lastName
  }
`

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      user {
        username
        email
        id
        firstName
        lastName
      }
    }
  }
`
export const EDIT_USER = gql`
  mutation editUser(
    $userId: String!
    $username: String
    $email: String
    $password: String
    $newPassword: String
    $firstName: String
    $lastName: String
  ) {
    editUser(
      userId: $userId
      username: $username
      email: $email
      password: $password
      newPassword: $newPassword
      firstName: $firstName
      lastName: $lastName
    ) {
      user {
        username
        email
        id
        firstName
        lastName
      }
    }
  }
`

export const ALL_USERS = gql`
  query {
    users {
      ...UserDetails
      isActive
    }
  }
  ${USER_DETAILS}
`

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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`

export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`
export const LOGGED_IN_USERNAME = gql`
  query loggedInUsername {
    loggedInUsername @client
  }
`

export const VERIFY_TOKEN = gql`
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      payload
      refreshToken
    }
  }
`

export const REVOKE_TOKEN = gql`
  mutation revokeToken($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`

export const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $username: String!
    $oldpassword: String!
    $newpassword: String!
  ) {
    changePassword(
      username: $username
      oldpassword: $oldpassword
      newpassword: $newpassword
    ) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`

export const FIND_USER = gql`
  query findUser(
    $userId: String
    $username: String
    $email: String
    $firstName: String
    $lastName: String
  ) {
    user(
      userId: $userId
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      username
      email
      id
      firstName
      lastName
    }
  }
`
