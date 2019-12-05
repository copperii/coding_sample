import { gql } from 'apollo-boost'

const USER_DETAILS = gql`
  fragment UserDetails on User {
    username
    realname {
      firstname
      lastname
    }
    email
    id
}
`

export const ALL_USERS = gql`
{
  allUsers {
    ...UserDetails
  }
}
${USER_DETAILS}
`

export const LOGGED_IN_USER = gql`
{
  loggedInUser {
    ...UserDetails
  }
}
${USER_DETAILS}
`

export const FIND_USER = gql`
  query findUserByUsername($searchString: String!){
    findUser(username: $searchString){
      ...UserDetails
    }
  }
${USER_DETAILS}
`

export const DELETE_USER = gql`
  mutation deleteUserByUsername($username: String!){
    deleteUser(username: $username){
      username
    }
  }
`

export const DELETE_LINK = gql`
  mutation deleteLink($url: String!){
    deleteLink(url: $url){
      id
    }
  }
`

export const ADD_USER = gql`
  mutation createUser($username: String!, $firstname: String, $lastname: String, $email:String!, $password: String!){
    addUser(
      username: $username,
      firstname: $firstname,
      lastname: $lastname,
      email: $email
      password:  $password
    ) {
      ...UserDetails
    }
  }
${USER_DETAILS}
`

export const EDIT_USER = gql`
  mutation changeUser($username: String!, $firstname: String, $lastname: String, $email:String!){
    editUser(
      username: $username,
      firstname: $firstname,
      lastname: $lastname,
      email: $email
      
    ) {
      ...UserDetails
    }
  }
${USER_DETAILS}
`

export const CHANGE_PASSWORD = gql`
  mutation changePassword($username: String!, $oldpassword: String! $newpassword: String!){
    changePassword(
      username: $username,
      oldpassword: $oldpassword,
      newpassword: $newpassword,
    ) {
      ...UserDetails
    }
  }
${USER_DETAILS}
`

export const ALL_LINKS = gql`
  query allLinks($user: String, $genres: String, $url: String, $description: String){
    allLinks(user: $user, genres: $genres, url: $url, description: $description){
      description
      url
      user{username}
      latestChange
      genres
      id
    }
  }
`


export const LOGIN = gql` 
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const USER_ADDED = gql`
  subscription {
    userAdded {
      ...UserDetails
    }
  }
${USER_DETAILS}
`

export const ADD_LINK = gql`
  mutation addLink($description: String!, $url: String!, $genres: [String]){
    addLink(
      description: $description,
      url: $url,
      genres: $genres
      
    ) {
      description
    url
    genres
    latestChange
    id
    }
  }
`