import React, { useState } from 'react'
import CoordinateInputForm from '../components/maps/mapCoordinates/coordinateInputForm'
import ShowCoordinates from '../components/maps/mapCoordinates/showCoordinates'
import ShowMap from '../components/maps/mapCoordinates/showMap'
import Heading from '../components/heading'
import Footer from '../components/footer'
import { Section } from '../styles/globalStyle'

const CoordsToMap = () => {
  const [coordinateToMap, setCoordinateToMap] = useState('')

  return (
    <>
      <Section top="true">
        <Heading h4>Convert and map coordinates</Heading>

        <CoordinateInputForm
          setCoordinateToMap={coordinateToMap =>
            setCoordinateToMap(coordinateToMap)
          }
        />
        <ShowCoordinates coordinateToMap={coordinateToMap} />
        <ShowMap coordinateToMap={coordinateToMap} />
      </Section>
      <Footer></Footer>
    </>
  )
}

export default CoordsToMap
