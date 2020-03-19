import React, { useState } from 'react'
import { StyledCard } from './styles'
import { bool, string, number } from 'prop-types'

const Card = props => {
  const { delay = 0, noAnimation, primary, noMargin, big } = props
  const [animated, setAnimated] = useState(false)

  setTimeout(() => {
    setAnimated(true)
  }, delay)

  return (
    <StyledCard
      data-testid="card"
      animated={animated}
      delay={delay}
      noAnimation={noAnimation}
      primary={primary}
      noMargin={noMargin}
      big={big}
      {...props}
    />
  )
}

Card.propTypes = {
  delay: number,
  noAnimation: bool,
  primary: bool,
  noMargin: string,
  big: bool,
}

export default Card
