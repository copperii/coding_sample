import React, { useState } from 'react'
import validateCoordinates from '../../utils/validateCoordinates'
import { computeDestination } from '../../utils/gcCalcs'
import { object, func, string } from 'prop-types'
import { EDIT_COORDINATE_DRAW } from '../../graphql/coordinateQueries'
import { useMutation } from '@apollo/react-hooks'
import {
  Form,
  Label,
  SmallButton,
  NarrowInput,
  NumberInput,
} from './maps.styles'

const EditCoordinateForm = props => {
  const {
    setNotification,
    coordinate,
    tempCoordinates,
    setTempCoordinates,
    currentDrawSet,
  } = props
  const [newCoordinateText, setNewCoordinateText] = useState('')
  const [newLengthInMeters, setNewLengthInMeters] = useState(0)
  const [newDirection, setNewDirection] = useState(0)
  const [editCoordinate] = useMutation(EDIT_COORDINATE_DRAW)

  const handleEditCoordinate = async event => {
    event.preventDefault()
    let hasCoords = false
    let parsedCoordinate = null
    let length_in_meters = coordinate.lengthInMeters
    let direction = coordinate.direction
    let endPoint = null

    if (newCoordinateText !== '') {
      // test validity of given string
      parsedCoordinate = validateCoordinates(newCoordinateText)
      if (parsedCoordinate === 0) {
        setNotification({
          message: 'Unable to parse the coordinates',
          type: 'error',
          time: 5,
        })
        return 0
      }
      hasCoords = true
    }
    if (newLengthInMeters !== 0) {
      length_in_meters = parseFloat(newLengthInMeters)
      if (newCoordinateText === '') {
        endPoint = computeDestination({
          lat: coordinate.latitude,
          lon: coordinate.longitude,
          distance: newLengthInMeters / 1000,
          bearing: newDirection === 0 ? coordinate.direction : newDirection,
        })
      }
    }

    if (newDirection !== 0 && newDirection !== '0') {
      direction = parseFloat(newDirection)
      if (newCoordinateText === '') {
        endPoint = computeDestination({
          lat: coordinate.latitude,
          lon: coordinate.longitude,
          distance:
            newLengthInMeters === 0
              ? coordinate.lengthInMeters / 1000
              : newLengthInMeters / 1000,
          bearing: newDirection,
        })
      }
    }

    if (newDirection === '0') {
      endPoint = { lon: 0, lat: 0 }
      direction = 0
    }
    if (currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000') {
      const changedCoordinate = {
        ...coordinate,
        id: coordinate.id,
        lengthInMeters: length_in_meters,
        direction,
        // only add if changed:
        ...(hasCoords && { coordinateText: newCoordinateText }),
        ...(hasCoords && {
          coordinate:
            parsedCoordinate.latitude + ' ' + parsedCoordinate.longitude,
        }),
        ...(hasCoords && { latitude: parsedCoordinate.latitude }),
        ...(hasCoords && { longitude: parsedCoordinate.longitude }),
        ...(endPoint && { endLongitude: endPoint.lon }),
        ...(endPoint && { endLatitude: endPoint.lat }),
        edit: false,
      }
      const newTempCoords = tempCoordinates.map(c =>
        c.id === coordinate.id ? changedCoordinate : c
      )
      setTempCoordinates(newTempCoords)
      setNewCoordinateText('')
      setNewLengthInMeters(0)
      return null
    }
    editCoordinate({
      variables: {
        ...coordinate,
        coordDrawId: coordinate.id,
        lengthInMeters: length_in_meters,
        direction,
        // only add if changed:
        ...(hasCoords && { coordinateText: newCoordinateText }),
        ...(hasCoords && {
          coordinate:
            parsedCoordinate.latitude + ' ' + parsedCoordinate.longitude,
        }),
        ...(hasCoords && { latitude: parsedCoordinate.latitude }),
        ...(hasCoords && { longitude: parsedCoordinate.longitude }),
        ...(endPoint && { endLongitude: endPoint.lon }),
        ...(endPoint && { endLatitude: endPoint.lat }),
        edit: false,
      },
    })
    setNewCoordinateText('')
    setNewLengthInMeters(0)
  }

  const toggleEdit = async coordinate => {
    if (currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000') {
      const changedCoordinate = {
        ...coordinate,
        id: coordinate.id,
        edit: !coordinate.edit,
      }
      const newTempCoords = tempCoordinates.map(c =>
        c.id === coordinate.id ? changedCoordinate : c
      )
      setTempCoordinates(newTempCoords)
      return null
    }
    editCoordinate({
      variables: {
        ...coordinate,
        coordDrawId: coordinate.id,
        edit: !coordinate.edit,
      },
    })
  }

  return (
    <Form
      data-testid='editCoordinate-form'
      onSubmit={event => handleEditCoordinate(event)}
    >
      <Label>Coordinate</Label>
      <NarrowInput
        className='editCoordinateText'
        data-testid='editCoordinate-name-input'
        defaultValue={coordinate.coordinateText}
        type='Text'
        pattern='.{4,50}'
        title='Must be between 4 and 50 characters in length'
        onChange={({ target }) => setNewCoordinateText(target.value)}
        maxLength='50'
      />
      <Label>Radius</Label>
      <NumberInput
        type='number'
        step='any'
        defaultValue={coordinate.lengthInMeters}
        pattern='.{1,50}'
        min='0'
        title='Set circle radius or line length in meters'
        onChange={({ target }) => setNewLengthInMeters(target.value)}
        maxLength='20'
      ></NumberInput>
      <Label>Direction</Label>
      <NumberInput
        type='number'
        step='any'
        defaultValue={coordinate.direction}
        pattern='.{1,50}'
        title='Set 0 for circle or non zero for line angle'
        onChange={({ target }) => setNewDirection(target.value)}
        maxLength='20'
      ></NumberInput>
      <SmallButton type='submit' label='Save' />
      <SmallButton
        data-testid='editCoordinate-cancel-button'
        label='Hide edit'
        onClick={() => toggleEdit(coordinate)}
      />
    </Form>
  )
}

EditCoordinateForm.propTypes = {
  coordinate: object,
  setEditSet: func,
  setNotification: func,
  currentDrawSet: string,
}

export default EditCoordinateForm
