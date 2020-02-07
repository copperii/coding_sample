import React from 'react'
import styled from 'styled-components'

const NotFoundSection = styled.section`
  margin-top: 20px;
`

const NotFound = () => {
  return (
    <NotFoundSection>
      <h4 className="heading">Page was not found</h4>
      <div className="text">Not found page</div>
      <div className="text">404</div>
    </NotFoundSection>
  )
}

export default NotFound
