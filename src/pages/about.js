import React from 'react'
import styled from 'styled-components'

const AboutSection = styled.section`
  margin-top: 20px;
`
const About = () => {
  return (
    <AboutSection>
      <h4 className="heading">About</h4>
      <div className="text">About page</div>
      <div className="text"></div>
    </AboutSection>
  )
}

export default About
