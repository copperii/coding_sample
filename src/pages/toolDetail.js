import React, { useState } from 'react'
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
import Input from '../components/input'
import styled from 'styled-components'

const ToolDetailSection = styled.section`
  margin-top: 20px;
  padding: 20px;
`
const DetailRow = styled.div`
  margin-top: 1.5em;
`

const DetailRowEdit = styled.div`
  display: flex;
  flex-flow: column wrap;
`
const ButtonRow = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const ToolDetail = props => {
  const { id } = props
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [editData, setEditData] = useState(false)
  const [toolDeleted, setToolDeleted] = useState(false)

  const handleError = message => {
    return console.log('an error occurred', message)
  }

  const tool = useQuery(GET_TOOL_BY_ID, {
    variables: { id: id },
    onError: handleError,
  })

  const [editTool] = useMutation(EDIT_TOOL, {
    variables: { id, name, url, description },
    onError: handleError,
    refetchQueries: [{ query: GET_TOOLS }],
  })

  const [deleteTool] = useMutation(DELETE_TOOL, {
    variables: { id },
    onError: handleError,
    refetchQueries: [{ query: GET_TOOLS }],
  })

  // console.log('ToolDetail has (tool): ', tool)

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
    // console.log('delete tool pressed')
    //const result =
    deleteTool()
    setToolDeleted(true)
    return <Redirect to={'/tools'}></Redirect>
  }

  const saveTool = () => {
    //event.preventDefault()
    // console.log('saving tool with:', id, name, url, description)
    editTool()
    setEditData(false)
    //console.log('save tool pressed')
  }

  //console.log('tool id', tool.data.relayTool.id)
  if (tool.data.relayTool === null) {
    console.log('tool does not exist')

    return <Redirect to={'/tools'} />
  }

  if (toolDeleted === true) {
    // console.log('tool was deleted')

    return <Redirect to={'/tools'} />
  }

  if (editData === true) {
    return (
      <ToolDetailSection key={tool.data.relayTool.id}>
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
      </ToolDetailSection>
    )
  }

  return (
    <ToolDetailSection key={tool.data.relayTool.id}>
      <Heading h5>Tool Details</Heading>
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

      <Button
        onClick={() => handleDeleteTool(tool.data.relayTool.id)}
        label="Delete"
      ></Button>
    </ToolDetailSection>
  )
}

export default ToolDetail
