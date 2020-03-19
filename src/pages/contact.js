import React from 'react'
import { Section, Text } from '../styles/globalStyle'
import Heading from '../components/heading'
import Footer from '../components/footer'
import Card from '../components/card'

const Contact = () => {
  return (
    <>
      <Section top="true">
        <Heading h4>Contact information</Heading>
        <Card noMargin="true">
          <Text>
            <b>Jan Kuparinen</b>
          </Text>
          <Text>
            <i>Location:</i> Espoo, Finland
          </Text>

          <Text>
            <i>Phone:</i> +358 50 586 4957
          </Text>

          <Text>
            <i>Email:</i> firstName . lastName [@] gmail.com
          </Text>
        </Card>
      </Section>
      <Footer />
    </>
  )
}

export default Contact
