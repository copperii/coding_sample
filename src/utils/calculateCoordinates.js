import LatLon from 'geodesy/latlon-ellipsoidal-vincenty'
// usage samples https://github.com/chrisveness/geodesy
import { float } from 'prop-types'

export const getEndPoint = props => {
  const { lat, lon, distance, direction } = props
  if (lat && lon && distance && direction) {
    const p1 = new LatLon(lat, lon)
    const endPoint = p1.destinationPoint(distance, direction)
    return endPoint
  }
  return null
}

getEndPoint.propTypes = {
  lat: float,
  lon: float,
  distance: float,
  direction: float,
}
