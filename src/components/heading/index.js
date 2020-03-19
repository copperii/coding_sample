import React from 'react'
import {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  HeadingFive,
  HeadingSix,
} from './styles'
import PropTypes from 'prop-types'

const Heading = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  noMargin,
  right,
  center,
  ...props
}) => {
  if (h1)
    return (
      <HeadingOne
        noMargin={noMargin}
        right={right}
        center={center}
        {...props}
      />
    )
  if (h2)
    return (
      <HeadingTwo
        noMargin={noMargin}
        right={right}
        center={center}
        {...props}
      />
    )
  if (h3)
    return (
      <HeadingThree
        noMargin={noMargin}
        right={right}
        center={center}
        {...props}
      />
    )
  if (h4)
    return (
      <HeadingFour
        noMargin={noMargin}
        right={right}
        center={center}
        {...props}
      />
    )
  if (h5)
    return (
      <HeadingFive
        noMargin={noMargin}
        right={right}
        center={center}
        {...props}
      />
    )
  if (h6)
    return (
      <HeadingSix
        noMargin={noMargin}
        right={right}
        center={center}
        {...props}
      />
    )
  return (
    <HeadingOne noMargin={noMargin} right={right} center={center} {...props} />
  )
}

Heading.propTypes = {
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  noMargin: PropTypes.string,
  right: PropTypes.string,
  center: PropTypes.string,
}

export default Heading
