import React, { useState, useEffect } from 'react'
import { func, string } from 'prop-types'
import {
  EDIT_DRAW_SET,
  GET_DRAW_SET_NAMES,
  GET_DRAW_SET,
} from '../../graphql/coordinateQueries'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  Form,
  Label,
  SmallButton,
  DrawCheckbox,
  NarrowInput,
} from './maps.styles'

const EditDrawSetForm = props => {
  const { setEditSet, setNotification, currentDrawSet } = props
  const [isPublic, setIsPublic] = useState(true)
  const [newSetName, setNewSetName] = useState('')
  const [description, setDescription] = useState('')
  const drawSet = useQuery(GET_DRAW_SET, {
    variables: { id: currentDrawSet },
  })
  const [editDrawSet] = useMutation(EDIT_DRAW_SET, {
    refetchQueries: [
      { query: GET_DRAW_SET_NAMES, variables: { public: true } },
    ],
  })

  useEffect(() => {
    if (currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000') {
      setEditSet(false)
    }
    if (drawSet.data && drawSet.data.drawSets && drawSet.data.drawSets[0]) {
      setNewSetName(drawSet.data.drawSets[0].name)
      setIsPublic(drawSet.data.drawSets[0].public)
      setDescription(drawSet.data.drawSets[0].description)
    }
    // eslint-disable-next-line
  }, [currentDrawSet])

  const handleEditNewSet = async event => {
    event.preventDefault()
    editDrawSet({
      variables: {
        id: currentDrawSet,
        name: newSetName,
        description,
        public: isPublic,
      },
    })
    setNotification({
      message: 'Draw set ' + newSetName + ' was edited',
      type: 'info',
      time: 2,
    })
    setEditSet(false)
  }

  return (
    <Form
      data-testid="editNewSet-form"
      onSubmit={event => handleEditNewSet(event)}
    >
      <NarrowInput
        data-testid="editNewSet-name-input"
        placeholder="New name, leave empty for no change"
        value={newSetName}
        type="Text"
        pattern=".{6,100}"
        title="Must be between 6 and 100 characters in length"
        onChange={({ target }) => setNewSetName(target.value)}
      />
      <Label>Public</Label>
      <DrawCheckbox
        type="checkbox"
        onChange={() => setIsPublic(!isPublic)}
        checked={isPublic}
      ></DrawCheckbox>
      <SmallButton type="submit" label="Save" />
      <SmallButton
        data-testid="editSet-cancel-button"
        label="Cancel"
        onClick={() => setEditSet(false)}
      />
      <Label>Description</Label>
      <NarrowInput
        data-testid="editSet-description-input"
        placeholder="Description"
        value={description}
        type="Text"
        title="Add description here"
        onChange={({ target }) => setDescription(target.value)}
      />
    </Form>
  )
}

EditDrawSetForm.propTypes = {
  setEditSet: func,
  setNotification: func,
  currentDrawSet: string,
}

export default EditDrawSetForm
