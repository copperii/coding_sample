import React from 'react'
import {
  getDMScoordinate,
  getDDMcoordinate,
} from '../../../utils/coordConverters'
import { DataRow, InfoText } from '../maps.styles'

const ShowDDM = ({ coordinateText }) => {
  const ddm = getDDMcoordinate(coordinateText)
  return <DataRow title='DDM format'>{ddm}</DataRow>
}
const ShowDMS = ({ coordinateText }) => {
  const dms = getDMScoordinate(coordinateText)
  return <DataRow title='DMS format'>{dms}</DataRow>
}

const ShowCoordinates = props => {
  const { coordinateToMap } = props
  const coordinateText = coordinateToMap

  if (coordinateToMap === '') {
    return null
  }
  return (
    <>
      <InfoText>Some of the various formats for the coordinates are:</InfoText>
      <DataRow title='Format used in all calculations'>
        {coordinateText}
      </DataRow>
      <ShowDDM coordinateText={coordinateText} />
      <ShowDMS coordinateText={coordinateText} />
    </>
  )
}

export default ShowCoordinates
