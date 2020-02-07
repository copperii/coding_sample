import React, { useState } from 'react'
// import '../styles/common.css'
import { useQuery } from '@apollo/react-hooks'
import ToolsList from '../components/tools/toolsList'
import CreateTool from '../components/tools/createTool'
import Togglable from '../components/layout/togglable'
import FilterForm from '../components/forms/filterForm'

import { GET_TOOLS } from '../graphql/toolQueries'
import { Redirect } from 'react-router-dom'

import styled from 'styled-components'

const ToolSection = styled.section`
  margin-top: 20px;
`

const Tools = () => {
  const [filterString, setFilterString] = useState('')

  const handleError = message => {
    return console.log('an error occurred', message)
  }

  const allTools = useQuery(GET_TOOLS, {
    variables: {
      //id: filterString,
      name: filterString,
      //TODO url search breaks with numbers
      //url: filterString,
      //TODO add this when backend searc "or" works
      //description: filterString,
    },
    onError: handleError,
  })

  let toolList = {}
  // console.log('Tools allTools has: ', allTools)

  if (allTools.loading === true) {
    return <div> loading tools...</div>
  }

  if (allTools.error === true) {
    return <div> got an error {allTools.error}</div>
  }

  // this prevents an error below if server is not available
  if (!allTools.data) {
    return null
  }

  if (allTools.data.relayTools !== undefined) {
    toolList = allTools.data.relayTools
    //console.log('toolList has: ', toolList)
  }

  // redundant, useQuery is called immediately after filterString change
  // const handleFilter = event => {
  //   event.preventDefault()
  //   console.log('handleFilter called with', filterString)
  // }

  const handleDetail = ({ id }) => {
    console.log('Details button pressed', id)

    //navigate('/tools', true, { id: id })

    return <Redirect to="/tooldetail/{id} " />
  }

  const addToolFormRef = React.createRef()
  const addToolForm = () => {
    return (
      <Togglable buttonLabel="Add a tool" ref={addToolFormRef}>
        <CreateTool />
      </Togglable>
    )
  }

  const ShowAddTool = () => {
    return <React.Fragment>{addToolForm()}</React.Fragment>
  }

  return (
    <ToolSection>
      <FilterForm
        setFilterString={filterString => setFilterString(filterString)}
        filterString={filterString}
      />
      <ShowAddTool />
      <ToolsList
        handleDetail={handleDetail}
        entries={toolList || {}}
        onLoadMore={cursor =>
          allTools.fetchMore({
            variables: {
              cursor: cursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              //console.log('updateQuery has previousResult:', previousResult)
              //console.log('updateQuery has fetchMoreResult:', fetchMoreResult)
              //console.log('updateQuery has newEdges:', fetchMoreResult.relayTools.edges)
              //console.log('updateQuery has pageInfo:', fetchMoreResult.relayTools.pageInfo)

              const newEdges = fetchMoreResult.relayTools.edges
              const pageInfo = fetchMoreResult.relayTools.pageInfo

              return newEdges.length
                ? {
                    // Put the new tools at the end of the relayTools. and update `pageInfo`
                    // so we have the new `endCursor` and `hasNextPage` values
                    relayTools: {
                      __typename: previousResult.relayTools.__typename,
                      edges: [...previousResult.relayTools.edges, ...newEdges],
                      pageInfo,
                    },
                  }
                : previousResult
            },
          })
        }
      />
    </ToolSection>
  )
}

export default Tools
