import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Name, StyledLink, Description, Detail } from './toolRow.styles'

const ToolRow = ({ node }) => {
  return (
    <>
      <Row>
        <Name>
          <StyledLink href={node.url} target="_blank" rel="noopener noreferrer">
            {node.name}
          </StyledLink>
        </Name>
        <Description>{node.description}</Description>

        <Link to={`/tooldetails/${node.id}`}>
          <Detail />
        </Link>
      </Row>
    </>
  )
}

export default ToolRow
