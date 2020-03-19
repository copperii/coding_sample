import React, { useState } from 'react'
import { convertToDDM } from '../../../utils/coordConverters'
import { TileLayer, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { StyledMap } from '../maps.styles'
import { Section, Text } from '../../../styles/globalStyle'
import { string } from 'prop-types'

const zoom = 14

export const parseCoordinate = coordinate => {
  if (coordinate !== undefined) {
    const splitCoordinate = coordinate.split(' ')
    const currentLatitude = parseFloat(splitCoordinate[0])
    const currentLongitude = parseFloat(splitCoordinate[1])
    return [currentLatitude, currentLongitude]
  }
  return null
}

const ShowMap = props => {
  const { coordinateToMap } = props
  const defaultCoords = '60.1699 24.9384'
  const [clickedAt, setClickedAt] = useState(null)

  let parsedCoordinate

  if (coordinateToMap === '') {
    parsedCoordinate = parseCoordinate(defaultCoords)
  } else {
    parsedCoordinate = parseCoordinate(coordinateToMap)
  }

  const radiusInMeters = 161

  const handleMapClick = e => {
    const lat = convertToDDM(e.latlng.lat)
    const lon = convertToDDM(e.latlng.lng)
    setClickedAt(lat + ' ' + lon)
  }

  return (
    <Section>
      {parsedCoordinate === null ? (
        <div>Loading or missing coordinate</div>
      ) : (
        <StyledMap
          center={parsedCoordinate}
          zoom={zoom}
          onclick={handleMapClick}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle center={parsedCoordinate} radius={radiusInMeters} />
        </StyledMap>
      )}
      {clickedAt === null ? (
        <Text>Click the map to show the coordinates</Text>
      ) : (
        <Text>
          Map clicked at <b> {clickedAt}</b>
        </Text>
      )}
    </Section>
  )
}

ShowMap.propTypes = {
  coordinateToMap: string,
}
export default ShowMap
