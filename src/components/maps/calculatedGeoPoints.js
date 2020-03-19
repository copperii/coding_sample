import React from 'react'
import LatLon from 'geodesy/latlon-ellipsoidal-vincenty'
import { array, func, string, object } from 'prop-types'
import { Section } from '../../styles/globalStyle'

const CalculatedGeoPoints = props => {
  const { coordinates, currentDrawSet } = props

  if (!coordinates) {
    return <div>No coordinates.</div>
  }
  if (currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000') {
    return null
  }

  if (coordinates && coordinates.length === 0) {
    return <div></div>
  }

  const p1 = new LatLon(60.271, 24.9384)

  const testDistance = props.coordinates.find(c => {
    const testPoint = new LatLon(c.latitude, c.longitude)
    const distTest = p1.distanceTo(testPoint)
    if (distTest <= 161) {
      console.log('found too close')
      return c
    } else return null
  })

  return (
    <Section>
      {testDistance !== undefined ? (
        <div>
          {testDistance.pointName} {testDistance.coordinateText} is too close
        </div>
      ) : (
        <div></div>
      )}
    </Section>
  )
}

CalculatedGeoPoints.propTypes = {
  coordinates: array,
  currentDrawSet: string,
  drawSetNames: object,
  loggedInUsername: string,
  setNotification: func,
}
export default CalculatedGeoPoints
