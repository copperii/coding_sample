import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getDMScoordinate, getDDMcoordinate } from '../utils/coordConverters'

const ShowCoordinates = (props) => {
  const [currentCoordinate, setCurrentCoordinate] = useState('')
  const coordinates = props.coordinates
  const passedCoordinate = coordinates.find(c => c.coordinate)
  if (currentCoordinate !== passedCoordinate.coordinate) {
    //this eliminates too many loops error
    setCurrentCoordinate(passedCoordinate.coordinate)
  }
  const ShowDDM = () => {
    const ddm = getDDMcoordinate(currentCoordinate)
    return (
      <div>
        {ddm}
      </div>
    )
  }
  const ShowDMS = () => {
    const dms = getDMScoordinate(currentCoordinate)
    return (
      <div>
        {dms}
      </div>
    )
  }

  return (
    <div>
      Some of the various formats for the coordinate are:
      {coordinates.map(c =>
        <React.Fragment key={c.id}>
          <div>
            {c.coordinate}
          </div>
          <ShowDDM />
          <ShowDMS />
        </React.Fragment>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    coordinates: state.coordinates,
    notification: state.notification
  }
}

export default connect(mapStateToProps)(ShowCoordinates)
