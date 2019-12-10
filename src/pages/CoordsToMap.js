import React from 'react'
import { connect } from 'react-redux'
import CoordinateInputForm from '../components/CoordinateInputForm'
import ShowCoordinates from '../components/ShowCoordinates'
import ShowMap from '../components/ShowMap'

const CoordsToMap = (props) => {
  props.setCurrentPage('/mapping')

  return (
    <div className="container">
      <center>
        <h3>
          Convert and map coordinates
        </h3>
      </center>
      <CoordinateInputForm />
      <ShowCoordinates />
      <ShowMap />
    </div>
  )
}

export default connect(null, null)(CoordsToMap)