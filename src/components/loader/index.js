import React from 'react'
import { Dot, DotsLoader } from './styles'

const Loader = props => {
  return (
    <DotsLoader {...props} data-testid="loader">
      <Dot {...props} style={{}} />
      <Dot {...props} style={{}} />
      <Dot {...props} style={{}} />
    </DotsLoader>
  )
}

export default Loader
