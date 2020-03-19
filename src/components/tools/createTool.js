import React, { useState } from 'react'
// import Button from '../button'
import Heading from '../heading'
import Input from '../input'
import { Row, SmallButton } from './tools.styles'
import { Section } from '../../styles/globalStyle'

const CreateTool = props => {
  const { handleUpdate, setNotification, addTool } = props
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')

  const addThisTool = event => {
    event.preventDefault()
    addTool({ variables: { name, url, description } })
    handleUpdate()
    setNotification({
      message: 'Tool ' + name + ' was added',
      type: 'info',
      time: 2,
    })
  }

  return (
    <>
      <Section marginTop="true">
        <Heading h5>Give tool to add: </Heading>
        <form onSubmit={addThisTool}>
          <Row>
            <label>
              Name <i>(at least 6 characters)</i>
            </label>
            <Input
              data-testid="addTool-name-input"
              type="text"
              value={name}
              pattern=".{6,100}"
              title="Must be between 6 and 100 characters in length"
              onChange={({ target }) => setName(target.value)}
              required
            />
          </Row>
          <Row>
            <label>Url</label>
            <Input
              data-testid="addTool-url-input"
              type="url"
              value={url}
              pattern="https?://.+"
              title="Web address"
              onChange={({ target }) => setUrl(target.value)}
              required
            />
          </Row>
          <Row>
            <label>Description</label>
            <Input
              data-testid="addTool-description-input"
              type="text"
              value={description}
              title="Description of the tool"
              onChange={({ target }) => setDescription(target.value)}
            />
          </Row>
          <SmallButton
            data-testid="addTool-button"
            type="submit"
            label="Add this Tool"
            addTopMargin="true"
          ></SmallButton>
        </form>
      </Section>
    </>
  )
}

export default CreateTool
