import React  from 'react'
import { connect } from 'react-redux'

import {
  Map,
  CircleMarker,
  TileLayer
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const style = {
  width: '100%',
  height: '480px'
}
const zoom = 14

export const parseCoordinate = (coordinate) => {
  const splitCoordinate = coordinate.split(' ')
  const currentLatitude = parseFloat(splitCoordinate[0])
  const currentLongitude = parseFloat(splitCoordinate[1])
  return ([currentLatitude, currentLongitude])
}

const ShowMap = (props) => {
  const coordinates = props.coordinates

  const passedCoordinate = coordinates.find(c => c.coordinate)
  const parsedCoordinate = parseCoordinate(passedCoordinate.coordinate)

  return (
    <div>
      {
        parsedCoordinate === null
          ? <div>Loading or missing coordinate</div>
          :
          <Map
            center={parsedCoordinate}
            style={style}
            zoom={zoom}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <CircleMarker
              center={parsedCoordinate}
              radius='20'
              fillOpacity='0.3'
              stroke='false'
            />
          </Map>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    coordinates: state.coordinates,
    notification: state.notification
  }
}

export default connect(mapStateToProps)(ShowMap)
