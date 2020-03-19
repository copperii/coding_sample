import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import {
  GET_TOOL_BY_ID,
  EDIT_TOOL,
  GET_TOOLS,
  DELETE_TOOL,
} from '../graphql/toolQueries'
import Button from '../components/button'
import Heading from '../components/heading'
import Footer from '../components/footer'
import Input from '../components/input'
import Notification from '../components/notification'
import { DetailRow, DetailRowEdit, ButtonRow } from './toolDetails.styles'
import { Section } from '../styles/globalStyle'
import { string } from 'prop-types'

const ToolDetail = props => {
  const { id, loggedInUsername } = props
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [editData, setEditData] = useState(false)
  const [toolDeleted, setToolDeleted] = useState(false)
  const [listReturn, setListReturn] = useState(false)
  const [notification, setNotification] = useState({
    message: '',
    type: 'none',
    time: 0,
  })

  useEffect(() => {}, [notification])

  const handleError = error => {
    console.log('an error occurred', error)
    setNotification({
      message: 'an error occurred' + error.graphQLErrors[0].message,
      type: 'error',
      time: 4,
    })
  }

  const tool = useQuery(GET_TOOL_BY_ID, {
    variables: { id: id },
    onError: handleError,
  })

  const [editTool] = useMutation(EDIT_TOOL, {
    variables: { id, name, url, description },
    onError: handleError,
    refetchQueries: [{ query: GET_TOOLS }],
    update(cache) {
      cache.writeData({ data: { toolIsUpdated: true } })
    },
  })

  const [deleteTool] = useMutation(DELETE_TOOL, {
    variables: { id },
    onError: handleError,
    refetchQueries: [{ query: GET_TOOLS }],
    update(cache) {
      cache.writeData({ data: { toolIsUpdated: true } })
    },
  })

  if (tool.loading === true) {
    return <div> loading tool...</div>
  }

  if (tool.error === true) {
    return <div> got an error {tool.error}</div>
  }

  // this prevents an error below if server is not available
  if (!tool.data) {
    return <div> No data </div>
  }

  const handleDeleteTool = () => {
    const confirmation = window.confirm('Do you really want to delete this?')
    if (confirmation) {
      deleteTool()
      setToolDeleted(true)

      return <Redirect to={'/tools'}></Redirect>
    }
  }

  const saveTool = () => {
    editTool()
    setEditData(false)
  }

  if (listReturn === true) {
    return <Redirect to={'/tools'} />
  }

  if (tool.data.relayTool === null) {
    console.log('tool does not exist')

    return <Redirect to={'/tools'} />
  }

  if (toolDeleted === true) {
    return <Redirect to={'/tools'} />
  }

  if (editData === true) {
    return (
      <>
        <Section top="true" key={tool.data.relayTool.id}>
          <Notification
            notification={notification}
            setNotification={setNotification}
          />
          <Heading h5>Tool Details</Heading>
          <DetailRowEdit>
            <label>
              Name <i>(at least 6 characters)</i>
            </label>
            <Input
              type="text"
              defaultValue={tool.data.relayTool.name}
              pattern=".{6,100}"
              title="Must be between 6 and 100 characters in length"
              onChange={({ target }) => setName(target.value)}
              maxLength="100"
              required
            />
          </DetailRowEdit>
          <DetailRowEdit>
            <label>Description</label>
            <Input
              type="text"
              defaultValue={tool.data.relayTool.description}
              onChange={({ target }) => setDescription(target.value)}
            ></Input>
          </DetailRowEdit>
          <DetailRowEdit>
            <label>Url</label>
            <Input
              type="url"
              defaultValue={tool.data.relayTool.url}
              pattern="https?://.+"
              title="Web address"
              onChange={({ target }) => setUrl(target.value)}
              required
            ></Input>
          </DetailRowEdit>
          <DetailRow>
            <a
              href={tool.data.relayTool.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Test the link here
            </a>
          </DetailRow>
          <DetailRow>
            Id for the tool is:{'  '}
            <b>
              <i>{tool.data.relayTool.id}</i>
            </b>
          </DetailRow>
          <ButtonRow>
            <Button
              onClick={() => saveTool(tool.data.relayTool.id)}
              label="Save"
            ></Button>

            <Button onClick={() => setEditData(false)} label="Cancel"></Button>
            <Button
              onClick={() => handleDeleteTool(tool.data.relayTool.id)}
              label="Delete"
            ></Button>
          </ButtonRow>
        </Section>
        <Footer></Footer>
      </>
    )
  }

  return (
    <>
      <Section top="true" key={tool.data.relayTool.id}>
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
        <Heading h5>Tool Details</Heading>
        {loggedInUsername ? (
          <>
            <DetailRow>
              <b>
                <i>Click an item to edit </i>
              </b>
            </DetailRow>
            <DetailRow onClick={() => setEditData(true)}>
              Name: <b>{tool.data.relayTool.name}</b>
            </DetailRow>
            <DetailRow onClick={() => setEditData(true)}>
              {' '}
              Description: <b> {tool.data.relayTool.description}</b>
            </DetailRow>
            <DetailRow onClick={() => setEditData(true)}>
              {' '}
              Url: <b>{tool.data.relayTool.url}</b>
            </DetailRow>
          </>
        ) : (
          <>
            <DetailRow>
              Name: <b>{tool.data.relayTool.name}</b>
            </DetailRow>
            <DetailRow>
              {' '}
              Description: <b> {tool.data.relayTool.description}</b>
            </DetailRow>
            <DetailRow>
              {' '}
              Url: <b>{tool.data.relayTool.url}</b>
            </DetailRow>
          </>
        )}

        <DetailRow>
          <a
            href={tool.data.relayTool.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Test the link here
          </a>
        </DetailRow>
        <DetailRow>
          Id for the tool is:{'  '}
          <b>
            <i>{tool.data.relayTool.id}</i>
          </b>
        </DetailRow>
        <DetailRow>
          Tool was created by:{'  '}
          <b>
            <i>
              {tool.data.relayTool.createdBy &&
                tool.data.relayTool.createdBy.username}
            </i>
          </b>
        </DetailRow>
        <ButtonRow>
          {loggedInUsername ? (
            <Button
              onClick={() => handleDeleteTool(tool.data.relayTool.id)}
              label="Delete"
            ></Button>
          ) : (
            <></>
          )}

          <Button
            onClick={() => setListReturn(true)}
            label="Return to list"
          ></Button>
        </ButtonRow>
      </Section>
      <Footer></Footer>
    </>
  )
}

ToolDetail.propType = {
  id: string,
  loggedInUsername: string,
}
export default ToolDetail
