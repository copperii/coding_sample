import React from 'react'
import { render } from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import store from './store'
import App from './App'

const wsLink = new WebSocketLink({
  uri: `wss://demo-graphql-server.herokuapp.com/graphql`,
  options: { reconnect: true }
})

const httpLink = createHttpLink({
  uri: 'https://demo-graphql-server.herokuapp.com/graphql/',
  credentials: 'include'
})

const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('cppr-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
      cookie: headers && headers.cookie,
    },
    credentials: 'include'
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  link,
  cache
})

render(
  <ApolloProvider client={client} >
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
