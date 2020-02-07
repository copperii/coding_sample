import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    background-color: #b1e0c6;
    // background-color: #AFDBD2;
    padding: 1em 2em;
  }
`
export default GlobalStyle
