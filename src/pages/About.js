import React from 'react'
import '../styles/App.css'

const About = (props) => {
  props.setCurrentPage('/about')

  return (
    <div>
      <h4 className="heading">About Copperi demo site</h4>
      <div className="text">
        The main purpose for this site is as a practice project for the <a href="https://fullstackopen.com" target="_blank" rel="noopener noreferrer"> fullstack course</a>.
      </div>
      <div className="text">
        Site is built using React, Redux and GraphQL.
      </div>
    </div>
  )
}

export default About
