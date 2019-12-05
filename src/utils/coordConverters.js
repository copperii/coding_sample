
export const getDMScoordinate = (coordinate) => {
  const splitCoordinate = coordinate.split(' ')
  const currentLatitude = splitCoordinate[0]
  const latDdec = currentLatitude
  const currentLongitude = splitCoordinate[1]
  const latD = Math.trunc(latDdec)
  const latM = Math.trunc(60 * Math.abs(latDdec - latD))
  const latS = 3600 * Math.abs(latDdec - latD) - 60 * latM
  const latDMS = String(latD) + ' ' + String(latM) + ' ' + String(latS.toFixed(2))
  const lonDdec = currentLongitude
  const lonD = Math.trunc(lonDdec)
  const lonM = Math.trunc(60 * Math.abs(lonDdec - lonD))
  const lonS = 3600 * Math.abs(lonDdec - lonD) - 60 * lonM
  const lonDMS = String(lonD) + ' ' + String(lonM) + ' ' + String(lonS.toFixed(2))
  return (latDMS + ' ' + lonDMS)
}

export const getDDMcoordinate = (coordinate) => {
  const splitCoordinate = coordinate.split(' ')
  const latDdec = splitCoordinate[0]
  const lonDdec = splitCoordinate[1]
  //Degrees Minutes Seconds (DMS)
  const latD = Math.trunc(latDdec)
  const lonD = Math.trunc(lonDdec)
  //Degrees Decimal Minutes(DDM)
  const latDDMM = (latDdec - latD) * 60
  const latDDM = String(latD) + ' ' + String(latDDMM.toFixed(3))
  const lonDDMM = (lonDdec - lonD) * 60
  const longDDM = String(lonD) + ' ' + String(lonDDMM.toFixed(3))
  return (latDDM + ' ' + longDDM)
}