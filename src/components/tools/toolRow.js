import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as MoreIcon } from '../../assets/more.svg'

const StyledRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  border: 0.01em dashed;
  //   width: 65%;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const StyledName = styled.div`
  width: 30%;
  margin: 0.5em;
  padding-left: 10px;
`

const StyledDescription = styled.div`
  width: 60%;
  margin: 0.5em;
`
const StyledLink = styled.a`
  text-decoration: none;

  &: hover {
    color: #713cb3;
    text-decoration: none;
  }

  &:focus,
  &:visited,
  &:link {
    text-decoration: none;
  }
  //   &: active {
  //     text-decoration: underline;
  //   }
`
const StyledDetail = styled(MoreIcon)`
  justify-content: flex-end;
  width: 20px;
  height: 1em;
  fill: black;

  &: hover {
    fill: #713cb3;
  }
`

const ToolRow = ({ node }) => {
  return (
    <>
      <StyledRow>
        <StyledName>
          <StyledLink href={node.url} target="_blank" rel="noopener noreferrer">
            {node.name}
          </StyledLink>
        </StyledName>
        <StyledDescription>{node.description}</StyledDescription>

        <Link to={`/tooldetails/${node.id}`}>
          <StyledDetail />
        </Link>
      </StyledRow>
    </>
  )
}

export default ToolRow
