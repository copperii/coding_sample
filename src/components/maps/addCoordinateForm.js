import React, { useState } from 'react'
import validateCoordinates from '../../utils/validateCoordinates'
import { array, func, string } from 'prop-types'
import Input from '../input'
import { Form, SmallButton } from './maps.styles'
import {
  CREATE_COORDINATE_DRAW,
  GET_DRAW_SET,
} from '../../graphql/coordinateQueries'
import { useMutation } from '@apollo/react-hooks'
import { getCurrentUTC } from '../../utils/times'

const AddCoordinateForm = props => {
  const {
    setNotification,
    currentDrawSet,
    setTempCoordinates,
    tempCoordinates,
    loggedInUsername,
  } = props
  const [newCoordinate, setNewCoordinate] = useState('')

  const [addCoordinateDraw] = useMutation(CREATE_COORDINATE_DRAW, {
    refetchQueries: [
      { query: GET_DRAW_SET, variables: { id: currentDrawSet } },
    ],
  })

  const handleAddCoordinate = async event => {
    event.preventDefault()

    // test validity of given string
    const parsedCoordinate = validateCoordinates(newCoordinate)
    if (parsedCoordinate === 0) {
      setNotification({
        message: 'Unable to parse the coordinates',
        type: 'error',
        time: 5,
      })
      return 0
    }

    const currentDrawSetId =
      currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000'
        ? '00000000-0000-0000-0000-000000000000'
        : currentDrawSet
    const coordinateObject = {
      drawSetId: currentDrawSetId,
      coordinateText: newCoordinate,
      coordinate: parsedCoordinate.latitude + ' ' + parsedCoordinate.longitude,
      latitude: parsedCoordinate.latitude,
      longitude: parsedCoordinate.longitude,
      draw: true,
      edit: false,
      lengthInMeters: 161,
      direction: 0,
      startPointName: '',
      endPointName: '',
      notes: '',
      endLatitude: 0,
      endLongitude: 0,
    }
    if (currentDrawSetId === '00000000-0000-0000-0000-000000000000') {
      const tempId = getCurrentUTC()
      const tempCoords = { ...coordinateObject, id: tempId }
      setTempCoordinates([...tempCoordinates, tempCoords])
      setNewCoordinate('')
      return null
    }
    if (currentDrawSet !== '83879d2b-0121-4020-ae1d-000000000000') {
      addCoordinateDraw({ variables: coordinateObject })
    }
    setNewCoordinate('')
  }

  if (
    currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000' ||
    loggedInUsername !== ''
  ) {
    return (
      <Form data-testid="addCoordinate-form" onSubmit={handleAddCoordinate}>
        <Input
          data-testid="addCoordinate-input"
          type="Text"
          placeholder="Add coordinate. Accepts several formats; for example 60 10.000 24 56.000"
          value={newCoordinate}
          pattern=".{4,100}"
          title="Must be between 4 and 100 characters in length"
          onChange={({ target }) => setNewCoordinate(target.value)}
          required
        />
        <SmallButton
          data-testid="addCoordinate-button"
          type="submit"
          label="Add"
        ></SmallButton>
      </Form>
    )
  }
  return <></>
}

AddCoordinateForm.propTyper = {
  setNotification: func,
  currentDrawSet: string.isRequired,
  setTempCoordinates: func,
  tempCoordinates: array,
  loggedInUsername: string,
}
export default AddCoordinateForm
