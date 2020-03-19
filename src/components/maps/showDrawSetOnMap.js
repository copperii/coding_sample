import React, { useState, useEffect } from 'react'
import { StyledMap } from './maps.styles'
import { TileLayer, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { array, string } from 'prop-types'
import { convertToDDM } from '../../utils/coordConverters'
import { getEndPoint } from '../../utils/calculateCoordinates'
import { GeodesicLine } from 'react-leaflet-geodesic'
import Heading from '../heading'

const zoom = 14

const parseCoordinate = coordinate => {
  const splitCoordinate = coordinate.split(' ')
  const currentLatitude = parseFloat(splitCoordinate[0])
  const currentLongitude = parseFloat(splitCoordinate[1])
  return [currentLatitude, currentLongitude]
}

const AllCircles = coordinates => {
  const circlesToDraw = coordinates.coordinates.filter(
    f => f.draw !== false && f.direction === 0
  )
  return (
    <div>
      {circlesToDraw.map(c => {
        const currentLatitude = parseFloat(c.latitude)
        const currentLongitude = parseFloat(c.longitude)
        const currentCenter = [currentLatitude, currentLongitude]
        return (
          <Circle key={c.id} center={currentCenter} radius={c.lengthInMeters} />
        )
      })}
    </div>
  )
}

const AllLines = props => {
  const { coordinates } = props

  const linesToDraw =
    coordinates &&
    coordinates &&
    coordinates.filter(f => f.draw !== false && f.direction !== 0)

  return (
    <div>
      {linesToDraw &&
        linesToDraw.map(c => {
          const currentLatitude = parseFloat(c.latitude)
          const currentLongitude = parseFloat(c.longitude)
          const destination = getEndPoint({
            lat: c.latitude,
            lon: c.longitude,
            distance: c.lengthInMeters,
            direction: c.direction,
          })

          const lineBoundary = [
            [currentLatitude, currentLongitude],
            [destination._lat, destination._lon],
          ]

          const options = {
            weight: 5,
            opacity: 0.5,
            color: 'blue',
          }
          return (
            <GeodesicLine
              key={c.id}
              positions={lineBoundary}
              options={options}
            />
          )
        })}
    </div>
  )
}

const ShowDrawSetOnMap = props => {
  const { coordinates, currentDrawSet, drawSetNames } = props
  const [mapCenter, setMapCenter] = useState(null)
  const [clickedAt, setClickedAt] = useState(null)
  const [lineBoundaries, setLineBoundaries] = useState([
    [
      [60.14275, 24.96043],
      [60.14275, 24.98941],
    ],
    [
      [60.14853, 24.974681],
      [60.13399, 24.974681],
    ],
  ])

  const [mapTitle, setMapTitle] = useState('Current coordinates')
  useEffect(() => {
    setMapTitle('Current coordinates') //default name when not found in db
    const currentName =
      drawSetNames && drawSetNames.find(name => name.id === currentDrawSet)
    if (currentName && currentName.name) {
      setMapTitle(currentName.name)
    }
  }, [currentDrawSet, drawSetNames])

  useEffect(() => {}, [lineBoundaries])

  if (!coordinates) {
    return <div></div>
  }

  if (coordinates && coordinates.length === 0) {
    return <div></div>
  }

  const firstLocation = coordinates.find(c => c.coordinate)
  if (firstLocation !== undefined) {
    const parsedCoordinate = parseCoordinate(firstLocation.coordinate)
    if (mapCenter === null) {
      setMapCenter(parsedCoordinate)
    }
  }

  const handleMapClick = e => {
    const lat = convertToDDM(e.latlng.lat)
    const lon = convertToDDM(e.latlng.lng)
    setClickedAt(lat + ' ' + lon)
  }

  return (
    <div>
      {firstLocation === undefined ? (
        <div>Loading or missing coordinate to draw</div>
      ) : (
        <React.Fragment>
          <Heading h6 topMargin='true'>
            Showing set name: {mapTitle}
          </Heading>
          <StyledMap center={mapCenter} zoom={zoom} onclick={handleMapClick}>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <AllCircles coordinates={coordinates} />
            <AllLines
              coordinates={coordinates}
              lineBoundaries={lineBoundaries}
              setLineBoundaries={setLineBoundaries}
            />
          </StyledMap>
          {clickedAt !== null ? (
            <div className='clickLocation'>Map clicked at: {clickedAt}</div>
          ) : (
            <div></div>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

ShowDrawSetOnMap.propTypes = {
  coordinates: array,
  currentDrawSet: string,
}

export default ShowDrawSetOnMap
