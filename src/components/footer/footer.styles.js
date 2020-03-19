import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Hyperlink = styled.a`
  color: blue;
  margin-right: 10px;
  text-decoration: none;
  &: hover {
    text-decoration: none;
  }
  &:focus,
  &:visited,
  &:link {
    text-decoration: none;
  }
`

export const StyledLink = styled(Link)`
  color: blue;
  margin-right: 10px;
  text-decoration: none;
  &: hover {
    color: white;
    text-decoration: none;
  }
  &:focus,
  &:visited,
  &:link {
    text-decoration: none;
  }
`
