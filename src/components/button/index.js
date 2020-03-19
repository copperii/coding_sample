import React from 'react'
import Loader from '../loader'
import { StyledButton } from './styles'
import { bool, string } from 'prop-types'

const Button = ({
  secondary,
  big,
  inverse,
  loading,
  children,
  label,
  ...props
}) => {
  return (
    <StyledButton
      data-testid="button"
      secondary={secondary}
      big={big}
      inverse={inverse}
      {...props}
    >
      {loading ? <Loader small white /> : children} {label}
    </StyledButton>
  )
}

Button.propTypes = {
  secondary: bool,
  big: bool,
  inverse: bool,
  loading: bool,
  children: string,
  label: string,
}

export default Button
