import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from '@apollo/react-hooks'
import Pages from './index'
import { onError } from 'apollo-link-error'

const App = () => {
  const goGetNewToken = () => {
    return null
  }

  const cache = new InMemoryCache()
  const httpLink = new HttpLink({
    // eslint-disable-next-line no-undef
    uri: process.env.REACT_APP_SERVER_URI,
  })
  const resolvers = {}

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors)
        graphQLErrors &&
          graphQLErrors.map(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
            switch (message) {
              case 'Signature has expired':
                // eslint-disable-next-line no-case-declarations
                const oldHeaders = operation.getContext().headers
                goGetNewToken()
                // eslint-disable-next-line no-case-declarations
                const renewedToken = localStorage.getItem('token')
                if (renewedToken) {
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: `JWT ${renewedToken}`,
                    },
                  })
                } else {
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                    },
                  })
                }

                return forward(operation)

              case 'Invalid refresh token':
                console.log('Invalid refresh token inside app.js')
                localStorage.clear()
                operation.setContext({
                  headers: {},
                })
                return forward(operation)

              default:
                return null
            }
          })
      if (networkError) {
        switch (networkError.message) {
          case 'Failed to fetch':
            localStorage.clear()
            operation.setContext({
              headers: {},
            })
            return forward(operation)

          default:
            console.log('default Network error on app.js', networkError)
            return null
        }
      }
      return forward(operation)
    }
  )

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: token ? `JWT ${token}` : null,
        },
      }
    } else {
      return {
        headers: {
          ...headers,
        },
      }
    }
  })

  const client = new ApolloClient({
    cache,
    link: errorLink.concat(authLink.concat(httpLink)),
    resolvers,
  })
  cache.writeData({
    data: {
      isLoggedIn: !!localStorage.getItem('token'),
      loggedInUsername: '',
      toolIsUpdated: false,
      cartItems: [],
    },
  })

  return (
    <ApolloProvider client={client}>
      <Pages />
    </ApolloProvider>
  )
}

export default App
