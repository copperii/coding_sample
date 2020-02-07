import { ApolloClient } from 'apollo-client'
import {
  InMemoryCache,
  //NormalizedCacheObject
} from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
//import gql from "graphql-tag"
import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Pages from './pages'
//import injectStyles from './styles'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://localhost:8000/graphql/',
})

const client = new ApolloClient({
  //  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
})

//injectStyles()
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Pages />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// initial testing
//client
//  .query({
//    query: gql`
//      query GetTools {
//        tools {
//          name
//          url
//          id

//        }
//      }
//    `
//  })
//  .then(result => console.log(result))
