import React, { useState } from 'react'
import { func } from 'prop-types'
import {
  CREATE_DRAW_SET,
  GET_DRAW_SET_NAMES,
} from '../../graphql/coordinateQueries'
import { useMutation } from '@apollo/react-hooks'
import {
  Form,
  Label,
  SmallButton,
  DrawCheckbox,
  NarrowInput,
} from './maps.styles'

const AddDrawSetForm = props => {
  const { setAddNewSet, setNotification } = props
  const [isPublic, setIsPublic] = useState(true)
  const [newSetName, setNewSetName] = useState('')
  const [description] = useState('')

  const [addDrawSet] = useMutation(CREATE_DRAW_SET, {
    refetchQueries: [
      { query: GET_DRAW_SET_NAMES, variables: { public: true } },
    ],
  })

  const handleAddNewSet = async event => {
    event.preventDefault()
    console.log('handleAddNewSet')

    addDrawSet({
      variables: { name: newSetName, description, public: isPublic },
    })
    setNotification({
      message: 'Draw set ' + newSetName + ' was added',
      type: 'info',
      time: 2,
    })
    setAddNewSet(false)
  }

  return (
    <Form
      data-testid="addNewSet-form"
      onSubmit={event => handleAddNewSet(event)}
    >
      <NarrowInput
        data-testid="addNewSet-name-input"
        placeholder="Give a name for new set"
        value={newSetName}
        type="Text"
        pattern=".{6,100}"
        title="Must be between 6 and 100 characters in length"
        onChange={({ target }) => setNewSetName(target.value)}
        required
      />
      <Label>Public</Label>
      <DrawCheckbox
        type="checkbox"
        onChange={() => setIsPublic(!isPublic)}
        checked={isPublic}
      ></DrawCheckbox>

      <SmallButton type="submit" label="Save" />

      <SmallButton
        data-testid="addNewSet-cancel-button"
        label="Cancel"
        onClick={() => setAddNewSet(false)}
      />
    </Form>
  )
}

AddDrawSetForm.propTypes = {
  setAddNewSet: func,
  setNotification: func,
}

export default AddDrawSetForm
