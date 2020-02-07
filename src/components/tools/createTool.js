import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GET_TOOLS, CREATE_TOOL } from '../../graphql/toolQueries'
import Button from '../button'
import Input from '../input'
import styled from 'styled-components'

const StyledRow = styled.div`
  display: flex;
  flex-flow: column wrap;
`

const CreateTool = () => {
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')

  const handleError = message => {
    return console.log('an error occurred', message)
    //return null
    //<Notifications message={message} />
  }

  // could possibly optimize refetch here
  const [addTool] = useMutation(CREATE_TOOL, {
    variables: { name, url, description },
    onError: handleError,
    refetchQueries: [{ query: GET_TOOLS }],
  })

  //const [editTool] = useMutation(EDIT_TOOL)

  const addThisTool = event => {
    event.preventDefault()
    addTool()
    //console.log('addThisTool called')
  }

  return (
    <div className="divWithBorder">
      <h5>Give tool to add: </h5>
      <form onSubmit={addThisTool}>
        <StyledRow>
          <label>
            Name <i>(at least 6 characters)</i>
          </label>
          <Input
            type="text"
            value={name}
            pattern=".{6,100}"
            title="Must be between 6 and 100 characters in length"
            onChange={({ target }) => setName(target.value)}
            required
          />
        </StyledRow>
        <StyledRow>
          <label>Url</label>
          <Input
            type="url"
            value={url}
            pattern="https?://.+"
            title="Web address"
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </StyledRow>
        <StyledRow>
          <label>Description</label>
          <Input
            type="text"
            value={description}
            title="Description of the tool"
            onChange={({ target }) => setDescription(target.value)}
          />
        </StyledRow>
        <Button type="submit">Add this Tool</Button>
      </form>
    </div>
  )
}

export default CreateTool
