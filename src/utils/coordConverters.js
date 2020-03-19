import { degtodm } from './gcCalcs'

export const getDMScoordinate = coordinate => {
  const splitCoordinate = coordinate.split(' ')
  const currentLatitude = splitCoordinate[0]
  const latDdec = currentLatitude
  const currentLongitude = splitCoordinate[1]
  const latD = Math.trunc(latDdec)
  const latM = Math.trunc(60 * Math.abs(latDdec - latD))
  const latS = 3600 * Math.abs(latDdec - latD) - 60 * latM
  const latSign = latDdec < 0 ? 'S ' : 'N '
  const latDMS =
    latSign +
    String(Math.abs(latD)) +
    ' ' +
    String(latM) +
    ' ' +
    String(latS.toFixed(2))
  const lonDdec = currentLongitude
  const lonD = Math.trunc(lonDdec)
  const lonM = Math.trunc(60 * Math.abs(lonDdec - lonD))
  const lonS = 3600 * Math.abs(lonDdec - lonD) - 60 * lonM
  const lonSign = lonDdec < 0 ? 'W ' : 'E '
  const lonDMS =
    lonSign +
    String(Math.abs(lonD)) +
    ' ' +
    String(lonM) +
    ' ' +
    String(lonS.toFixed(2))
  return latDMS + ' ' + lonDMS
}

export const getDDMcoordinate = coordinate => {
  const splitCoordinate = coordinate.split(' ')
  const latDdec = splitCoordinate[0]
  const lonDdec = splitCoordinate[1]
  const latSign = latDdec < 0 ? 'S ' : 'N '
  const latDm = degtodm(Math.abs(latDdec), 3)
  const lonSign = lonDdec < 0 ? 'W ' : 'E '
  const lonDm = degtodm(Math.abs(lonDdec), 3)
  return latSign + latDm + ' ' + lonSign + lonDm
}

export const convertToDDM = coordinate => {
  const sign = coordinate < 0 ? '-' : ' '
  //Degrees Minutes Seconds (DMS)
  const coordDegrees = Math.trunc(coordinate)
  //Degrees Decimal Minutes(DDM)
  const coordDDMM = Math.abs((coordinate - coordDegrees) * 60)
  // const fixedDDMM = coordDDMM.toFixed(3)

  const formattedDecimalMinutes = `${
    coordDDMM.toFixed(3) < 10
      ? `0${coordDDMM.toFixed(3)}`
      : `${coordDDMM.toFixed(3)}`
  }`
  // const coordDDM = String(coordDegrees) + ' ' + coordDDMM.toFixed(3)
  const coordDDM =
    sign + String(Math.abs(coordDegrees)) + ' ' + formattedDecimalMinutes
  return coordDDM
}
