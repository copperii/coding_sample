import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Heading from '../components/heading'
import Footer from '../components/footer'
import Notification from '../components/notification'
import CoordinateRows from '../components/maps/coordinateRows'
import DrawSetRow from '../components/maps/drawSetRow'
import AddCoordinateForm from '../components/maps/addCoordinateForm'
import DrawSetOnMap from '../components/maps/showDrawSetOnMap'
import CalculatedGeoPoints from '../components/maps/calculatedGeoPoints'
import { Section } from '../styles/globalStyle'
import { GET_DRAW_SET, GET_DRAW_SET_NAMES } from '../graphql/coordinateQueries'

const DrawOnMap = ({ loggedInUsername }) => {
  const [currentDrawSet, setCurrentDrawSet] = useState(
    '83879d2b-0121-4020-ae1d-000000000000'
  )
  const [coordinates, setCoordinates] = useState([])
  const [tempCoordinates, setTempCoordinates] = useState([])
  const drawSetNames = useQuery(GET_DRAW_SET_NAMES, {
    variables: { public: true },
  })
  const drawSet = useQuery(GET_DRAW_SET, {
    variables: { id: currentDrawSet },
  })

  useEffect(() => {}, [tempCoordinates])

  useEffect(() => {
    if (currentDrawSet === '83879d2b-0121-4020-ae1d-000000000000') {
      setCoordinates([])
    } else if (drawSet.data && drawSet.data.drawSets) {
      const foundSet = drawSet.data.drawSets.find(
        set => set.id === currentDrawSet
      )
      if (foundSet && foundSet.coordinates) {
        setCoordinates(foundSet.coordinates)
      }
    }
  }, [currentDrawSet, drawSet])

  const [notification, setNotification] = useState({
    message: '',
    type: 'none',
    time: 0,
  })

  return (
    <>
      <Section top='true'>
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
        <Heading h4 bottomMargin='true'>
          Draw circles or lines
        </Heading>
        <DrawSetRow
          setNotification={setNotification}
          drawSetNames={drawSetNames}
          coordinates={coordinates}
          currentDrawSet={currentDrawSet}
          setCurrentDrawSet={setCurrentDrawSet}
          loggedInUsername={loggedInUsername}
        ></DrawSetRow>
        <CoordinateRows
          setNotification={setNotification}
          coordinates={coordinates}
          currentDrawSet={currentDrawSet}
          loggedInUsername={loggedInUsername}
          tempCoordinates={tempCoordinates}
          setTempCoordinates={setTempCoordinates}
        />
        <AddCoordinateForm
          loggedInUsername={loggedInUsername}
          setNotification={setNotification}
          currentDrawSet={currentDrawSet}
          tempCoordinates={tempCoordinates}
          setTempCoordinates={setTempCoordinates}
        />
        <DrawSetOnMap
          setNotification={setNotification}
          coordinates={
            coordinates && coordinates.length > 0
              ? coordinates
              : tempCoordinates
          }
          currentDrawSet={currentDrawSet}
          drawSetNames={
            drawSetNames && drawSetNames.data && drawSetNames.data.drawSets
          }
        />
        <CalculatedGeoPoints
          setNotification={setNotification}
          coordinates={coordinates}
          currentDrawSet={currentDrawSet}
        />
      </Section>
      <Footer></Footer>
    </>
  )
}

export default DrawOnMap
