import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import AddDrawSetForm from './addDrawSetForm'
import EditDrawSetForm from './editDrawSetForm'
import { array, func, string, object } from 'prop-types'
import {
  DELETE_DRAW_SET,
  GET_DRAW_SET_NAMES,
} from '../../graphql/coordinateQueries'
import { Section } from '../../styles/globalStyle'
import {
  Form,
  Label,
  Option,
  Select,
  ButtonRow,
  Row,
  SmallButton,
} from './maps.styles'

const DrawSetRow = props => {
  const {
    currentDrawSet,
    drawSetNames,
    loggedInUsername,
    setCurrentDrawSet,
    setNotification,
  } = props
  const [addNewSet, setAddNewSet] = useState(false)
  const [editSet, setEditSet] = useState(false)

  const handleError = error => {
    console.log('an error occurred', error)
    setNotification({
      message: 'an error occurred' + error.graphQLErrors[0].message,
      type: 'error',
      time: 4,
    })
  }

  const [deleteDrawSet] = useMutation(DELETE_DRAW_SET, {
    variables: { id: currentDrawSet },
    onError: handleError,
    refetchQueries: [
      { query: GET_DRAW_SET_NAMES, variables: { public: true } },
    ],
  })

  const handleSelection = value => {
    setCurrentDrawSet(value)
  }
  const handleAddSet = () => {
    setAddNewSet(true)
  }
  const handleDeleteSet = () => {
    if (currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000') {
      console.log('Cannot delete no set')
    } else {
      const confirmation = window.confirm(
        'Do you really want to delete this set?'
      )
      if (confirmation) {
        deleteDrawSet()
        setNotification({
          message: 'Set was deleted',
          type: 'info',
          time: 2,
        })
        setCurrentDrawSet('83879d2b-0121-4020-ae1d-000000000000')
      }
    }
  }
  const handleEditSet = () => {
    if (currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000') {
      console.log('Cannot edit no set')
    } else {
      setEditSet(true)
    }
  }

  return (
    <>
      <Section>
        <Row>
          <Form>
            <Label>Choose a draw set or add coordinates</Label>
            <Select
              name='draw_set'
              onChange={({ target }) => handleSelection(target.value)}
            >
              <Option value='83879d2b-0121-4020-ae1d-000000000000'>
                Current coordinates
              </Option>
              {drawSetNames.data &&
                drawSetNames.data.drawSets.map(set => (
                  <Option key={set.id} value={set.id}>
                    {set.name}
                  </Option>
                ))}
            </Select>
          </Form>
          {addNewSet ? (
            <AddDrawSetForm
              setAddNewSet={setAddNewSet}
              setNotification={setNotification}
            />
          ) : (
            <></>
          )}
          {editSet ? (
            <EditDrawSetForm
              setEditSet={setEditSet}
              setNotification={setNotification}
              currentDrawSet={currentDrawSet}
            />
          ) : (
            <></>
          )}
          {loggedInUsername && !addNewSet && !editSet ? (
            <ButtonRow>
              <SmallButton
                label='Add new set'
                onClick={handleAddSet}
              ></SmallButton>
              {currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000' ? (
                <></>
              ) : (
                <>
                  <SmallButton
                    label='Edit set'
                    onClick={handleEditSet}
                  ></SmallButton>
                  <SmallButton
                    label='Delete set'
                    onClick={handleDeleteSet}
                  ></SmallButton>
                </>
              )}
            </ButtonRow>
          ) : (
            <>
              <Label>
                <b>New map data not saved for anonymous users!</b>
              </Label>
            </>
          )}
        </Row>
      </Section>
    </>
  )
}

DrawSetRow.propTypes = {
  coordinates: array,
  currentDrawSet: string,
  drawSetNames: object,
  loggedInUsername: string,
  setCurrentDrawSet: func,
  setNotification: func,
}
export default DrawSetRow
