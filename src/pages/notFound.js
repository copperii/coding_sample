import React from 'react'
import Heading from '../components/heading'
import Footer from '../components/footer'
import { Section, Text } from '../styles/globalStyle'

const NotFound = () => {
  return (
    <>
      <Section top="true">
        <Heading h4 className="heading">
          Page was not found
        </Heading>
        <Text className="text">
          Unfortunately requested page was not found.
        </Text>
      </Section>
      <Footer></Footer>
    </>
  )
}

export default NotFound
