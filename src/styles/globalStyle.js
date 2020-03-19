import styled, { createGlobalStyle } from 'styled-components'
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
  margin-left: ${props => (props.center ? '10px' : '0')};
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

export const Section = styled.section`
  padding: ${props => (props.top ? '2em' : '0')};
  margin-top: ${props => (props.marginTop ? '1em' : '0')};
`
export const Text = styled.div`
  margin-top: 1em;
`

export const Footer = styled.div`
  margin-top: 10em;
  padding-left: 2em;
`

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    background-color: #b1e0c6;
    padding: 1em 2em;
  }
`
export default GlobalStyle
