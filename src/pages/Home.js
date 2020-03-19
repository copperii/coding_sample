import React from 'react'
import Heading from '../components/heading'
import Footer from '../components/footer'
import { Section, Text } from '../styles/globalStyle'
import KalmoPict from '../assets/kalmokorppikotka.jpg'
import Card from '../components/card'
import { Img, Container } from './home.styles'

const Home = () => {
  return (
    <>
      <Section top="true">
        <Heading h4>Welcome!</Heading>
        <Text>This is a site for testing and showcases.</Text>
        <Text></Text>
        <Card big noMargin="true">
          <Img src={KalmoPict} />
          <Container>
            <Text>Red-headed vulture</Text>
          </Container>
        </Card>
      </Section>
      <Footer></Footer>
    </>
  )
}

export default Home
