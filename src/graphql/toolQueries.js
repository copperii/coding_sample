import gql from 'graphql-tag'

// testing with low first to fix initial screen size larger than shown items
export const GET_TOOLS = gql`
  query GetToolsRelay(
    $first: Int = 10
    $cursor: String
    $id: ID
    $url: String
    $name: String
    $description: String
  ) {
    relayTools(
      first: $first
      after: $cursor
      id: $id
      url_Icontains: $url
      name_Icontains: $name
      description_Icontains: $description
    ) {
      edges {
        cursor
        node {
          id
          name
          url
          description
          createdBy {
            username
            id
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

// might not need cursor and typenames for anything at the moment
export const GET_TOOL_DETAIL = gql`
  query GetToolDetail($id: ID!) {
    relayTools(id: $id) {
      edges {
        cursor
        node {
          id
          name
          url
          description
          createdBy {
            username
            id
          }
        }
      }
    }
  }
`

// might not need cursor and typenames for anything at the moment
export const GET_TOOL_BY_ID = gql`
  query GetToolDetail($id: ID!) {
    relayTool(id: $id) {
      id
      name
      url
      description
      createdBy {
        username
        id
      }
    }
  }
`

export const CREATE_TOOL = gql`
  mutation createToolRelay(
    $name: String!
    $url: String!
    $description: String!
  ) {
    relayCreateTool(
      input: { name: $name, url: $url, description: $description }
    ) {
      tool {
        id
        name
        url
        description
        createdBy {
          username
          id
        }
      }
    }
  }
`
export const EDIT_TOOL = gql`
  mutation editToolRelay(
    $id: String!
    $name: String
    $url: String
    $description: String
  ) {
    relayCreateTool(
      input: { id: $id, name: $name, url: $url, description: $description }
    ) {
      tool {
        id
        name
        url
        description
        createdBy {
          username
          id
        }
      }
    }
  }
`

export const DELETE_TOOL = gql`
  mutation deleteToolRelay($id: String!) {
    relayDeleteTool(input: { id: $id }) {
      tool {
        id
        name
        url
        description
        createdBy {
          username
          id
        }
      }
    }
  }
`

export const IS_UPDATED = gql`
  query isToolsUpdated {
    toolIsUpdated @client
  }
`
