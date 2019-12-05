import React, { useState } from 'react'
import { connect } from 'react-redux'
import { coordinateChange } from '../reducers/coordinateReducer'
import { Form, Button } from 'react-bootstrap'

const testCoordinates = (inputString) => {
  const Coordinates = require('coordinate-parser')
  // supported format seen at https://www.npmjs.com/package/coordinate-parser
  try {
    const position = new Coordinates(inputString)
    return position
  } catch (error) {
    console.log('parser error: ', error)
    // TODO ?
    // what3words
    // utm
    // maidenhead
    // uk grid
    // Dutch grid === Rijksdriehoeks-coordinates, RD-coordinates or Amersfoort coordinates
    // EPSG:8397
    // finnish formats
    return 0
  }
}


const CoordinateInputForm = (props) => {
  const [inputCoordinate, setInputCoordinate] = useState('')

  const handleCoordinate = (event) => {
    event.preventDefault()
    const coordinate = event.target.inputCoordinate.value
    const parsedCoords = testCoordinates(coordinate)
   
    if (parsedCoords === 0) {
      console.log('give an error message here')
    } else {
      // this is what will be saved
      props.dispatch(coordinateChange(parsedCoords.latitude + ' ' + parsedCoords.longitude))
    }
  }

  return (
    <div>
      <Form onSubmit={handleCoordinate}>
        <Form.Group className="form-group w-25">
          <Form.Label>Enter the coordinate</Form.Label>
          <Form.Control
            type="text"
            value={inputCoordinate}
            name="inputCoordinate"
            onChange={({ target }) => setInputCoordinate(target.value)}
          />
          <div>
            &nbsp;
          </div>
          <Button type="submit">convert</Button>
        </Form.Group>

      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    coordinates: state.coordinates,
    notification: state.notification
  }
}

export default connect(mapStateToProps)(CoordinateInputForm)
