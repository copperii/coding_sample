import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { degtodm } from '../../utils/gcCalcs'
import { Text } from '../../styles/globalStyle'
import {
  DeleteRow,
  DrawCheckbox,
  CoordinateRow,
  CoordinateText,
  Datum,
  EditIcon,
  Label,
  TenChText,
  ElevenChText,
  TwentyTwoChText,
  EightChText,
} from './maps.styles'
import {
  EDIT_COORDINATE_DRAW,
  DELETE_COORDINATE_DRAW,
  GET_DRAW_SET,
} from '../../graphql/coordinateQueries'
import EditCoordinateForm from './editCoordinateForm'
import { array, func, string, object } from 'prop-types'
import Heading from '../heading'

const CoordinateRows = props => {
  const {
    coordinates,
    currentDrawSet,
    loggedInUsername,
    setNotification,
    tempCoordinates,
    setTempCoordinates,
  } = props
  const [editCoordinate] = useMutation(EDIT_COORDINATE_DRAW)
  const [deleteCoordinate] = useMutation(DELETE_COORDINATE_DRAW, {
    refetchQueries: [
      { query: GET_DRAW_SET, variables: { id: currentDrawSet } },
    ],
  })

  const deleteRow = async id => {
    if (currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000') {
      if (tempCoordinates.length === 1) {
        setTempCoordinates([])
        return null
      }
      const newTempCoords = tempCoordinates.filter(c => c.id !== id)
      setTempCoordinates(newTempCoords)
      return null
    }
    deleteCoordinate({
      variables: {
        coordDrawId: id,
      },
    })
  }

  const toggleDraw = async coordinate => {
    if (currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000') {
      const changedCoordinate = {
        ...coordinate,
        id: coordinate.id,
        draw: !coordinate.draw,
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
        draw: !coordinate.draw,
      },
    })
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

  if (
    tempCoordinates &&
    tempCoordinates.length > 0 &&
    currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000'
  ) {
    console.log('tempCoordinates are:', tempCoordinates)

    return (
      <>
        <Heading h5 topMargin="true" bottomMargin="true">
          Current coordinates
        </Heading>
        {tempCoordinates &&
          tempCoordinates.map(c => (
            <CoordinateRow key={c.id}>
              {c.edit ? (
                <EditCoordinateForm
                  coordinate={c}
                  setNotification={setNotification}
                  tempCoordinates={tempCoordinates}
                  setTempCoordinates={setTempCoordinates}
                  currentDrawSet={currentDrawSet}
                />
              ) : (
                <CoordinateText title="Coordinates added as">
                  {c.coordinateText}
                </CoordinateText>
              )}

              {!c.edit && c.direction === 0 ? (
                <>
                  <ElevenChText title="radius of the cicle">
                    Circle radius
                  </ElevenChText>
                  <TenChText title="radius of the cicle">
                    <b>{c.lengthInMeters}</b>m{' '}
                  </TenChText>
                </>
              ) : (
                <></>
              )}

              {!c.edit && c.direction !== 0 ? (
                <>
                  <ElevenChText title="line length">Line length</ElevenChText>
                  <TenChText>
                    <b>{c.lengthInMeters}</b>m{' '}
                  </TenChText>
                  <EightChText title="Direction of the line">
                    Direction
                  </EightChText>
                  <TenChText>
                    <b>{c.direction}</b>{' '}
                  </TenChText>
                </>
              ) : (
                <></>
              )}

              {c.direction === 0 ? (
                <></>
              ) : (
                <>
                  <Datum>End point </Datum>
                  <TwentyTwoChText>
                    {c.endLatitude < 0 ? 'S ' : 'N '}
                    {degtodm(Math.abs(c.endLatitude), 3)}{' '}
                    {c.endLongitude < 0 ? 'W ' : 'E '}
                    {degtodm(Math.abs(c.endLongitude), 3)}
                  </TwentyTwoChText>
                </>
              )}
              <Label center="true"> Shown on map</Label>
              <DrawCheckbox
                type="checkbox"
                onChange={() => toggleDraw(c)}
                checked={c.draw}
                title="Show this line on the map."
              ></DrawCheckbox>
              <EditIcon onClick={() => toggleEdit(c)} title="Edit this row" />
              <DeleteRow
                type="image"
                src="delete16.png"
                alt="submit"
                title="Delete this row"
                onClick={() => deleteRow(c.id)}
              ></DeleteRow>
            </CoordinateRow>
          ))}
        <Text></Text>
      </>
    )
  }
  if (currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000') {
    return (
      <Heading h5 topMargin="true" bottomMargin="true">
        Add some coordinates to show the map.
      </Heading>
    )
  }
  if (!coordinates) {
    return (
      <Heading h5 topMargin="true" bottomMargin="true">
        No coordinates available
      </Heading>
    )
  }

  if (coordinates && coordinates.length === 0) {
    if (loggedInUsername === '') {
      return (
        <Heading h5 topMargin="true" bottomMargin="true">
          This set is empty.
        </Heading>
      )
    }
    return (
      <Heading h5 topMargin="true" bottomMargin="true">
        No coordinates available, add one to show it on the map.
      </Heading>
    )
  }

  if (loggedInUsername === '') {
    return (
      <>
        {' '}
        <Heading h5 topMargin="true" bottomMargin="true">
          Current draw set coordinates
        </Heading>
        {coordinates.map(c => (
          <CoordinateRow key={c.id}>
            <CoordinateText title="Coordinates added as">
              {c.coordinateText}
            </CoordinateText>

            {c.direction === 0 ? (
              <>
                <ElevenChText title="radius of the cicle">
                  Circle radius
                </ElevenChText>
                <TenChText title="radius of the cicle">
                  <b>{c.lengthInMeters}</b>m{' '}
                </TenChText>
              </>
            ) : (
              <></>
            )}

            {c.direction !== 0 ? (
              <>
                <ElevenChText title="line length">Line length</ElevenChText>
                <TenChText>
                  <b>{c.lengthInMeters}</b>m{' '}
                </TenChText>
                <EightChText title="Direction of the line">
                  Direction
                </EightChText>
                <TenChText>
                  <b>{c.direction}</b>{' '}
                </TenChText>
              </>
            ) : (
              <></>
            )}

            {c.direction === 0 ? (
              <></>
            ) : (
              <>
                <Datum>End point </Datum>
                <TwentyTwoChText>
                  {c.endLatitude < 0 ? 'S ' : 'N '}
                  {degtodm(Math.abs(c.endLatitude), 3)}{' '}
                  {c.endLongitude < 0 ? 'W ' : 'E '}
                  {degtodm(Math.abs(c.endLongitude), 3)}
                </TwentyTwoChText>
              </>
            )}
          </CoordinateRow>
        ))}
      </>
    )
  }

  return (
    <>
      <Heading h5 topMargin="true" bottomMargin="true">
        Current draw set coordinates
      </Heading>
      {coordinates.map(c => (
        <CoordinateRow key={c.id}>
          {c.edit ? (
            <EditCoordinateForm
              coordinate={c}
              setNotification={setNotification}
            />
          ) : (
            <CoordinateText onClick={() => toggleEdit(c)} title="Click to edit">
              {c.coordinateText}
            </CoordinateText>
          )}

          {!c.edit && c.direction === 0 ? (
            <>
              <ElevenChText title="radius of the cicle">
                Circle radius
              </ElevenChText>
              <TenChText title="radius of the cicle">
                <b>{c.lengthInMeters}</b>m{' '}
              </TenChText>
            </>
          ) : (
            <></>
          )}

          {!c.edit && c.direction !== 0 ? (
            <>
              <ElevenChText title="line length">Line length</ElevenChText>
              <TenChText>
                <b>{c.lengthInMeters}</b>m{' '}
              </TenChText>
              <EightChText title="Direction of the line">Direction</EightChText>
              <TenChText>
                <b>{c.direction}</b>{' '}
              </TenChText>
            </>
          ) : (
            <></>
          )}

          {c.direction === 0 ? (
            <></>
          ) : (
            <>
              <Label>End point: </Label>
              <TwentyTwoChText>
                {c.endLatitude < 0 ? 'S ' : 'N '}
                {degtodm(Math.abs(c.endLatitude), 3)}{' '}
                {c.endLongitude < 0 ? 'W ' : 'E '}
                {degtodm(Math.abs(c.endLongitude), 3)}
              </TwentyTwoChText>
            </>
          )}

          <EditIcon onClick={() => toggleEdit(c)} title="Edit this row" />
          <Label center="true"> Show on map</Label>
          <DrawCheckbox
            type="checkbox"
            title="Toggle draw status"
            onChange={() => toggleDraw(c)}
            checked={c.draw}
          ></DrawCheckbox>

          <DeleteRow
            type="image"
            src="delete16.png"
            alt="submit"
            title="Delete this row"
            onClick={() => deleteRow(c.id)}
          ></DeleteRow>
        </CoordinateRow>
      ))}
    </>
  )
}

CoordinateRows.propTypes = {
  coordinates: array,
  currentDrawSet: string,
  drawSetNames: object,
  loggedInUsername: string,
  setNotification: func,
  setTempCoordinates: func,
  tempCoordinates: array,
}

export default CoordinateRows
