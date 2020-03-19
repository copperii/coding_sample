import React from 'react'
import { Section, Text, StyledLink } from '../styles/globalStyle'
import Heading from '../components/heading'
import Footer from '../components/footer'

const About = () => {
  return (
    <>
      <Section top="true">
        <Heading h4 className="heading">
          About
        </Heading>
        <Text>Just restructured this site, more content is coming.</Text>
        <Text>
          This site has been redesigned purposely to not use design frameworks.
        </Text>
        <Text>It is built using React, GraphQL, PostgreSQL and Django.</Text>
        <Text>
          You can try <i>beta version</i> of
          <StyledLink to="/drawonmap" title="Draw on map utility" center="true">
            Draw on map
          </StyledLink>
          page.
        </Text>
      </Section>
      <Footer />
    </>
  )
}

export default About
