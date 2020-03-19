import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import CreateTool from '../components/tools/createTool'
import Footer from '../components/footer'
import FilterForm from '../components/filter'
import Notification from '../components/notification'
import Togglable from '../components/togglable'
import ToolsList from '../components/tools/toolsList'
import { GET_TOOLS, CREATE_TOOL, IS_UPDATED } from '../graphql/toolQueries'
import { Section } from '../styles/globalStyle'
import { string } from 'prop-types'

const Tools = ({ loggedInUsername }) => {
  const [filterString, setFilterString] = useState('')
  const [searchIsActive, setSearchIsActive] = useState(false)
  const [notification, setNotification] = useState({
    message: '',
    type: 'none',
    time: 0,
  })
  const client = useApolloClient()

  useEffect(() => {
    if (filterString === '') {
      setSearchIsActive(false)
    } else {
      setSearchIsActive(true)
    }
  }, [filterString])

  const handleError = error => {
    return null
  }

  const allTools = useQuery(GET_TOOLS, {
    variables: {
      name: filterString,
    },
    onError: handleError,
  })

  const [addTool] = useMutation(CREATE_TOOL, {
    onError: handleError,
    refetchQueries: [{ query: GET_TOOLS }],
    update(cache) {
      cache.writeData({ data: { toolIsUpdated: true } })
    },
  })

  const handleUpdate = () => {
    client.writeData({ data: { toolIsUpdated: false } })
    allTools.refetch()
  }

  const { data } = useQuery(IS_UPDATED)
  if (data && data.toolIsUpdated) {
    handleUpdate()
  }

  let toolList = {}

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
  }

  // eslint-disable-next-line no-unused-vars
  const handleDetail = ({ id }) => {
    return <Redirect to='/tooldetail/{id} ' />
  }

  const addToolFormRef = React.createRef()
  const addToolForm = () => {
    return (
      <Togglable
        addTopMargin='true'
        buttonLabel='Add tool'
        ref={addToolFormRef}
      >
        <CreateTool
          handleUpdate={handleUpdate}
          handleError={handleError}
          setNotification={setNotification}
          addTool={addTool}
        />
      </Togglable>
    )
  }

  const ShowAddTool = () => {
    return <>{addToolForm()}</>
  }

  const onLoadMore = cursor => {
    allTools.fetchMore({
      variables: {
        cursor: cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
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

  return (
    <>
      <Section top='true'>
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
        <FilterForm
          setFilterString={filterString => setFilterString(filterString)}
          filterString={filterString}
          searchIsActive={searchIsActive}
          setNotification={setNotification}
        />
        {loggedInUsername ? <ShowAddTool /> : <></>}

        <ToolsList
          handleDetail={handleDetail}
          entries={toolList || {}}
          onLoadMore={onLoadMore}
        />
      </Section>
      <Footer></Footer>
    </>
  )
}

Tools.propType = {
  loggedInUsername: string,
}
export default Tools
