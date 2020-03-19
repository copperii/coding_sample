import React, { useState } from 'react'
import Input from '../../input'
import { Form, Label, SmallButton } from '../maps.styles'

const validateCoordinates = inputString => {
  const Coordinates = require('coordinate-parser')
  // supported format seen at https://www.npmjs.com/package/coordinate-parser
  try {
    const position = new Coordinates(inputString)
    return position
  } catch (error) {
    console.log('parser error: ', error)
    return 0
  }
}

const CoordinateInputForm = props => {
  const { setCoordinateToMap } = props
  const [inputCoordinate, setInputCoordinate] = useState('')

  const handleCoordinate = event => {
    event.preventDefault()
    const parsedCoords = validateCoordinates(inputCoordinate)

    if (parsedCoords === 0) {
      console.log('coordinate parsing failed')
    } else {
      const parseString = `${parsedCoords.latitude} ${parsedCoords.longitude}`
      setCoordinateToMap(parseString)
    }
  }

  return (
    <Form data-testid='coordinate-form' onSubmit={handleCoordinate}>
      <Label data-testid='coordinate-label'>Enter the coordinate</Label>
      <Input
        data-testid='coordinate-input'
        type='text'
        value={inputCoordinate}
        name='inputCoordinate'
        placeholder='Input coordinates for example 60.1699 24.9384'
        pattern='.{4,100}'
        title='Must be between 4 and 100 characters in length'
        onChange={({ target }) => setInputCoordinate(target.value)}
        required
      />
      <SmallButton
        data-testid='coordinate-button'
        label='Convert'
        type='submit'
      ></SmallButton>
    </Form>
  )
}

export default CoordinateInputForm
